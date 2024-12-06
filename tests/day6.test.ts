import {part1, part2} from "../src/day6.ts";

describe("Day 6", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const actual = part1(
                [
                    "....#.....",
                    ".........#",
                    "..........",
                    "..#.......",
                    ".......#..",
                    "..........",
                    ".#..^.....",
                    "........#.",
                    "#.........",
                    "......#...",
                ]
            );

            expect(actual).toBe(41);
        });

        it("only one step", () => {
            const actual = part1(
                [
                    ".#..^.....",
                ]
            );

            expect(actual).toBe(1);
        });

        it("two steps", () => {
            const actual = part1(
                [
                    ".#........",
                    ".#..^.....",
                ]
            );

            expect(actual).toBe(2);
        });

        it("one turn", () => {
            const actual = part1(
                [
                    ".#..#.....",
                    ".#........",
                    ".#..^.....",
                ]
            );

            expect(actual).toBe(7);
        });

        it("all directions", () => {
            const actual = part1(
                [
                    ".#..#.....",
                    ".#.....#..",
                    ".#..^.....",
                    "..#.......",
                    "......#...",
                ]
            );

            expect(actual).toBe(12);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const actual = part2(
                [
                    "....#.....",
                    ".........#",
                    "..........",
                    "..#.......",
                    ".......#..",
                    "..........",
                    ".#..^.....",
                    "........#.",
                    "#.........",
                    "......#...",
                ]
            );

            expect(actual).toBe(6);
        });

        it("one loop", () => {
            const actual = part2(
                [
                    "..#.......",
                    ".......#..",
                    "..........",
                    ".#..^.....",
                    "......#...",
                ]
            );

            expect(actual).toBe(1);
        });
    });
});