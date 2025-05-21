// src/app/api/generate-questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    console.log("Generate-questions API endpoint hit");
    
    // Parse request body
    const body = await request.json();
    const { filePath, settings } = body;
    
    console.log("Request data:", { filePath, settings });

    if (!filePath) {
      return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
    }

    if (!settings) {
      return NextResponse.json({ error: 'No question settings provided' }, { status: 400 });
    }

    // Generate mock questions directly in this endpoint
    const { questionTypes, difficultyLevels, numberOfQuestions } = settings;
    
    // Generate mock questions
    const questions = [];
    
    for (let i = 0; i < numberOfQuestions; i++) {
      // Select random type and difficulty
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const difficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
      
      // Determine marks based on difficulty
      let marks = 1;
      if (difficulty === 'medium') marks = 2;
      if (difficulty === 'hard') marks = 3;
      if (type === 'essay') marks += 2;
      
      // Create question
      const question = {
        id: `q${i+1}`,
        text: getMockQuestionText(type),
        type,
        difficulty,
        marks
      };
      
      // Add options for multiple-choice questions
      if (type === 'multiple-choice') {
        question.options = [
          'This is the correct answer',
          'This is a distractor',
          'This is another distractor',
          'This is the final distractor'
        ];
        question.correctAnswer = 'This is the correct answer';
      }
      
      // Add answer for true/false questions
      if (type === 'true-false') {
        question.correctAnswer = Math.random() > 0.5 ? 'True' : 'False';
      }
      
      questions.push(question);
    }
    
    return NextResponse.json({
      message: 'Questions generated successfully',
      questions,
      metadata: {
        questionCount: questions.length
      }
    });
  } catch (error) {
    console.error('Generate questions error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate questions', 
      details: error.message 
    }, { status: 500 });
  }
}

// Helper function to get mock question text
function getMockQuestionText(type) {
  const multipleChoiceQuestions = [
    "What is the main purpose of this document?",
    "Which concept is most emphasized in the text?",
    "What is the primary focus of the passage?",
    "Which of the following best describes the content?"
  ];
  
  const trueFalseQuestions = [
    "The document primarily focuses on technical aspects.",
    "The main argument is supported by statistical evidence.",
    "The content is structured in a logical sequence.",
    "The author presents a balanced perspective on the topic."
  ];
  
  const shortAnswerQuestions = [
    "Briefly explain the key concept presented in the document.",
    "Summarize the main argument in your own words.",
    "What evidence supports the central claim?",
    "Identify the primary stakeholders mentioned in the text."
  ];
  
  const essayQuestions = [
    "Analyze the main arguments presented in the document and evaluate their effectiveness.",
    "Compare and contrast the different perspectives discussed in the text.",
    "Discuss the implications of the findings for the broader field.",
    "Critically assess the methodology used and suggest improvements."
  ];
  
  // Select a random question based on type
  switch (type) {
    case 'multiple-choice':
      return multipleChoiceQuestions[Math.floor(Math.random() * multipleChoiceQuestions.length)];
    case 'true-false':
      return trueFalseQuestions[Math.floor(Math.random() * trueFalseQuestions.length)];
    case 'short-answer':
      return shortAnswerQuestions[Math.floor(Math.random() * shortAnswerQuestions.length)];
    case 'essay':
      return essayQuestions[Math.floor(Math.random() * essayQuestions.length)];
    default:
      return "Question text goes here";
  }
}