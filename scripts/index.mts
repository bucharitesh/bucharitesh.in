import { registrySchema } from 'shadcn/schema';
import { registry } from '../registry';
import { buildRegistry } from './build-registry.mts';

try {
  console.log('💅 Building registry.json...');
  const result = registrySchema.safeParse(registry);

  if (!result.success) {
    console.error(result.error);
    process.exit(1);
  }

  await buildRegistry(result.data);
  console.log('✅ Registry JSON file built successfully');
} catch (error) {
  console.error(error);
  process.exit(1);
}
