import {supabaseClient} from "../clientProvider.ts";

export class authServerApi {

  static async login(email: string, password: string): Promise<boolean> {

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(`Login failed: ${error.message}`);
      return false;
    }

    return true;
  }

  static async register(email: string, password: string): Promise<string> {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(`Registration failed: ${error.message}`);
      return error.message;
    }

    return data.user?.id ?? "User created but no ID returned";
  }

  static async logout(): Promise<void> {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error(`Logout failed: ${error.message}`);
    }
  }

  static async changePassword(): Promise<boolean> {
    const { error } = await supabaseClient.auth.updateUser({
      password: "new-password", // Replace with the actual new password
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

}
