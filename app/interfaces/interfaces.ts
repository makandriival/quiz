export interface StorageStep {
  order: number;
  title: string;
  type: string;
  answer: string;
}

export interface Error {
	field: string;
	message: string;
}