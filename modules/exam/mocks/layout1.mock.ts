import { LayoutId, type Exam } from '../types'

/**
 * Mock Exam: Layout 1 - Single Question
 * 
 * Represents a linear exam with sidebar question navigation.
 * Similar to: TOEIC, JLPT, HSK
 */
export const LAYOUT1_MOCK_EXAM: Exam = {
  id: 'exam_layout1_001',
  title: 'TOEIC Practice Test',
  description: 'English for International Communication',
  type: 'TOEIC',
  totalDuration: 120, // minutes
  layout: {
    id: LayoutId.SINGLE_QUESTION,
    name: 'Single Question Layout',
    description: 'One question at a time with sidebar navigation',
  },
  sections: [
    {
      id: 'section_1',
      title: 'Listening - Part 1 (Photos)',
      description: 'Look at each photo and listen to the description',
      instructions: 'Choose the sentence that best describes what you see in the picture.',
      duration: 20,
      blocks: [
        {
          id: 'block_1',
          title: 'Photos 1-5',
          description: 'First set of photos',
          questions: [
            {
              id: 'q1',
              type: 'mcq' as const,
              title: 'Photo 1',
              content: 'What is the woman doing?',
              choices: [
                { id: 'a', label: '(A) She is sitting at a table', value: 'a' },
                { id: 'b', label: '(B) She is standing near a window', value: 'b' },
                { id: 'c', label: '(C) She is walking down the street', value: 'c' },
                { id: 'd', label: '(D) She is riding a bicycle', value: 'd' },
              ],
            },
            {
              id: 'q2',
              type: 'mcq',
              title: 'Photo 2',
              content: 'Where are the people?',
              choices: [
                { id: 'a', label: '(A) In an office', value: 'a' },
                { id: 'b', label: '(B) In a restaurant', value: 'b' },
                { id: 'c', label: '(C) In a library', value: 'c' },
                { id: 'd', label: '(D) In a store', value: 'd' },
              ],
            },
            {
              id: 'q3',
              type: 'mcq',
              title: 'Photo 3',
              content: 'What is being transported?',
              choices: [
                { id: 'a', label: '(A) Books', value: 'a' },
                { id: 'b', label: '(B) Furniture', value: 'b' },
                { id: 'c', label: '(C) Food', value: 'c' },
                { id: 'd', label: '(D) Computers', value: 'd' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section_2',
      title: 'Reading - Part 5 (Incomplete Sentences)',
      description: 'Complete each sentence with the correct word',
      instructions: 'Choose the best word or phrase to complete the sentence.',
      duration: 15,
      blocks: [
        {
          id: 'block_2',
          title: 'Completion Questions',
          description: 'Fill in the missing words',
          questions: [
            {
              id: 'q4',
              type: 'completion' as const,
              title: 'Question 4',
              content: 'The manager will _____ the new project next week.',
              placeholder: 'enter the correct word',
            },
            {
              id: 'q5',
              type: 'completion' as const,
              title: 'Question 5',
              content: 'Our company has been _____ in the technology sector for over 20 years.',
              placeholder: 'enter the correct word',
            },
            {
              id: 'q6',
              type: 'multi-select' as const,
              title: 'Question 6',
              content: 'Which of the following are requirements for the job?',
              choices: [
                { id: 'a', label: 'Experience with Python', value: 'a' },
                { id: 'b', label: 'Bachelor&apos;s degree in Computer Science', value: 'b' },
                { id: 'c', label: 'Knowledge of Japanese', value: 'c' },
                { id: 'd', label: 'At least 5 years of work experience', value: 'd' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
