import natural from 'natural';

export function levenshteinDistanceSync<T extends Record<K, string> | {
    [key in K]: {
        toString(): string
    }
}, K extends keyof T>(queries: string[], universe: T[], keys: K[], max?: number): [number, number][] {
    const distances: [number, number][] = universe.map((value, index) => {
        let distanceSum = 0;
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i].trim().toLowerCase();
            const key = keys[i];
            const distance = query ? natural.LevenshteinDistance(query, value[key].toString()) : 0.;
            distanceSum += distance;
        }
        return [index, distanceSum];
    });

    const sortedDistances = distances.sort((a: [number, number], b: [number, number]): number => {
        return a[1] - b[1]
    });

    return sortedDistances.slice(0, max);
}

export async function levenshteinDistance<T extends Record<K, string> | {
    [key in K]: {
        toString(): string
    }
}, K extends keyof T>(queries: string[], universe: T[], keys: K[], max?: number): Promise<[number, number][]> {
    const distances: [number, number][] = await Promise.all(universe.map(async (value, index) => {
        let distanceSum = 0;
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i].trim().toLowerCase();
            const key = keys[i];
            const distance = query ? natural.LevenshteinDistance(query, value[key].toString()) : 0;
            distanceSum += distance;
        }
        return [index, distanceSum];
    }));

    const sortedDistances = distances.sort((a: [number, number], b: [number, number]): number => {
        return a[1] - b[1];
    });

    return sortedDistances.slice(0, max);
}