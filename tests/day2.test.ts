import {part1, part2} from "../src/day2.ts";

describe("Day 2", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const accumulatedErrors = part1(
                [
                    "7 6 4 2 1",
                    "1 2 7 8 9",
                    "9 7 6 2 1",
                    "1 3 2 4 5",
                    "8 6 4 4 1",
                    "1 3 6 7 9",
                ]
            );

            expect(accumulatedErrors).toBe(2);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const accumulatedErrors = part2(
                [
                    "7 6 4 2 1",
                    "1 2 7 8 9",
                    "9 7 6 2 1",
                    "1 3 2 4 5",
                    "8 6 4 4 1",
                    "1 3 6 7 9",
                ]
            );

            expect(accumulatedErrors).toBe(4);
        });
    });
});