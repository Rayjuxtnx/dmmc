import data from './events.json';

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageId: string;
};

export const Events: Event[] = data.events;
