<!-- BEGIN:nextjs-agent-rules -->
# 1. This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.



# 2. Rule when modifying or adding feature for tests, practices, full-test (collection) or their library
When modifying or adding features for tests, practice flows, full-test collections, or their library APIs, import `ExamType` from `modules/exam/types/index.ts` and reuse shared mappings from `modules/exam/prisma.ts` instead of redefining type constants locally.



<!-- END:nextjs-agent-rules -->
