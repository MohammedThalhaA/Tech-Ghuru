import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    const sig = searchParams.get('sig');

    if (!filename || !sig) {
      return new NextResponse('Bad Request: Missing parameters', { status: 400 });
    }

    // 1. Verify signature to prevent directory traversal and guessing filenames
    const secret = process.env.NEXTAUTH_SECRET || 'techghuru_secret_fallback';
    const expectedSig = crypto.createHmac('sha256', secret).update(filename).digest('hex');

    if (sig !== expectedSig) {
      return new NextResponse('Unauthorized: Invalid download link signature', { status: 401 });
    }

    // 2. Resolve safe path
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), 'uploads', 'resumes', safeFilename);

    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse('Not Found: Resume file not found', { status: 404 });
    }

    // 3. Read file contents
    const fileBuffer = await fs.readFile(filePath);

    // 4. Set Content-Type based on extension
    const ext = path.extname(safeFilename).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.pdf') {
      contentType = 'application/pdf';
    } else if (ext === '.doc') {
      contentType = 'application/msword';
    } else if (ext === '.docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(safeFilename.substring(safeFilename.indexOf('-', safeFilename.indexOf('-') + 1) + 1))}"`,
      },
    });
  } catch (error) {
    console.error('Resume download route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
