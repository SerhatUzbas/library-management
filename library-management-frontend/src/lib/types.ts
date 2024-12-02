export interface Book {
  id: number;
  title: string;
  publishYear: string;
  writer: string;
  description: string;
  status: 'AVAILABLE' | 'BORROWED';
  categoryId: number;
  averageRating?: number;
}

export interface User {
  id: number;
  name: string;
  currentBorrows?: Borrow[];
  pastBorrows?: Borrow[];
}

export interface Borrow {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate?: Date;
  userRating?: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface CategoryDTO {
  name: string;
}

export interface BookDTO {
  title: string;
  publishYear: string;
  writer: string;
  description: string;
  categoryId: number;
}

export interface UserDTO {
  name: string;
}

export interface BorrowDTO {
  userId: number;
  bookId: number;
}


export type SelectData = {
  label: string
  value: string
}

export type ResponseType<T = any> = {
  success: boolean
  status: number
  message: string
  data: T
}
