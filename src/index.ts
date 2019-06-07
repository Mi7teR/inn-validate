import {
  Params,
  IIN,
  BIN,
  LegalEntityType,
  AgencyTypes,
  ReadableLegalEntityTypes,
  ReadableAgencyTypes
} from "./interfaces";

function validateSequence(numbers: number[]): boolean {
  const standartSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const alternativeSequence = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
  let controlDigit: number;

  if (numbers.length !== 12) {
    return false;
  }

  controlDigit =
    standartSequence.reduce(
      (accumulator: number, currentValue: number, index: number): number =>
        accumulator + currentValue * numbers[index]
    ) % 11;
  if (controlDigit === 10) {
    controlDigit =
      alternativeSequence.reduce(
        (accumulator: number, currentValue: number, index: number): number =>
          accumulator + currentValue * numbers[index]
      ) % 11;
  }

  return controlDigit < 10;
}

function inRange(needle: number, min: number, max: number): boolean {
  return needle >= min && needle <= max;
}

function getNumberList(numbers: string): number[] {
  return numbers.split("").map((n: string): number => parseInt(n, 10));
}

function isIIN(typeNumber: number): boolean {
  if (!inRange(typeNumber, 0, 6)) {
    throw new Error("invalid identification number");
  }
  return typeNumber < 4;
}

function parseIIN(numbers: number[]): IIN {
  let year = "";
  let sex = false;
  const month = parseInt(`${numbers[2]}${numbers[3]}`, 10) - 1;
  if (!inRange(month, 0, 11)) {
    throw new Error("invalid month");
  }
  const day = parseInt(`${numbers[4]}${numbers[5]}`, 10);
  if (!inRange(numbers[6], 1, 6)) {
    throw new Error("invalid sex or epoch");
  }
  switch (numbers[6]) {
    case 1: {
      sex = true;
    }
    case 2: {
      year = `18${numbers[0]}${numbers[1]}`;
      break;
    }
    case 3: {
      sex = true;
    }
    case 4: {
      year = `19${numbers[0]}${numbers[1]}`;
      break;
    }
    case 5: {
      sex = true;
    }
    case 6: {
      year = `20${numbers[0]}${numbers[1]}`;
      break;
    }
  }
  const isLeapYear = parseInt(year, 10) % 4 === 0;
  if (
    !inRange(day, 1, 31) ||
    (isLeapYear && month === 1 && !inRange(day, 1, 29))
  ) {
    throw new Error("invalid day");
  }
  return {
    birthDate: new Date(parseInt(year, 10), month, day),
    sex: sex
  };
}

function parseBIN(numbers: number[]): BIN {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let year: number;

  year = parseInt(`${numbers[0]}${numbers[1]}`, 10);
  year = currentYear - 2000 >= year ? 2000 + year : 1900 + year;

  const month = parseInt(`${numbers[2]}${numbers[3]}`, 10) - 1;
  if (!inRange(month, 0, 11)) {
    throw new Error("invalid month");
  }
  const registrationDate = new Date(year, month);

  return {
    registrationDate: registrationDate,
    type: LegalEntityType[numbers[4]] as ReadableLegalEntityTypes,
    agencyType: AgencyTypes[numbers[5]] as ReadableAgencyTypes
  };
}

export function validateINN(params: Params): IIN | BIN | boolean {
  const INNumbers = getNumberList(params.identificationNumber);
  const isValidSequence = validateSequence(INNumbers);
  if (!isValidSequence) {
    return false;
  }
  let result: IIN | BIN | boolean = false;
  try {
    if (isIIN(INNumbers[4])) {
      result = parseIIN(INNumbers);
    } else {
      result = parseBIN(INNumbers);
    }
    if (!params.details) {
      result = true;
    }
  } catch (e) {
    if (params.debug) {
      console.log(e);
    }
    result = false;
  } finally {
    return result;
  }
}
