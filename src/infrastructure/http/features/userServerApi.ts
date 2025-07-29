import {supabaseClient} from "../clientProvider.ts";
import type {User} from "@supabase/supabase-js";
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

  static async update(name: string, email: string): Promise<User | null> {
    
    if (!(await this.validateLogin())) {
      console.error("User is not logged in.");
      return null;
    }

    const { data, error } = await supabaseClient.auth.updateUser({
      data: {
        name: name,
        email: email
      }
    });

    if (error) {
      console.error(`Update failed: ${error.message}`);
      return null;
    }

    return data.user ?? null;
  }

}

