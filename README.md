# GitHub Stars Export (Script for [Deno](https://deno.land))

Generate [Obsidian](https://obsidian.md) compatible Markdown files out of GitHub's starred repositories.

## Usage

Copy `.env.example` to `.env` and edit the `GITHUB_USERNAME` and `GITHUB_TOKEN` variables. 

Then run:

```shell
deno run --allow-env --allow-net --allow-read --allow-write main.ts
```
