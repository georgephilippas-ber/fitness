import * as readline from "readline";

export function input(query?: string): Promise<string>
{
    const interface_ = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => interface_.question(query || "", answer =>
    {
        interface_.close();
        resolve(answer);
    }));
}
