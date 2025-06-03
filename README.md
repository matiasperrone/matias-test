# MatiasTest

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## Project Overview

This is a React Router v7 application built with Nx that demonstrates a complete user management system with the following features:

### Key Features

- **User Management System**: Complete CRUD operations for user profiles
- **Search & Filtering**: Search users by name, email, or bio
- **Pagination**: Optional paginated view for large user datasets
- **Form Validation**: Client-side validation for user data
- **State Management**: Zustand store with persistence and dev tools
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Error Handling**: Comprehensive error states and loading indicators

### Application Routes

- `/` - Home page with navigation cards
- `/about` - About page with application information
- `/users` - User listing with search and pagination
- `/users/:id` - Individual user profile view
- `/users/:id/edit` - User profile editing form

### Technical Implementation

#### State Management
- **Zustand Store**: Centralized state management with [`useUserStore`](apps/matias-test/build/server/index.js)
- **Persistence**: Local storage integration for data persistence
- **DevTools**: Redux DevTools integration for development

#### User Interface
- **React Router v7**: Latest routing capabilities
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Reusable UI components (Cards, Buttons, Forms)
- **Responsive Layout**: Mobile-first design approach

#### Data Management
- **Mock Data**: Pre-populated user dataset for demonstration
- **Async Operations**: Simulated API calls with loading states
- **Form Validation**: Real-time validation with error messaging
- **Search Functionality**: Multi-field search across user properties

## Run tasks

To run the dev server for your app, use:

```sh
bunx nx serve matias-test
```

To create a production bundle:

```sh
bunx nx build matias-test
```

To see all available targets to run for a project, run:

```sh
bunx nx show project matias-test
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Development Setup

### Prerequisites
- Node.js (Latest LTS version)
- bun package manager

### Installation & Running

1. **Install dependencies**:
   ```sh
   bun install
   ```

2. **Start development server**:
   ```sh
   bunx nx serve matias-test
   ```

3. **Build for production**:
   ```sh
   bunx nx build matias-test
   ```

4. **Run tests** (if available):
   ```sh
   bunx nx test matias-test
   ```

### Project Structure

```
apps/matias-test/
├── app/                    # Application source code
│   ├── routes/            # React Router v7 routes
│   ├── components/        # Reusable UI components
│   ├── stores/           # Zustand state management
│   └── utils/            # Utility functions
├── build/                # Compiled output
└── public/              # Static assets
```

### Key Technologies Used

- **React Router v7**: Modern React routing
- **TypeScript**: Type-safe development
- **Zustand**: Lightweight state management
- **Tailwind CSS**: Utility-first styling
- **Nx**: Monorepo tooling and build system
- **Vite**: Fast build tool and dev server

### Code Quality Features

- **TypeScript**: Full type safety throughout the application
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during async operations
- **Form Validation**: Comprehensive input validation
- **Responsive Design**: Works on all device sizes

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
bunx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
bunx nx g @nx/react:lib mylib
```

You can use `bunx nx list` to get a list of installed plugins. Then, run `bunx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
bunx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
bunx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
