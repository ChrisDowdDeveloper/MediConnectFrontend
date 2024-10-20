export interface PatientFormState {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    email: string;
    password: string;
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactPhoneNumber: string;
}

export interface DoctorFormState {
    availability: string;
    email: string;
    firstName: string;
    lastName: string;
    specialty: string;
    officeAddress: string;
    password: string;
    userName: string;
    yearsOfExperience: number;
}