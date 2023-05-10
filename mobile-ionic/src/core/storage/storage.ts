import {Storage} from "@ionic/storage";

const storage = new Storage();

export const storagePromise: Promise<Storage> = storage.create();
