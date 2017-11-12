'use strict';

import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from '../../webpack/client';

import * as React from 'react';
import Logging from './Logging';

const clientRouter: express.Router = express.Router();

/* istanbul ignore next */
function renderClient(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.url.startsWith('/static/') || req.url.startsWith('/api/')) {
        return;
    }

    res.send(renderFullPage('', {}));
}

/* istanbul ignore next */
function renderFullPage(html: string, preloadedState: any) {
    const embedStyles = process.env.NODE_ENV === 'dev' ?
        /* istanbul ignore next */ '' :
        `<link rel='stylesheet' type='text/css' href='/static/styles.bundle.css'>`;

    return `
    <!doctype html>
    <html lang='en'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>SecureWorks CloudGuardian SCM</title>
        ${embedStyles}
    </head>
    <body class='skin-black-light fixed'>
    <div id='root'>${html}</div>
    <div id='devTools'></div>
    <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src='/static/client.bundle.js'></script>
    </body>
    </html>
    `;
}

/* istanbul ignore if */
if (process.env.NODE_ENV === 'dev') {
    const compiler = (module as any).hot.data && (module as any).hot.data.compiler ?
        (module as any).hot.data.compiler : webpack(webpackConfig as any);
    const devmiddleware = (module as any).hot.data && (module as any).hot.data.devmiddleware ?
        (module as any).hot.data.devmiddleware :
        webpackDevMiddleware(compiler, {
            noInfo: false,
            publicPath: webpackConfig.output.publicPath
        });
    const hotmiddleware = (module as any).hot.data && (module as any).hot.data.hotmiddleware ?
        (module as any).hot.data.hotmiddleware :
        webpackHotMiddleware(compiler);
    clientRouter.use(devmiddleware);
    clientRouter.use(hotmiddleware);
    clientRouter.use(renderClient);

    if ((module as any).hot) {
        (module as any).hot.addDisposeHandler((data: any) => {
            Logging.defaultLogger.error('HMR Disposing Client Middleware');
            data.compiler = compiler;
            data.devmiddleware = devmiddleware;
            data.hotmiddleware = hotmiddleware;
        });
        (module as any).hot.accept((err: any) => {
            Logging.defaultLogger.error('HMR Error', err);
        });
    }
} else {
    Logging.defaultLogger.info('Serving static bundles at /static');
    clientRouter.use('/static', express.static('./dist/static'));
    clientRouter.use(renderClient);
}

export default clientRouter;
