export function part1(lines: string[]): number {
    const [line] = lines;

    let initialStones = line.split(" ")
        .map(num => +num);

    for (let i = 0; i < 25; i++) {
        initialStones = oneBlink(initialStones);
    }

    return initialStones.length;
}

const oneBlink = (stones: number[]): number[] => {
    const newStoneArrangement: number[] = [];

    for (const stone of stones) {
        const stoneString = `${stone}`;
        if (stone === 0) {
            newStoneArrangement.push(1);
        } else if (stoneString.length % 2 == 0) {
            newStoneArrangement.push(
                +stoneString.substring(0, stoneString.length / 2),
                +stoneString.substring(stoneString.length / 2)
            )
        } else {
            newStoneArrangement.push(stone * 2024)
        }
    }

    return newStoneArrangement;
}

export function part2(lines: string[]): number {
    const [line] = lines;

    let stones: Map<number, number> = new Map();

    line.split(" ")
        .map(num => +num)
        .forEach(
            stone => stones.set(stone, 1)
        );

    for (let i = 0; i < 75; i++) {
        stones = mapAfterOneBlink(stones);
    }

    return Array.from(stones.entries())
        .map(([_, b]) => b)
        .reduce((l, r) => l + r, 0);
}

const mapAfterOneBlink = (stones: Map<number, number>): Map<number, number> => {
    const newStones: Map<number, number> = new Map();

    for (const [stone, amount] of stones) {

        const [newStone1, newStone2] = newStonesFrom(stone);

        newStones.set(newStone1, amount + (newStones.get(newStone1) || 0));
        if (newStone2 !== undefined)
            newStones.set(newStone2, amount + (newStones.get(newStone2) || 0));
    }
    return newStones;
}

const newStonesFrom = (stone: number): [number, number | undefined] => {
    const stoneString = `${stone}`;

    if (stone === 0) {
        return [1, undefined];
    } else if (stoneString.length % 2 == 0) {
        return [
            +stoneString.substring(0, stoneString.length / 2),
            +stoneString.substring(stoneString.length / 2)
        ];
    } else {
        return [stone * 2024, undefined];
    }
}
