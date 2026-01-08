// Shared Types - Used across both admin-api and main-app

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  status: "draft" | "published" | "archived";
  created_at: Date;
  updated_at: Date;
}

export interface Dashboard {
  users: number;
  posts: number;
  visits_today: number;
  last_updated: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface Settings {
  maintenance_mode: boolean;
  max_upload_size: string;
  api_rate_limit: number;
}
