const { IncomingWebhook } = require('@slack/webhook');
const core = require('@actions/core');

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const statusInput = core.getInput('status', { required: true });

const githubRepo = process.env.GITHUB_REPOSITORY;
const githubSha = process.env.GITHUB_SHA;
const githubRunId = process.env.GITHUB_RUN_ID;

const commitUrl = `https://github.com/${githubRepo}/commit/${githubSha}`;
const commitActor = process.env.GITHUB_ACTOR;
const commitBranch = process.env.GITHUB_REF.split('/')[0];

const linkifiedGithubRepo = `[${githubRepo}](https://github.com/${githubRepo})`;

(async () => {
    await webhook.send({
        text: `Build ${githubRunId}: ${commitUrl} of ${linkifiedGithubRepo}@${commitBranch} by ${commitActor} ${statusInput}`,
    });
})();
