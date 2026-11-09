-- CreateTable
CREATE TABLE "survey_responses" (
    "id" UUID NOT NULL,
    "submission_token" VARCHAR(64) NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "age_group" VARCHAR(50) NOT NULL,
    "education" VARCHAR(50) NOT NULL,
    "university_type" VARCHAR(50) NOT NULL,
    "study_year" VARCHAR(50) NOT NULL,
    "currently_uses_mfs" BOOLEAN NOT NULL,
    "mfs_services" TEXT[],
    "usage_duration" VARCHAR(50) NOT NULL,
    "usage_frequency" VARCHAR(50) NOT NULL,
    "fraud_experience" VARCHAR(80) NOT NULL,
    "answers" JSONB NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "survey_responses_submission_token_key" ON "survey_responses"("submission_token");

-- CreateIndex
CREATE INDEX "survey_responses_submitted_at_idx" ON "survey_responses"("submitted_at");
