export interface Email {
  id: string;
  sender: string;
  subject: string;
  recipient_address: string;
  body_text: string | null;
  created_at: string;
}
