# Organization Monorepo Template

📂 A GitHub Template for Creating a Kienle Holdings Org Monorepo

<!--
Steps to Customizing this Template

Hey there! Thanks for using the org monorepo template. In order to maximize your productivity and
reduce confusion to developers working cross-org, you'll need to change some things to get this all
set up. With that in mind, here's an overview of how these instructions will work:

Filename
LineNumber:ColNumber (Instructions for what to edit go here)

Everything clear? If not shoot a message into technologies-support in Slack, otherwise...
Let's get started!

---------------------------------------------------------------------------------------------------

./.devcontainer/devcontainer.json
5:12 Replace "Organization Monorepo Template" with the name of your org

./.github/ISSUE_TEMPLATE/config.yml
If this is a public repo, please delete this file

./.github/publicReposOnly/
If this is a private repo, please delete this directory
If this is a public repo, please move the contents of ./.github/publicReposOnly/ISSUE_TEMPLATE to
./.github/ISSUE_TEMPLATE and delete this folder

./.github/CODEOWNERS
10:0 Uncomment this line, change your_team to the name of your org's team responsible for apps
11:0 Uncomment this line, change your_team to the name of your org's team responsible for packages
8:0 Remove this line

./.package.json
2:28 Replace template-org-monorepo with your org's name. Suffix it with -private if this is a
private repo
11:51 Replace template-org-monorepo with the exact name of your GitHub repo
14:14 Replace this entire string with your org's name and contact info
15:15 If your repo is public, UNLICENSED with the name of the license you want this repo to use
(we prefer MIT). Please be sure to add that license in ./LICENSE
17:13 Replace template-org-monorepo with the exact name of your GitHub repo
19:16 Replace template-org-monorepo with the exact name of your GitHub repo

./README.md
1:3 Replace "Organization Monorepo Template" with the name of your org. Add (Private) if some or
all of the monorepo's contents should be private
3:1 Replace the template description with a description of your org. You can even add a fun emoji
if you want (highly recommended)
56:0 Replace the introduction template with your own
5:0-54:0 Delete all of this
-->

## Introduction

This template allows any Kienle Holdings org to easily create a new monorepo to hold all of their
projects

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Remote Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Setup

1. Open VS Code
1. Open the command pallette (`cmd + shift + p`)
1. Run the command `Remote-Containers: Open Folder in Container`
1. Open the repository folder

## Running a Local Development Environment

1. In a VSCode terminal, run `pnpm run dev`

## Building, Linting, and Testing

- To create a production build for all projects, run `pnpm run build`
- To lint all projects, run `pnpm run lint`
- To lint all projects, run `pnpm run test`
