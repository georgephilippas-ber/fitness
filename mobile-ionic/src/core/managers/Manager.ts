import {Storage} from "@ionic/storage";

import {BehaviorSubject} from "rxjs";

export type subject_values_type = "subscribe" | "insert" | "update";

export class Manager<T> {
    protected behaviourSubject: BehaviorSubject<subject_values_type>

    constructor(protected storagePromise: Promise<Storage>, protected collection: string) {
        this.behaviourSubject = new BehaviorSubject<subject_values_type>("subscribe");
    }

    public subject(): BehaviorSubject<subject_values_type> {
        return this.behaviourSubject;
    }

    async all(): Promise<T[]> {
        const storage = await this.storagePromise;

        const all_: T[] | undefined = await storage.get(this.collection);

        return all_ || [];
    }
}

export class UniqueManager<T> extends Manager<T> {
    constructor(storagePromise: Promise<Storage>, collection: string, private unique: keyof T) {
        super(storagePromise, collection)
    }

    async insert(element: T) {
        const all_ = await this.all();

        const filtered_ = all_.filter(value => value[this.unique] !== element[this.unique]);

        const storage = await this.storagePromise;
    }
}
