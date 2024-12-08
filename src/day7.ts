import {cartesian} from "./common.ts";

export function part1(lines: string[]): number {
    return lines
        .map(line => line.split(": "))
        .map(([result, values]) => new EquationSystem(+result, values))
        .filter(system => system.isSolvable())
        .map(system => system.result)
        .reduce((l, r) => l + r, 0);
}

class EquationSystem {
    protected readonly leftSideResult: number;
    protected readonly rightSideValues: number[];

    constructor(result: number, values: string) {
        this.leftSideResult = result;
        this.rightSideValues = values.split(" ").map(value => +value);
    }

    get result(): number {
        return this.leftSideResult;
    }

    public isSolvable(): boolean {
        if (this.rightSideValues.length === 2) {
            return this.operatorPermutations()
                .some(operatorApplication => this.leftSideResult === operatorApplication(this.rightSideValues));
        }

        return this.operatorOptions()
            .some(operators => {
                let result = this.rightSideValues[0];

                for (let i = 0; i < operators.length; i++) {
                    result = operators[i]([result, this.rightSideValues[i + 1]]);
                }

                return result === this.leftSideResult;
            });
    }

    protected operatorPermutations(): ((values: number[]) => number)[] {
        return [
            (values: number[]) => values.reduce((l, r) => l + r, 0),
            (values: number[]) => values.reduce((l, r) => l * r, 1)
        ];
    }

    protected operatorOptions(): ((values: number[]) => number)[][] {
        const operators = [];
        const numberOfOperators = this.rightSideValues.length - 1;

        for (let i = 0; i < numberOfOperators; i++) {
            operators.push([
                (values: number[]) => values.reduce((l, r) => l + r, 0),
                (values: number[]) => values.reduce((l, r) => l * r, 1)
            ]);
        }

        return cartesian(operators);
    }
}

class AdvancedEquationSystem extends EquationSystem {
    protected operatorPermutations(): ((values: number[]) => number)[] {
        return [
            (values: number[]) => values.reduce((l, r) => l + r, 0),
            (values: number[]) => values.reduce((l, r) => l * r, 1),
            (values: number[]) => values.reduce((l, r) => +`${l}${r}`)
        ];
    }

    protected operatorOptions(): ((values: number[]) => number)[][] {
        const operators = [];
        const numberOfOperators = this.rightSideValues.length - 1;

        for (let i = 0; i < numberOfOperators; i++) {
            operators.push([
                (values: number[]) => values.reduce((l, r) => l + r, 0),
                (values: number[]) => values.reduce((l, r) => l * r, 1),
                (values: number[]) => values.reduce((l, r) => +`${l}${r}`)
            ]);
        }

        return cartesian(operators);
    }
}

export function part2(lines: string[]): number {
    return lines
        .map(line => line.split(": "))
        .map(([result, values]) => new AdvancedEquationSystem(+result, values))
        .filter(system => system.isSolvable())
        .map(system => system.result)
        .reduce((l, r) => l + r, 0);
}
