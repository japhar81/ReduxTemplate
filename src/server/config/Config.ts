'use strict';

export class Config {
    public static serverPort: number = typeof(process.env.SERVER_PORT) !== 'undefined' ?
        /* istanbul ignore next */ Number.parseInt(process.env.SERVER_PORT) : 4000;
}

export default new Config();
