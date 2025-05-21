import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';
export async function POST(request: NextRequest) {
  try {
    // Get form data from the request (contains the file)
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Validate that a file was provided
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size should be less than 10MB' },
        { status: 400 }
      );
    }


    const buffer = Buffer.from(await file.arrayBuffer());
  
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }
const timestamp = Date.now();
const sanitizedName = file.name.replace(/\s+/g, '-').replace(/[()]/g, ''); // Remove spaces and parentheses
const uniqueFilename = `${timestamp}-${sanitizedName}`;
const filePath = path.join(uploadsDir, uniqueFilename);
    

    await writeFile(filePath, buffer);
return NextResponse.json({
  message: 'File uploaded successfully',
  filename: uniqueFilename,
  originalName: file.name,
  filePath: `uploads/${uniqueFilename}`, // No leading slash for Windows
  size: file.size,
  type: file.type
});

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}