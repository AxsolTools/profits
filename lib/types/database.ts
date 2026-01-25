export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          wallet_address: string | null
          username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          wallet_address?: string | null
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string | null
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      platforms: {
        Row: {
          id: string
          name: string
          slug: string
          icon_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon_url?: string | null
          created_at?: string
        }
      }
      proofs: {
        Row: {
          id: string
          sender_id: string
          recipient: string
          amount: number
          currency: string
          platform_id: string
          campaign_name: string
          tx_hash: string
          block_number: string
          chain: string
          status: 'verified' | 'pending' | 'disputed'
          metadata: Json | null
          created_at: string
          updated_at: string
          featured: boolean
          image_url: string | null
        }
        Insert: {
          id?: string
          sender_id: string
          recipient: string
          amount: number
          currency?: string
          platform_id: string
          campaign_name: string
          tx_hash: string
          block_number: string
          chain?: string
          status?: 'verified' | 'pending' | 'disputed'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          featured?: boolean
          image_url?: string | null
        }
        Update: {
          id?: string
          sender_id?: string
          recipient?: string
          amount?: number
          currency?: string
          platform_id?: string
          campaign_name?: string
          tx_hash?: string
          block_number?: string
          chain?: string
          status?: 'verified' | 'pending' | 'disputed'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          featured?: boolean
          image_url?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          proof_id: string | null
          buyer_wallet: string
          seller_wallet: string
          amount: number
          currency: string
          streamflow_id: string | null
          escrow_status: 'locked' | 'released' | 'disputed' | 'refunded'
          category: string | null
          title: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
          released_at: string | null
        }
        Insert: {
          id?: string
          proof_id?: string | null
          buyer_wallet: string
          seller_wallet: string
          amount: number
          currency?: string
          streamflow_id?: string | null
          escrow_status?: 'locked' | 'released' | 'disputed' | 'refunded'
          category?: string | null
          title?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          released_at?: string | null
        }
        Update: {
          id?: string
          proof_id?: string | null
          buyer_wallet?: string
          seller_wallet?: string
          amount?: number
          currency?: string
          streamflow_id?: string | null
          escrow_status?: 'locked' | 'released' | 'disputed' | 'refunded'
          category?: string | null
          title?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          released_at?: string | null
        }
      }
      evidence: {
        Row: {
          id: string
          transaction_id: string
          uploaded_by: string
          file_url: string
          file_type: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          transaction_id: string
          uploaded_by: string
          file_url: string
          file_type: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          transaction_id?: string
          uploaded_by?: string
          file_url?: string
          file_type?: string
          description?: string | null
          created_at?: string
        }
      }
      disputes: {
        Row: {
          id: string
          transaction_id: string
          opened_by: string
          reason: string
          realms_proposal_id: string | null
          status: 'open' | 'voting' | 'resolved' | 'cancelled'
          resolution: 'buyer' | 'seller' | null
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          transaction_id: string
          opened_by: string
          reason: string
          realms_proposal_id?: string | null
          status?: 'open' | 'voting' | 'resolved' | 'cancelled'
          resolution?: 'buyer' | 'seller' | null
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          transaction_id?: string
          opened_by?: string
          reason?: string
          realms_proposal_id?: string | null
          status?: 'open' | 'voting' | 'resolved' | 'cancelled'
          resolution?: 'buyer' | 'seller' | null
          created_at?: string
          resolved_at?: string | null
        }
      }
      votes: {
        Row: {
          id: string
          dispute_id: string
          voter_wallet: string
          vote: 'buyer' | 'seller'
          token_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          dispute_id: string
          voter_wallet: string
          vote: 'buyer' | 'seller'
          token_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          dispute_id?: string
          voter_wallet?: string
          vote?: 'buyer' | 'seller'
          token_amount?: number
          created_at?: string
        }
      }
      verification_requests: {
        Row: {
          id: string
          token_holdings: string
          telegram_username: string
          service: string
          description: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          processed_at: string | null
        }
        Insert: {
          id?: string
          token_holdings: string
          telegram_username: string
          service: string
          description: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          processed_at?: string | null
        }
        Update: {
          id?: string
          token_holdings?: string
          telegram_username?: string
          service?: string
          description?: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          processed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
