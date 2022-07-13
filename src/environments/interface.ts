import { User } from '../app/shared/interfaces/user.interface';

export interface Environment {
  apiKey: string;
  production: boolean;
  apiURL: string;
  fbDbURL: string;
  locales: Array<string>;
  defaultLocale: string;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
  localId?: string;
}

export interface FbUserResponse {
  users: User[];
}

export interface FbCreateResponse {
  name: string;
}
