import { Tree } from '@nx/devkit';
import rr7AppGenerator from './tools/generators/rr7-app/generator';

async function testGenerator() {
  console.log('Testing RR7 App Generator...');
  
  const tree = new Tree();
  
  const options = {
    name: 'test-app',
    directory: 'apps',
    tags: '',
    unitTestRunner: 'vitest' as const,
    e2eTestRunner: 'none' as const,
    linter: 'eslint' as const,
    skipFormat: false,
    skipPackageJson: false,
    rootProject: false
  };
  
  try {
    await rr7AppGenerator(tree, options);
    console.log('✅ Generator completed successfully!');
    
    const changes = tree.listChanges();
    console.log(`📁 Files to be created: ${changes.length}`);
    
    changes.forEach(change => {
      console.log(`  ${change.type}: ${change.path}`);
    });
    
  } catch (error) {
    console.error('❌ Generator failed:', error);
  }
}

testGenerator();
