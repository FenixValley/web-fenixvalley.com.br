export type EventCategory = "meetup" | "workshop" | "hackathon";

export interface FenixEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  /** JS Date of event start */
  date: Date;
  imageUrl: string;
  registrationLink: string;
  highlighted: boolean;
  createdAt: Date;
}
