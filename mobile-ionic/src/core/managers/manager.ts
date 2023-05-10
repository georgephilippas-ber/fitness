import {Storage} from "@ionic/storage";

import {BehaviorSubject} from "rxjs";

export type subject_values_type = "subscribe" | "insert" | "update" | "remove" | "alter";

export class Manager<T> {
    protected behaviourSubject: BehaviorSubject<subject_values_type>

    constructor(protected storagePromise: Promise<Storage>, protected collection: string) {
        this.behaviourSubject = new BehaviorSubject<subject_values_type>("subscribe");
    }

    public subject(): BehaviorSubject<subject_values_type> {
        return this.behaviourSubject;
    }
}

export class UniqueManager<T, K extends keyof T> extends Manager<T> {
    constructor(storagePromise: Promise<Storage>, collection: string, private unique: K) {
        super(storagePromise, collection)
    }

    async all(): Promise<T[]> {
        const storage = await this.storagePromise;

        const all_: T[] | undefined = await storage.get(this.collection);

        return all_ || [];
    }

    async insert(element: T): Promise<subject_values_type> {
        const all_ = await this.all();

        const filtered_ = all_.filter(value => value[this.unique] !== element[this.unique]);

        const storage = await this.storagePromise;

        await storage.set(this.collection, [...filtered_, element]);

        if (filtered_.length < all_.length) {
            this.behaviourSubject.next("update");

            return "update";
        } else {
            this.behaviourSubject.next("insert");

            return "insert";
        }
    }

    async remove(element: T): Promise<subject_values_type | undefined> {
        const all_ = await this.all();

        const filtered_ = all_.filter(value => value[this.unique] !== element[this.unique]);

        const storage = await this.storagePromise;

        await storage.set(this.collection, [...filtered_]);

        if (filtered_.length < all_.length) {
            this.behaviourSubject.next("remove");

            return "remove";
        }
    }

    async byUnique(uniqueValue: T[K]): Promise<T | undefined> {
        const all_ = await this.all();

        const filtered_ = all_.filter(value => value[this.unique] === uniqueValue);

        return filtered_?.[0];
    }
}

export class DictionaryManager<T> extends Manager<T> {
    constructor(storagePromise: Promise<Storage>, collection: string, private initial: () => Promise<T>) {
        super(storagePromise, collection)
    }

    async get(): Promise<T> {
        const storage = await this.storagePromise;

        return (await storage.get(this.collection)) || (await this.initial());
    }

    async set<K extends keyof T>(key: K, value: T[K]): Promise<T> {
        const storage = await this.storagePromise;

        let current: T = await this.get();

        current[key] = value;

        await storage.set(this.collection, current);

        this.behaviourSubject.next("alter");

        return current;
    }
}
