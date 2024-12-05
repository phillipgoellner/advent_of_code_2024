import {part1, part2} from "../src/day4.ts";

describe("Day 4", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const actual = part1(
                [
                    "MMMSXXMASM",
                    "MSAMXMSMSA",
                    "AMXSXMAAMM",
                    "MSAMASMSMX",
                    "XMASAMXAMM",
                    "XXAMMXXAMA",
                    "SMSMSASXSS",
                    "SAXAMASAAA",
                    "MAMMMXMMMM",
                    "MXMXAXMASX",
                ]
            );

            expect(actual).toBe(18);
        });

        it("twice in same line", () => {
            const actual = part1(
                [
                    "XMASXMAS",
                ]
            );

            expect(actual).toBe(2);
        });

        it("reversed and normal in one line", () => {
            const actual = part1(
                [
                    "XMASAMX",
                ]
            );

            expect(actual).toBe(2);
        });

        it("in column", () => {
            const actual = part1(
                [
                    "XM",
                    "MM",
                    "AM",
                    "SM",
                ]
            );

            expect(actual).toBe(1);
        });

        it("reverse in column", () => {
            const actual = part1(
                [
                    "XSM",
                    "MAM",
                    "AMM",
                    "SXM",
                ]
            );

            expect(actual).toBe(2);
        });

        it("in TL-LR diagonal", () => {
            const actual = part1(
                [
                    "XMMM",
                    "MMMM",
                    "MMAM",
                    "MXMS",
                ]
            );

            expect(actual).toBe(1);
        });

        it("in reverse TL-LR diagonal", () => {
            const actual = part1(
                [
                    "SMMM",
                    "MAMM",
                    "MMMM",
                    "MXMX",
                ]
            );

            expect(actual).toBe(1);
        });

        it("in TR-LL diagonal", () => {
            const actual = part1(
                [
                    "LMMX",
                    "MMMM",
                    "MAAM",
                    "SMMR",
                ]
            );

            expect(actual).toBe(1);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const actual = part2(
                [
                    "MMMSXXMASM",
                    "MSAMXMSMSA",
                    "AMXSXMAAMM",
                    "MSAMASMSMX",
                    "XMASAMXAMM",
                    "XXAMMXXAMA",
                    "SMSMSASXSS",
                    "SAXAMASAAA",
                    "MAMMMXMMMM",
                    "MXMXAXMASX",
                ]
            );

            expect(actual).toBe(9);
        });

        it("left to right", () => {
            const actual = part2(
                [
                    "M.S",
                    "AA.",
                    "M.S",
                ]
            );

            expect(actual).toBe(1);
        });

        it("right to left", () => {
            const actual = part2(
                [
                    "S.M",
                    "AA.",
                    "S.M",
                ]
            );

            expect(actual).toBe(1);
        });

        it("top to bottom", () => {
            const actual = part2(
                [
                    "M.M",
                    "AA.",
                    "S.S",
                ]
            );

            expect(actual).toBe(1);
        });

        it("bottom to top", () => {
            const actual = part2(
                [
                    "S.S",
                    "AA.",
                    "M.M",
                ]
            );

            expect(actual).toBe(1);
        });
    });
});