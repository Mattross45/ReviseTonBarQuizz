import { getWeekInFrench } from "@/core/date-utils";
import { describe, expect, it } from "vitest";

describe("getWeekInFrench", () => {
  it("should get the correct dates", () => {
    expect(getWeekInFrench(new Date(2023, 0, 1))).toEqual([
      "26_décembre",
      "27_décembre",
      "28_décembre",
      "29_décembre",
      "30_décembre",
      "31_décembre",
      "1_janvier",
    ]);
    expect(getWeekInFrench(new Date(2023, 3, 15))).toEqual([
      "10_avril",
      "11_avril",
      "12_avril",
      "13_avril",
      "14_avril",
      "15_avril",
      "16_avril",
    ]);
  });
});
