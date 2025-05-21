import React, { useState, useRef } from 'react';

interface PDFUploadProps {
  onFileUpload: (fileData: FileData) => void;
  title?: string;
  description?: string;
}

export interface FileData {
  file: File;
  preview?: string;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ 
  onFileUpload, 
  title = "Upload Question Document", 
  description = "Upload a PDF document to generate questions" 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFileTypes = ['application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  // Define the handleDragOver function
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    setError('');
    
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const selectedFile = selectedFiles[0];
    
    // Validate file type
    if (!allowedFileTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF file only');
      return;
    }
    
    // Validate file size
    if (selectedFile.size > maxFileSize) {
      setError('File size should be less than 10MB');
      return;
    }
    
    // Set the file
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;
    
    const droppedFile = droppedFiles[0];
    
    if (!allowedFileTypes.includes(droppedFile.type)) {
      setError('Please upload a PDF file only');
      return;
    }
    
    if (droppedFile.size > maxFileSize) {
      setError('File size should be less than 10MB');
      return;
    }
    
    setFile(droppedFile);
  };
// In PDFUpload.tsx, update the handleUpload function:
const handleUpload = async () => {
  if (!file) {
    setError('Please select a file first');
    return;
  }

  setIsLoading(true);
  
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append('file', file);
    
    // Make API request to your backend
    const response = await fetch('/api/upload-pdf', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload file');
    }
    
    const data = await response.json();
    console.log('Upload successful, response data:', data);
    
    // Pass the complete file data to parent component
    onFileUpload({ 
      file, 
      filePath: data.filePath 
    });
  } catch (err) {
    console.error('Upload error:', err);
    setError(err.message || 'An error occurred during upload');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${error ? 'border-red-500' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
        
        {!file ? (
          <div>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop a PDF file here, or{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 focus:outline-none"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="mt-1 text-xs text-gray-500">PDF files only, max 10MB</p>
          </div>
        ) : (
          <div>
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="mt-2 text-sm font-medium text-gray-900">{file.name}</p>
            <p className="mt-1 text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              type="button"
              className="mt-2 text-xs text-red-600 hover:text-red-500"
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              Remove
            </button>
          </div>
        )}
        
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      <button
        type="button"
        className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading || !file
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={isLoading || !file}
        onClick={handleUpload}
      >
        {isLoading ? 'Uploading...' : 'Upload PDF'}
      </button>
    </div>
  );
};

export default PDFUpload;