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
        (newLocation.row < maxRow && newLocation.col < maxCol);

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
            .map(location => `${location.row},${location.col}`)
    );

    antennas(lines).forEach((locations) => locations.forEach(location => set.add(`${location.row},${location.col}`)))

    return set.size;
}
