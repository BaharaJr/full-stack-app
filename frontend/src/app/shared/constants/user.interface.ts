export interface User {
  firstname: string;
  lastname: string;
}

export interface Task {
  title: string;
  description: string;
  userId: {id: string}
}
