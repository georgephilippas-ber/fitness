export function findKeyPaths(obj: any, key: string): string[][] {
    const paths: string[][] = [];

    function traverseObject(currentPath: string[], currentObj: any) {
        for (const [k, value] of Object.entries(currentObj)) {
            if (k.includes(key)) {
                paths.push([...currentPath, k]);
            }
            if (typeof value === 'object' && value !== null) {
                traverseObject([...currentPath, k], value);
            }
        }
    }

    traverseObject([], obj);
    return paths;
}

