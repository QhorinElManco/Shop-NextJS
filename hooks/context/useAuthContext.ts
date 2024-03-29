import { AuthContext } from 'context';
import { useContext } from 'react';

export const useAuthContext = () => useContext(AuthContext);
