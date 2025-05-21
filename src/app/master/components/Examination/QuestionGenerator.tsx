import React, { useState } from 'react';
import PDFUpload, { FileData } from './PDFUpload';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  options?: string[];
  correctAnswer?: string | string[];
}

const QuestionGenerator: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<FileData | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [settings, setSettings] = useState({
    questionTypes: ['multiple-choice', 'true-false', 'short-answer', 'essay'],
    difficultyLevels: ['easy', 'medium', 'hard'],
    numberOfQuestions: 10,
  });

 const handleFileUpload = async (fileData: FileData) => {
  setUploadedFile(fileData);
  setProcessingStatus('processing');
  
  try {
    console.log("Starting PDF text extraction process...");
    
    // Create FormData object
    const formData = new FormData();
    formData.append('file', fileData.file);
    
    console.log('Uploading file:', fileData.file.name);
    
    // First, upload the file
    const uploadResponse = await fetch('/api/upload-pdf', {
      method: 'POST',
      body: formData,
    });
    
    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file');
    }
    
    const uploadData = await uploadResponse.json();
    console.log('Upload successful, response data:', uploadData);
    
    // IMPORTANT: Get the saved file path from the upload response
    const savedFilePath = uploadData.filePath;
    console.log("Saved file path returned from server:", savedFilePath);
    
    // Now extract text using the actual saved path
    const extractResponse = await fetch('/api/extract-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath: savedFilePath }),
    });
    
    console.log("Text extraction response status:", extractResponse.status);
    
    const responseText = await extractResponse.text();
    console.log("Raw response:", responseText.substring(0, 200));
    
    let extractedData;
    try {
      extractedData = JSON.parse(responseText);
    } catch (error) {
      console.error("Error parsing response:", error);
      throw new Error('Invalid response from server');
    }
    
    if (!extractResponse.ok) {
      console.error("Error details:", extractedData);
      throw new Error(extractedData.error || 'Failed to extract text from PDF');
    }
    
    console.log('Text extraction successful:', extractedData);
    
    setProcessingStatus('success');
  } catch (error) {
    console.error('Processing error:', error);
    setProcessingStatus('error');
  }
};

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const { checked } = checkbox;
      
      if (name === 'questionType') {
        setSettings(prev => {
          const questionTypes = checked 
            ? [...prev.questionTypes, value]
            : prev.questionTypes.filter(type => type !== value);
          
          return { ...prev, questionTypes };
        });
      } else if (name === 'difficultyLevel') {
        setSettings(prev => {
          const difficultyLevels = checked 
            ? [...prev.difficultyLevels, value] 
            : prev.difficultyLevels.filter(level => level !== value);
          
          return { ...prev, difficultyLevels };
        });
      }
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: name === 'numberOfQuestions' ? parseInt(value) : value,
      }));
    }
  };

  const generateQuestions = async () => {
    if (!uploadedFile) return;
    
    setProcessingStatus('processing');
    
    try {
      // Call the question generation API with the file path and settings
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          filePath: `/uploads/${uploadedFile.file.name}`, // This path should match your server-side storage path
          settings 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }
      
      const data = await response.json();
      console.log('Generated questions data:', data);
      
      // Update questions state with the generated questions
      setQuestions(data.questions);
      setProcessingStatus('success');
    } catch (error) {
      console.error('Generation error:', error);
      setProcessingStatus('error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Question Paper Generator</h1>
      
      {!uploadedFile && (
        <PDFUpload 
          onFileUpload={handleFileUpload}
          title="Upload Study Material"
          description="Upload a PDF document to generate questions based on its content"
        />
      )}

      {processingStatus === 'processing' && (
        <div className="my-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-600">Processing your PDF...</p>
        </div>
      )}

      {processingStatus === 'success' && uploadedFile && (
        <div className="mt-6">
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Document Processed!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>File "{uploadedFile.file.name}" has been processed successfully.</p>
                  <p className="mt-1">Configure question settings below.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Question Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Types</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="multiple-choice"
                      name="questionType"
                      value="multiple-choice"
                      checked={settings.questionTypes.includes('multiple-choice')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="multiple-choice" className="ml-2 text-sm text-gray-700">Multiple Choice</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="true-false"
                      name="questionType"
                      value="true-false"
                      checked={settings.questionTypes.includes('true-false')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="true-false" className="ml-2 text-sm text-gray-700">True/False</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="short-answer"
                      name="questionType"
                      value="short-answer"
                      checked={settings.questionTypes.includes('short-answer')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="short-answer" className="ml-2 text-sm text-gray-700">Short Answer</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="essay"
                      name="questionType"
                      value="essay"
                      checked={settings.questionTypes.includes('essay')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="essay" className="ml-2 text-sm text-gray-700">Essay</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Levels</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="easy"
                      name="difficultyLevel"
                      value="easy"
                      checked={settings.difficultyLevels.includes('easy')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="easy" className="ml-2 text-sm text-gray-700">Easy</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medium"
                      name="difficultyLevel"
                      value="medium"
                      checked={settings.difficultyLevels.includes('medium')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="medium" className="ml-2 text-sm text-gray-700">Medium</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hard"
                      name="difficultyLevel"
                      value="hard"
                      checked={settings.difficultyLevels.includes('hard')}
                      onChange={handleSettingsChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hard" className="ml-2 text-sm text-gray-700">Hard</label>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <input
                  type="number"
                  id="numberOfQuestions"
                  name="numberOfQuestions"
                  value={settings.numberOfQuestions}
                  onChange={handleSettingsChange}
                  min="1"
                  max="50"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={generateQuestions}
              >
                Generate Questions
              </button>
            </div>
          </div>
          
          {questions.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Generated Questions</h2>
              
              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 border rounded-md">
                    <div className="flex justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {question.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {question.difficulty} • {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-900">{question.text}</p>
                    
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="mt-3 space-y-2">
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              id={`q${question.id}-option${index}`}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              defaultChecked={option === question.correctAnswer}
                              disabled
                            />
                            <label htmlFor={`q${question.id}-option${index}`} className="ml-2 text-sm text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'true-false' && (
                      <div className="mt-3 space-x-4 flex">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            id={`q${question.id}-true`}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            defaultChecked={question.correctAnswer === 'True'}
                            disabled
                          />
                          <label htmlFor={`q${question.id}-true`} className="ml-2 text-sm text-gray-700">True</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            id={`q${question.id}-false`}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            defaultChecked={question.correctAnswer === 'False'}
                            disabled
                          />
                          <label htmlFor={`q${question.id}-false`} className="ml-2 text-sm text-gray-700">False</label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Export as PDF
                </button>
                <button
                  type="button"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Question Paper
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {processingStatus === 'error' && (
        <div className="mt-6 bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">An error occurred</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>There was an error processing your file. Please try again.</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => {
                    setUploadedFile(null);
                    setProcessingStatus('idle');
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionGenerator;