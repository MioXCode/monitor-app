interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  slackWebhook: string | null;
  discordWebhook: string | null;
  telegramChatId: string | null;
  notificationThresholds: string | null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  verificationToken: string;
  tokenExpiry: string;
  createdAt: string;
  updatedAt: string;
  settings: UserSettings;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
