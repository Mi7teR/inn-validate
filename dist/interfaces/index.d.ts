export interface IIN {
    birthDate: Date;
    sex: boolean;
}
export declare enum LegalEntityType {
    Resident = 4,
    NonResident = 5,
    IndividualEnterpreneur = 6
}
export declare enum AgencyTypes {
    HeadOffice = 0,
    Branch = 1,
    Agency = 2,
    Farm = 3
}
export declare type ReadableLegalEntityTypes = keyof typeof LegalEntityType;
export declare type ReadableAgencyTypes = keyof typeof AgencyTypes;
export interface BIN {
    registrationDate: Date;
    type: ReadableLegalEntityTypes;
    agencyType: ReadableAgencyTypes;
}
export interface Params {
    identificationNumber: string;
    details?: boolean;
    debug?: boolean;
}
