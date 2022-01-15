export const NOTIFICATION_TYPES = [
  {
    id: 1111,
    name: 'leave-balance-reminder',
    channels: ['Email'],
    subject: 'none',
    message:
      'Hi {{PH_USERNAME}}, This is a reminder that you have remaining leave days.',
  },
  {
    id: 1112,
    name: 'monthly-payslip',
    channels: ['UI'],
    subject: 'none',
    message:
      'Hi {{PH_USERNAME}}, Here is your payment slip. Please find the attached file.',
  },
  {
    id: 1113,
    name: 'happy-birthday',
    channels: ['Email', 'UI'],
    subject: 'Happy Birthday {{PH_USERNAME}}',
    message:
      'Hi {{PH_USERNAME}}, {{PH_COMPANYNAME}} is wishing you a happy birthday.',
  },
];
