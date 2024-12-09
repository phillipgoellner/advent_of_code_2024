import {part1, part2} from "../src/day9.ts";

describe("Day 9", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const actual = part1(
                [
                    "2333133121414131402",
                ]
            );

            expect(actual).toBe(1928);
        });

        it("without rearranging", () => {
            const actual = part1(
                [
                    "20101", // -> 0012
                ]
            );

            expect(actual).toBe(8);
        });

        it("single rearrangement", () => {
            const actual = part1(
                [
                    "211", // -> 00.1
                ]
            );

            expect(actual).toBe(2);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const actual = part2(
                [
                    "2333133121414131402",
                ]
            );

            expect(actual).toBe(2858);
        });

        it("without rearranging", () => {
            const actual = part2(
                [
                    "20101", // -> 0012
                ]
            );

            expect(actual).toBe(8);
        });

        it("fits exactly", () => {
            const actual = part2(
                [
                    "211",
                ]
            );

            expect(actual).toBe(2);
        });

        it("fits with leftover", () => {
            const actual = part2(
                [
                    "22201", // 00..112 -> 002.11.
                ]
            );

            expect(actual).toBe(13);
        });

        it("fits twice exactly", () => {
            const actual = part2(
                [
                    "2220101", // 00..1123 -> 003211..
                ]
            );

            expect(actual).toBe(21);
        });
    });
});