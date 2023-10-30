import type { Index, File } from './types'
import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'yaml'
const group = (indices: Index[], start: string, end: string): Index[] =>
  indices.filter(index =>
    index.name.toLowerCase().charCodeAt(0) >= start.charCodeAt(0) &&
    index.name.charCodeAt(0) <= end.charCodeAt(0)
  )

const indices:Index[] = parse(readFileSync('./indices.yaml', 'utf8')).indices

const files:File[] = [
  {
    start: 'a',
    end: 'f',
    name: '2.indices-a-f.md'
  },
  {
    start: 'g',
    end: 'l',
    name: '3.indices-g-l.md'
  },
  {
    start: 'm',
    end: 'r',
    name: '4.indices-m-r.md'
  },
  {
    start: 's',
    end: 'z',
    name: '5.indices-s-z.md'
  },
]

const intro = (start: string, end: string ) => `---
title: Indexes ${start.toUpperCase()}-${end.toUpperCase()}
---

## Indices
`
files.forEach(file => {
  var md = intro(file.start, file.end)
  group(indices, file.start, file.end,).forEach(index => {
    md = md.concat(`### ${index.title}\n`)
    md = md.concat(`${index.desc}\n\n`)
    md = md.concat(`[Browse the \`${index.name}\` index](https://vulncheck.com/api/?index=${index.name}){:target="_blank"}\n`)
  })
  writeFileSync(`../../content/5.indices/${file.name}`, md)
  console.log(`Generated markdown file ${file.name} in /content/5.indices`)
})

