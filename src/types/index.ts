export type Region = 'North' | 'South' | 'East' | 'West';
export type Budget = 'Low' | 'Medium' | 'High';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Place {
  _id: string;
  name: string;
  region: Region;
  budget: Budget;
  description: string;
  image: string;
  location: string;
}

export interface Weather {
  location: string;
  temperature: number;
  condition: string;
  icon: string | null;
}
