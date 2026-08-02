-- CreateEnum
CREATE TYPE "CreditTransactionType" AS ENUM ('PURCHASE', 'BONUS', 'REFUND', 'ADMIN_ADD', 'ADMIN_REMOVE', 'AI_CHAT', 'AI_EXPLAIN', 'AI_GRADING', 'OCR', 'EXPORT', 'COURSE_PURCHASE');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('Draft', 'Published', 'Archived');

-- CreateEnum
CREATE TYPE "CouseLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('Pending', 'Active', 'Cancelled');

-- CreateEnum
CREATE TYPE "HsaTestType" AS ENUM ('tsa', 'v-act', 'hsa');

-- CreateEnum
CREATE TYPE "HsaModule" AS ENUM ('toán', 'văn', 'khoa học', 'tiếng anh', 'sử địa');

-- CreateEnum
CREATE TYPE "HsaSubmodule" AS ENUM ('toán', 'văn', 'vật lý', 'hóa', 'sinh', 'sử', 'địa');

-- CreateEnum
CREATE TYPE "HsaLevel" AS ENUM ('hsk1', 'hsk2', 'hsk3', '');

-- CreateEnum
CREATE TYPE "HsaPartTestType" AS ENUM ('Writing', 'Reading', 'Listening');

-- CreateEnum
CREATE TYPE "JptLevel" AS ENUM ('n1', 'n2', 'n3', 'n4', 'n5');

-- CreateEnum
CREATE TYPE "JlptLevel" AS ENUM ('n1', 'n2', 'n3', 'n4', 'n5');

-- CreateEnum
CREATE TYPE "JlptTestPartType" AS ENUM ('Vocabulary', 'Grammar', 'Reading', 'Listening');

-- CreateEnum
CREATE TYPE "HskLevel" AS ENUM ('hsk1', 'hsk2', 'hsk3', '');

-- CreateEnum
CREATE TYPE "HskTestPartType" AS ENUM ('Writing', 'Reading', 'Listening');

-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('full-test', 'mini-test', 'practice');

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "test" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stripeCustomerId" TEXT,
    "role" TEXT,
    "banned" BOOLEAN DEFAULT false,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCredit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCreditUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "CreditTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "description" TEXT,
    "referenceId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCreditUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "level" "CouseLevel" NOT NULL DEFAULT 'Beginner',
    "category" TEXT NOT NULL,
    "smallDescription" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnailKey" TEXT,
    "videoKey" TEXT,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "digital_sat_question_bank_math" (
    "number" SERIAL NOT NULL,
    "id_question" TEXT NOT NULL,
    "type_question" TEXT NOT NULL,
    "question_content" TEXT NOT NULL,
    "answer_1" TEXT NOT NULL,
    "answer_2" TEXT NOT NULL,
    "answer_3" TEXT NOT NULL,
    "answer_4" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "image_link" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "digital_sat_question_bank_math_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "digital_sat_question_bank_verbal" (
    "number" SERIAL NOT NULL,
    "id_question" TEXT NOT NULL,
    "type_question" TEXT NOT NULL,
    "question_content" TEXT NOT NULL,
    "answer_1" TEXT NOT NULL,
    "answer_2" TEXT NOT NULL,
    "answer_3" TEXT NOT NULL,
    "answer_4" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "image_link" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "digital_sat_question_bank_verbal_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "digital_sat_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "number_question" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "test_type" TEXT NOT NULL,
    "question_choose" TEXT NOT NULL,
    "full_test_specific_module" JSONB NOT NULL,
    "tag" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "test_category" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "digital_sat_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "hsa_tests" (
    "number" SERIAL NOT NULL,
    "test_type" "HsaTestType" NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "module" "HsaModule" NOT NULL,
    "submodule" "HsaSubmodule" NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "testcode" JSONB NOT NULL,
    "answer" JSONB NOT NULL,
    "isFinishAnswer" BOOLEAN NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL DEFAULT 0,
    "book" TEXT,
    "test_taker_count" INTEGER,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "hsa_tests_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "hsa_test_lists" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "level" "HsaLevel" NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "number_question" INTEGER NOT NULL,
    "test_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "allow_preview_question" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hsa_test_lists_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "hsa_test_part_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "test_type" "HsaPartTestType" NOT NULL,
    "test_content" JSONB NOT NULL,
    "audio_context" TEXT NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "level" "JptLevel",
    "id_collection" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL DEFAULT 0,
    "time" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_taker_count" INTEGER DEFAULT 0,
    "book" TEXT,
    "number_question" INTEGER DEFAULT 0,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "hsa_test_part_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_listening_test_list_part" (
    "number" SERIAL NOT NULL,
    "id_part" TEXT NOT NULL,
    "part" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "number_question_of_this_part" INTEGER NOT NULL DEFAULT 10,
    "group_question" JSONB NOT NULL,
    "category" JSONB NOT NULL,
    "note" TEXT NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "testname" TEXT,
    "test_taker_count" INTEGER,
    "token_need" INTEGER,
    "time" INTEGER DEFAULT 10,
    "number_question" INTEGER DEFAULT 10,
    "time_allow" INTEGER,

    CONSTRAINT "ielts_listening_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_listening_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "id_from_study4" INTEGER NOT NULL,
    "testname" TEXT NOT NULL,
    "question_choose" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "number_question" INTEGER NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ielts_listening_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_reading_test_list_part" (
    "number" SERIAL NOT NULL,
    "id_part" TEXT NOT NULL,
    "part" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "number_question_of_this_part" INTEGER NOT NULL,
    "paragraph" TEXT NOT NULL,
    "group_question" JSONB NOT NULL,
    "category" JSONB NOT NULL,
    "note" TEXT NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "testname" TEXT,
    "test_taker_count" INTEGER,
    "token_need" INTEGER,
    "time" INTEGER DEFAULT 20,
    "number_question" INTEGER DEFAULT 12,
    "time_allow" INTEGER,

    CONSTRAINT "ielts_reading_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_reading_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT,
    "id_from_study4" INTEGER NOT NULL,
    "testname" TEXT NOT NULL,
    "question_choose" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "number_question" INTEGER NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL,

    CONSTRAINT "ielts_reading_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_speaking_test_list_part" (
    "number" SERIAL NOT NULL,
    "id_part" INTEGER,
    "topic" TEXT NOT NULL,
    "stt" INTEGER NOT NULL,
    "question_content" TEXT NOT NULL,
    "sample" TEXT NOT NULL,
    "important_add" TEXT NOT NULL,
    "speaking_part" INTEGER NOT NULL,
    "testname" TEXT,
    "test_taker_count" INTEGER,
    "token_need" INTEGER,

    CONSTRAINT "ielts_speaking_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_speaking_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "question_choose" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL DEFAULT 3,
    "time" INTEGER NOT NULL DEFAULT 15,
    "tag" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL,

    CONSTRAINT "ielts_speaking_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_writing_test_list_part" (
    "number" SERIAL NOT NULL,
    "id_part" INTEGER,
    "task" INTEGER NOT NULL,
    "question_type" TEXT NOT NULL,
    "question_content" TEXT NOT NULL,
    "image_link" TEXT NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 20,
    "sample_writing" TEXT NOT NULL,
    "important_add" TEXT NOT NULL,
    "testname" TEXT,
    "test_taker_count" INTEGER,
    "token_need" INTEGER,
    "number_question" INTEGER DEFAULT 1,
    "time_allow" INTEGER DEFAULT 1,

    CONSTRAINT "ielts_writing_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "ielts_writing_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "question_choose" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "book" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL DEFAULT 2,
    "tag" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ielts_writing_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "jlpt_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "level" "JlptLevel" NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "question_choose" JSONB,
    "number_question" INTEGER NOT NULL,
    "test_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jlpt_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "jlpt_test_part_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "test_category" "JlptTestPartType" NOT NULL,
    "test_content" JSONB NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "level" "JlptLevel",
    "id_collection" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL DEFAULT 0,
    "time" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_taker_count" INTEGER DEFAULT 0,
    "book" TEXT,
    "number_question" INTEGER DEFAULT 0,
    "allow_preview_question" BOOLEAN DEFAULT false,

    CONSTRAINT "jlpt_test_part_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "thptqg_question" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "book" TEXT,
    "test_type" TEXT NOT NULL DEFAULT 'Full Test',
    "testcode" JSONB NOT NULL,
    "time" TEXT NOT NULL,
    "number_question" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "token_need" INTEGER NOT NULL,
    "role_access" TEXT NOT NULL,
    "permissive_management" TEXT NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "thptqg_question_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_listening_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "id_from_study4" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "question_choice" JSONB NOT NULL,
    "book" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL DEFAULT 100,
    "tag" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 45,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "audio_link_context" TEXT NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "toeic_listening_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_listening_test_list_part" (
    "number" SERIAL NOT NULL,
    "id_part" INTEGER NOT NULL,
    "question_content" JSONB NOT NULL,
    "part" INTEGER NOT NULL,
    "part_name" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "number_question" INTEGER NOT NULL,

    CONSTRAINT "toeic_listening_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_reading_test_list" (
    "number" SERIAL NOT NULL,
    "id_from_study4" TEXT NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "question_choice" JSONB NOT NULL,
    "book" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL DEFAULT 100,
    "tag" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 75,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "toeic_reading_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_reading_test_list_part" (
    "number" SERIAL NOT NULL,
    "id_part" INTEGER NOT NULL,
    "question_content" JSONB NOT NULL,
    "part" INTEGER NOT NULL,
    "part_name" INTEGER NOT NULL,
    "answer" JSONB NOT NULL,
    "number_question" INTEGER NOT NULL,

    CONSTRAINT "toeic_reading_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_speaking_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "id_from_study4" INTEGER NOT NULL,
    "testname" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "book" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "toeic_speaking_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_speaking_test_list_part" (
    "number" SERIAL NOT NULL,
    "order_num" INTEGER NOT NULL,
    "id_test" TEXT NOT NULL,
    "question_name" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "toeic_speaking_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_writing_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "id_from_study4" INTEGER NOT NULL,
    "testname" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "book" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL,
    "token_need" INTEGER NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "toeic_writing_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "toeic_writing_test_list_part" (
    "number" SERIAL NOT NULL,
    "order_num" INTEGER NOT NULL,
    "id_test" TEXT NOT NULL,
    "question_name" TEXT NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "toeic_writing_test_list_part_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "topik_listening_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "id_crawl" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "number_question" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "book" TEXT,
    "general_context" JSONB,
    "testcode" TEXT NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "token_need" INTEGER NOT NULL,
    "role_access" TEXT NOT NULL,
    "permissive_management" TEXT NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL,

    CONSTRAINT "topik_listening_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "topik_reading_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "id_crawl" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "book" TEXT,
    "general_context" JSONB,
    "number_question" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "testcode" TEXT NOT NULL,
    "correct_answer" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL,
    "role_access" TEXT NOT NULL,
    "permissive_management" TEXT NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN NOT NULL,

    CONSTRAINT "topik_reading_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "vact_tests" (
    "number" SERIAL NOT NULL,
    "test_type" "HsaTestType" NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "book" TEXT,
    "number_question" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "module" "HsaModule" NOT NULL,
    "submodule" "HsaSubmodule" NOT NULL,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "testcode" JSONB NOT NULL,
    "answer" JSONB NOT NULL,
    "isFinishAnswer" BOOLEAN NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL DEFAULT 0,
    "test_taker_count" INTEGER NOT NULL,
    "allow_preview_question" BOOLEAN DEFAULT false,

    CONSTRAINT "vact_tests_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "hsk_test_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "level" "HskLevel" NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL,
    "test_taker_count" INTEGER NOT NULL,
    "number_question" INTEGER NOT NULL,
    "test_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "allow_preview_question" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "hsk_test_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "hsk_test_part_list" (
    "number" SERIAL NOT NULL,
    "id_test" TEXT NOT NULL,
    "test_category" "HskTestPartType" NOT NULL,
    "test_content" JSONB NOT NULL,
    "audio_context" TEXT NOT NULL,
    "correct_answer" JSONB NOT NULL,
    "level" "JlptLevel",
    "id_collection" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "token_need" INTEGER NOT NULL DEFAULT 0,
    "time_allow" INTEGER NOT NULL DEFAULT 0,
    "time" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_taker_count" INTEGER DEFAULT 0,
    "book" TEXT,
    "number_question" INTEGER DEFAULT 0,
    "allow_preview_question" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "hsk_test_part_list_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "test_collection" (
    "number" SERIAL NOT NULL,
    "id_collection" TEXT NOT NULL,
    "collection_name" TEXT NOT NULL,
    "type_collection" TEXT NOT NULL,
    "test_choose" JSONB NOT NULL,
    "book" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "token_need" INTEGER NOT NULL,
    "role_access" TEXT NOT NULL,
    "permissive_management" TEXT NOT NULL,
    "time_allow" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "test_taker_count" INTEGER NOT NULL,

    CONSTRAINT "test_collection_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_digital_sat" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "testname" TEXT NOT NULL,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "id_test" TEXT NOT NULL,
    "resulttest" TEXT NOT NULL,
    "timedotest" TEXT NOT NULL,
    "total_question_number" INTEGER,
    "correct_number" INTEGER,
    "incorrect_number" INTEGER,
    "skip_number" INTEGER,
    "useranswer" JSONB NOT NULL,
    "save_specific_time" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_digital_sat_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_hsa" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "timedotest" TEXT NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "total_question_number" INTEGER,
    "correct_number" INTEGER,
    "incorrect_number" INTEGER,
    "skip_number" INTEGER,
    "useranswer" JSONB,
    "id_result" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,
    "type_test" "TestType" NOT NULL,

    CONSTRAINT "save_user_result_hsa_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_hsk" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "testname" TEXT NOT NULL,
    "useranswer" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_hsk_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_ielts_listening" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "testname" TEXT NOT NULL,
    "useranswer" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_ielts_listening_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_ielts_reading" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "testname" TEXT NOT NULL,
    "useranswer" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_ielts_reading_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_ielts_speaking" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_test" "TestType" NOT NULL,
    "id_test" TEXT NOT NULL,
    "resulttest" TEXT NOT NULL,
    "user_answer_and_comment" JSONB,
    "band_detail" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "logAIResponse" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_ielts_speaking_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_ielts_writing" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_test" TEXT NOT NULL,
    "type_test" "TestType" NOT NULL,
    "resulttest" TEXT NOT NULL,
    "band_detail" TEXT NOT NULL,
    "user_answer_and_comment" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_ielts_writing_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_jlpt" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "testname" TEXT NOT NULL,
    "useranswer" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_jlpt_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_practice" (
    "number" SERIAL NOT NULL,
    "testname" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "id_test" TEXT NOT NULL,
    "test_type" TEXT NOT NULL,
    "accuracy_rate" INTEGER NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "is_finished" BOOLEAN NOT NULL,

    CONSTRAINT "save_user_result_practice_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_test_collection" (
    "number" SERIAL NOT NULL,
    "id_result" TEXT NOT NULL,
    "collection_name" TEXT NOT NULL,
    "id_collection" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "type_collection" TEXT NOT NULL,
    "result" INTEGER,
    "result_list" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "is_finished" BOOLEAN DEFAULT false,
    "finished_at" TIMESTAMP(3),
    "last_completion" TEXT NOT NULL,

    CONSTRAINT "save_user_result_test_collection_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_thptqg" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "timedotest" TEXT NOT NULL,
    "resulttest" TEXT NOT NULL,
    "total_question_number" INTEGER,
    "correct_number" TEXT,
    "incorrect_number" INTEGER,
    "skip_number" INTEGER,
    "useranswer" JSONB,
    "id_result" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,
    "type_test" "TestType" NOT NULL,

    CONSTRAINT "save_user_result_thptqg_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_toeic_listening" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "type_test" "TestType" NOT NULL,
    "timedotest" TEXT NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "correct_percentage" INTEGER NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "useranswer" JSONB,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_toeic_listening_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_toeic_reading" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "type_test" "TestType" NOT NULL,
    "timedotest" TEXT NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "correct_percentage" INTEGER NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "useranswer" JSONB,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_toeic_reading_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_toeic_speaking" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_test" "TestType" NOT NULL,
    "id_test" TEXT NOT NULL,
    "resulttest" TEXT NOT NULL,
    "user_answer_and_comment" JSONB,
    "band_detail" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "logAIResponse" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,
    "timedotest" TEXT NOT NULL,

    CONSTRAINT "save_user_result_toeic_speaking_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_toeic_writing" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_test" TEXT NOT NULL,
    "type_test" "TestType" NOT NULL,
    "resulttest" TEXT NOT NULL,
    "band_detail" TEXT NOT NULL,
    "user_answer_and_comment" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_toeic_writing_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_topik_listening" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "testname" TEXT NOT NULL,
    "useranswer" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_topik_listening_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_topik_reading" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "type_test" "TestType" NOT NULL,
    "correct_percentage" TEXT NOT NULL,
    "total_question_number" INTEGER,
    "correct_number" INTEGER,
    "incorrect_number" INTEGER,
    "skip_number" INTEGER,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "testname" TEXT NOT NULL,
    "useranswer" JSONB,
    "timedotest" TEXT NOT NULL,
    "id_result" TEXT NOT NULL,
    "permission_link" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,

    CONSTRAINT "save_user_result_topik_reading_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "save_user_result_vact" (
    "number" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "id_test" TEXT NOT NULL,
    "testname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "timedotest" TEXT NOT NULL,
    "resulttest" DOUBLE PRECISION NOT NULL,
    "total_question_number" INTEGER NOT NULL,
    "correct_number" INTEGER NOT NULL,
    "incorrect_number" INTEGER NOT NULL,
    "skip_number" INTEGER NOT NULL,
    "useranswer" JSONB,
    "id_result" TEXT NOT NULL,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "is_collection" BOOLEAN NOT NULL,
    "finished_at" TIMESTAMP(3),
    "id_collection" TEXT,
    "id_result_collection" TEXT,
    "type_test" "TestType" NOT NULL,

    CONSTRAINT "save_user_result_vact_pkey" PRIMARY KEY ("number")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_stripeCustomerId_key" ON "user"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredit_userId_key" ON "UserCredit"("userId");

-- CreateIndex
CREATE INDEX "UserCreditUsage_userId_idx" ON "UserCreditUsage"("userId");

-- CreateIndex
CREATE INDEX "UserCreditUsage_type_idx" ON "UserCreditUsage"("type");

-- CreateIndex
CREATE INDEX "UserCreditUsage_createdAt_idx" ON "UserCreditUsage"("createdAt");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "UserCredit" ADD CONSTRAINT "UserCredit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCreditUsage" ADD CONSTRAINT "UserCreditUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
