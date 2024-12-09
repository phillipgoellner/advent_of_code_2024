export function part1(lines: string[]): number {
    const [line] = lines;

    const fileSystemBlocks = toBlocks(line);
    compact(fileSystemBlocks);
    return checksum(fileSystemBlocks);
}

const toBlocks = (line: string) => {
    const blocks: Block[] = [];
    let currentFileId = 0;

    for (let i = 0; i < line.length; i++) {
        const numberOfBlocks = +(line.charAt(i));

        if (i % 2 == 0) {
            for (let b = 0; b < numberOfBlocks; b++) {
                blocks.push(new FileBlock(currentFileId));
            }
            currentFileId++;
        } else {
            for (let b = 0; b < numberOfBlocks; b++) {
                blocks.push(new FreeBlock());
            }
        }
    }

    return blocks;
}

const compact = (blocks: Block[]): void => {
    for (let i = blocks.length - 1; i >= 0; i--) {
        const char = blocks[i];
        if (char instanceof FileBlock) {
            const firstFreeBlock = blocks.findIndex((c) => c instanceof FreeBlock);
            if (firstFreeBlock === -1 || firstFreeBlock > i) {
                break;
            }
            blocks[firstFreeBlock] = blocks[i];
            blocks[i] = new FreeBlock();
        }
    }
}

const checksum = (blocks: Block[]): number => {
    let sum = 0;

    for (let i = 0; i < blocks.length; i++) {
        sum += blocks[i].fileId * i;
    }

    return sum;
}

type Block = FileBlock | FreeBlock;

class FileBlock {
    constructor(public readonly fileId: number) {
    }
}

class FreeBlock {
    get fileId() {
        return 0;
    }
}

export function part2(lines: string[]): number {
    const [line] = lines;

    const fileSystemBlocks = toFilesAndFreeSpace(line);
    compactFiles(fileSystemBlocks);
    return checksum(asBlocks(fileSystemBlocks));
}

const toFilesAndFreeSpace = (line: string): (File | FreeSpace)[] => {
    const occupation: (File | FreeSpace)[] = [];
    let currentFileId = 0;

    for (let i = 0; i < line.length; i++) {
        const numberOfBlocks = +(line.charAt(i));

        if (i % 2 == 0) {
            occupation.push(new File(numberOfBlocks, currentFileId));
            currentFileId++;
        } else {
            occupation.push(new FreeSpace(numberOfBlocks));
        }
    }

    return occupation;
}

const compactFiles = (occupation: (File | FreeSpace)[]): void => {
    for (let i = occupation.length - 1; i >= 0; i--) {
        const element = occupation[i];
        if (element instanceof File) {
            const firstFreeSpace = occupation.findIndex((c) => (c instanceof FreeSpace && element.length <= c.length));
            if (firstFreeSpace === -1 || firstFreeSpace > i) {
                continue;
            }

            if (occupation[firstFreeSpace].length === occupation[i].length) {
                const tmp = occupation[firstFreeSpace];
                occupation[firstFreeSpace] = occupation[i];
                occupation[i] = tmp;
            } else {
                const leftover = new FreeSpace(occupation[firstFreeSpace].length - occupation[i].length);

                occupation[firstFreeSpace] = occupation[i];
                occupation[i] = new FreeSpace(occupation[i].length);

                occupation.splice(firstFreeSpace + 1, 0, leftover);
                i++;
            }
        }
    }
}

const asBlocks = (occupation: (File | FreeSpace)[]): Block[] => {
    const blocks: Block[] = [];

    for (let i = 0; i < occupation.length; i++) {
        const fileOrSpace = occupation[i];

        for (let b = 0; b < fileOrSpace.length; b++) {
            if (fileOrSpace instanceof File)
                blocks.push(new FileBlock(fileOrSpace.fileId));
            else
                blocks.push(new FreeBlock());
        }
    }

    return blocks;
}

class File {
    constructor(public readonly length: number, public readonly fileId: number) {
    }
}

class FreeSpace {
    constructor(public readonly length: number) {
    }
}
