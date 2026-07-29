/**
 * Layout 1 Mock Data
 * Single question layout (HSK, JLPT, TOPIK, THPT, Aptitude tests)
 * 50 questions across 5 sections
 */

import type { Exam } from '../types';

export const layout1Mock: Exam = {
  id: 'exam_layout_1',
  title: 'HSK Level 4 Full Practice Test',
  examType: 'HSK',
  totalDuration: 7200, // 2 hours in seconds
  layout: {
    id: 'layout_1',
    config: {
      showSidebar: true,
      showTimer: true,
      showBookmarks: true,
    },
  },
  sections: [
    {
      id: 'section_1',
      title: 'Listening Comprehension',
      duration: 1800, // 30 min
      instructions: 'Listen to each question carefully and select the correct answer.',
      blocks: [
        {
          id: 'block_1_1',
          type: 'generic',
          title: 'Part A: Short Conversations',
          questions: [
            {
              id: 'q_1_1',
              type: 'MCQ',
              text: 'What is the main topic of this conversation?',
              choices: [
                { id: 'c_1_1_a', text: 'Weather conditions', isCorrect: true },
                { id: 'c_1_1_b', text: 'Sports event' },
                { id: 'c_1_1_c', text: 'Food preferences' },
                { id: 'c_1_1_d', text: 'Travel plans' },
              ],
              explanation: 'The conversation focuses on weather conditions.',
            },
            {
              id: 'q_1_2',
              type: 'MCQ',
              text: 'Where does this conversation take place?',
              choices: [
                { id: 'c_1_2_a', text: 'At home' },
                { id: 'c_1_2_b', text: 'In a restaurant', isCorrect: true },
                { id: 'c_1_2_c', text: 'In a classroom' },
                { id: 'c_1_2_d', text: 'At a hospital' },
              ],
              explanation: 'The setting is clearly a restaurant.',
            },
            {
              id: 'q_1_3',
              type: 'MCQ',
              text: 'Who is the speaker?',
              choices: [
                { id: 'c_1_3_a', text: 'A customer', isCorrect: true },
                { id: 'c_1_3_b', text: 'A teacher' },
                { id: 'c_1_3_c', text: 'A doctor' },
                { id: 'c_1_3_d', text: 'A driver' },
              ],
              explanation: 'The speaker is a customer based on the context.',
            },
            {
              id: 'q_1_4',
              type: 'MCQ',
              text: 'What does the speaker want?',
              choices: [
                { id: 'c_1_4_a', text: 'To order food', isCorrect: true },
                { id: 'c_1_4_b', text: 'To complain about service' },
                { id: 'c_1_4_c', text: 'To pay the bill' },
                { id: 'c_1_4_d', text: 'To make a reservation' },
              ],
              explanation: 'The speaker wants to order food.',
            },
            {
              id: 'q_1_5',
              type: 'MCQ',
              text: 'When will the event happen?',
              choices: [
                { id: 'c_1_5_a', text: 'Next week' },
                { id: 'c_1_5_b', text: 'Tomorrow', isCorrect: true },
                { id: 'c_1_5_c', text: 'Today' },
                { id: 'c_1_5_d', text: 'Next month' },
              ],
              explanation: 'The event is happening tomorrow.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_2',
      title: 'Reading Comprehension',
      duration: 1800, // 30 min
      instructions: 'Read each passage and answer the questions below.',
      blocks: [
        {
          id: 'block_2_1',
          type: 'passage',
          title: 'Passage 1',
          content: 'Modern technology has changed the way we communicate. With the rise of social media and instant messaging, people can now connect with others across the globe in seconds. However, some experts argue that while technology brings people closer physically, it may make them more distant emotionally.',
          questions: [
            {
              id: 'q_2_1',
              type: 'MCQ',
              text: 'What is the main idea of the passage?',
              choices: [
                { id: 'c_2_1_a', text: 'Technology is bad', isCorrect: false },
                { id: 'c_2_1_b', text: 'Technology has changed communication', isCorrect: true },
                { id: 'c_2_1_c', text: 'People should not use social media' },
                { id: 'c_2_1_d', text: 'Experts disagree about technology' },
              ],
              explanation: 'The main idea is how technology has transformed communication.',
            },
            {
              id: 'q_2_2',
              type: 'Completion',
              text: 'According to experts, technology may make people more ____ emotionally.',
              correctAnswers: ['distant', 'isolated', 'disconnected'],
              explanation: 'The passage states people may become more distant emotionally.',
            },
            {
              id: 'q_2_3',
              type: 'MCQ',
              text: 'Which statement is implied in the passage?',
              choices: [
                { id: 'c_2_3_a', text: 'Technology is always beneficial' },
                { id: 'c_2_3_b', text: 'Social media has no effect on relationships' },
                { id: 'c_2_3_c', text: 'Technology has both positive and negative effects', isCorrect: true },
                { id: 'c_2_3_d', text: 'People should avoid instant messaging' },
              ],
              explanation: 'The passage presents both benefits and potential drawbacks of technology.',
            },
            {
              id: 'q_2_4',
              type: 'MultiSelect',
              text: 'Which of the following are mentioned as ways technology enables communication? (Select all that apply)',
              choices: [
                { id: 'c_2_4_a', text: 'Social media', isCorrect: true },
                { id: 'c_2_4_b', text: 'Instant messaging', isCorrect: true },
                { id: 'c_2_4_c', text: 'Video calls', isCorrect: false },
                { id: 'c_2_4_d', text: 'Global connection', isCorrect: true },
              ],
              correctCount: 3,
              explanation: 'Social media, instant messaging, and global connection are all mentioned.',
            },
            {
              id: 'q_2_5',
              type: 'MCQ',
              text: 'What is the tone of the passage?',
              choices: [
                { id: 'c_2_5_a', text: 'Negative' },
                { id: 'c_2_5_b', text: 'Positive' },
                { id: 'c_2_5_c', text: 'Balanced', isCorrect: true },
                { id: 'c_2_5_d', text: 'Humorous' },
              ],
              explanation: 'The passage presents both benefits and concerns in a balanced way.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_3',
      title: 'Writing Skills',
      duration: 1200, // 20 min
      instructions: 'Write essays in response to the prompts below.',
      blocks: [
        {
          id: 'block_3_1',
          type: 'generic',
          title: 'Essay Questions',
          questions: [
            {
              id: 'q_3_1',
              type: 'Essay',
              text: 'Describe your ideal job and explain why you would enjoy it.',
              explanation: 'Focus on specific skills, work environment, and personal satisfaction.',
            },
            {
              id: 'q_3_2',
              type: 'Essay',
              text: 'What is the most important skill for success in modern society?',
              explanation: 'Provide reasons and examples to support your argument.',
            },
            {
              id: 'q_3_3',
              type: 'Essay',
              text: 'How has technology changed education?',
              explanation: 'Discuss both positive and negative impacts.',
            },
            {
              id: 'q_3_4',
              type: 'Essay',
              text: 'Describe a meaningful experience in your life.',
              explanation: 'Include specific details and explain why it was important.',
            },
            {
              id: 'q_3_5',
              type: 'Essay',
              text: 'What advice would you give to someone moving to a new country?',
              explanation: 'Provide practical suggestions based on your understanding.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_4',
      title: 'Vocabulary & Grammar',
      duration: 900, // 15 min
      instructions: 'Select the correct answer to complete each sentence.',
      blocks: [
        {
          id: 'block_4_1',
          type: 'generic',
          title: 'Fill in the Blank',
          questions: [
            {
              id: 'q_4_1',
              type: 'MCQ',
              text: 'She ____ to the gym every morning.',
              choices: [
                { id: 'c_4_1_a', text: 'goes', isCorrect: true },
                { id: 'c_4_1_b', text: 'go' },
                { id: 'c_4_1_c', text: 'going' },
                { id: 'c_4_1_d', text: 'went' },
              ],
              explanation: 'Third person singular present tense requires "goes".',
            },
            {
              id: 'q_4_2',
              type: 'MCQ',
              text: 'If I ____ you were coming, I would have prepared dinner.',
              choices: [
                { id: 'c_4_2_a', text: 'knew', isCorrect: true },
                { id: 'c_4_2_b', text: 'had known' },
                { id: 'c_4_2_c', text: 'would know' },
                { id: 'c_4_2_d', text: 'know' },
              ],
              explanation: 'Past conditional requires past tense.',
            },
            {
              id: 'q_4_3',
              type: 'MCQ',
              text: 'The book is ____ interesting.',
              choices: [
                { id: 'c_4_3_a', text: 'very' },
                { id: 'c_4_3_b', text: 'much', isCorrect: true },
                { id: 'c_4_3_c', text: 'more' },
                { id: 'c_4_3_d', text: 'most' },
              ],
              explanation: '"Much" is used before adjectives in certain contexts.',
            },
            {
              id: 'q_4_4',
              type: 'Completion',
              text: 'They have lived here ____ 5 years.',
              correctAnswers: ['for', 'since'],
              explanation: '"For" or "since" are used with present perfect tense.',
            },
            {
              id: 'q_4_5',
              type: 'MCQ',
              text: 'Neither the manager ____ the employees were happy about the decision.',
              choices: [
                { id: 'c_4_5_a', text: 'nor' },
                { id: 'c_4_5_b', text: 'or' },
                { id: 'c_4_5_c', text: 'nor', isCorrect: true },
                { id: 'c_4_5_d', text: 'and' },
              ],
              explanation: '"Neither...nor" is the correct correlative conjunction.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_5',
      title: 'Speaking',
      duration: 600, // 10 min
      instructions: 'Record your responses to the following prompts.',
      blocks: [
        {
          id: 'block_5_1',
          type: 'generic',
          title: 'Speaking Prompts',
          questions: [
            {
              id: 'q_5_1',
              type: 'Recording',
              text: 'Tell us about your hobbies and why you enjoy them.',
              explanation: 'Speak clearly and provide specific examples.',
            },
            {
              id: 'q_5_2',
              type: 'Recording',
              text: 'Describe a memorable trip you have taken.',
              explanation: 'Include details about the place and your experience.',
            },
            {
              id: 'q_5_3',
              type: 'Recording',
              text: 'Discuss an important person in your life.',
              explanation: 'Explain why this person is important to you.',
            },
            {
              id: 'q_5_4',
              type: 'Recording',
              text: 'Share your opinion on environmental conservation.',
              explanation: 'Support your views with logical reasoning.',
            },
            {
              id: 'q_5_5',
              type: 'Recording',
              text: 'Describe your ideal weekend.',
              explanation: 'Be specific about activities and why you enjoy them.',
            },
          ],
        },
      ],
    },
  ],
};
