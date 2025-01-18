export interface Document {
    id: string;
    name: string;
    uri: string;
    dateAdded: number;
    size: number | undefined | null;
    type: string;
  }
  