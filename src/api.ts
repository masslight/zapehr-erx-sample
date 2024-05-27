// todo - use zapehr sdk

export const syncPatient = async (patientId, accessToken) => {
  const response = await fetch(`https://project-api.zapehr.com/v1/erx/sync-patient/${patientId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export const getPatient = async (patientId, accessToken) => {
  const response = await fetch(`https://fhir-api.zapehr.com/r4/Patient/${patientId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
