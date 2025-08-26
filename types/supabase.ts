// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          read: boolean | null;
          created_at: string | null;
          ip_address: string | null;
          user_agent: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          read?: boolean | null;
          created_at?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          read?: boolean | null;
          created_at?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  id?: string;
  error?: string;
}

// Edge Function Response Types
export interface EdgeFunctionResponse<T = any> {
  data?: T;
  error?: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  };
}

// Email Notification Types
export interface EmailNotification {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

// Validation Error Types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResponse {
  valid: boolean;
  errors?: ValidationError[];
}
