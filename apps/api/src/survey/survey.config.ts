export const SURVEY_CONFIG = {
  title: 'RESEARCH QUESTIONNAIRE',

  studyTitle:
    'The Influence of Mobile Financial Services (MFS) Fraud Awareness on Continuance Intention among University Students in Bangladesh: The Roles of Perceived Risk and Trust',

  introduction: {
    heading: 'Introduction and Consent',
    description:
      'This survey is conducted for academic research to understand how fraud awareness, perceived risk, security, and trust influence university students’ intention to continue using Mobile Financial Services (MFS) in Bangladesh. Participation is voluntary. Responses will be kept confidential and used only for academic research. Estimated completion time: 5–7 minutes. Do not provide any PIN, OTP, password, or account number.',
    consentQuestion:
      'Do you voluntarily agree to participate in this survey?',
    consentOptions: [
      'Yes, I agree',
      'No, I do not agree',
    ],
  },

  demographics: {
    heading: 'Demographic Information',
    questions: [
      {
        id: 'D1',
        label: 'Gender',
        options: [
          'Male',
          'Female',
          'Prefer not to say',
          'Other',
        ],
      },
      {
        id: 'D2',
        label: 'Age',
        options: [
          'Below 18',
          '18–20',
          '21–23',
          '24–26',
          'Above 26',
        ],
      },
      {
        id: 'D3',
        label: 'Education',
        options: [
          'Undergraduate',
          'Postgraduate',
          'Other',
        ],
      },
      {
        id: 'D4',
        label: 'University Type',
        options: [
          'Public University',
          'Private University',
          'Other',
        ],
      },
      {
        id: 'D5',
        label: 'Current Year of Study',
        options: [
          '1st Year',
          '2nd Year',
          '3rd Year',
          '4th Year',
          '5th Year or above',
        ],
      },
    ],
  },

  mfsUsage: {
    heading: 'MFS Usage Information',
    questions: [
      {
        id: 'U1',
        label: 'Do you currently use any Mobile Financial Services (MFS)?',
        options: ['Yes', 'No'],
      },
      {
        id: 'U2',
        label: 'Which MFS services do you use?',
        multiple: true,
        options: [
          'bKash',
          'Nagad',
          'Rocket',
          'Upay',
          'Other',
        ],
      },
      {
        id: 'U3',
        label: 'How long have you been using MFS?',
        options: [
          'Less than 6 months',
          '6 months–1 year',
          '1–2 years',
          '2–3 years',
          'More than 3 years',
        ],
      },
      {
        id: 'U4',
        label: 'How frequently do you use MFS?',
        options: [
          'Daily',
          'Several times a week',
          'Once a week',
          'Several times a month',
          'Rarely',
        ],
      },
      {
        id: 'U5',
        label:
          'Have you ever experienced or encountered an attempted MFS fraud?',
        options: [
          'Yes, I lost money',
          'Yes, but I did not lose money',
          'No',
          'Not sure',
        ],
      },
    ],
  },

  likertScale: [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
  ],

  constructs: [
    {
      id: 'CFA',
      name: 'Cyber Fraud Awareness',
      questions: [
        {
          id: 'Q1',
          text: 'I am aware of common types of cyber fraud in digital payments (e.g., phishing, fake calls, OTP scams).',
        },
        {
          id: 'Q2',
          text: 'I know how to identify fraudulent SMS messages, emails, and fake payment links.',
        },
        {
          id: 'Q3',
          text: 'I know where and how to file a complaint if I become a victim of fraud in digital payments.',
        },
      ],
    },
    {
      id: 'FPB',
      name: 'Fraud Prevention Behaviour',
      questions: [
        {
          id: 'Q4',
          text: "Before making a digital payment, I verify the recipient's identity and transaction details.",
        },
        {
          id: 'Q5',
          text: 'I do not share my OTP, PIN, or password with any unknown person.',
        },
        {
          id: 'Q6',
          text: 'I avoid using suspicious payment links or messages.',
        },
      ],
    },
    {
      id: 'PCR',
      name: 'Perceived Cyber Risk',
      questions: [
        {
          id: 'Q7',
          text: 'I believe there is a risk of my personal and financial information being stolen when using digital payments.',
        },
        {
          id: 'Q8',
          text: 'I believe that I could suffer significant financial losses if I become a victim of fraud through digital payments.',
        },
        {
          id: 'Q9',
          text: 'I believe that cyber fraud risks may exist even when using popular digital payment applications.',
        },
      ],
    },
    {
      id: 'PS',
      name: 'Perceived Security',
      questions: [
        {
          id: 'Q10',
          text: 'I feel secure when making financial transactions through digital payment applications.',
        },
        {
          id: 'Q11',
          text: 'I believe that the security measures of digital payment applications are capable of preventing unauthorized transactions.',
        },
        {
          id: 'Q12',
          text: 'I believe that my personal and financial information is adequately protected when using digital payment applications.',
        },
      ],
    },
    {
      id: 'TR',
      name: 'Trust in Digital Payment Services',
      questions: [
        {
          id: 'Q13',
          text: 'I consider my digital payment service provider to be trustworthy.',
        },
        {
          id: 'Q14',
          text: "I believe that my digital payment service provider is responsible for protecting customers' personal information and money.",
        },
        {
          id: 'Q15',
          text: 'I trust that my digital payment service provider will try to provide an appropriate solution if I encounter any problems.',
        },
      ],
    },
    {
      id: 'PU',
      name: 'Perceived Usefulness',
      questions: [
        {
          id: 'Q16',
          text: 'Using digital payments enables me to complete my daily financial transactions more quickly.',
        },
        {
          id: 'Q17',
          text: 'Using digital payments saves me time and effort.',
        },
        {
          id: 'Q18',
          text: 'Using digital payments makes my daily financial transactions more convenient.',
        },
      ],
    },
    {
      id: 'PEOU',
      name: 'Perceived Ease of Use',
      questions: [
        {
          id: 'Q19',
          text: 'Learning to use digital payment applications is easy for me.',
        },
        {
          id: 'Q20',
          text: 'I have no difficulty understanding the various functions and instructions of digital payment applications.',
        },
        {
          id: 'Q21',
          text: 'Making financial transactions using digital payment applications requires very little effort from me.',
        },
      ],
    },
    {
      id: 'SB',
      name: 'Spending Behaviour',
      questions: [
        {
          id: 'Q22',
          text: 'I feel that my overall spending has increased as a result of using digital payments.',
        },
        {
          id: 'Q23',
          text: 'When using digital payments, I sometimes make additional purchases without prior planning.',
        },
        {
          id: 'Q24',
          text: 'When spending through digital payments, I sometimes exceed my planned budget.',
        },
      ],
    },
    {
      id: 'US',
      name: 'User Satisfaction',
      questions: [
        {
          id: 'Q25',
          text: 'I am satisfied with my overall experience of using digital payment services.',
        },
        {
          id: 'Q26',
          text: 'Digital payment services perform according to my expectations.',
        },
        {
          id: 'Q27',
          text: 'I am satisfied with my decision to use digital payments.',
        },
      ],
    },
    {
      id: 'CI',
      name: 'Continuance Intention',
      questions: [
        {
          id: 'Q28',
          text: 'I intend to continue using digital payments regularly in the future.',
        },
        {
          id: 'Q29',
          text: 'I intend to increase my use of digital payments in the coming days.',
        },
        {
          id: 'Q30',
          text: 'I am interested in continuing to use digital payments even when alternative payment methods are available.',
        },
      ],
    },
  ],

  closingMessage: 'Thank you for participating.',
} as const;