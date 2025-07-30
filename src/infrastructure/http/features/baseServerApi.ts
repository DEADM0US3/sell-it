import {supabaseClient} from "../clientProvider.ts";

export class baseServerApi {


static async validateLogin(): Promise<boolean> {

  const { data, error } = await supabaseClient.auth.getUser();

  if (error) {
    console.error(`Error getting user: ${error.message}`);
    return false;
  }

  return true;
  }

}
