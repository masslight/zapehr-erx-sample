import React from 'react';
import './App.css'
import { useAuth0 } from '@auth0/auth0-react';
import Patient from './Patient';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import PatientEdit from './PatientEdit';
import('@photonhealth/elements').catch(console.log);

declare global {
  namespace JSX {
      interface IntrinisicElements {
          'photon-client': { me: string }
      }
  }
}

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
 
  if (!isAuthenticated && isLoading) {
    return 'Loading...';
  }
 
  if (!isAuthenticated && !isLoading) {
    loginWithRedirect().catch((error) => {
      throw new Error(`Error calling loginWithRedirect Auth0 ${error}`);
    });
 }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              showWhenAuthenticated={
                <photon-client
                  id={import.meta.env.VITE_APP_PHOTON_APPLICATION_CLIENT_ID}
                  org={import.meta.env.VITE_APP_PHOTON_ORGANIZATION_ID}
                  dev-mode="true"
                  auto-login="true"
                  redirect-uri={window.location.origin}
                >  
                  <Outlet />
                </photon-client>
              }
            />
          }
        >
          <>
            <Route path="/" element={<Navigate to="/patient/529706f2-4f59-4b17-9d21-cef883da268f" />} />
            <Route path="/patient/:id" element={<Patient />} />
            <Route path="/patient/:id/edit" element={<PatientEdit />} />
          </>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
