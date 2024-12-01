import {part1, part2} from "../src/day1.ts";

describe("Day 1", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const accumulatedErrors = part1(
                [
                    "3   4",
                    "4   3",
                    "2   5",
                    "1   3",
                    "3   9",
                    "3   3",
                ]
            );

            expect(accumulatedErrors).toBe(11);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const accumulatedErrors = part2(
                [
                    "3   4",
                    "4   3",
                    "2   5",
                    "1   3",
                    "3   9",
                    "3   3",
                ]
            );

            expect(accumulatedErrors).toBe(31);
        });
    });
});