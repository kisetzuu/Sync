import {createContext, useContext} from 'react';
import { Claims } from 'next-firebase-auth-edge/lib/auth/claims';
import { UserInfo as FirebaseUserInfo } from 'firebase/auth';  
 
export interface User extends FirebaseUserInfo {
  emailVerified: boolean;
  customClaims: Claims;
}

export interface AuthContextValue {
  user: User | null;
}
 
export const AuthContext = createContext<AuthContextValue>({
  user: null
});
 
export const useAuth = () => useContext(AuthContext);