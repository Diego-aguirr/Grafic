export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          id: string;
          email: string;
          is_super_admin: boolean;
          created_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          is_super_admin?: boolean;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          is_super_admin?: boolean;
          created_at?: string | null;
        };
        Relationships: [];
      };

      images: {
        Row: {
          id: string;
          url: string;
          description: string;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          description: string;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          description?: string;
          category?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
