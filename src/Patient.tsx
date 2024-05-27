import { useEffect, useState } from 'react';
import React from 'react';
import { syncPatient } from './api';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

enum LoadingState {
  initial,
  pending,
  idle,
}


let _loading = LoadingState.initial
 
function Patient() {
  const { id } = useParams(); // 529706f2-4f59-4b17-9d21-cef883da268f
  const [photonPatientId, setPhotonPatientId] = useState('');
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    async function syncPatientToPhoton() {
      try {
        _loading = LoadingState.pending
        const accessToken = await getAccessTokenSilently();
        const syncPatientRes = await syncPatient(id, accessToken);
        setPhotonPatientId(syncPatientRes.photonPatientId);
        _loading = LoadingState.idle
      } catch (error) {
        console.error(error);
        _loading = LoadingState.initial
      }
    }
    if (isAuthenticated && !photonPatientId && _loading === LoadingState.initial) {
        syncPatientToPhoton();
    }
  }, [isAuthenticated, getAccessTokenSilently, photonPatientId])
 
  if (_loading !== LoadingState.idle) {
    return (
      <div>
        <h1>Prescribe</h1>
        <Link to={`/patient/${id}/edit`}>
          <button style={{ marginBottom: '10px' }}>Edit Patient</button>
        </Link>
        <p>
          Syncing patient...
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>Prescribe</h1>
      <Link to={`/patient/${id}/edit`}>
        <button style={{ marginBottom: '10px' }}>Edit Patient</button>
      </Link>
      <photon-prescribe-workflow enable-order={true} patient-id={photonPatientId} />
    </div>
  );
}
 
export default Patient;