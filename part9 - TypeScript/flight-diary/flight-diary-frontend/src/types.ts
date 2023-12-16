export interface NotificationMessage {
  type: string;
  content: string;
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">
export type DisplayDiaryEntry = Omit<DiaryEntry, "comment">