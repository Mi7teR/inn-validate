export interface IIN { //eslint-disable-line
  birthDate: Date;
  sex: boolean;
}

export enum LegalEntityType {
  Resident = 4,
  NonResident,
  IndividualEnterpreneur
}
export enum AgencyTypes {
  HeadOffice,
  Branch,
  Agency,
  Farm
}
export type ReadableLegalEntityTypes = keyof typeof LegalEntityType;

export type ReadableAgencyTypes = keyof typeof AgencyTypes;

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
