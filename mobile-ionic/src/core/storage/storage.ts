import {Storage} from "@ionic/storage";

const storage = new Storage();

const storagePromise: Promise<Storage> = storage.create();
