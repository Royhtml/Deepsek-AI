/* IMPORT */
import path from 'node:path';
import fs from 'stubborn-fs';
import whenExit from 'when-exit';
import { LIMIT_BASENAME_LENGTH } from '../constants.js';
/* MAIN */
//TODO: Maybe publish this as a standalone package
const Temp = {
    /* VARIABLES */
    store: {},
    /* API */
    create: (filePath) => {
        const randomness = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6); // 6 random-enough hex characters
        const timestamp = Date.now().toString().slice(-10); // 10 precise timestamp digits
        const prefix = 'tmp-';
        const suffix = `.${prefix}${timestamp}${randomness}`;
        const tempPath = `${filePath}${suffix}`;
        return tempPath;
    },
    get: (filePath, creator, purge = true) => {
        const tempPath = Temp.truncate(creator(filePath));
        if (tempPath in Temp.store)
            return Temp.get(filePath, creator, purge); // Collision found, try again
        Temp.store[tempPath] = purge;
        const disposer = () => delete Temp.store[tempPath];
        return [tempPath, disposer];
    },
    purge: (filePath) => {
        if (!Temp.store[filePath])
            return;
        delete Temp.store[filePath];
        fs.attempt.unlink(filePath);
    },
    purgeSync: (filePath) => {
        if (!Temp.store[filePath])
            return;
        delete Temp.store[filePath];
        fs.attempt.unlinkSync(filePath);
    },
    purgeSyncAll: () => {
        for (const filePath in Temp.store) {
            Temp.purgeSync(filePath);
        }
    },
    truncate: (filePath) => {
        const basename = path.basename(filePath);
        if (basename.length <= LIMIT_BASENAME_LENGTH)
            return filePath; //FIXME: Rough and quick attempt at detecting ok lengths
        const truncable = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(basename);
        if (!truncable)
            return filePath; //FIXME: No truncable part detected, can't really do much without also changing the parent path, which is unsafe, hoping for the best here
        const truncationLength = basename.length - LIMIT_BASENAME_LENGTH;
        return `${filePath.slice(0, -basename.length)}${truncable[1]}${truncable[2].slice(0, -truncationLength)}${truncable[3]}`; //FIXME: The truncable part might be shorter than needed here
    }
};
/* INIT */
whenExit(Temp.purgeSyncAll); // Ensuring purgeable temp files are purged on exit
/* EXPORT */
export default Temp;
