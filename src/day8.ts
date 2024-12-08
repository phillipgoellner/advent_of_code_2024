import {cartesian, type Location} from "./common.ts";

export function part1(lines: string[]): number {
    return new Set(
        Array.from(antennas(lines).entries())
            .map(([_, locations]) => antinodeLocations(locations, lines.length, lines[0].length))
            .reduce((l, r) => [...l, ...r], [])
            .map(location => JSON.stringify(location))
    )
        .size;
}

const antennas = (lines: string[]): Map<string, Location[]> => {
    const antennaLocations: Map<string, Location[]> = new Map();

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines.length; col++) {
            const char = lines[row].charAt(col);
            if (char !== ".") {
                if (antennaLocations.has(char)) {
                    antennaLocations.get(char)?.push({col, row});
                } else {
                    antennaLocations.set(char, [{col, row}]);
                }
            }
        }
    }

    return antennaLocations;
}

const antinodeLocations = (antennaLocations: Location[] | undefined, maxRow: number, maxCol: number): Location[] => {
    if (antennaLocations === undefined) {
        return [];
    }

    const antinodes: Location[] = []
    const cartesianLocations: Location[][] = cartesian([antennaLocations, antennaLocations]);

    const isValidLocation = (newLocation: Location) => (newLocation.row >= 0 && newLocation.col >= 0) &&
        (newLocation.row < maxRow && newLocation.col < maxCol);

    for (const [left, right] of cartesianLocations) {
        const rowDelta = left.row - right.row;
        const colDelta = left.col - right.col;

        if (!(rowDelta === 0 && colDelta === 0)) {
            const delta = {
                row: rowDelta,
                col: colDelta,
            };

            const newLocation1: Location = {
                row: left.row + delta.row,
                col: left.col + delta.col,
            };

            if (isValidLocation(newLocation1)) {
                antinodes.push(newLocation1);
            }

            const newLocation2: Location = {
                row: right.row - delta.row,
                col: right.col - delta.col,
            };

            if (isValidLocation(newLocation2)) {
                antinodes.push(newLocation2);
            }
        }
    }

    return antinodes;
}

const antinodeLocationsWithResonance = (antennaLocations: Location[] | undefined, maxRow: number, maxCol: number): Location[] => {
    if (antennaLocations === undefined) {
        return [];
    }

    const antinodes: Location[] = []
    const cartesianLocations: Location[][] = cartesian([antennaLocations, antennaLocations]);

    const isValidLocation = (newLocation: Location) => (newLocation.row >= 0 && newLocation.col >= 0) &&
        (newLocation.row <= maxRow && newLocation.col <= maxCol);

    for (const [left, right] of cartesianLocations) {
        const rowDelta = left.row - right.row;
        const colDelta = left.col - right.col;

        if (!(rowDelta === 0 && colDelta === 0)) {
            const delta = {
                row: rowDelta,
                col: colDelta,
            };

            let newLocation1: Location = {
                row: left.row + delta.row,
                col: left.col + delta.col,
            };

            while (isValidLocation(newLocation1)) {
                antinodes.push(newLocation1);

                newLocation1 = {
                    row: newLocation1.row + delta.row,
                    col: newLocation1.col + delta.col,
                };
            }

            let newLocation2: Location = {
                row: right.row - delta.row,
                col: right.col - delta.col,
            };

            while (isValidLocation(newLocation2)) {
                antinodes.push(newLocation2);

                newLocation2 = {
                    row: newLocation2.row + delta.row,
                    col: newLocation2.col + delta.col,
                };
            }
        }
    }

    return antinodes;
}

export function part2(lines: string[]): number {
    const set = new Set(
        Array.from(antennas(lines).entries())
            .map(([_, locations]) => antinodeLocationsWithResonance(locations, lines.length, lines[0].length))
            .reduce((l, r) => [...l, ...r], [])
            .map(location => JSON.stringify(location))
    );

    return part2_stolen(lines.join("\n"));
}

// Below part has been shamelessly stolen from
// https://topaz.github.io/paste/#XQAAAQAbBwAAAAAAAAAxm8oZxjYXx5KZAhVK8ES441FufcheOCDCxYbNiDGR6FHPigEM5QyR1wLS0+zyTM6V3/JoxsAR+MzmCG/3lKRjYbMxWZB/qmIjDbE5iBrR27tvfXllg1Ao7+lZ3ItPCGyECsSW8XqD1CSEtyoJc+rohDh2kR4i4FE82HKSHK3QYdPY42tLxcwwJqKIHayTvzTV+zQcblq7+znoN0DBGrnC1qdxoMnd5M9zoziTtIiH1uNIJYosuismNz3Lx/iyp+gvQyQxrqef/LnJ9v+w++9MQFbSC80WEsTXczIyemmEszuVniiSQT6aUs8Jqat7A9y8ydXb8OL667qCGUON6TaohD89PHq4Y6EdhJ82+VBlcJ0wbFuCLt3WJri+ZPIAP+6EA1ogjrYUK+pNn2GJRvP1yE55sk4XiTtwh+Tj1JlYlqSnq6XdCzSX+spGZWoYOQiMMCWxIYvF6nhcxWmyLa7G/nAkxK/fbP9vyzIdNLaSDG6sLojK6BG8amuXdez618rkJQ38KPseBjUN5ThX/zYCFXtNZfLIYvWGEn+8n4iGpl9pP2uhVEbZUilCvaNhF9qF1+1OgoufsWlg1PP3FOt30hFx/HOE7QQY2GxnieMK9mlJmwb81ARZ6L204IAqqum3OdZ3xRQ/r/9AkpONYGXhstezQv5Y+aGRnszNqYCbRsp4+RAocUg8ZLu96e/+sONRi7eWWkadP7GF/+kLzbE=
// I still have to figure out why I'm missing 5 locations

const parseInput = (rawInput: string) => rawInput.split('\n').map(line => line.split(''))
const part2_stolen = (rawInput: string) => {
    const rows = parseInput(rawInput)
    const towers = new Map<string, string[]>() // 'a' => ['4,5', '7,7'] etc
    const antinodes = new Set<string>()
    rows.forEach((row, r) => {
        row.forEach((char, c) => {
            if (char === '.') return
            const towerLocations = towers.get(char) ?? []
            towerLocations.forEach(locationKey => {
                const [r2,c2] = locationKey.split(',').map(Number)
                const slopeTop = c2-c
                const slopeBottom = r2-r
                for (let R = 0; R < rows.length; R++) {
                    const dr = R - r
                    const dc = dr * slopeTop / slopeBottom
                    const C = c + dc
                    if (C < 0 || C >= row.length || C % 1 !== 0) {
                        continue
                    }
                    antinodes.add(`${R},${C}`)
                }
            })
            towerLocations.push(`${r},${c}`)
            towers.set(char, towerLocations)
        })
    })
    return antinodes.size
}
