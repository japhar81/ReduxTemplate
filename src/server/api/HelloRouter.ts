'use strict';

import * as express from 'express';

export class HelloRouter {
    public router: express.Router;

    private static get(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.send('Hello');
    }

    public constructor() {
        this.router = express.Router({mergeParams: true});
        this.init();
    }

    private init(): void {
        this.router.get('/', HelloRouter.get);
    }
}
