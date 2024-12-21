import {part1, part2} from "../src/day10.ts";

describe("Day 10", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const actual = part1(
                [
                    "89010123",
                    "78121874",
                    "87430965",
                    "96549874",
                    "45678903",
                    "32019012",
                    "01329801",
                    "10456732",
                ]
            );

            expect(actual).toBe(36);
        });

        it("one trail", () => {
            const actual = part1(
                [
                    "0123",
                    "1234",
                    "7765",
                    "9876",
                ]
            );

            expect(actual).toBe(1);
        });

        it("trail with score two", () => {
            const actual = part1(
                [
                    "9990999",
                    "9991999",
                    "9992999",
                    "6543456",
                    "7999997",
                    "8222228",
                    "9222229",
                ]
            );

            expect(actual).toBe(2);
        });

        it("two trail heads with score one each", () => {
            const actual = part1(
                [
                    "9990999",
                    "9991099",
                    "9992999",
                    "6543456",
                    "7999997",
                    "8222228",
                    "9222229",
                ]
            );

            expect(actual).toBe(4);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const actual = part2(
                [
                    "89010123",
                    "78121874",
                    "87430965",
                    "96549874",
                    "45678903",
                    "32019012",
                    "01329801",
                    "10456732",
                ]
            );

            expect(actual).toBe(81);
        });

        it("rating of three", () => {
            const actual = part2(
                [
                    "2222202",
                    "2243218",
                    "2252828",
                    "2265432",
                    "2272242",
                    "2287652",
                    "2292222",
                ]
            );

            expect(actual).toBe(3);
        });

        it("high rating", () => {
            const actual = part2(
                [
                    "012345",
                    "123456",
                    "234567",
                    "345678",
                    "426789",
                    "567892",
                ]
            );

            expect(actual).toBe(227);
        });
    });
});