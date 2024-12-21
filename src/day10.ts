import {type Location} from "./common.ts";

export function part1(lines: string[]): number {
    const topoMap = positions(lines);

    const heights_ = heights(lines);

    const trailheads = topoMap.filter(position => position.height === 0)
    const trailEnds = topoMap.filter(position => position.height === 9).filter(position => isReachableTrailEnd(position, heights_));

    return numberOfPaths(trailheads, trailEnds, heights_);
}

const positions = (lines: string[]): Position[] => {
    const positions: Position[] = [];

    for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[0].length; col++) {
            positions.push({
                height: +(lines[row].charAt(col)),
                coordinates: {
                    row,
                    col
                }
            });
        }
    }

    return positions;
}

const heights = (lines: string[]): number[][] => {
    const positions: number[][] = [];

    for (let row = 0; row < lines.length; row++) {
        const line: number[] = [];
        for (let col = 0; col < lines[0].length; col++) {
            line.push(+(lines[row].charAt(col)));
        }
        positions.push(line);
    }

    return positions;
}

const numberOfPaths = (trailheads: Position[], trailEnds: Position[], heights: number[][]): number => {
    return trailheads.map(head => trailEnds.filter(end => canReach(head, end, heights)).length).reduce((l, r) => l + r, 0);
}

const canReach = (trailHead: Position, trailEnd: Position, heights: number[][]): boolean => {
    let currentPositions = [trailHead];

    while (currentPositions.length !== 0) {
        currentPositions = currentPositions.map(position => reachableNeighbours(position, heights)).flat();

        if (currentPositions.findIndex(position => position.coordinates.row == trailEnd.coordinates.row && position.coordinates.col == trailEnd.coordinates.col) !== -1) {
            return true;
        }
    }

    return false;
}

const reachableNeighbours = (position: Position, heights: number[][]): Position[] => {
    const neighbours: Position[] = [];

    let currentNeighbourHeight = heightForPosition(position.coordinates.row - 1, position.coordinates.col, heights);
    if (currentNeighbourHeight - position.height === 1) {
        neighbours.push({
            height: currentNeighbourHeight,
            coordinates: {
                row: position.coordinates.row - 1,
                col: position.coordinates.col
            }
        });
    }
    currentNeighbourHeight = heightForPosition(position.coordinates.row + 1, position.coordinates.col, heights);
    if (currentNeighbourHeight - position.height === 1) {
        neighbours.push({
            height: currentNeighbourHeight,
            coordinates: {
                row: position.coordinates.row + 1,
                col: position.coordinates.col
            }
        });
    }
    currentNeighbourHeight = heightForPosition(position.coordinates.row, position.coordinates.col - 1, heights);
    if (currentNeighbourHeight - position.height === 1) {
        neighbours.push({
            height: currentNeighbourHeight,
            coordinates: {
                row: position.coordinates.row,
                col: position.coordinates.col - 1
            }
        });
    }
    currentNeighbourHeight = heightForPosition(position.coordinates.row, position.coordinates.col + 1, heights);
    if (currentNeighbourHeight - position.height === 1) {
        neighbours.push({
            height: currentNeighbourHeight,
            coordinates: {
                row: position.coordinates.row,
                col: position.coordinates.col + 1
            }
        });
    }

    return neighbours;
}

const heightForPosition = (row: number, col: number, heights: number[][]): number => {
    const heightRow = heights[row];
    return heightRow !== undefined ? heightRow[col] : -1;
}

const isReachableTrailEnd = (trailEnd: Position, heights: number[][]): boolean => {
    return [
        heightForPosition(trailEnd.coordinates.row - 1, trailEnd.coordinates.col, heights),
        heightForPosition(trailEnd.coordinates.row + 1, trailEnd.coordinates.col, heights),
        heightForPosition(trailEnd.coordinates.row, trailEnd.coordinates.col - 1, heights),
        heightForPosition(trailEnd.coordinates.row, trailEnd.coordinates.col + 1, heights)
    ].some(num => num === 8);
}

interface Position {
    height: number;
    coordinates: Location;
}

export function part2(lines: string[]): number {
    const topoMap = positions(lines);
    const heights_ = heights(lines);

    const trailheads = topoMap.filter(position => position.height === 0)
    const trailEnds = topoMap
        .filter(position => position.height === 9)
        .filter(position => isReachableTrailEnd(position, heights_));

    const possibleRoutes: Map<Position, Position[]> = new Map();
    trailheads.forEach(trailhead => possibleRoutes.set(trailhead, trailEnds.filter(end => canReach(trailhead, end, heights_))));

    return trailheads.map(start => uniquePaths(start, heights_))
        .reduce((l, r) => l.concat(r)).length;
}

const uniquePaths = (trailHead: Position, heights: number[][]): string[] => {
    return buildPaths(trailHead, "", heights);
}

const buildPaths = (start: Position, currentPath: string, heights: number[][]): string[] => {
    if (start.height === 9) {
        return [`${currentPath}(${start.coordinates.row},${start.coordinates.col})`];
    }

    return reachableNeighbours(start, heights)
        .map(neighbour => buildPaths(neighbour, `${currentPath}(${neighbour.coordinates.row},${neighbour.coordinates.col})`, heights))
        .reduce((l, r) => l.concat(r), []);
}
