export function sentRequest() {
  return {
    type: 'SENT_REQUEST'
  }
}

export function gotResponse() {
  return {
    type: 'GOT_RESPONSE'
  }
}

export function setupAccount() {
  return {
    type: 'SETUP_ACCOUNT'
  }
}

export function createAccount() {
  return {
    type: 'CREATE_ACCOUNT'
  }
}

export function restoreAccount() {
  return {
    type: 'RESTORE_ACCOUNT'
  }
}

export function setAccount(email, account) {
  return {
    type: 'SET_ACCOUNT',
    email,
    account
  }
}

export function goHome() {
  return {
    type: 'GO_HOME'
  }
}

export function goLounge() {
  return {
    type: 'GO_LOUNGE'
  }
}

export function goBack() {
  return {
    type: 'GO_BACK'
  }
}

export function getProfile() {
  return {
    type: 'GET_PROFILE',
  }
}

export function setProfile(profile, balance = 0, isDoctor = false) {
  return {
    type: 'SET_PROFILE',
    profile,
    balance,
    isDoctor
  }
}

export function registerLicense() {
  return {
    type: 'REGISTER_LICENSE'
  }
}

export function licenseRegistered(doctor) {
  return {
    type: 'LICENSE_REGISTERED',
    doctor
  }
}

export function setPatients(patients=[]) {
  return {
    type: 'SET_PATIENTS',
    patients
  }
}

export function addPatient(email, account, profile) {
  return {
    type: 'ADD_PATIENT',
    email,
    account,
    profile
  }
}

export function getPatient() {
  return {
    type: 'GET_PATIENT'
  }
}

export function writeHistory(email, account, profile) {
  return {
    type: 'WRITE_HISTORY',
    email,
    account,
    profile
  }
}

export function setHistories(histories) {
  return {
    type: 'SET_HISTORIES',
    histories,
  }
}
