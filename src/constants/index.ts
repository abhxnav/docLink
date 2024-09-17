export const GenderOptions = ['Male', 'Female', 'Other']

export const PatientFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'Male' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  patientConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
}

export const Doctors = [
  {
    image: '/assets/images/doctor.png',
    name: 'John Green',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Leila Cameron',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'David Livingston',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Evan Peter',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Jane Powell',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Alex Ramirez',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Jasmine Lee',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Alyana Cruz',
  },
  {
    image: '/assets/images/doctor.png',
    name: 'Hardik Sharma',
  },
]

export const IdTypes = [
  "Driver's License",
  'AADHAAR Card',
  'Passport',
  'Voter ID Card',
]
