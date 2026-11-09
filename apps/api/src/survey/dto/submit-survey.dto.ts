import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsIn,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class SubmitSurveyDto {
  @IsUUID('4')
  submissionToken!: string;

  @IsBoolean()
  consent!: boolean;

  @IsString()
  @IsIn([
    'Male',
    'Female',
    'Prefer not to say',
    'Other',
  ])
  gender!: string;

  @IsString()
  @IsIn([
    'Below 18',
    '18–20',
    '21–23',
    '24–26',
    'Above 26',
  ])
  ageGroup!: string;

  @IsString()
  @IsIn([
    'Undergraduate',
    'Postgraduate',
    'Other',
  ])
  education!: string;

  @IsString()
  @IsIn([
    'Public University',
    'Private University',
    'Other',
  ])
  universityType!: string;

  @IsString()
  @IsIn([
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    '5th Year or above',
  ])
  studyYear!: string;

  @IsBoolean()
  currentlyUsesMfs!: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsString({ each: true })
  @IsIn(
    ['bKash', 'Nagad', 'Rocket', 'Upay', 'Other'],
    { each: true },
  )
  mfsServices!: string[];

  @IsString()
  @IsIn([
    'Less than 6 months',
    '6 months–1 year',
    '1–2 years',
    '2–3 years',
    'More than 3 years',
  ])
  usageDuration!: string;

  @IsString()
  @IsIn([
    'Daily',
    'Several times a week',
    'Once a week',
    'Several times a month',
    'Rarely',
  ])
  usageFrequency!: string;

  @IsString()
  @IsIn([
    'Yes, I lost money',
    'Yes, but I did not lose money',
    'No',
    'Not sure',
  ])
  fraudExperience!: string;

  @IsObject()
  answers!: Record<string, number>;
}