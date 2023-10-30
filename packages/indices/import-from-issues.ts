import type { Index } from './types'
import { readdirSync, readFileSync } from 'fs'
import { parse } from 'yaml'
import { confirm, select, input } from '@inquirer/prompts'
import { getIndexIssues, markIssuesComplete , parseBody } from './lib/issues'
import { populateIndices, populateApi, populateChangelog, newChangelog } from './lib/populate'

const mergeIndices = (indices: Index[], newIndices: Index[]): Index[] =>
  [...indices, ...newIndices].sort((a, b) => a.name.localeCompare(b.name))

const getChangelogs = () => {
  const changelogs = readdirSync('../../changelog')
  return changelogs.sort().reverse().slice(0, 3)
}

const nameExists = (indices: Index[], name: string): boolean =>
  indices.some(index => index.name === name)

const main = async () => {

  const indices:Index[] = parse(readFileSync('./indices.yaml', 'utf8')).indices
  const newIndices:Index[] = []

  const issues = await getIndexIssues()
  console.log(`Found a total of ${issues.length} new indexes ready to import`)
  var duplicates:string[] = []
  for (const issue of issues) {
    const index = parseBody(issue.body)
    if (nameExists(indices, index.name)) {
      duplicates.push(index.name)
    } else {
      if (index.params === '') delete index.params
      if (index.noCve === false) delete index.noCve
      newIndices.push(index)
    }
  }

  if (duplicates.length > 0) throw Error(`Found ${duplicates.length} existing indexes: ${duplicates.join(', ')}`)

  console.log(`${newIndices.length} new indexes to import: ${newIndices.map(i => i.name).join(', ')}`)

  if (!await confirm({
    message: `Are you sure you want to import these new indexes?`,
    default: false,
  })) return

  const allIndices = mergeIndices(indices, newIndices)
  populateIndices(allIndices)
  console.log(`Added ${newIndices.length} new indices to indices.yaml`)
  populateApi(allIndices)
  console.log(`Added ${newIndices.length} new indices to api-metadata.go`)

  if (await confirm({
    message: 'Would you like to create a new changelog?',
    default: true,
  })) await newChangelog()

  const changelogs = getChangelogs()
  const changelog = await select({
    message: 'Choose a changelog to add these indexes to',
    choices: changelogs.map(c => ({ title: c, value: c })),
  })
  populateChangelog(changelog, newIndices)
  console.log(`Added ${newIndices.length} new indices to ${changelog}`)

  console.log('Please verify that api-metadata, indices, and the changelog are correct')

  if (!await confirm({
    message: 'Would you like to tag these issues as imported?',
    default: false,
  })) return
  await markIssuesComplete(issues)
  console.log('Issues tagged as imported with index-added')

}
main()
