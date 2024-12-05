export function part1(lines: string[]): number {
    const [rules, updates] = parseInput(lines);

    return updates
        .filter(pages => isCorrect(pages, rules))
        .map(page => page[Math.floor(page.length / 2)])
        .reduce((l, r) => l + r, 0);
}

const parseInput = (lines: string[]): [Rule[], number[][]] => {
    const cutoff = lines.findIndex((value) => value === "")
    return [toRules(lines.slice(0, cutoff)), toUpdates(lines.slice(cutoff + 1, lines.length))];
}

const toRules = (ruleLines: string[]): Rule[] => {
    return ruleLines
        .map(line => line.split("|"))
        .map(([f, s]) => ({
            first: +f, second: +s
        }));
}

const toUpdates = (updateLines: string[]): number[][] => {
    return updateLines
        .map(line => line.split(",").map(token => +token));
}

const isCorrect = (updates: number[], rules: Rule[]): boolean => {
    return rules
        .filter(rule => updates.includes(rule.first) && updates.includes(rule.second))
        .map(rule => {
            const firstIndex = updates.indexOf(rule.first);
            const secondIndex = updates.indexOf(rule.second);
            return firstIndex < secondIndex;
        })
        .reduce((l, r) => l && r, true)
}

interface Rule {
    first: number;
    second: number;
}

export function part2(lines: string[]): number {
    const [rules, updates] = parseInput(lines);

    return updates.filter(update => !isCorrect(update, rules))
        .map(update => orderUpdate(update, rules))
        .map(update => update[Math.floor(update.length / 2)])
        .reduce((l, r) => l + r, 0)
}

const orderUpdate = (update: number[], rules: Rule[]) => {
    let tmpUpdate = update.slice();
    const applicableRules = rules
        .filter(rule => tmpUpdate.includes(rule.first) && tmpUpdate.includes(rule.second))

    while (!isCorrect(tmpUpdate, applicableRules)) {
        for (const rule of applicableRules) {
            const firstIndex = tmpUpdate.indexOf(rule.first);
            const secondIndex = tmpUpdate.indexOf(rule.second);

            if (firstIndex > secondIndex) {
                let tmp = tmpUpdate[firstIndex];
                tmpUpdate[firstIndex] = tmpUpdate[secondIndex];
                tmpUpdate[secondIndex] = tmp;
            }
        }
    }

    return tmpUpdate;
}


