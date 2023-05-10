import natural from 'natural';

export function distance<T extends Record<K, string> | {
    [key in K]: {
        toString(): string
    }
}, K extends keyof T>(query: string, universe: T[], key: K, max?: number): [number, number][] {
    return (universe.map((value, index) => [index, natural.LevenshteinDistance(query.trim().toLowerCase(), value[key].toString())]) as [number, number][]).sort((a: [number, number], b: [number, number]): number => {
        return a[1] - b[1]
    }).slice(0, max);
}
