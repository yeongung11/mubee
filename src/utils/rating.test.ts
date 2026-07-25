import {
    describe,
    expect,
    it,
} from "vitest";
import { convertFive } from "./rating";

describe("convertFive", () => {
    it("10점은 5.0점으로 변환", () => {
        expect(convertFive(10)).toBe("5.0");
    });

    it("7점은 3.5점으로 변환", () => {
        expect(convertFive(7)).toBe("3.5");
    });

    it("0점은 0.0점으로 변환", () => {
        expect(convertFive(0)).toBe("0.0");
    });

    it("소수점 결과를 한 자리로 반올림", () => {
        expect(convertFive(8.5)).toBe("4.3");
    });
});