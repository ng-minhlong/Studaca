import { LayoutId, type Exam } from '../types'

/**
 * Mock Exam: Layout 2 - Reading Split
 * 
 * Passage on left, questions on right.
 * Similar to: IELTS, TOEFL, GRE, SAT
 */
export const LAYOUT2_MOCK_EXAM: Exam = {
  id: 'exam_layout2_001',
  title: 'IELTS Reading Practice',
  description: 'Academic Module - Reading Comprehension',
  type: 'IELTS',
  totalDuration: 60,
  layout: {
    id: LayoutId.READING_SPLIT,
    name: 'Reading Split Layout',
    description: 'Passage on left, questions on right',
  },
  sections: [
    {
      id: 'section_1',
      title: 'Reading Passage - The History of Paper',
      description: 'Read the passage and answer the questions below',
      instructions:
        'Answer the following questions based on the information in the passage. You may refer back to the passage as often as necessary.',
      duration: 20,
      blocks: [
        {
          id: 'block_1',
          title: 'Passage A',
          description: 'Historical overview',
          passage: `The invention of paper revolutionized human civilization. Archaeological evidence suggests that paper was first developed in China around 100 BCE, during the Han Dynasty. This breakthrough occurred centuries before similar technologies emerged in other parts of the world.

The earliest forms of paper were made from plant fibers, particularly hemp and the bark of the mulberry tree. These materials were beaten and mixed with water to create a pulp, which was then spread onto screens to dry. The resulting sheets were initially used for wrapping goods, but gradually their importance grew.

By the 8th century, papermaking technology had spread to the Islamic world through the Silk Road. The Arabs improved upon the Chinese techniques and established paper mills throughout their empire. This expansion played a crucial role in the development of Islamic science and literature during the Golden Age.

Paper finally reached Europe in the 12th century, initially through Spain. However, European adoption was slow, as parchment from animal skin remained the preferred writing material for official documents. It wasn't until the invention of the printing press in the 15th century that paper demand increased dramatically, establishing it as the dominant writing surface.

Today, paper production is one of the world's largest industries, consuming vast amounts of wood and water. The environmental impact has become a significant concern, spurring innovation in recycled paper production and alternative materials. Despite the digital revolution, paper remains an essential commodity in modern society.`,
          questions: [
            {
              id: 'q1',
              type: 'mcq',
              title: 'Question 1',
              content: 'When was paper first invented?',
              choices: [
                { id: 'a', label: 'During the Song Dynasty', value: 'a' },
                { id: 'b', label: 'Around 100 BCE during the Han Dynasty', value: 'b' },
                { id: 'c', label: 'In the 8th century', value: 'c' },
                { id: 'd', label: 'In the 12th century', value: 'd' },
              ],
            },
            {
              id: 'q2',
              type: 'completion',
              title: 'Question 2',
              content: 'The earliest forms of paper were made from _____ materials.',
              placeholder: 'e.g., hemp, plant, etc.',
            },
            {
              id: 'q3',
              type: 'multi-select',
              title: 'Question 3',
              content: 'Which of the following helped spread papermaking technology?',
              choices: [
                { id: 'a', label: 'The Silk Road', value: 'a' },
                { id: 'b', label: 'Arab expansion', value: 'b' },
                { id: 'c', label: 'The printing press', value: 'c' },
                { id: 'd', label: 'Digital technology', value: 'd' },
              ],
            },
            {
              id: 'q4',
              type: 'mcq',
              title: 'Question 4',
              content: 'What was the main reason for increased paper demand in Europe?',
              choices: [
                { id: 'a', label: 'Trade with China', value: 'a' },
                { id: 'b', label: 'Islamic scientific advances', value: 'b' },
                { id: 'c', label: 'The invention of the printing press', value: 'c' },
                { id: 'd', label: 'Environmental concerns', value: 'd' },
              ],
            },
            {
              id: 'q5',
              type: 'essay' as const,
              title: 'Question 5',
              content: 'Discuss the environmental impact of modern paper production and suggest solutions.',
              placeholder: 'Write your response here (minimum 100 words)',
            },
          ],
        },
      ],
    },
  ],
}
