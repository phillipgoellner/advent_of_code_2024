export function part1(lines: string[]) {
    const l = left(lines);
    const r = right(lines);

    let errorSum = 0;

    for (let i = 0; i < l.length; i++) {
        errorSum += Math.abs(l[i] - r[i]);
    }

    return errorSum;
}

export function part2(lines: string[]) {
    const l = left(lines);
    const r = right(lines);

    let similarityScore = 0;

    for (let i = 0; i < l.length; i++) {
        const currentNumber = l[i];
        const occurrences = r.filter(num => num === currentNumber).length;
        similarityScore += currentNumber * occurrences;
    }

    return similarityScore;
}

const left = (lines: string[]) => lines
    .map(line => line.split(" ").filter(token => token != ""))
    .map(([l, _]) => l)
    .map(token => +token)
    .toSorted();

const right = (lines: string[]) => lines
    .map(line => line.split(" ").filter(token => token != ""))
    .map(([_, r]) => r)
    .map(token => +token)
    .toSorted();
