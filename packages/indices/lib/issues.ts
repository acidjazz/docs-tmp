import type { Index } from '../types'
import { Octokit } from '@octokit/rest'
import { throttling } from '@octokit/plugin-throttling'
import dotenv from 'dotenv'

export const getIndexIssues = async () => {
  dotenv.config()
  const response = await new Octokit({ auth: process.env.PAT }).issues.listForRepo({
    owner: 'vulncheck',
    repo: 'api',
    state: 'open',
    labels: 'index',
    per_page: 500,
  })
  return response.data
}

export const markIssuesComplete = async (issues: any[]) => {
  dotenv.config()
  const octo = Octokit.plugin(throttling)
  const octokit = new octo({
    auth: process.env.PAT,
    throttle: {
      onRateLimit: (retryAfter, options, octokit, retryCount) => {
        octokit.log.warn(
          `Request quota exhausted for request`,
        );

        if (retryCount < 1) {
          // only retries once
          octokit.log.info(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onSecondaryRateLimit: (retryAfter, options, octokit) => {
        // does not retry, only logs a warning
        octokit.log.warn(
          `SecondaryRateLimit detected`,
        );
      },
    },
  })

  issues.map(async issue => {
    await octokit.issues.update({
      owner: 'vulncheck',
      repo: 'api',
      issue_number: issue.number,
      labels: ['index', 'index-added'],
    })
  })
}

// parse the issue body into params
export const parseBody = (body: string): Index => {
  const bodyRegex = /### Index\n+([^#]+)### Title\n+([^#]+)### Description\n+([^#]+)### feeds struct\n+([^#]+)### CVE\n+([^#]+)### Custom CVE Field\n+([^#]+)/gm;
  const matches = bodyRegex.exec(body.replace(/\r/gm, ''))
  if (!matches || matches.length !== 7) {
    throw new Error(` ${matches?.length} Could not parse: "${body}" using regex ${bodyRegex}`, )
  }
  const name = matches[1].trim()
  const title = matches[2].trim()
  const desc = matches[3].trim()
  const struct = matches[4].trim()
  const noCve = matches[5].trim() == 'Yes' ? false : true
  const params = matches[6].trim() == '_No response_' ? '' : `vulncheck.DefaultParams.CVEField("${matches[6].trim()}")`
  return { name, title, desc, struct, noCve, params }
}
