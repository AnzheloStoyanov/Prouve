#  Woof & Roof

## Introduction

This is a React project repository. Please read the following guidelines before contributing to the project.


Visual studio extensions required:
- https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented
- https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass

## Branching Policy

- The `main` and `develop` branches are protected. **Direct pushes to these branches are not allowed.**

## Pull Request (PR) Policy

- All changes must go through a Pull Request.

- A Pull Request needs to be reviewed and approved by at least one other developer before it can be merged into the `develop` or `main` branch.

### Steps to Create a Pull Request

1. Create a new branch with a meaningful name. E.g., `feature/new-component` or `bugfix/issue-123`.

    ```bash
    git checkout -b feature/new-component
    ```

2. Make your changes in this branch.

3. Go to GitHub and create a new Pull Request against the `develop` or `main` branch.

4. Add a reviewers to the Pull Request and wait for approval.

5. Once the PR is approved, it can be merged into the target branch.

## Code Standards

### Pure Components

- Strive to write pure components whenever possible. These components should not rely on external mutable states or produce side effects. This ensures that given the same props, the output remains the same, leading to predictable behavior and better performance.
  
### Modularity & Reusability

- Components should be as small as possible, serving a single responsibility. The smaller a component, the easier it is to test, maintain, and reuse.
  
- Aim for reusability. Before creating a new component, check if there's an existing component that meets your needs or if an existing component can be modified to become more generic.

### Naming Conventions

- Use meaningful names for components, functions, and variables. For instance, prefer `UserProfile` over `UP` or `Info`.

- Follow the camelCase naming convention for variables and functions, and PascalCase for React components.

### Formatting & Linting

- Use tools like [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to enforce a consistent code style. This not only makes the codebase easier to read but also helps in catching potential bugs.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Deployment trigger 1

