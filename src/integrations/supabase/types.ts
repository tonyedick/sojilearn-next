export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_avatar_url: string | null
          author_name: string
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean
          featured_image_url: string | null
          filter_type: string | null
          id: string
          is_published: boolean | null
          published_date: string | null
          reading_time_minutes: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_date: string | null
        }
        Insert: {
          author_avatar_url?: string | null
          author_name: string
          category: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean
          featured_image_url?: string | null
          filter_type?: string | null
          id?: string
          is_published?: boolean | null
          published_date?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_date?: string | null
        }
        Update: {
          author_avatar_url?: string | null
          author_name?: string
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean
          featured_image_url?: string | null
          filter_type?: string | null
          id?: string
          is_published?: boolean | null
          published_date?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_email: string
          author_name: string
          blog_post_id: string
          content: string
          created_at: string
          id: string
          is_approved: boolean
          parent_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          author_email: string
          author_name: string
          blog_post_id: string
          content: string
          created_at?: string
          id?: string
          is_approved?: boolean
          parent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          author_email?: string
          author_name?: string
          blog_post_id?: string
          content?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          parent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_comments_blog_post"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          source: string | null
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          source?: string | null
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          source?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      study_abroad_applications: {
        Row: {
          id: string
          // Step 1 – Basics
          first_name: string
          last_name: string
          email: string
          phone: string
          // Step 2 – UK & Marketing
          current_level: string | null
          institution: string | null
          graduation_year: string | null
          preferred_country: string
          // Step 3 – Academics
          preferred_program: string
          field_of_study: string | null
          preferred_university: string | null
          intended_start_date: string | null
          // Step 4 - Final Details
          has_passport: boolean | null
          has_degree: boolean | null
          has_transcript: boolean | null
          previous_application: boolean | null
          budget_range: string | null
          additional_questions: string | null
          stage?: "draft" | "under_review" | "submitted" | "rejected" | "approved" | "student loan" | "tuition deposit"
          // current_step: number | null
          // Metadata
          admin_notes?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          current_level: string | null
          institution: string | null
          graduation_year: string | null
          preferred_country: string
          preferred_program: string
          field_of_study: string | null
          preferred_university?: string | null
          intended_start_date: string | null
          has_passport: boolean | null
          has_degree: boolean | null
          has_transcript: boolean | null
          previous_application: boolean | null
          budget_range: string | null
          additional_questions: string | null
          stage?: "draft" | "under_review" | "submitted" | "rejected" | "approved" | "student loan" | "tuition deposit"
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          current_level: string | null
          institution: string | null
          graduation_year: string | null
          preferred_country: string
          preferred_program: string
          field_of_study: string | null
          preferred_university?: string | null
          intended_start_date: string | null
          has_passport: boolean | null
          has_degree: boolean | null
          has_transcript: boolean | null
          previous_application: boolean | null
          budget_range: string | null
          additional_questions: string | null
          stage?: "draft" | "under_review" | "submitted" | "rejected" | "approved" | "student loan" | "tuition deposit"
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          id: string
          application_id: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          upload_status: "uploaded" | "processing" | "verified" | "rejected"
          created_at: string
        }
        Insert: {
          id?: string
          application_id: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          mime_type: string
          upload_status?: "uploaded" | "processing" | "verified" | "rejected"
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number
          mime_type?: string
          upload_status?: "uploaded" | "processing" | "verified" | "rejected"
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "study_abroad_applications"
            referencedColumns: ["id"]
          }
        ]
      }
      application_referrals: {
        Row: {
          id: string
          application_id: string
          referrer_name: string
          referrer_contact: string | null
          status: "pending" | "contacted" | "converted"
          created_at: string
        }
        Insert: {
          id?: string
          application_id: string
          referrer_name: string
          referrer_contact?: string | null
          status?: "pending" | "contacted" | "converted"
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          referrer_name?: string
          referrer_contact?: string | null
          status?: "pending" | "contacted" | "converted"
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_referrals_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "study_abroad_applications"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
