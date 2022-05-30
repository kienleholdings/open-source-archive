# Organization Monorepo Template

🧡 Open Source Apps and Packages from Kienle Holdings

## Introduction

We firmly believe that any piece of software that can be open sourced absolutely should be. This
repo contains everything that we use at Kienle Holdings on a daily basis - from shared configs all
the way to entire component libraries.

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
