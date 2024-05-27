import { useEffect, useState } from 'react';
import React from 'react';
import { getPatient } from './api';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

enum LoadingState {
  initial,
  pending,
  idle,
}

let _loading = LoadingState.initial

const PHOTON_PATIENT_ID_SYSTEM = 'http://api.zapehr.com/photon-patient-id';

function PatientEdit() {
  const { id } = useParams(); // 529706f2-4f59-4b17-9d21-cef883da268f
  const [photonPatientId, setPhotonPatientId] = useState('');
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    async function getPatientFHIR() {
      try {
        _loading = LoadingState.pending
        const accessToken = await getAccessTokenSilently();
        const getPatientRes = await getPatient(id, accessToken);
        const photonPatientId = getPatientRes.identifier.find((identifier) => identifier.system === PHOTON_PATIENT_ID_SYSTEM);
        setPhotonPatientId(photonPatientId);
        _loading = LoadingState.idle
      } catch (error) {
        console.error(error);
        _loading = LoadingState.initial
      }
    }
    if (isAuthenticated && !photonPatientId && _loading === LoadingState.initial) {
      getPatientFHIR();
    }
  }, [isAuthenticated, getAccessTokenSilently, photonPatientId])
 
  if (_loading !== LoadingState.idle) {
    return (
      <div>
        <h1>Patient</h1>
        <Link to={`/patient/${id}`}>
          <button style={{ marginBottom: '10px' }}>Prescribe to Patient</button>
        </Link>
        <p>
          Loading patient...
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>Patient</h1>
      <Link to={`/patient/${id}`}>
        <button style={{ marginBottom: '10px' }}>Prescribe to Patient</button>
      </Link>
      
    </div>
  );
}
 
export default PatientEdit;