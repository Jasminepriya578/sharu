// src/app/api/extract-text/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    console.log("Extract-text API endpoint hit");
    
    // Parse request body
    const body = await request.json();
    const { filePath } = body;
    
    console.log("Requested file path:", filePath);

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    // Normalize the file path for Windows
    const normalizedPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    const resolvedFilePath = path.join(process.cwd(), normalizedPath);
    
    console.log("Resolved file path:", resolvedFilePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedFilePath)) {
      console.error("File not found:", resolvedFilePath);
      return NextResponse.json({ 
        error: 'File not found on server', 
        path: resolvedFilePath 
      }, { status: 404 });
    }

    // File exists, but let's not try to parse it yet
    // Just read file size to confirm we can access it
    const stats = fs.statSync(resolvedFilePath);
    
    return NextResponse.json({
      message: 'File found successfully',
      filePath: resolvedFilePath,
      fileSize: stats.size,
      lastModified: stats.mtime
    });
  } catch (error) {
    console.error('Extract text error:', error);
    return NextResponse.json({ 
      error: 'Error in API route', 
      details: error.message 
    }, { status: 500 });
  }
}