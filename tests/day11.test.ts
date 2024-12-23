import {part1, part2} from "../src/day11.ts";

describe("Day 11", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const actual = part1(
                [
                    "125 17",
                ]
            );

            expect(actual).toBe(55312);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const actual = part2(
                [
                    "125 17",
                ]
            );

            expect(actual).toBe(65601038650482);
        });
    });
});