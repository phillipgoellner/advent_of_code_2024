export function part1(lines: string[]): number {
    return lines
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        lines
            .map(line => line.split('').reverse().join(''))
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        pivot(lines)
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        pivot(lines)
            .map(line => line.split('').reverse().join(''))
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        diagonal(lines)
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        diagonal(lines)
            .map(line => line.split('').reverse().join(''))
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        reverseDiagonal(lines)
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0)

        +

        reverseDiagonal(lines)
            .map(line => line.split('').reverse().join(''))
            .map(occurrencesInLine)
            .reduce((l, r) => l + r, 0);
}

const occurrencesInLine = (line: string): number => {
    return (line.match(/XMAS/g) || []).length;
}

const pivot = (lines: string[]): string[] => {
    let pivoted: string[] = [];

    for (let col = 0; col < lines[0].length; col++) {
        for (const element of lines) {
            pivoted[col] = pivoted[col] || "";
            pivoted[col] += element.charAt(col);
        }
    }

    return pivoted;
}

const diagonal = (lines: string[]): string[] => {
    let diagonals: string[] = [];

    for (let verschiebung = 1 - lines[0].length; verschiebung < lines.length; verschiebung++) {
        let newLine = "";
        for (let start = 0; start < lines.length; start++) {
            const char = lines[start].charAt(start + verschiebung);
            if (char) {
                newLine += char;
            }
        }
        diagonals.push(newLine);
    }

    return diagonals;
}

const reverseDiagonal = (lines: string[]): string[] => {
    let diagonals: string[] = [];

    for (let row = (lines.length + lines[0].length) - 2; row >= 0; row--) {
        let newLine = "";
        for (let i = 0; i < lines.length; i++) {
            const char = lines[i]?.charAt(row - i);

            if (char) {
                newLine += char;
            }
        }
        diagonals.push(newLine);
    }

    return diagonals;
}

export function part2(lines: string[]): number {
    let aLocations: Location[] = [];

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[0].length; col++) {
            if (lines[row].charAt(col) === "A") {
                aLocations.push({row, col})
            }
        }
    }

    /*
        M.S
        AA.
        M.S
    */

    return aLocations.filter(location => {
        const firstWord = `${lines[location.row - 1]?.charAt(location.col - 1)}A${lines[location.row + 1]?.charAt(location.col + 1)}`;
        const secondWord = `${lines[location.row + 1]?.charAt(location.col - 1)}A${lines[location.row - 1]?.charAt(location.col + 1)}`;

        return firstWord === "MAS" && secondWord === "MAS" ||
            firstWord === "SAM" && secondWord === "SAM" ||
            firstWord === "MAS" && secondWord === "SAM" ||
            firstWord === "SAM" && secondWord === "MAS";
    }).length
}

interface Location {
    row: number;
    col: number;
}

