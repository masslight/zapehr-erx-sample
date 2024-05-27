import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={'https://auth.zapehr.com'}
      clientId={import.meta.env.VITE_APP_ZAPEHR_APPLICATION_CLIENT_ID || ''}
      authorizationParams={{
        audience: 'https://api.zapehr.com',
        redirect_uri: 'http://localhost:3000',
      }}
      skipRedirectCallback={window.location.href.includes('photon=true')}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
