import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { SURVEY_CONFIG } from './survey.config';

@Injectable()
export class SurveyService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  getConfiguration() {
    return SURVEY_CONFIG;
  }

  private validateAnswers(
    answers: Record<string, number>,
  ): void {
    const expectedQuestions = Array.from(
      { length: 30 },
      (_, index) => `Q${index + 1}`,
    );

    const receivedQuestions = Object.keys(answers);

    if (
      receivedQuestions.length !==
      expectedQuestions.length
    ) {
      throw new UnprocessableEntityException(
        'All 30 questionnaire answers are required.',
      );
    }

    for (const questionId of expectedQuestions) {
      if (
        !Object.prototype.hasOwnProperty.call(
          answers,
          questionId,
        )
      ) {
        throw new UnprocessableEntityException(
          `Missing answer for ${questionId}.`,
        );
      }

      const answer = answers[questionId];

      if (
        !Number.isInteger(answer) ||
        answer < 1 ||
        answer > 5
      ) {
        throw new UnprocessableEntityException(
          `Invalid Likert response for ${questionId}.`,
        );
      }
    }

    for (const questionId of receivedQuestions) {
      if (!expectedQuestions.includes(questionId)) {
        throw new UnprocessableEntityException(
          `Unexpected question: ${questionId}.`,
        );
      }
    }
  }

  async submit(dto: SubmitSurveyDto) {
    if (!dto.consent) {
      throw new ForbiddenException({
        code: 'CONSENT_REQUIRED',
        message:
          'You must voluntarily agree to participate before continuing.',
      });
    }

    if (!dto.currentlyUsesMfs) {
      throw new ForbiddenException({
        code: 'SCREENED_OUT',
        message:
          'This survey is intended for current MFS users.',
      });
    }

    this.validateAnswers(dto.answers);

    try {
      const response = await this.prisma.surveyResponse.create({
        data: {
          submissionToken: dto.submissionToken,

          consent: dto.consent,

          gender: dto.gender,
          ageGroup: dto.ageGroup,
          education: dto.education,
          universityType: dto.universityType,
          studyYear: dto.studyYear,

          currentlyUsesMfs: dto.currentlyUsesMfs,
          mfsServices: dto.mfsServices,
          usageDuration: dto.usageDuration,
          usageFrequency: dto.usageFrequency,
          fraudExperience: dto.fraudExperience,

          answers:
            dto.answers as Prisma.InputJsonObject,
        },
        select: {
          id: true,
          submittedAt: true,
        },
      });

      return {
        success: true,
        message: 'Survey response submitted successfully.',
        data: response,
      };
    } catch (error) {
      if (
        error instanceof
          Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException({
          code: 'DUPLICATE_SUBMISSION',
          message:
            'This submission has already been received.',
        });
      }

      throw error;
    }
  }
}