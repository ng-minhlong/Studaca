-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('full-test', 'mini-test', 'practice');

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
