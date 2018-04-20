const { cd, exec, echo, touch } = require("shelljs");
const { readFileSync } = require("fs");
const url = require("url");

let repoUrl;
const pkg = JSON.parse(readFileSync("package.json") as any);

if (typeof pkg.repository === "object") {
  if (!pkg.repository.hasOwnProperty("url")) {
    throw new Error("URL does not exist in repository section")
  }
  repoUrl = pkg.repository.url
} else {
  repoUrl = pkg.repository
}

const parsedUrl = url.parse(repoUrl)
const ghToken = process.env.GH_TOKEN
const isCI = process.env.CI || process.env.BUILD_NUMBER;
const gitRepoURI = isCI ? `https://${ghToken}@${parsedUrl.host}${parsedUrl.path}` : `git@${parsedUrl.host}:${parsedUrl.path}`;

echo("Deploying docs!!!")
cd("docs")
touch(".nojekyll")
exec("git init")
exec("git add .")
exec('git config user.name "Robert Lillack"')
exec('git config user.email "rob@vizzlo.com"')
exec('git commit -m "docs(docs): update gh-pages"')
exec(`git push --force --quiet "${gitRepoURI}" master:gh-pages`)
echo("Docs deployed!!")
