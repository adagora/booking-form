export interface Holiday {
  name: string;
  date: string;
  type: 'NATIONAL_HOLIDAY' | 'OBSERVANCE' | string;
  country: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  date: Date;
  time: string;
}

export interface FormErrors {
  [key: string]: string;
}