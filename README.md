This repository contains the source code for a personal project. It is built using React + TypeScript, Tailwind for CSS, bootstrapped with Vite[SWC]

## Getting Started

First, run the development server (using pnpm or your choice of package manager):

```bash
pnpm i
pnpm run dev
```

Then follow the displayed instructions to display the local app on your browser.

### Git

We use conventional commits. For more information you can check out the [Conventional Commit Homepage](https://www.conventionalcommits.org/en/v1.0.0/).

We follow a development branch naming convention: `<work type>/<issue-number>-<short-description>`

1. Start clasifying by work type. Examples: bugfix, feature, rebase, hotfix, docs, release, refactor.
2. Use dashes - to separate words.
3. Include related issue number (if any).
4. Describe the topic using two or three words.

### Components

The `components` folder contains generic reusable elements essential for building user interfaces. These components are agnostic to specific application logic, making them versatile and easily reusable across various features within the application.

### Unit Testing

We leverage Jest and React Testing Library to write unit tests for components. Mock data isolates the domain, enabling focused testing, encouraging reliability.

The following command can be executed to run tests:

```bash
pnpm run test
```
