import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma.module';
import { HealthModule } from './health/health.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    SurveyModule,
  ],
})
export class AppModule {}