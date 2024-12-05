const run = async () => {
    for (let i = 1; i <= 4; i++) {
        const puzzleInput = (await Bun.file(`inputs/day${i}.txt`).text()).split("\n");

        const resultPart1 = (await import(`./day${i}.ts`)).part1(puzzleInput);
        const resultPart2 = (await import(`./day${i}.ts`)).part2(puzzleInput);

        console.log(`----- Day ${i} -----
Part 1: ${resultPart1}
Part 2: ${resultPart2}`)
    }
}

run().then();
