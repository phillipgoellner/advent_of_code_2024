import type {Location} from "./common.ts";

export function part1(lines: string[]): number {
    let guardLocation: Location = determineGuardLocation(lines);
    return getVisitedLocations(lines, guardLocation).size;
}

const determineGuardLocation = (lines: string[]): Location => {
    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[0].length; col++) {
            if (lines[row].charAt(col) === "^") {
                return {row, col};
            }
        }
    }
    return {row: -1, col: -1};
}

const getVisitedLocations = (lines: string[], guardLocation: Location): Set<string> => {
    let visitedLocations: Set<string> = new Set();
    let guardOrientation: Orientation = 'N';

    while (true) {
        visitedLocations.add(JSON.stringify(guardLocation));
        const nextStep = oneStep(guardLocation, guardOrientation);
        const charAtLocation = lines[nextStep.row]?.charAt(nextStep.col);

        if (charAtLocation === undefined || charAtLocation === "") {
            break;
        } else if (charAtLocation === "#") {
            guardOrientation = turn(guardOrientation);
        } else {
            guardLocation = nextStep;
        }
    }

    return visitedLocations;
}

const oneStep = (guardLocation: Location, guardOrientation: Orientation): Location => {
    switch (guardOrientation) {
        case "N":
            return {row: guardLocation.row - 1, col: guardLocation.col};
        case "E":
            return {row: guardLocation.row, col: guardLocation.col + 1};
        case "S":
            return {row: guardLocation.row + 1, col: guardLocation.col};
        case "W":
            return {row: guardLocation.row, col: guardLocation.col - 1};
    }
}

const turn = (guardOrientation: Orientation): Orientation => {
    switch (guardOrientation) {
        case "N":
            return 'E';
        case "E":
            return 'S';
        case "S":
            return 'W';
        case "W":
            return 'N';
    }
}

type Orientation = 'N' | 'E' | 'S' | 'W';

export function part2(lines: string[]): number {
    const guardLocation = determineGuardLocation(lines);
    const visitedLocations = getVisitedLocations(lines, guardLocation);
    visitedLocations.delete(JSON.stringify(guardLocation));

    const guardStepIterator = guardSteps(lines, guardLocation);

    return Array.from(visitedLocations)
        .map(locationJson => JSON.parse(locationJson))
        .map(location => {
            const newLines = [...lines];
            const s = newLines[location.row];
            newLines[location.row] = s.substring(0, location.col) + "#" + s.substring(location.col + 1);
            return newLines;
        })
        .filter(newLines => {
            const element = JSON.parse(guardStepIterator.next().value);
            return loops(newLines, element.location, element.orientation)
        })
        .length;
}

// Idee: visited locations mit der orientation versehen, damit man die hier direkt reinreichen kann
const loops = (lines: string[], guardLocation: Location, guardOrientation: Orientation): boolean => {
    let visitedLocations: Set<string> = new Set();

    while (!visitedLocations.has((JSON.stringify({location: guardLocation, orientation: guardOrientation})))) {
        visitedLocations.add(JSON.stringify({location: guardLocation, orientation: guardOrientation}));
        const nextStep = oneStep(guardLocation, guardOrientation);
        const charAtLocation = lines[nextStep.row]?.charAt(nextStep.col);

        if (charAtLocation === undefined || charAtLocation === "") {
            return false;
        } else if (charAtLocation === "#") {
            guardOrientation = turn(guardOrientation);
        } else {
            guardLocation = nextStep;
        }
    }

    return true;
}

const guardSteps = (lines: string[], guardLocation: Location): Iterator<string> => {
    let visitedLocations: string[] = [];
    let guardOrientation: Orientation = 'N';

    while (true) {
        visitedLocations.push(JSON.stringify({location: guardLocation, orientation: guardOrientation}));
        const nextStep = oneStep(guardLocation, guardOrientation);
        const charAtLocation = lines[nextStep.row]?.charAt(nextStep.col);

        if (charAtLocation === undefined || charAtLocation === "") {
            break;
        } else if (charAtLocation === "#") {
            guardOrientation = turn(guardOrientation);
        } else {
            guardLocation = nextStep;
        }
    }

    return visitedLocations.values();
}
