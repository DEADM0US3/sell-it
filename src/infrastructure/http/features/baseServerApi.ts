import {authServerApi} from "./authServerApi.ts";

export class baseServerApi {

  static async validateLogin() : Promise<boolean>{
    if( !await authServerApi.getUserId()){
      return false;
    }

    return true;
  }

}