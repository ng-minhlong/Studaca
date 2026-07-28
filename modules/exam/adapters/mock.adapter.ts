import type { Exam } from '../types'
import { LAYOUT1_MOCK_EXAM, LAYOUT2_MOCK_EXAM, LAYOUT3_MOCK_EXAM } from '../mocks'

/**
 * Mock Adapter
 * 
 * Temporary fake API adapter. Later this will be replaced with real API calls.
 * Backend will return: { id, title, duration, layout, data }
 * 
 * For now, we return mock exams based on ID.
 */

/**
 * Get mock exam by ID
 * 
 * @param id - Exam ID
 * @returns Exam object
 * 
 * Mock IDs:
 * - 1: Layout 1 (Single Question)
 * - 2: Layout 2 (Reading Split)
 * - 3: Layout 3 (Listening)
 */
export async function getMockExam(id: string | number): Promise<Exam> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300))

  const examId = String(id)

  switch (examId) {
    case '1':
      return LAYOUT1_MOCK_EXAM

    case '2':
      return LAYOUT2_MOCK_EXAM

    case '3':
      return LAYOUT3_MOCK_EXAM

    default:
      throw new Error(`Exam with ID ${id} not found`)
  }
}

/**
 * Get all available mock exams (for listing/discovery)
 */
export async function getAllMockExams(): Promise<Exam[]> {
  return Promise.resolve([LAYOUT1_MOCK_EXAM, LAYOUT2_MOCK_EXAM, LAYOUT3_MOCK_EXAM])
}
