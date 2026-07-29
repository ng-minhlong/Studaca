/**
 * Layout 2 Mock Data
 * Reading split layout (IELTS Reading)
 * Passage on left, questions on right
 */

import type { Exam } from '../types';

export const layout2Mock: Exam = {
  id: 'exam_layout_2',
  title: 'IELTS Reading Practice Test',
  examType: 'IELTS',
  totalDuration: 3600, // 1 hour in seconds
  layout: {
    id: 'layout_2',
    config: {
      splitView: true,
      showTimer: true,
      passagePosition: 'left',
      questionsPosition: 'right',
    },
  },
  sections: [
    {
      id: 'section_1',
      title: 'Reading Passage 1',
      duration: 1200, // 20 min
      instructions: 'Read the passage and answer the questions below.',
      blocks: [
        {
          id: 'block_1_1',
          type: 'passage',
          title: 'The Ancient Library of Alexandria',
          content: `The Library of Alexandria was one of the largest and most significant libraries of the ancient world. Founded in the 3rd century BCE, it was located in the Mediterranean city of Alexandria, Egypt. The library was established by Ptolemy II and his father Ptolemy I, who ruled Egypt after the death of Alexander the Great.

The library contained an extensive collection of manuscripts and scrolls, estimated to hold between 40,000 and 400,000 items at its peak. These texts covered various subjects including philosophy, science, mathematics, and literature, making it a center of learning and intellectual achievement.

The library attracted scholars from all over the known world. They came to study, research, and contribute to human knowledge. The library also employed a team of scholars known as the Mouseion, which means "temple of the muses" in Greek. This group of intellectuals worked to preserve knowledge and advance learning.

Unfortunately, the Library of Alexandria was destroyed over several centuries through various catastrophes. Some sources suggest that the library was damaged during Julius Caesar's invasion in 48 BCE, while others point to religious conflicts and political instability as contributing factors. By the end of the 4th century CE, the library had ceased to exist.

The legacy of the Library of Alexandria continues to inspire modern institutions. Many believe that if the library had survived, humanity would have had access to countless works of ancient knowledge that are now lost. Today, scholars and archaeologists continue to search for remnants of the library's collection to better understand the ancient world.`,
          questions: [
            {
              id: 'q_1_1',
              type: 'MCQ',
              text: 'In which century was the Library of Alexandria founded?',
              choices: [
                { id: 'c_1_1_a', text: '2nd century BCE' },
                { id: 'c_1_1_b', text: '3rd century BCE', isCorrect: true },
                { id: 'c_1_1_c', text: '4th century BCE' },
                { id: 'c_1_1_d', text: '1st century BCE' },
              ],
              explanation: 'The passage clearly states the library was founded in the 3rd century BCE.',
            },
            {
              id: 'q_1_2',
              type: 'Completion',
              text: 'The library contained an estimated collection of between ____ and ____ items at its peak.',
              correctAnswers: ['40,000 and 400,000', '40000 and 400000'],
              explanation: 'The passage provides these specific estimates.',
            },
            {
              id: 'q_1_3',
              type: 'MCQ',
              text: 'What was the Mouseion?',
              choices: [
                { id: 'c_1_3_a', text: 'A museum' },
                { id: 'c_1_3_b', text: 'A team of scholars', isCorrect: true },
                { id: 'c_1_3_c', text: 'A religious temple' },
                { id: 'c_1_3_d', text: 'A type of manuscript' },
              ],
              explanation: 'The Mouseion was a group of scholars, meaning "temple of the muses".',
            },
            {
              id: 'q_1_4',
              type: 'MultiSelect',
              text: 'Which of the following are mentioned as subjects covered in the library? (Select all that apply)',
              choices: [
                { id: 'c_1_4_a', text: 'Philosophy', isCorrect: true },
                { id: 'c_1_4_b', text: 'Science', isCorrect: true },
                { id: 'c_1_4_c', text: 'Art history', isCorrect: false },
                { id: 'c_1_4_d', text: 'Literature', isCorrect: true },
              ],
              correctCount: 3,
              explanation: 'Philosophy, science, and literature are all mentioned as subjects.',
            },
            {
              id: 'q_1_5',
              type: 'MCQ',
              text: 'What was the main cause of the library\'s destruction?',
              choices: [
                { id: 'c_1_5_a', text: 'A single catastrophic event' },
                { id: 'c_1_5_b', text: 'Multiple causes over several centuries', isCorrect: true },
                { id: 'c_1_5_c', text: 'Deliberate burning by scholars' },
                { id: 'c_1_5_d', text: 'An earthquake' },
              ],
              explanation: 'The passage suggests the library was destroyed over centuries through various causes.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_2',
      title: 'Reading Passage 2',
      duration: 1200, // 20 min
      instructions: 'Read the passage and answer the questions below.',
      blocks: [
        {
          id: 'block_2_1',
          type: 'passage',
          title: 'Climate Change and Ocean Acidification',
          content: `Ocean acidification is a significant consequence of increased atmospheric carbon dioxide (CO2) levels. When CO2 dissolves in seawater, it forms carbonic acid, which lowers the pH of the ocean. Since the Industrial Revolution, ocean pH has decreased by approximately 0.1 units, representing a 30% increase in acidity.

This change in ocean chemistry has profound effects on marine life. Organisms with shells or skeletons made of calcium carbonate, such as corals, mollusks, and echinoderms, are particularly vulnerable. The increased acidity dissolves their shells and makes it harder for them to build and maintain their protective structures.

Coral reefs, which are home to approximately 25% of all marine fish species, are especially at risk. Acidification weakens the corals' ability to build and repair their skeletons, leading to bleaching and death. The loss of coral reefs would have devastating consequences for the entire marine ecosystem and for human populations that depend on these ecosystems for food and economic benefits.

Fish populations are also affected by ocean acidification. Research has shown that lower pH levels can impact fish behavior, sensory systems, and metabolism. Some species may struggle to find food or avoid predators in an increasingly acidic environment.

Scientists emphasize the urgency of reducing CO2 emissions to slow ocean acidification. While some organisms might adapt to changing conditions, the rate of change is too rapid for many species to evolve accordingly. International efforts to reduce greenhouse gas emissions are critical to protecting marine ecosystems for future generations.`,
          questions: [
            {
              id: 'q_2_1',
              type: 'MCQ',
              text: 'What is ocean acidification primarily caused by?',
              choices: [
                { id: 'c_2_1_a', text: 'Increased salt levels' },
                { id: 'c_2_1_b', text: 'Increased atmospheric carbon dioxide', isCorrect: true },
                { id: 'c_2_1_c', text: 'Pollution from oil spills' },
                { id: 'c_2_1_d', text: 'Volcanic activity' },
              ],
              explanation: 'The passage states that ocean acidification is caused by increased CO2 levels.',
            },
            {
              id: 'q_2_2',
              type: 'Completion',
              text: 'Ocean pH has decreased by approximately ____ units since the Industrial Revolution.',
              correctAnswers: ['0.1', '0.1 units'],
              explanation: 'The passage provides this specific measurement.',
            },
            {
              id: 'q_2_3',
              type: 'MCQ',
              text: 'Which organisms are most vulnerable to ocean acidification?',
              choices: [
                { id: 'c_2_3_a', text: 'Fish and seaweed' },
                { id: 'c_2_3_b', text: 'Organisms with calcium carbonate shells or skeletons', isCorrect: true },
                { id: 'c_2_3_c', text: 'Only coral reefs' },
                { id: 'c_2_3_d', text: 'Only bacteria' },
              ],
              explanation: 'Shells and skeletons made of calcium carbonate are most affected.',
            },
            {
              id: 'q_2_4',
              type: 'MCQ',
              text: 'What percentage of marine fish species are found in coral reefs?',
              choices: [
                { id: 'c_2_4_a', text: '15%' },
                { id: 'c_2_4_b', text: '25%', isCorrect: true },
                { id: 'c_2_4_c', text: '35%' },
                { id: 'c_2_4_d', text: '50%' },
              ],
              explanation: 'The passage states that approximately 25% of marine fish species live in coral reefs.',
            },
            {
              id: 'q_2_5',
              type: 'MCQ',
              text: 'Why might many species struggle to adapt to ocean acidification?',
              choices: [
                { id: 'c_2_5_a', text: 'Because they are too old' },
                { id: 'c_2_5_b', text: 'Because the rate of change is too rapid for evolution', isCorrect: true },
                { id: 'c_2_5_c', text: 'Because they prefer acidic environments' },
                { id: 'c_2_5_d', text: 'Because governments are preventing adaptation' },
              ],
              explanation: 'The passage emphasizes that the rate of change is too rapid for many species to evolve.',
            },
          ],
        },
      ],
    },
    {
      id: 'section_3',
      title: 'Reading Passage 3',
      duration: 1200, // 20 min
      instructions: 'Read the passage and answer the questions below.',
      blocks: [
        {
          id: 'block_3_1',
          type: 'passage',
          title: 'The Evolution of Modern Communication',
          content: `Communication technologies have undergone revolutionary changes over the past century. From the invention of the telephone by Alexander Graham Bell in 1876 to the development of the Internet in the late 20th century, each innovation has fundamentally altered how humans interact and share information.

The telephone represented a breakthrough in long-distance communication. For the first time, people could hear each other's voices across vast distances almost instantaneously. This invention transformed business, politics, and personal relationships by enabling real-time conversations that were previously impossible.

The mass adoption of television in the mid-20th century further revolutionized communication. Television became the primary source of news, entertainment, and cultural information for millions of people worldwide. It unified audiences around shared events and shaped public opinion on a global scale.

The emergence of the Internet in the 1990s marked another watershed moment. The Internet democratized information access and enabled peer-to-peer communication through email and later through social media platforms. Unlike previous technologies that were primarily one-to-many broadcasts, the Internet enabled many-to-many communication, allowing individuals to become publishers and broadcasters themselves.

Smartphone technology and mobile applications have further accelerated this trend. Today, people can access information, communicate, and conduct business from anywhere using devices that fit in their pockets. The rise of social media platforms has created new forms of community and activism, enabling individuals to organize and mobilize around shared interests and causes.

However, this rapid evolution has not come without challenges. Issues such as misinformation, privacy concerns, and the mental health impacts of constant connectivity have emerged as significant problems. Nevertheless, communication technology continues to evolve, promising new capabilities and raising new questions about how humans will interact in the future.`,
          questions: [
            {
              id: 'q_3_1',
              type: 'MCQ',
              text: 'According to the passage, what was the first major breakthrough in long-distance communication?',
              choices: [
                { id: 'c_3_1_a', text: 'Television' },
                { id: 'c_3_1_b', text: 'The Internet' },
                { id: 'c_3_1_c', text: 'The telephone', isCorrect: true },
                { id: 'c_3_1_d', text: 'Smartphone technology' },
              ],
              explanation: 'The passage identifies the telephone as the breakthrough for long-distance communication.',
            },
            {
              id: 'q_3_2',
              type: 'MCQ',
              text: 'Which technology first enabled many-to-many communication?',
              choices: [
                { id: 'c_3_2_a', text: 'Telephone' },
                { id: 'c_3_2_b', text: 'Television' },
                { id: 'c_3_2_c', text: 'The Internet', isCorrect: true },
                { id: 'c_3_2_d', text: 'Radio' },
              ],
              explanation: 'The Internet enabled many-to-many communication through email and social media.',
            },
            {
              id: 'q_3_3',
              type: 'MultiSelect',
              text: 'Which of the following are mentioned as challenges of modern communication technology? (Select all that apply)',
              choices: [
                { id: 'c_3_3_a', text: 'Misinformation', isCorrect: true },
                { id: 'c_3_3_b', text: 'Privacy concerns', isCorrect: true },
                { id: 'c_3_3_c', text: 'High cost', isCorrect: false },
                { id: 'c_3_3_d', text: 'Mental health impacts', isCorrect: true },
              ],
              correctCount: 3,
              explanation: 'Misinformation, privacy concerns, and mental health impacts are all mentioned.',
            },
            {
              id: 'q_3_4',
              type: 'Completion',
              text: 'The telephone was invented by ____ in ____.',
              correctAnswers: ['Alexander Graham Bell', '1876'],
              explanation: 'The passage provides the inventor\'s name and year of invention.',
            },
            {
              id: 'q_3_5',
              type: 'MCQ',
              text: 'What does the passage suggest about future communication technology?',
              choices: [
                { id: 'c_3_5_a', text: 'It will replace all current technologies' },
                { id: 'c_3_5_b', text: 'It will promise new capabilities while raising new questions', isCorrect: true },
                { id: 'c_3_5_c', text: 'It will eliminate all privacy concerns' },
                { id: 'c_3_5_d', text: 'It will be based on television technology' },
              ],
              explanation: 'The passage concludes that future technology will bring new capabilities and questions.',
            },
          ],
        },
      ],
    },
  ],
};
