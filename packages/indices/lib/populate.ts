import type { Index, ChangeLog } from '../types'
import { writeFileSync, readFileSync } from 'fs'
import { stringify } from 'yaml'
import dayjs, { type Dayjs } from 'dayjs'
import { select, input } from '@inquirer/prompts'

export const populateIndices = (indices: Index[]) => {
  writeFileSync('./indices.yaml', stringify({indices: indices}))
}
export const populateApi = (indices: Index[]) => {
  var file = `package app

import (
\t"github.com/vulncheck/feeds/api"
\t"github.com/vulncheck/feeds/api/advisory"

\tvulncheck "github.com/vulncheck/api/internal"
)

var IndexMetadata = []vulncheck.Index{
`
  indices.map(index => {
    file += `
\t{
\t\tName: "${index.name}", Description: "${index.title}",
\t\tParams: ${index.params || 'vulncheck.DefaultParams'}, Filters: vulncheck.DefaultFilters,
\t\t${index.struct ? `Struct: ${index.struct},` : ''}${index.noCve ? ' NoCve: true,' : ''}${index.large ? ' Large: true,' : ''}
\t},`
  })

  writeFileSync('../../../api/app/index-metadata.go', file + `\n}`)
}

export const populateChangelog = (changelog: string, indices: Index[]) => {
  var file = readFileSync('../../changelog/' + changelog, 'utf8')

  indices.map(index => {
    file += `
### ${index.title}\n
${index.desc}\n\n
[Browse the \`${index.name}\` index](https://vulncheck.com/api/?index=${index.name}){:target="_blank"}\n
`
  })
  writeFileSync('../../changelog/' + changelog, file)
}

export const newChangelog = async () => {
  const changelog:ChangeLog = {date: '', title: '' }

  changelog.date = (await select<Dayjs>({
    message: 'Which day should the changelog start at?',
    choices: [
      { name: 'Today', value: dayjs() },
      { name: 'Tomorrow', value: dayjs().add(1, 'day')  },
    ],
  })).format('YYYY-MM-DD');

  changelog.title = await input({
    message: 'What should the title of the changelog be?',
  })

  writeFileSync(`../../changelog/${changelog.date}.md`, `---
type: 'changelog'
date: ${changelog.date}
slug: '${changelog.date}'
title: ${changelog.title}
---`)
}

