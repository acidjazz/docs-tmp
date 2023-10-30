import type { Index } from './types'
import { parse, stringify } from 'yaml'
import { readFileSync, writeFileSync } from 'fs'

const parseIndexMetadata = (): Index[] => {
  const metadata = readFileSync('../../../api/app/index-metadata.go', 'utf8')
  const regex = /(\w+):\s*([^,]+)(?=,|\})/g;

  let matches
  let indexes:Index[] = []
  let index:Index = {} as Index
  while ((matches = regex.exec(metadata)) !== null) {
    const [, propertyName, propertyValue] = matches;
    switch (propertyName) {
      case 'Name':
        if (index.name) indexes.push(index)
        index = {} as Index
        index.name = propertyValue.replace(/"/g, '')
        break
      case 'Description':
        index.title = propertyValue.replace(/"/g, '')
        break
      case 'Params':
        if (propertyValue != 'vulncheck.DefaultParams')
          index.params = propertyValue
        break
      case 'Filters':
        if (propertyValue != 'vulncheck.DefaultFilters')
          index.filters = propertyValue
        break
      case 'Struct':
        index.struct = propertyValue
        break
      case 'NoCve':
        index.noCve = true
        break
      case 'Large':
        index.large = true
        break
    }
  }
  indexes.push(index)
  return indexes
}

const indices:Index[] = parse(readFileSync('./indices.yaml', 'utf8')).indices
const indexes = parseIndexMetadata()

for (const index of indices) {
  const match = indexes.find(i => i.name === index.name)
  if (!match) {
    console.log(`Could not find index ${index.name} in index-metadata.go`)
  }
}

for (const index of indexes) {
  const match = indices.find(i => i.name === index.name)
  if (!index.name) console.log(index)
  if (!match)
    console.log(`Could not find index ${index.name} in indices.yaml`)
  else
    index.desc = match.desc
}

// sort indexes by name
const sorted = indexes.sort((a, b) => a.name.localeCompare(b.name))

// console.log(sorted)
// write sorted to indices.yaml
writeFileSync('./indices.yaml', stringify({indices: sorted}))
