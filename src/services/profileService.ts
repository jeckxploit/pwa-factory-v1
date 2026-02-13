import { supabase } from "./supabase"
import type { Profile } from "../types/profile"

export const getProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()

    if (error) {
        if (error.code === "PGRST116") {
            // No profile found
            return null
        }
        console.error("[profileService] Error fetching profile:", error)
        throw new Error(error.message)
    }
    return data
}

export const updateProfile = async (id: string, updates: Partial<Profile>) => {
    const { error } = await supabase
        .from("profiles")
        .update({
            ...updates,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)

    if (error) {
        console.error("[profileService] Error updating profile:", error)
        throw new Error(error.message)
    }
}
