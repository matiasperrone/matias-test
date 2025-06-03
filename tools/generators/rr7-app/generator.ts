import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  Tree,
  joinPathFragments,
} from '@nx/devkit';
import * as path from 'path';

interface RR7AppGeneratorSchema {
  name: string;
  directory?: string;
  tags?: string;
  unitTestRunner?: 'vitest' | 'none';
  e2eTestRunner?: 'playwright' | 'cypress' | 'none';
  linter?: 'eslint' | 'none';
  skipFormat?: boolean;
  skipPackageJson?: boolean;
  rootProject?: boolean;
}

const reactRouterDependencies = {
  'react-router': '^7.6.1',
  '@react-router/node': '^7.6.1',
  '@react-router/serve': '^7.6.1'
};

const reactRouterDevDependencies = {
  '@react-router/dev': '^7.6.1'
};

const baseDependencies = {
  'react': '^18.3.1',
  'react-dom': '^18.3.1',
  'tailwind-merge': '^3.3.0',
  'class-variance-authority': '^0.8.0',
  'lucide-react': '^0.511.0',
  'zustand': '^5.0.5'
};

const baseDevDependencies = {
  '@types/react': '^18.3.14',
  '@types/react-dom': '^18.3.2',
  '@vitejs/plugin-react': '^4.3.4',
  'vite': '^6.3.5',
  'tailwindcss': '^4.1.8',
  '@tailwindcss/postcss': '^4.1.8',
  'autoprefixer': '^10.4.20',
  'postcss': '^8.5.4',
  'typescript': '^5.7.3'
};

const lintingDependencies = {
  'eslint': '^9.17.0',
  'eslint-plugin-react': '^7.37.2',
  'eslint-plugin-react-hooks': '^5.1.0',
  'eslint-plugin-jsx-a11y': '^6.10.2',
  'eslint-plugin-import': '^2.31.0',
  'eslint-config-prettier': '^9.2.0',
  'typescript-eslint': '^8.22.0'
};

const testingDependencies = {
  'vitest': '^2.1.8',
  '@vitest/ui': '^2.1.8'
};

export default async function (tree: Tree, options: RR7AppGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await addProjectConfiguration(tree, normalizedOptions);
  addFiles(tree, normalizedOptions);
  await addDependencies(tree, normalizedOptions);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }
}

function normalizeOptions(tree: Tree, options: RR7AppGeneratorSchema) {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = options.rootProject
    ? '.'
    : joinPathFragments('apps', projectDirectory);

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    offsetFromRoot: offsetFromRoot(projectRoot),
  };
}

async function addProjectConfiguration(tree: Tree, options: any) {
  // The project configuration will be auto-detected by the React Router plugin
  // based on the react-router.config.ts file, so we don't need to manually add it
}

function addFiles(tree: Tree, options: any) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: options.offsetFromRoot,
    template: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

async function addDependencies(tree: Tree, options: any) {
  if (options.skipPackageJson) {
    return;
  }

  const dependencies = {
    ...baseDependencies,
    ...reactRouterDependencies
  };

  const devDependencies = {
    ...baseDevDependencies,
    ...reactRouterDevDependencies
  };

  if (options.linter === 'eslint') {
    Object.assign(devDependencies, lintingDependencies);
  }

  if (options.unitTestRunner === 'vitest') {
    Object.assign(devDependencies, testingDependencies);
  }

  return addDependenciesToPackageJson(tree, dependencies, devDependencies);
}
