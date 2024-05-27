import { useAuth0 } from '@auth0/auth0-react';
import { FC, ReactElement } from 'react';

interface ProtectedRouteProps {
  showWhenAuthenticated: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (!isAuthenticated && isLoading) {
    return 'Loading...'; 
  }

  if (!isAuthenticated && !isLoading) {
    console.log('login with redirect')
    loginWithRedirect().catch((error) => {
      throw new Error(`Error calling loginWithRedirect Auth0 ${error}`);
    });
  }

  console.log('show when auth: ', props.showWhenAuthenticated);

  return props.showWhenAuthenticated;
};