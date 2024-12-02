export function part1(lines: string[]): number {
    return lines
        .map(line => line.split(" ").map(token => +token))
        .map(report => isSafe(report))
        .filter(safe => safe)
        .length;
}

const isSafe = (report: number[]): boolean => {
    return isStrictlyMonotonous(report) && onlySmallChanges(report);
}

const isStrictlyMonotonous = (report: number[]) => {
    let isStrictlyIncreasing = true;
    let isStrictlyDecreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
        isStrictlyIncreasing = isStrictlyIncreasing && report[i] < report[i + 1];
        isStrictlyDecreasing = isStrictlyDecreasing && report[i] > report[i + 1];
    }

    return isStrictlyIncreasing || isStrictlyDecreasing;
}

const onlySmallChanges = (report: number[]) => {
    for (let i = 0; i < report.length - 1; i++) {
        const delta = Math.abs(report[i] - report[i + 1]);
        if (delta < 1 || delta > 3) {
            return false;
        }
    }
    return true;
}

export function part2(lines: string[]): number {
    const initiallyUnsafe = lines
        .map(line => line.split(" ").map(token => +token))
        .filter(report => !isSafe(report));

    let isSafeWhenDamped = 0;

    for (let i = 0; i < initiallyUnsafe.length; i++) {
        const report = initiallyUnsafe[i];

        for (let j = 0; j < report.length; j++) {
            if (isSafe(report.toSpliced(j, 1))) {
                isSafeWhenDamped++;
                break;
            }
        }
    }

    return part1(lines) + isSafeWhenDamped;
}
