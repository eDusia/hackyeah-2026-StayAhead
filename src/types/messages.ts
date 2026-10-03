export interface MentorSessionSlot {
  id: string;
  mentorName: string;
  mentorTitle: string;
  mentorCompany: string;
  date: string;
  time: string;
  durationMinutes: number;
  available: boolean;
  specialization: string;
  avatarBg?: string;
  bookedTopic?: string;
}

export interface HRContact {
  id: string;
  name: string;
  role: string;
  company: string;
  isOnline: boolean;
  avatarBg: string;
  lastMessage: string;
  lastMessageTime: string;
}

export interface HRMessage {
  id: string;
  contactId: string;
  sender: 'user' | 'hr';
  text: string;
  createdAt: string;
}
