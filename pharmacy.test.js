import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {

  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("should throw an error if benefit is greater than 50", () => {
    expect(() => new Pharmacy([new Drug("test", 2, 55)]).updateBenefitValue()).toThrow("Benefit can not be superior to 50")
  });

  it("should throw an error if benefit is less than 0", () => {
    expect(() => new Pharmacy([new Drug("test", 2, -1)]).updateBenefitValue()).toThrow("Benefit can not be inferior to 0")
  });

});

describe("Magic Pill", () => {

  it("never expires nor decreases in Benefit", () => {
    expect(new Pharmacy([new Drug("Magic Pill", 18, 4)]).updateBenefitValue()).toEqual(
      [new Drug("Magic Pill", 18, 4)],
    );
  });

});

describe("Herbal Tea", () => {

  it("should increases in Benefit the older it gets.", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 22, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 21, 11)],
    );
  });

  it("should increases benefit twice as fast after the expiration date", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", -1, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -2, 5)],
    );
  });

});

describe("Fervex", () => {

  it("should increase benefit from 1 and decrease expiresIn from 1", () => {
    expect(new Pharmacy([new Drug("Fervex", 11, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 10, 4)],
    );
  });

  it("should increase benefit from 2 and decrease expiresIn from 1", () => {
    expect(new Pharmacy([new Drug("Fervex", 10, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 9, 5)],
    );
  });

  it("should increase benefit from 3 and decrease expiresIn from 1", () => {
    expect(new Pharmacy([new Drug("Fervex", 5, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 4, 6)],
    );
  });

  it("should drop benefit to 0 and decrease expiresIn from 1", () => {
    expect(new Pharmacy([new Drug("Fervex", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", -1, 0)],
    );
  });

});

describe("Dafalgan", () => {

  it("should degrades in Benefit twice as fast as normal drugs, with expiredAt > 0", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 22, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", 21, 8)],
    );
  });

  it("should degrades in Benefit twice as fast as normal drugs, with expiredAt < 0", () => {
    expect(new Pharmacy([new Drug("Dafalgan", -2, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", -3, 6)],
    );
  });

});

describe("Doliprane", () => {

  it("should decrease expiredAt and increase Benefit from 1", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 22, 10)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", 21, 8)],
    );
  });

});