import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    const files = await fs.readdir(galleryDir);

    const imageFiles = files.filter((f) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(f)).sort();

    return new Response(JSON.stringify({ files: imageFiles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ files: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
