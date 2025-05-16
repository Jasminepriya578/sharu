
"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Define TypeScript interfaces
interface Student {
  name: string;
  section: string;
  class: number;
  standard: string;
}

interface Subject {
  name: string;
  day: string;
  date: string;
}

// Object to store subjects by grade
interface SubjectsByGrade {
  [grade: string]: Subject[];
}

interface ExamSchedule {
  className: string;
  section: string;
  subjects: Subject[];
}

// Gene representation for GA
interface Chromosome {
  schedules: ExamSchedule[];
  fitness: number;
}

export default function GeneticTimetable() {
  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [generation, setGeneration] = useState<number>(0);
  const [bestFitness, setBestFitness] = useState<number>(0);
  
  // GA parameters
  const populationSize = 30;
  const maxGenerations = 50;
  const mutationRate = 0.2;
  const crossoverRate = 0.8;
  
  // List of standard subjects
  const standardSubjects = ["Mathematics", "Science", "Social Science", "Tamil", "English"];
  
  // Days of the week (excluding weekends)
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  // Function to handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setMessage("Processing file...");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get all sheet names
        const sheetNames = workbook.SheetNames;
        
        // Look for student data sheet - typically the first sheet
        const studentSheet = workbook.Sheets[sheetNames[0]];
        const studentData = XLSX.utils.sheet_to_json(studentSheet);
        
        // Map the Excel data to our Student interface
        const parsedStudents = studentData.map((row: any) => ({
          name: row['Student Name'] || row['A'] || '',
          section: row['Section'] || row['B'] || '',
          class: parseInt(row['Class'] || row['C'] || '0', 10),
          standard: row['Standard'] || row['D'] || '',
        }));
        
        // Filter out empty rows
        const validStudents = parsedStudents.filter(student => 
          student.name && student.section && student.standard
        );
        
        if (validStudents.length === 0) {
          setMessage("Error: No valid student data found. Please check your Excel format.");
          setLoading(false);
          return;
        }
        
        setStudents(validStudents);
        
        // Start the genetic algorithm process
        runGeneticAlgorithm(validStudents);
        
      } catch (error) {
        console.error("Error processing file:", error);
        setMessage("Error processing the file. Please check the format.");
        setLoading(false);
      }
    };
    
    reader.readAsArrayBuffer(file);
  };
  
  // Main genetic algorithm function
  const runGeneticAlgorithm = (studentData: Student[]) => {
    setMessage("Starting genetic algorithm optimization...");
    
    // Get unique class-section combinations
    const classSecMap = new Map<string, Set<string>>();
    
    studentData.forEach(student => {
      if (!classSecMap.has(student.standard)) {
        classSecMap.set(student.standard, new Set());
      }
      classSecMap.get(student.standard)?.add(student.section);
    });
    
    // Create initial population
    let population: Chromosome[] = [];
    for (let i = 0; i < populationSize; i++) {
      population.push(createRandomChromosome(classSecMap));
    }
    
    // Genetic algorithm main loop
    let currentGeneration = 0;
    
    const evolvePopulation = () => {
      if (currentGeneration >= maxGenerations) {
        // Find the best solution
        const bestSolution = population.reduce((prev, current) => 
          (current.fitness > prev.fitness) ? current : prev
        );
        
        setExamSchedules(bestSolution.schedules);
        setBestFitness(bestSolution.fitness);
        setMessage(`Genetic algorithm completed after ${maxGenerations} generations. Best fitness: ${bestSolution.fitness.toFixed(4)}`);
        setLoading(false);
        return;
      }
      
      // Evaluate fitness for current population
      population.forEach(chromosome => {
        chromosome.fitness = evaluateFitness(chromosome);
      });
      
      // Sort population by fitness (descending)
      population.sort((a, b) => b.fitness - a.fitness);
      
      // Store best fitness
      const bestFitness = population[0].fitness;
      setBestFitness(bestFitness);
      
      // Create new population
      const newPopulation: Chromosome[] = [];
      
      // Elitism - keep the best solutions
      const eliteCount = Math.max(1, Math.floor(populationSize * 0.1));
      for (let i = 0; i < eliteCount; i++) {
        newPopulation.push(deepCloneChromosome(population[i]));
      }
      
      // Create rest of the population through selection, crossover, and mutation
      while (newPopulation.length < populationSize) {
        // Selection - tournament selection
        const parent1 = tournamentSelection(population, 3);
        const parent2 = tournamentSelection(population, 3);
        
        // Crossover
        let offspring1, offspring2;
        
        if (Math.random() < crossoverRate) {
          [offspring1, offspring2] = crossover(parent1, parent2);
        } else {
          offspring1 = deepCloneChromosome(parent1);
          offspring2 = deepCloneChromosome(parent2);
        }
        
        // Mutation
        if (Math.random() < mutationRate) mutate(offspring1);
        if (Math.random() < mutationRate) mutate(offspring2);
        
        // Add to new population
        newPopulation.push(offspring1);
        if (newPopulation.length < populationSize) {
          newPopulation.push(offspring2);
        }
      }
      
      // Replace population
      population = newPopulation;
      
      // Update generation count
      currentGeneration++;
      setGeneration(currentGeneration);
      
      // Update message every 5 generations
      if (currentGeneration % 5 === 0) {
        setMessage(`Genetic algorithm progressing: Generation ${currentGeneration}/${maxGenerations}, Best fitness: ${bestFitness.toFixed(4)}`);
      }
      
      // Schedule next generation with small delay to avoid blocking UI
      setTimeout(evolvePopulation, 0);
    };
    
    // Start the evolution process
    evolvePopulation();
  };
  
  // Create a random chromosome (set of schedules)
  const createRandomChromosome = (classSecMap: Map<string, Set<string>>): Chromosome => {
    const schedules: ExamSchedule[] = [];
    
    classSecMap.forEach((sections, className) => {
      sections.forEach(section => {
        // Generate random subjects for this class-section
        const subjects = generateRandomSubjects(className, section);
        
        schedules.push({
          className,
          section,
          subjects
        });
      });
    });
    
    return {
      schedules,
      fitness: 0 // Will be calculated later
    };
  };
  
  // Generate random subjects for a class-section
  const generateRandomSubjects = (className: string, section: string): Subject[] => {
    // Shuffle the standard subjects
    const shuffledSubjects = [...standardSubjects];
    for (let i = shuffledSubjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSubjects[i], shuffledSubjects[j]] = [shuffledSubjects[j], shuffledSubjects[i]];
    }
    
    // Generate random start date (within next 30 days)
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + Math.floor(Math.random() * 10) + 1);
    
    // Choose a random pattern (0-4)
    const patternType = Math.floor(Math.random() * 5);
    
    // Generate schedule based on pattern
    return generateScheduleWithPattern(shuffledSubjects, startDate, patternType);
  };
  
  // Generate a schedule with a specific pattern
  const generateScheduleWithPattern = (subjects: string[], startDate: Date, patternType: number): Subject[] => {
    const result: Subject[] = [];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    switch (patternType) {
      case 0: // Consecutive days
        subjects.forEach((subject, idx) => {
          const examDate = new Date(startDate);
          examDate.setDate(startDate.getDate() + idx);
          
          // Skip weekends
          if (examDate.getDay() === 0) examDate.setDate(examDate.getDate() + 1); // Sunday to Monday
          if (examDate.getDay() === 6) examDate.setDate(examDate.getDate() + 2); // Saturday to Monday
          
          const dayOfWeek = days[examDate.getDay()];
          const dateStr = examDate.toISOString().split('T')[0];
          
          result.push({
            name: subject,
            day: dayOfWeek,
            date: dateStr
          });
        });
        break;
        
      case 1: // Alternate days (M, W, F)
        {
          const examDays = [1, 3, 5]; // Monday, Wednesday, Friday
          subjects.forEach((subject, idx) => {
            const examDate = new Date(startDate);
            const weekOffset = Math.floor(idx / examDays.length);
            examDate.setDate(startDate.getDate() + (weekOffset * 7) + examDays[idx % examDays.length] - startDate.getDay());
            
            const dayOfWeek = days[examDate.getDay()];
            const dateStr = examDate.toISOString().split('T')[0];
            
            result.push({
              name: subject,
              day: dayOfWeek,
              date: dateStr
            });
          });
        }
        break;
        
      case 2: // Same day each week
        subjects.forEach((subject, idx) => {
          const examDate = new Date(startDate);
          examDate.setDate(startDate.getDate() + (idx * 7)); // One week apart
          
          const dayOfWeek = days[examDate.getDay()];
          const dateStr = examDate.toISOString().split('T')[0];
          
          result.push({
            name: subject,
            day: dayOfWeek,
            date: dateStr
          });
        });
        break;
        
      case 3: // Mixed pattern (T, Th, next week M, W, F)
        {
          const examDays = [2, 4, 1, 3, 5]; // Tuesday, Thursday, next week Monday, Wednesday, Friday
          subjects.forEach((subject, idx) => {
            const examDate = new Date(startDate);
            const weekOffset = Math.floor(idx / 3); // After first two exams, move to next week
            let dayIdx = examDays[idx % examDays.length];
            
            examDate.setDate(startDate.getDate() + (weekOffset * 7) + dayIdx - startDate.getDay());
            
            const dayOfWeek = days[examDate.getDay()];
            const dateStr = examDate.toISOString().split('T')[0];
            
            result.push({
              name: subject,
              day: dayOfWeek,
              date: dateStr
            });
          });
        }
        break;
        
      case 4: // Every third day
        subjects.forEach((subject, idx) => {
          const examDate = new Date(startDate);
          examDate.setDate(startDate.getDate() + (idx * 3)); // Every third day
          
          // Skip weekends
          if (examDate.getDay() === 0) examDate.setDate(examDate.getDate() + 1);
          if (examDate.getDay() === 6) examDate.setDate(examDate.getDate() + 2);
          
          const dayOfWeek = days[examDate.getDay()];
          const dateStr = examDate.toISOString().split('T')[0];
          
          result.push({
            name: subject,
            day: dayOfWeek,
            date: dateStr
          });
        });
        break;
    }
    
    return result;
  };
  
  // Deep clone a chromosome to avoid reference issues
  const deepCloneChromosome = (chromosome: Chromosome): Chromosome => {
    return {
      schedules: chromosome.schedules.map(schedule => ({
        className: schedule.className,
        section: schedule.section,
        subjects: schedule.subjects.map(subj => ({
          name: subj.name,
          day: subj.day,
          date: subj.date
        }))
      })),
      fitness: chromosome.fitness
    };
  };
  
  // Evaluate fitness of a chromosome
  const evaluateFitness = (chromosome: Chromosome): number => {
    let fitness = 1.0; // Start with perfect fitness
    const penalties = calculatePenalties(chromosome);
    
    // Apply penalties to fitness (higher penalties = lower fitness)
    return fitness / (1 + penalties);
  };
  
  // Calculate penalties for constraint violations
  const calculatePenalties = (chromosome: Chromosome): number => {
    let totalPenalty = 0;
    
    // Track exams by date for each class
    const examsByDate: Record<string, Set<string>> = {};
    
    // Track class-section uniqueness
    const uniquenessMap: Record<string, Record<string, number>> = {};
    
    // Process each schedule
    chromosome.schedules.forEach(schedule => {
      const classSection = `${schedule.className}-${schedule.section}`;
      
      // Initialize uniqueness tracking for this class-section
      if (!uniquenessMap[classSection]) {
        uniquenessMap[classSection] = {};
      }
      
      // Check for exams on the same day
      schedule.subjects.forEach(subject => {
        // Track exams by date
        if (!examsByDate[subject.date]) {
          examsByDate[subject.date] = new Set();
        }
        examsByDate[subject.date].add(`${classSection}-${subject.name}`);
        
        // Track pattern uniqueness by recording day-of-week frequency
        const dayKey = subject.day;
        uniquenessMap[classSection][dayKey] = (uniquenessMap[classSection][dayKey] || 0) + 1;
      });
      
      // Check for consecutive exam days
      for (let i = 1; i < schedule.subjects.length; i++) {
        const prevDate = new Date(schedule.subjects[i-1].date);
        const currDate = new Date(schedule.subjects[i].date);
        
        // Calculate days between exams
        const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Penalty for consecutive exam days
        if (diffDays === 1) {
          totalPenalty += 0.05; // Small penalty for consecutive days
        }
      }
    });
    
    // Compare each schedule with every other schedule to check uniqueness
    const schedules = chromosome.schedules;
    for (let i = 0; i < schedules.length; i++) {
      for (let j = i + 1; j < schedules.length; j++) {
        // We want schedules from same class to be different
        if (schedules[i].className === schedules[j].className) {
          const similarity = calculateScheduleSimilarity(schedules[i], schedules[j]);
          totalPenalty += similarity * 0.2; // Penalty based on similarity
        }
      }
    }
    
    // Check for room/time conflicts
    for (const date in examsByDate) {
      // If too many exams on the same day, add penalty
      if (examsByDate[date].size > 8) { // Assuming limit of 8 exams per day
        totalPenalty += 0.1 * (examsByDate[date].size - 8);
      }
    }
    
    return totalPenalty;
  };
  
  // Calculate similarity between two schedules (0 = completely different, 1 = identical)
  const calculateScheduleSimilarity = (schedule1: ExamSchedule, schedule2: ExamSchedule): number => {
    let sameDay = 0;
    let sameSubject = 0;
    
    for (let i = 0; i < schedule1.subjects.length; i++) {
      for (let j = 0; j < schedule2.subjects.length; j++) {
        if (schedule1.subjects[i].name === schedule2.subjects[j].name) {
          sameSubject++;
          if (schedule1.subjects[i].day === schedule2.subjects[j].day) {
            sameDay++;
          }
        }
      }
    }
    
    // Calculate similarity ratio
    const maxSubjects = Math.max(schedule1.subjects.length, schedule2.subjects.length);
    return (sameDay / maxSubjects) * 0.7 + (sameSubject / maxSubjects) * 0.3;
  };
  
  // Tournament selection
  const tournamentSelection = (population: Chromosome[], tournamentSize: number): Chromosome => {
    let tournament: Chromosome[] = [];
    
    // Select random chromosomes for the tournament
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      tournament.push(population[randomIndex]);
    }
    
    // Return the fittest chromosome from the tournament
    return tournament.reduce((prev, current) => 
      (current.fitness > prev.fitness) ? current : prev
    );
  };
 

  const crossover = (parent1: Chromosome, parent2: Chromosome): [Chromosome, Chromosome] => {
    // Deep clone parents to create offspring
    const offspring1 = deepCloneChromosome(parent1);
    const offspring2 = deepCloneChromosome(parent2);
    
    // Get random crossover point based on the number of schedules
    const crossoverPoint = Math.floor(Math.random() * parent1.schedules.length);
    
    // Perform crossover for schedules
    for (let i = crossoverPoint; i < parent1.schedules.length; i++) {
      // Swap subject order between offspring
      if (offspring1.schedules[i] && offspring2.schedules[i]) {
        // For simplicity, we'll just swap the ordering of subjects
        const temp = [...offspring1.schedules[i].subjects];
        offspring1.schedules[i].subjects = [...offspring2.schedules[i].subjects];
        offspring2.schedules[i].subjects = temp;
      }
    }
    
    // Initialize fitness to 0 (will be calculated later)
    offspring1.fitness = 0;
    offspring2.fitness = 0;
    
    return [offspring1, offspring2];
  };
  
  // Mutate a chromosome
  const mutate = (chromosome: Chromosome): void => {
    // Select random schedule to mutate
    const scheduleIndex = Math.floor(Math.random() * chromosome.schedules.length);
    const schedule = chromosome.schedules[scheduleIndex];
    
    // Apply one of several mutation types
    const mutationType = Math.floor(Math.random() * 3);
    
    switch (mutationType) {
      case 0: // Shuffle subjects
        for (let i = schedule.subjects.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [schedule.subjects[i], schedule.subjects[j]] = [schedule.subjects[j], schedule.subjects[i]];
        }
        break;
        
      case 1: // Change exam pattern
        const startDate = new Date(schedule.subjects[0].date);
        const patternType = Math.floor(Math.random() * 5);
        
        // Get subject names from current schedule
        const subjectNames = schedule.subjects.map(s => s.name);
        
        // Generate new schedule with different pattern
        schedule.subjects = generateScheduleWithPattern(subjectNames, startDate, patternType);
        break;
        
      case 2: // Shift dates
        const shiftDays = Math.floor(Math.random() * 7) - 3; // -3 to +3 days
        
        schedule.subjects = schedule.subjects.map(subject => {
          const examDate = new Date(subject.date);
          examDate.setDate(examDate.getDate() + shiftDays);
          
          // Skip weekends
          if (examDate.getDay() === 0) examDate.setDate(examDate.getDate() + 1);
          if (examDate.getDay() === 6) examDate.setDate(examDate.getDate() + 2);
          
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const dayOfWeek = days[examDate.getDay()];
          const dateStr = examDate.toISOString().split('T')[0];
          
          return {
            name: subject.name,
            day: dayOfWeek,
            date: dateStr
          };
        });
        break;
    }
  };
  
  // Function to export all schedules to Excel files
  const exportAllTimetables = () => {
    if (examSchedules.length === 0) {
      setMessage("No exam schedules to export. Please upload student data first.");
      return;
    }
    
    setLoading(true);
    setMessage("Generating Excel files...");
    
    try {
      // Export each schedule as a separate Excel file
      examSchedules.forEach(schedule => {
        createExcelFile(schedule);
      });
      
      setMessage(`Successfully generated ${examSchedules.length} exam timetables.`);
    } catch (error) {
      console.error("Error exporting files:", error);
      setMessage("An error occurred while generating the timetables.");
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to create and download a single Excel file
  const createExcelFile = (schedule: ExamSchedule) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Format the data for Excel
    const examData = [
      ["Class Name", schedule.className],
      ["Section", schedule.section],
      ["", "", ""],
      ["Subject Name", "Day", "Date"]
    ];
    
    // Add subject data
    schedule.subjects.forEach(subject => {
      examData.push([subject.name, subject.day, subject.date]);
    });
    
    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(examData);
    
    // Add some styling (optional)
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:D5');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: 3, c: C }); // Header row
      if (!ws[cellRef]) continue;
      ws[cellRef].s = { font: { bold: true } };
    }
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, `${schedule.className}-${schedule.section}`);
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `ExamTimetable-${schedule.className}-Section${schedule.section}.xlsx`);
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Genetic Algorithm Exam Timetable Generator</h1>
      
      {/* File Upload Section */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Upload Student Data</h2>
        <input 
          type="file" 
          accept=".xlsx,.xls,.csv" 
          onChange={handleFileUpload}
          disabled={loading}
          className="block w-full mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="text-sm text-gray-600 mb-2">
          Upload an Excel file containing student data (name, section, class, standard).
        </p>
        <p className="text-sm text-gray-600 mb-4">
          The genetic algorithm will create unique timetables for each class-section.
        </p>
        
        {loading && (
          <div className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-700">
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div>
                <p className="font-medium">Processing Generation {generation}/{maxGenerations}</p>
                <p className="text-sm">Best Fitness: {bestFitness.toFixed(4)}</p>
              </div>
            </div>
          </div>
        )}
        
        {message && !loading && (
          <div className={`mt-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}
      </div>
      
      {/* Genetic Algorithm Information */}
      <div className="mb-8 p-6 border rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Genetic Algorithm Method</h2>
        <p className="text-blue-700 mb-3">
          This timetable generator uses genetic algorithms to create optimal exam schedules:
        </p>
        <ul className="list-disc list-inside text-blue-700 mb-4 pl-4">
          <li>Population Size: {populationSize} chromosomes</li>
          <li>Generations: {maxGenerations}</li>
          <li>Crossover Rate: {crossoverRate * 100}%</li>
          <li>Mutation Rate: {mutationRate * 100}%</li>
          <li>Each chromosome represents a complete set of class-section timetables</li>
          <li>The fitness function prioritizes unique schedules for each class-section</li>
        </ul>
      </div>
      
      {/* Export Button */}
      {examSchedules.length > 0 && (
        <div className="mb-8">
          <button 
            onClick={exportAllTimetables}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium ${
              loading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Processing...' : 'Export All Timetables'}
          </button>
        </div>
      )}
      
      {/* Generated Timetables Display */}
      {examSchedules.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Generated Timetables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examSchedules.map((schedule, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-100 p-4">
                  <h3 className="text-lg font-bold">{schedule.className}</h3>
                  <h4 className="text-md">Section {schedule.section}</h4>
                </div>
                
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left text-sm font-medium">Subject</th>
                      <th className="p-2 text-left text-sm font-medium">Day</th>
                      <th className="p-2 text-left text-sm font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {schedule.subjects.length > 0 ? (
                      schedule.subjects.map((subject, sIdx) => (
                        <tr key={sIdx} className="text-sm">
                          <td className="p-2">{subject.name}</td>
                          <td className="p-2">{subject.day}</td>
                          <td className="p-2">{subject.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-3 text-center text-gray-500">
                          No subject data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {examSchedules.length > 0 && (
  <div className="mb-8">
    <button 
      onClick={exportAllTimetables}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-medium ${
        loading 
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
          : 'bg-green-600 text-white hover:bg-green-700'
      }`}
    >
      {loading ? 'Processing...' : 'Export All Timetables'}
    </button>
    
  <Link href="/master/components/Examination/HallTickets">
  <button className="ml-4 px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700">
    Generate Hall Tickets
  </button>
</Link>
  </div>
)}


    </div>
  );
}
