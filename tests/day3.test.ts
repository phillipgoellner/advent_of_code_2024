import {part1, part2} from "../src/day3.ts";

describe("Day 3", () => {
    describe("Part 1", () => {
        it("acceptance", () => {
            const accumulatedErrors = part1(
                [
                    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
                ]
            );

            expect(accumulatedErrors).toBe(161);
        });
    });

    describe("Part 2", () => {
        it("acceptance", () => {
            const accumulatedErrors = part2(
                [
                    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
                ]
            );

            expect(accumulatedErrors).toBe(48);
        });
        it("multi line", () => {
            const accumulatedErrors = part2(
                [
                    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+",
                    "mul(32,64](mul(11,8)undo()?mul(8,5))",
                ]
            );

            expect(accumulatedErrors).toBe(48);
        });
    });
});