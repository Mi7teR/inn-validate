import { LegalEntityType, AgencyTypes } from "./interfaces";
function validateSequence(numbers) {
    var standartSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var alternativeSequence = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
    var controlDigit;
    if (numbers.length !== 12) {
        return false;
    }
    controlDigit =
        standartSequence.reduce(function (accumulator, currentValue, index) {
            return accumulator + currentValue * numbers[index];
        }) % 11;
    if (controlDigit === 10) {
        controlDigit =
            alternativeSequence.reduce(function (accumulator, currentValue, index) {
                return accumulator + currentValue * numbers[index];
            }) % 11;
    }
    return controlDigit < 10;
}
function inRange(needle, min, max) {
    return needle >= min && needle <= max;
}
function getNumberList(numbers) {
    return numbers.split("").map(function (n) { return parseInt(n, 10); });
}
function isIIN(typeNumber) {
    if (!inRange(typeNumber, 0, 6)) {
        throw new Error("invalid identification number");
    }
    return typeNumber < 4;
}
function parseIIN(numbers) {
    var year = "";
    var sex = false;
    var month = parseInt("" + numbers[2] + numbers[3], 10) - 1;
    if (!inRange(month, 0, 11)) {
        throw new Error("invalid month");
    }
    var day = parseInt("" + numbers[4] + numbers[5], 10);
    if (!inRange(numbers[6], 1, 6)) {
        throw new Error("invalid sex or epoch");
    }
    switch (numbers[6]) {
        case 1: {
            sex = true;
        }
        case 2: {
            year = "18" + numbers[0] + numbers[1];
            break;
        }
        case 3: {
            sex = true;
        }
        case 4: {
            year = "19" + numbers[0] + numbers[1];
            break;
        }
        case 5: {
            sex = true;
        }
        case 6: {
            year = "20" + numbers[0] + numbers[1];
            break;
        }
    }
    var isLeapYear = parseInt(year, 10) % 4 === 0;
    if (!inRange(day, 1, 31) ||
        (isLeapYear && month === 1 && !inRange(day, 1, 29))) {
        throw new Error("invalid day");
    }
    return {
        birthDate: new Date(parseInt(year, 10), month, day),
        sex: sex
    };
}
function parseBIN(numbers) {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var year;
    year = parseInt("" + numbers[0] + numbers[1], 10);
    year = currentYear - 2000 >= year ? 2000 + year : 1900 + year;
    var month = parseInt("" + numbers[2] + numbers[3], 10) - 1;
    if (!inRange(month, 0, 11)) {
        throw new Error("invalid month");
    }
    var registrationDate = new Date(year, month);
    return {
        registrationDate: registrationDate,
        type: LegalEntityType[numbers[4]],
        agencyType: AgencyTypes[numbers[5]]
    };
}
export function validateINN(params) {
    var INNumbers = getNumberList(params.identificationNumber);
    var isValidSequence = validateSequence(INNumbers);
    if (!isValidSequence) {
        return false;
    }
    var result = false;
    try {
        if (isIIN(INNumbers[4])) {
            result = parseIIN(INNumbers);
        }
        else {
            result = parseBIN(INNumbers);
        }
        if (!params.details) {
            result = true;
        }
    }
    catch (e) {
        if (params.debug) {
            console.log(e);
        }
        result = false;
    }
    finally {
        return result;
    }
}
