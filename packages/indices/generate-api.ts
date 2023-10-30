import type { Index } from './types'
import { readFileSync } from 'fs'
import { parse } from 'yaml'
import { populateApi } from './lib/populate'
const main = async () => {
  const indices:Index[] = parse(readFileSync('./indices.yaml', 'utf8')).indices
  populateApi(indices)
  console.log(`Generated ${indices.length} in api-metadata.go`)
}
main()
