  import {supabaseClient} from "../clientProvider.ts";
  import {userServerApi} from "./userServerApi.ts";

export class authServerApi {

  static async login(email: string, password: string): Promise<boolean> {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
      console.error(`Login failed: ${error.message}`);
      return false;
    }

    return true;
  }


  static async register(
        name: string,
        email: string,
        password: string,
        role: "buyer" | "seller" = "buyer"
    ): Promise<boolean> {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(`Registration failed: ${error.message}`);
        return false;
      }

      if (!data.user?.id) {
        console.error(`User created but no ID returned`);
        return false;
      }

      await new Promise((res) => setTimeout(res, 1000));

      const profileResult = await userServerApi.createProfile({
        full_name: name,
        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        role,
        preferences: {},
      });

      if (!profileResult) {
        console.error("Profile creation failed");
        return false;
      }

      return true;
    }


    static async changePassword(newPassword: string): Promise<boolean> {
      const { error } = await supabaseClient.auth.updateUser({
        password: newPassword, // Replace with the actual new password
      });

      if (error) {
        console.error(`Change password failed: ${error.message}`);
        return false;
      }

      return true;
    }

    static async getUserId(): Promise<string | null> {
      const {data, error} = await supabaseClient.auth.getSession()
          /* THESE PART IT WAS AN OPTION OF HOW TO DO IT BUT I DIDN'T LIKE IT*/
          // .then(session => {
          //   const user = session.data.session?.user;
          //   return user ? user.id : null;
          // })
          // .catch(error => {
          //     console.error(`Failed to get current user: ${error.message}`);
          //     return null;
          //
          // })

        if (error) {
          console.error(`Failed to get current user: ${error.message}`);
          return null;
        }

      return data.session?.user.id ?? null;

    }

    static async logout(): Promise<boolean> {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.error(`Logout failed: ${error.message}`);
            return false;
        }

        return true;
    }

  }
