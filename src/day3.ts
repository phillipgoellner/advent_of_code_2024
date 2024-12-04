export function part1(lines: string[]): number {
    return lines.map(oneLine).reduce((l, r) => l + r, 0);
}

const oneLine = (line: string): number => {
    let re = /mul\((?<left>\d{1,3}),(?<right>\d{1,3})\)/g;
    let m;
    let multiplicationSum = 0;

    do {
        m = re.exec(line)?.groups;
        if (m) {
            multiplicationSum += +m["left"] * (+m["right"]);
        }
    } while (m);

    return multiplicationSum;
}

export function part2(lines: string[]): number {
    return oneLine(cleanLine(lines.reduce((l, r) => l + r, "")));
}

const cleanLine = (line: string): string => {
    const re1 = /don't\(\).*?do\(\)/g;
    const re2 = /don't\(\).*/g;
    return line.replaceAll(re1, "").replaceAll(re2, "");
}
