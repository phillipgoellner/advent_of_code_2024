export interface Location {
    col: number;
    row: number;
}

export const cartesian = (a: any[][]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
