#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Test our generator by calling it programmatically
async function testGenerator() {
  try {
    const generatorPath = path.resolve(__dirname, '../tools/generators/rr7-app/generator.ts');
    
    console.log('Testing generator...');
    
    // Import and run the generator
    const { Tree } = require('@nx/devkit');
    const generator = require(generatorPath).default;
    
    // Create a mock tree
    const tree = new Tree();
    
    // Test options
    const options = {
      name: 'test-generated-app',
      directory: 'apps',
      tags: '',
      unitTestRunner: 'vitest',
      e2eTestRunner: 'none',
      linter: 'eslint',
      skipFormat: false,
      skipPackageJson: false,
      rootProject: false
    };
    
    // Run the generator
    await generator(tree, options);
    
    console.log('Generator completed successfully!');
    console.log('Changes:', tree.listChanges());
    
  } catch (error) {
    console.error('Generator failed:', error);
  }
}

testGenerator();
