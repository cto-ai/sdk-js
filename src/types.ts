export interface Team {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface User {
  id: string;
  username: string;
  emails: [{
    verified: boolean;
    address: string;
  }];
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface APIError {}

export interface APIResponse<T> {
  data: T;
  error?: APIError[];
}