/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { validateINN } from "./index";

test("valid IIN 811201401188 boolean", () => {
  expect(validateINN({ identificationNumber: "811201401188" })).toBe(true);
});

test("invalid INN", () => {
  expect(validateINN({ identificationNumber: "123456789123" })).toBe(false);
});

test("valid BIN 971240001315 boolean", () => {
  expect(validateINN({ identificationNumber: "971240001315" })).toBe(true);
});

test("valid IIN 811201401188 with details", () => {
  expect(
    validateINN({ identificationNumber: "811201401188", details: true })
  ).toStrictEqual({
    birthDate: new Date(1981, 11, 1),
    sex: false
  });
});

test("valid BIN 971240001315 with details", () => {
  expect(
    validateINN({ identificationNumber: "971240001315", details: true })
  ).toStrictEqual({
    registrationDate: new Date(1997, 11),
    type: "Resident",
    agencyType: "HeadOffice"
  });
});
