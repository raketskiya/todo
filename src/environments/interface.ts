import {User} from '../app/shared/interfaces/user.interface';

export interface Environment{
  apiKey: string,
  production: boolean,
  apiURL: string,
}

export interface  FbAuthResponse {
  idToken: string,
  expiresIn: string,
  localId?: string
}

export interface FbUserResponse{
  users: User[]
}
