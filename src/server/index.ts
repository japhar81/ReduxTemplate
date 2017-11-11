'use strict';

import * as http from 'http';
import appServer from './appServer';
import { Config } from './config/Config';
import Logging from './Logging';

let server: http.Server = getServer();

if (process.env.NODE_ENV === 'dev' && (module as any).hot) {
    (module as any).hot.addDisposeHandler((data: any) => {
        data.server = server;
    });

    (module as any).hot.accept();

    if (typeof(server) !== 'undefined') {
        server.removeAllListeners('request');
        server.addListener('request', appServer);
        onServerHmr();
    } else {
        onServerStart();
    }
} else {
    onServerStart();
}

function onServerStart() {
    Logging.defaultLogger.info('Starting Server');
    startListener();
}

function onServerHmr() {
    Logging.defaultLogger.info('Starting Server HMR Load');
}

function getServer(): any {
    if (process.env.NODE_ENV === 'dev' && (module as any).hot) {
        if ((module as any).hot.data && (module as any).hot.data.server) {
            return (module as any).hot.data.server;
        }
    }

    return;
}

function startListener(): void {
    server = http.createServer(appServer);
    server.listen(Config.serverPort);
    Logging.defaultLogger.info(`Started server on port ${Config.serverPort}`);
}
