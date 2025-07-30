import { supabaseClient } from "../clientProvider.ts";
import type { User } from "@supabase/supabase-js";
import type {UserDto} from "../../../contracts/user/userDto.ts";
import {baseServerApi} from "./baseServerApi.ts";

export class userServerApi extends baseServerApi {

  static async get(): Promise<User | null> {
    if (!(await this.validateLogin())) {
      console.error("User is not logged in.");
      return null;
    }

    const { data, error } = await supabaseClient.auth.getUser();

    if (error) {
      console.error(`Login failed: ${error.message}`);
      return null;
    }

    return data.user ?? null;
  }

  static async getProfile(): Promise<UserDto | null> {
    const user = await this.get();
    if (!user) return null;

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
      console.error(`Failed to fetch profile: ${error.message}`);
      return null;
    }

    return data as UserDto;
  }

  static async createProfile(profile: Omit<UserDto, "id" | "created_at">): Promise<UserDto | null> {
    const user = await this.get();
    if (!user) return null;

    const { data, error } = await supabaseClient
        .from("profiles")
        .insert([{ ...profile, id: user.id }])
        .select()
        .single();

    if (error) {
      console.error(`Failed to create profile: ${error.message}`);
      return null;
    }

    return data as UserDto;
  }

  static async updateProfile(updates: Partial<Omit<UserDto, "id" | "created_at">>): Promise<UserDto | null> {
    const user = await this.get();
    if (!user) return null;

    const { data, error } = await supabaseClient
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

    if (error) {
      console.error(`Failed to update profile: ${error.message}`);
      return null;
    }

    return data as UserDto;
  }

  static async changeRole(newRole: "buyer" | "seller"): Promise<UserDto | null> {
    return await this.updateProfile({ role: newRole });
  }

  static async getRole(): Promise<"buyer" | "seller" | null> {
    const user = await this.get();
    if (!user) return null;

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (error) {
      console.error(`Failed to get role: ${error.message}`);
      return null;
    }

    return data?.role ?? null;
  }

  static async updateAuth(name: string, email: string): Promise<User | null> {
    if (!(await this.validateLogin())) {
      console.error("User is not logged in.");
      return null;
    }

    const { data, error } = await supabaseClient.auth.updateUser({
      email,
      data: {
        name,
      },
    });

    if (error) {
      console.error(`Update failed: ${error.message}`);
      return null;
    }

    return data.user ?? null;
  }

}
