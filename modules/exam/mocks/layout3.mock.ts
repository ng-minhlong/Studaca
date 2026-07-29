/**
 * Layout 3 Mock Data
 * Listening layout (IELTS Listening)
 * Audio player with questions
 */

import type { Exam } from '../types';

export const layout3Mock: Exam = {
  id: 'exam_layout_3',
  title: 'IELTS Listening Practice Test',
  examType: 'IELTS',
  totalDuration: 2400, // 40 minutes in seconds
  layout: {
    id: 'layout_3',
    config: {
      hasAudio: true,
      showTimer: true,
      sectionPlayback: true,
    },
  },
  sections: [
    {
      id: 'section_1',
      title: 'Section 1: Conversation',
      duration: 600, // 10 min
      instructions: 'Listen to the conversation and answer the questions.',
      blocks: [
        {
          id: 'block_1_1',
          type: 'audio',
          title: 'Section 1 Audio',
          audioUrl: 'https://example.com/audio/ielts-listening-section1.mp3',
          duration: 300, // 5 minutes
          questions: [
            {
              id: 'q_1_1',
              type: 'Completion',
              text: 'The customer wants to book a table for ____ people.',
              correctAnswers: ['4', 'four'],
              explanation: 'Listen carefully to the number of people mentioned.',
            },
            {
              id: 'q_1_2',
              type: 'MCQ',
              text: 'What time would the customer prefer to dine?',
              choices: [
                { id: 'c_1_2_a', text: '6:00 PM' },
                { id: 'c_1_2_b', text: '7:00 PM', isCorrect: true },
                { id: 'c_1_2_c', text: '8:00 PM' },
                { id: 'c_1_2_d', text: '9:00 PM' },
              ],
              explanation: 'The customer requests 7:00 PM for their dinner reservation.',
            },
            {
              id: 'q_1_3',
              type: 'Completion',
              text: 'The name for the reservation is ____.',
              correctAnswers: ['Smith', 'SMITH'],
              explanation: 'Listen for the name spelled out during the conversation.',
            },
            {
              id: 'q_1_4',
              type: 'MCQ',
              text: 'What is the restaurant\'s specialty?',
              choices: [
                { id: 'c_1_4_a', text: 'Italian cuisine', isCorrect: true },
                { id: 'c_1_4_b', text: 'French cuisine' },
                { id: 'c_1_4_c', text: 'Asian cuisine' },
                { id: 'c_1_4_d', text: 'Mediterranean cuisine' },
              ],
              explanation: 'The restaurant specializes in Italian cuisine.',
            },
            {
              id: 'q_1_5',
              type: 'Completion',
              text: 'The phone number is ____.',
              correctAnswers: ['0203 555 1234', '020 3555 1234'],
              explanation: 'Write down the phone number exactly as given.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_2',
      title: 'Section 2: Announcement',
      duration: 600, // 10 min
      instructions: 'Listen to the announcement and answer the questions.',
      blocks: [
        {
          id: 'block_2_1',
          type: 'audio',
          title: 'Section 2 Audio',
          audioUrl: 'https://example.com/audio/ielts-listening-section2.mp3',
          duration: 300, // 5 minutes
          questions: [
            {
              id: 'q_2_1',
              type: 'MCQ',
              text: 'What is the main topic of this announcement?',
              choices: [
                { id: 'c_2_1_a', text: 'Museum opening hours' },
                { id: 'c_2_1_b', text: 'Gallery exhibition', isCorrect: true },
                { id: 'c_2_1_c', text: 'Theater schedule' },
                { id: 'c_2_1_d', text: 'Concert information' },
              ],
              explanation: 'The announcement is about a new gallery exhibition.',
            },
            {
              id: 'q_2_2',
              type: 'Completion',
              text: 'The exhibition runs from ____ to ____.',
              correctAnswers: ['1 March to 30 June', '01/03 to 30/06'],
              explanation: 'Listen for the specific dates of the exhibition.',
            },
            {
              id: 'q_2_3',
              type: 'MultiSelect',
              text: 'Which of the following are mentioned as features of the exhibition? (Select all that apply)',
              choices: [
                { id: 'c_2_3_a', text: 'Interactive displays', isCorrect: true },
                { id: 'c_2_3_b', text: 'Video presentations', isCorrect: true },
                { id: 'c_2_3_c', text: 'Live music performances', isCorrect: false },
                { id: 'c_2_3_d', text: 'Guided tours', isCorrect: true },
              ],
              correctCount: 3,
              explanation: 'Interactive displays, video presentations, and guided tours are all mentioned.',
            },
            {
              id: 'q_2_4',
              type: 'Completion',
              text: 'Admission for students is ____ pounds.',
              correctAnswers: ['5', 'five', '£5'],
              explanation: 'Listen for the student admission price.',
            },
            {
              id: 'q_2_5',
              type: 'MCQ',
              text: 'How can visitors book tickets in advance?',
              choices: [
                { id: 'c_2_5_a', text: 'By phone' },
                { id: 'c_2_5_b', text: 'Online', isCorrect: true },
                { id: 'c_2_5_c', text: 'In person only' },
                { id: 'c_2_5_d', text: 'By email' },
              ],
              explanation: 'Tickets can be booked online in advance.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_3',
      title: 'Section 3: Academic Discussion',
      duration: 600, // 10 min
      instructions: 'Listen to the academic discussion and answer the questions.',
      blocks: [
        {
          id: 'block_3_1',
          type: 'audio',
          title: 'Section 3 Audio',
          audioUrl: 'https://example.com/audio/ielts-listening-section3.mp3',
          duration: 300, // 5 minutes
          questions: [
            {
              id: 'q_3_1',
              type: 'MCQ',
              text: 'What is the student studying?',
              choices: [
                { id: 'c_3_1_a', text: 'Biology' },
                { id: 'c_3_1_b', text: 'Environmental Science', isCorrect: true },
                { id: 'c_3_1_c', text: 'Chemistry' },
                { id: 'c_3_1_d', text: 'Physics' },
              ],
              explanation: 'The student is studying environmental science.',
            },
            {
              id: 'q_3_2',
              type: 'Completion',
              text: 'The research project focuses on ____ conservation.',
              correctAnswers: ['forest', 'rainforest', 'tropical forest'],
              explanation: 'Listen for the type of conservation project mentioned.',
            },
            {
              id: 'q_3_3',
              type: 'MultiSelect',
              text: 'Which of the following are mentioned as research methods? (Select all that apply)',
              choices: [
                { id: 'c_3_3_a', text: 'Field observations', isCorrect: true },
                { id: 'c_3_3_b', text: 'Interviews with locals', isCorrect: true },
                { id: 'c_3_3_c', text: 'Laboratory analysis', isCorrect: true },
                { id: 'c_3_3_d', text: 'Online surveys only', isCorrect: false },
              ],
              correctCount: 3,
              explanation: 'Field observations, interviews, and lab analysis are all mentioned.',
            },
            {
              id: 'q_3_4',
              type: 'Completion',
              text: 'The research will be completed by ____.',
              correctAnswers: ['May', 'May 2024', 'next May'],
              explanation: 'Listen for the completion date of the research.',
            },
            {
              id: 'q_3_5',
              type: 'MCQ',
              text: 'What does the tutor suggest as the next step?',
              choices: [
                { id: 'c_3_5_a', text: 'Start analyzing data immediately' },
                { id: 'c_3_5_b', text: 'Contact other research groups', isCorrect: true },
                { id: 'c_3_5_c', text: 'Publish preliminary findings' },
                { id: 'c_3_5_d', text: 'Request additional funding' },
              ],
              explanation: 'The tutor suggests contacting other research groups for collaboration.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_4',
      title: 'Section 4: Lecture',
      duration: 600, // 10 min
      instructions: 'Listen to the lecture and answer the questions.',
      blocks: [
        {
          id: 'block_4_1',
          type: 'audio',
          title: 'Section 4 Audio',
          audioUrl: 'https://example.com/audio/ielts-listening-section4.mp3',
          duration: 300, // 5 minutes
          questions: [
            {
              id: 'q_4_1',
              type: 'MCQ',
              text: 'What is the lecture about?',
              choices: [
                { id: 'c_4_1_a', text: 'Ancient civilizations' },
                { id: 'c_4_1_b', text: 'Climate change and sea levels', isCorrect: true },
                { id: 'c_4_1_c', text: 'Ocean currents' },
                { id: 'c_4_1_d', text: 'Marine life evolution' },
              ],
              explanation: 'The lecture focuses on climate change and rising sea levels.',
            },
            {
              id: 'q_4_2',
              type: 'Completion',
              text: 'Sea levels have risen by approximately ____ mm in the last century.',
              correctAnswers: ['200', 'two hundred', '100-200'],
              explanation: 'Listen for the specific measurement of sea level rise.',
            },
            {
              id: 'q_4_3',
              type: 'MCQ',
              text: 'Which factor is identified as the primary cause of sea level rise?',
              choices: [
                { id: 'c_4_3_a', text: 'Increased rainfall' },
                { id: 'c_4_3_b', text: 'Thermal expansion of water', isCorrect: true },
                { id: 'c_4_3_c', text: 'Asteroid impacts' },
                { id: 'c_4_3_d', text: 'Volcanic activity' },
              ],
              explanation: 'Thermal expansion of water is the primary cause mentioned.',
            },
            {
              id: 'q_4_4',
              type: 'Completion',
              text: 'By 2100, sea levels are projected to rise by ____ cm.',
              correctAnswers: ['30-100', '30 to 100', 'thirty to one hundred'],
              explanation: 'Listen for the projected rise by the end of the century.',
            },
            {
              id: 'q_4_5',
              type: 'MultiSelect',
              text: 'Which regions are mentioned as being most at risk? (Select all that apply)',
              choices: [
                { id: 'c_4_5_a', text: 'Pacific island nations', isCorrect: true },
                { id: 'c_4_5_b', text: 'Coastal cities', isCorrect: true },
                { id: 'c_4_5_c', text: 'Mountain ranges', isCorrect: false },
                { id: 'c_4_5_d', text: 'Low-lying countries', isCorrect: true },
              ],
              correctCount: 3,
              explanation: 'Pacific islands, coastal cities, and low-lying countries are all mentioned.',
            },
          ],
        },
      ],
    },
  ],
};
