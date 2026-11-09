import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @Get('config')
  getConfiguration() {
    return this.surveyService.getConfiguration();
  }

  @Post('submissions')
  @HttpCode(HttpStatus.CREATED)
  submit(
    @Body() dto: SubmitSurveyDto,
  ) {
    return this.surveyService.submit(dto);
  }
}