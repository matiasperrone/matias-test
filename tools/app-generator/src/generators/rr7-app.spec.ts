import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { rr7AppGenerator } from './rr7-app';
import { Rr7AppGeneratorSchema } from './schema';

describe('rr7-app generator', () => {
  let tree: Tree;
  const options: Rr7AppGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await rr7AppGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
