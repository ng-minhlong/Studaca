import { LayoutId, type Exam } from '../types'

/**
 * Mock Exam: Layout 3 - Listening
 * 
 * Audio player + questions below.
 * Similar to: IELTS Listening, TOEFL Listening, TOEIC Listening
 */
export const LAYOUT3_MOCK_EXAM: Exam = {
  id: 'exam_layout3_001',
  title: 'IELTS Listening Practice',
  description: 'Academic Module - Listening Comprehension',
  type: 'IELTS',
  totalDuration: 30,
  layout: {
    id: LayoutId.LISTENING,
    name: 'Listening Layout',
    description: 'Audio player with question area below',
  },
  sections: [
    {
      id: 'section_1',
      title: 'Section 1 - Conversation',
      description: 'Listen to a conversation between two people',
      instructions:
        'You will hear a conversation. Listen carefully and answer the questions. You will hear the recording twice.',
      duration: 15,
      blocks: [
        {
          id: 'block_1',
          title: 'Questions 1-5',
          description: 'Conversations about accommodation',
          questions: [
            {
              id: 'q1',
              type: 'completion',
              title: 'Question 1',
              content: 'The caller is looking for accommodation starting from _____.',
              placeholder: 'e.g., date',
            },
            {
              id: 'q2',
              type: 'mcq',
              title: 'Question 2',
              content: 'How many bedrooms does the caller need?',
              choices: [
                { id: 'a', label: 'One', value: 'a' },
                { id: 'b', label: 'Two', value: 'b' },
                { id: 'c', label: 'Three', value: 'c' },
                { id: 'd', label: 'Four', value: 'd' },
              ],
            },
            {
              id: 'q3',
              type: 'completion',
              title: 'Question 3',
              content: 'The monthly rent will be £_____.',
              placeholder: 'enter the amount',
            },
            {
              id: 'q4',
              type: 'multi-select',
              title: 'Question 4',
              content: 'Which of the following are included in the rent?',
              choices: [
                { id: 'a', label: 'Electricity', value: 'a' },
                { id: 'b', label: 'Water', value: 'b' },
                { id: 'c', label: 'Internet', value: 'c' },
                { id: 'd', label: 'Gas', value: 'd' },
              ],
            },
            {
              id: 'q5',
              type: 'mcq',
              title: 'Question 5',
              content: 'When is the earliest the caller can view the property?',
              choices: [
                { id: 'a', label: 'Tomorrow morning', value: 'a' },
                { id: 'b', label: 'Tomorrow afternoon', value: 'b' },
                { id: 'c', label: 'Next week', value: 'c' },
                { id: 'd', label: 'Next month', value: 'd' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'section_2',
      title: 'Section 2 - Monologue',
      description: 'Listen to an informative talk',
      instructions:
        'Listen to a presentation about a local museum. Answer the questions based on what you hear.',
      duration: 10,
      blocks: [
        {
          id: 'block_2',
          title: 'Questions 6-10',
          description: 'Museum information talk',
          questions: [
            {
              id: 'q6',
              type: 'completion',
              title: 'Question 6',
              content: 'The museum is open from 9 AM to _____ PM on weekdays.',
              placeholder: 'enter the closing time',
            },
            {
              id: 'q7',
              type: 'mcq',
              title: 'Question 7',
              content: 'How much is the entrance fee for students?',
              choices: [
                { id: 'a', label: '£3', value: 'a' },
                { id: 'b', label: '£5', value: 'b' },
                { id: 'c', label: '£8', value: 'c' },
                { id: 'd', label: '£10', value: 'd' },
              ],
            },
            {
              id: 'q8',
              type: 'recording' as const,
              title: 'Question 8',
              content: 'Describe your favorite exhibit in the museum.',
              placeholder: 'click to record your response',
            },
            {
              id: 'q9',
              type: 'completion',
              title: 'Question 9',
              content: 'The guided tour takes approximately _____ minutes.',
              placeholder: 'enter the duration',
            },
            {
              id: 'q10',
              type: 'multi-select',
              title: 'Question 10',
              content: 'Which facilities are available at the museum?',
              choices: [
                { id: 'a', label: 'Café', value: 'a' },
                { id: 'b', label: 'Gift shop', value: 'b' },
                { id: 'c', label: 'Parking', value: 'c' },
                { id: 'd', label: 'Library', value: 'd' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
