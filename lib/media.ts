import fs from 'node:fs/promises';
import path from 'node:path';
import { getPlaiceholder } from 'plaiceholder';

type MediaConfig = {
  quality?: number;
  size?: { width: number; height: number };
};

export async function generateBlurUrl(
  mediaPath: string,
  config: MediaConfig = { quality: 10, size: { width: 16, height: 16 } }
) {
  try {
    // Handle both local and remote paths
    let buffer: Buffer;

    if (mediaPath.startsWith('http')) {
      const res = await fetch(mediaPath);
      buffer = Buffer.from(await res.arrayBuffer());
    } else {
      // Assuming local paths are relative to public directory
      const fullPath = path.join(process.cwd(), 'public', mediaPath);
      buffer = await fs.readFile(fullPath);
    }

    const { base64: blurDataURL } = await getPlaiceholder(buffer, {
      size: config.size?.width,
    });

    return blurDataURL;
  } catch (error) {
    console.error(`Error generating blur-sm URL for ${mediaPath}:`, error);
    return null;
  }
}
