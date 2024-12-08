import {part1, part2} from "../src/day7.ts";

describe("Day 7", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const actual = part1(
                [
                    "190: 10 19",
                    "3267: 81 40 27",
                    "83: 17 5",
                    "156: 15 6",
                    "7290: 6 8 6 15",
                    "161011: 16 10 13",
                    "192: 17 8 14",
                    "21037: 9 7 18 13",
                    "292: 11 6 16 20",
                ]
            );

            expect(actual).toBe(3749);
        });

        it("one addition", () => {
            const actual = part1(
                [
                    "29: 10 19",
                ]
            );

            expect(actual).toBe(29);
        });

        it("one multiplication", () => {
            const actual = part1(
                [
                    "190: 10 19",
                ]
            );

            expect(actual).toBe(190);
        });

        it("combination of operators", () => {
            const actual = part1(
                [
                    "191: 10 19 1",
                ]
            );

            expect(actual).toBe(191);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const actual = part2(
                [
                    "190: 10 19",
                    "3267: 81 40 27",
                    "83: 17 5",
                    "156: 15 6",
                    "7290: 6 8 6 15",
                    "161011: 16 10 13",
                    "192: 17 8 14",
                    "21037: 9 7 18 13",
                    "292: 11 6 16 20",
                ]
            );

            expect(actual).toBe(11387);
        });
    });
});