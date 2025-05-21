import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

export interface ExtractedText {
  text: string;
  pages: number;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
}

export class PDFService {
  /**
   * Extract text from a PDF file
   * @param filePath Path to the PDF file
   * @returns Extracted text and metadata
   */
  static async extractText(filePath: string): Promise<ExtractedText> {
    try {
      // Read the PDF file
      const dataBuffer = await fs.readFile(filePath);
      
      // Parse the PDF
      const data = await pdfParse(dataBuffer);
      
      // Extract metadata from the PDF info
      const metadata: ExtractedText['metadata'] = {};
      
      if (data.info) {
        metadata.title = data.info.Title || undefined;
        metadata.author = data.info.Author || undefined;
        metadata.subject = data.info.Subject || undefined;
        metadata.keywords = data.info.Keywords || undefined;
        
        // Convert PDF dates if present
        if (data.info.CreationDate) {
          metadata.creationDate = this.parsePDFDate(data.info.CreationDate);
        }
        
        if (data.info.ModDate) {
          metadata.modificationDate = this.parsePDFDate(data.info.ModDate);
        }
      }
      
      return {
        text: data.text,
        pages: data.numpages,
        metadata
      };
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }
  
  /**
   * Clean and preprocess the extracted text
   * @param text Raw text extracted from PDF
   * @returns Preprocessed text
   */
  static preprocessText(text: string): string {
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove excessive line breaks
      .replace(/\n{3,}/g, '\n\n')
      // Trim
      .trim();
  }
  
  /**
   * Split text into paragraphs
   * @param text Preprocessed text
   * @returns Array of paragraphs
   */
  static splitIntoParagraphs(text: string): string[] {
    return text
      .split(/\n{2,}/)
      .filter(paragraph => paragraph.trim().length > 0);
  }
  
  /**
   * Split text into sentences
   * @param text Preprocessed text
   * @returns Array of sentences
   */
  static splitIntoSentences(text: string): string[] {
    // This is a simplified sentence splitter
    // For production, consider using a more robust NLP library like 'natural' or 'compromise'
    return text
      .replace(/([.!?])\s+/g, '$1|')
      .split('|')
      .filter(sentence => sentence.trim().length > 0);
  }
  
  /**
   * Parse PDF date format (e.g., "D:20230101120000+00'00'")
   * @param pdfDate Date string from PDF
   * @returns JavaScript Date object
   */
  private static parsePDFDate(pdfDate: string): Date | undefined {
    if (!pdfDate || typeof pdfDate !== 'string') {
      return undefined;
    }
    
    // Remove the 'D:' prefix if present
    let dateStr = pdfDate.startsWith('D:') ? pdfDate.substring(2) : pdfDate;
    
    try {
      // Try to extract year, month, day, etc.
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1; // JS months are 0-based
      const day = parseInt(dateStr.substring(6, 8));
      
      // Check if time components are present
      let hours = 0, minutes = 0, seconds = 0;
      if (dateStr.length >= 14) {
        hours = parseInt(dateStr.substring(8, 10));
        minutes = parseInt(dateStr.substring(10, 12));
        seconds = parseInt(dateStr.substring(12, 14));
      }
      
      // Create and return date
      return new Date(year, month, day, hours, minutes, seconds);
    } catch (error) {
      console.error('Error parsing PDF date:', error);
      return undefined;
    }
  }
}