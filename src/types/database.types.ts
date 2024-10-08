export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	public: {
		Tables: {
			cart: {
				Row: {
					created_at: string
					id: number
					product: number
					product_quantity: number
					user: number
				}
				Insert: {
					created_at?: string
					id?: number
					product: number
					product_quantity?: number
					user: number
				}
				Update: {
					created_at?: string
					id?: number
					product?: number
					product_quantity?: number
					user?: number
				}
				Relationships: [
					{
						foreignKeyName: "cart_product_fkey"
						columns: ["product"]
						isOneToOne: true
						referencedRelation: "product"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "cart_user_fkey"
						columns: ["user"]
						isOneToOne: false
						referencedRelation: "client"
						referencedColumns: ["id"]
					},
				]
			}
			client: {
				Row: {
					address: string | null
					created_at: string | null
					email: string
					firstname: string
					id: number
					lastname: string
				}
				Insert: {
					address?: string | null
					created_at?: string | null
					email: string
					firstname: string
					id?: number
					lastname: string
				}
				Update: {
					address?: string | null
					created_at?: string | null
					email?: string
					firstname?: string
					id?: number
					lastname?: string
				}
				Relationships: []
			}
			product: {
				Row: {
					category: string[] | null
					created_at: string
					description: string | null
					id: number
					img_url: string | null
					name: string
					price: number | null
				}
				Insert: {
					category?: string[] | null
					created_at?: string
					description?: string | null
					id?: number
					img_url?: string | null
					name: string
					price?: number | null
				}
				Update: {
					category?: string[] | null
					created_at?: string
					description?: string | null
					id?: number
					img_url?: string | null
					name?: string
					price?: number | null
				}
				Relationships: []
			}
			usuarios: {
				Row: {
					client_id: number | null
					created_at: string
					email: string
					id: number
					is_admin: boolean
					password: string
					username: string
				}
				Insert: {
					client_id?: number | null
					created_at?: string
					email: string
					id?: number
					is_admin?: boolean
					password: string
					username: string
				}
				Update: {
					client_id?: number | null
					created_at?: string
					email?: string
					id?: number
					is_admin?: boolean
					password?: string
					username?: string
				}
				Relationships: [
					{
						foreignKeyName: "usuarios_client_id_fkey"
						columns: ["client_id"]
						isOneToOne: false
						referencedRelation: "client"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "usuarios_email_fkey"
						columns: ["email"]
						isOneToOne: false
						referencedRelation: "client"
						referencedColumns: ["email"]
					},
				]
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
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
	PublicTableNameOrOptions extends
	| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
	| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
	? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
		Database[PublicTableNameOrOptions["schema"]]["Views"])
	: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
		Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
		}
	? R
	: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
		PublicSchema["Views"])
	? (PublicSchema["Tables"] &
		PublicSchema["Views"])[PublicTableNameOrOptions] extends {
			Row: infer R
		}
	? R
	: never
	: never

export type TablesInsert<
	PublicTableNameOrOptions extends
	| keyof PublicSchema["Tables"]
	| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
	? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
	: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
		Insert: infer I
	}
	? I
	: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
		Insert: infer I
	}
	? I
	: never
	: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
	| keyof PublicSchema["Tables"]
	| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
	? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
	: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
		Update: infer U
	}
	? U
	: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
		Update: infer U
	}
	? U
	: never
	: never

export type Enums<
	PublicEnumNameOrOptions extends
	| keyof PublicSchema["Enums"]
	| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
	? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
	: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
	? PublicSchema["Enums"][PublicEnumNameOrOptions]
	: never
