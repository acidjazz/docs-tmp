import { select, input } from '@inquirer/prompts'
import dayjs, { type Dayjs } from 'dayjs'
import { ChangeLog } from './types'
import { writeFileSync } from 'fs'

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

  writeFileSync(`../../changelog/${changelog.date}.md`, `
---
type: chagelog
date: ${changelog.date}
slug: '${changelog.date}'
title: ${changelog.title}
---`)

  console.log(`Changelog created at ../../changelog/${changelog.date}.md`)

}
// newChangelog()
