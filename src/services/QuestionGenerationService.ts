export interface QuestionSettings {
  questionTypes: string[];
  difficultyLevels: string[];
  numberOfQuestions: number;
}

export interface GeneratedQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  options?: string[];
  correctAnswer?: string | string[];
}

export class QuestionGenerationService {
  /**
   * Generate questions from text using AI
   * @param text The preprocessed text from the PDF
   * @param settings Settings for question generation
   * @returns Array of generated questions
   */
  static async generateQuestions(text: string, settings: QuestionSettings): Promise<GeneratedQuestion[]> {
    try {
      // In a real implementation, you would:
      // 1. Call an AI model API (like OpenAI, Azure OpenAI, T5, BART, etc.)
      // 2. Pass the text and generate questions
      // 3. Parse the response and format questions
      
      // For demonstration, we'll return mock data
      // This would be replaced with actual API calls
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock questions generation - in real implementation this would come from AI
      const questions: GeneratedQuestion[] = [];
      
      // Generate requested number of questions
      for (let i = 0; i < settings.numberOfQuestions; i++) {
        // Select random type and difficulty from user settings
        const type = settings.questionTypes[Math.floor(Math.random() * settings.questionTypes.length)] as 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
        const difficulty = settings.difficultyLevels[Math.floor(Math.random() * settings.difficultyLevels.length)] as 'easy' | 'medium' | 'hard';
        
        // Generate question based on type
        const question = this.createMockQuestion(i.toString(), type, difficulty);
        questions.push(question);
      }
      
      return questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      throw new Error('Failed to generate questions');
    }
  }
  
  /**
   * Calculate question difficulty based on heuristics
   * @param sentence The sentence to analyze
   * @returns Difficulty level
   */
  static calculateDifficulty(sentence: string): 'easy' | 'medium' | 'hard' {
    // This is a simplified heuristic - in a real implementation, you would use NLP techniques
    
    // Words per sentence - longer sentences tend to be more complex
    const wordCount = sentence.split(/\s+/).length;
    
    // Count "complex" words (> 3 syllables) - a simplified approach
    const complexWordCount = sentence.split(/\s+/).filter(word => {
      // Crude syllable estimation - count vowel groups
      const vowelGroups = word.toLowerCase().match(/[aeiouy]+/g);
      return vowelGroups && vowelGroups.length > 3;
    }).length;
    
    // Calculate a simple complexity score
    const complexity = (wordCount * 0.5) + (complexWordCount * 3);
    
    // Determine difficulty based on complexity score
    if (complexity < 10) return 'easy';
    if (complexity < 20) return 'medium';
    return 'hard';
  }
  
  /**
   * Create a mock question (for demonstration)
   */
  private static createMockQuestion(
    id: string, 
    type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay',
    difficulty: 'easy' | 'medium' | 'hard'
  ): GeneratedQuestion {
    // Mock questions based on type
    const commonQuestions = [
      "What is the primary purpose of the document?",
      "What is the main argument presented in the text?",
      "Which concept is most emphasized in the passage?",
      "What evidence supports the main thesis?",
      "How does the author structure their argument?",
      "What are the implications of the findings?",
      "How does this relate to the broader field?",
      "What methodologies were employed in the research?",
      "What are the limitations discussed?",
      "How might these concepts be applied in practice?"
    ];
    
    // Select a random question from our pool
    const questionText = commonQuestions[Math.floor(Math.random() * commonQuestions.length)];
    
    // Determine mark value based on difficulty and type
    let marks = 1;
    if (difficulty === 'medium') marks = 2;
    if (difficulty === 'hard') marks = 3;
    if (type === 'essay') marks += 2;
    
    // Create base question
    const question: GeneratedQuestion = {
      id,
      text: questionText,
      type,
      difficulty,
      marks
    };
    
    // Add type-specific properties
    if (type === 'multiple-choice') {
      question.options = [
        'This is the correct answer',
        'This is a distractor',
        'This is another distractor',
        'This is a final distractor'
      ];
      question.correctAnswer = 'This is the correct answer';
    } else if (type === 'true-false') {
      question.correctAnswer = Math.random() > 0.5 ? 'True' : 'False';
    } else if (type === 'short-answer') {
      question.correctAnswer = 'Sample answer key';
    }
    
    return question;
  }
}