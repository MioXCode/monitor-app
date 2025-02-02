export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      isEmailVerified: boolean;
      verificationToken: string;
      tokenExpiry: string;
      createdAt: string;
      updatedAt: string;
      settings: {
        id: string;
        userId: string;
        emailNotifications: boolean;
        slackWebhook: string | null;
        discordWebhook: string | null;
        telegramChatId: string | null;
        notificationThresholds: string | null;
        createdAt: string;
        updatedAt: string;
      };
    };
    token: string;
  };
}
