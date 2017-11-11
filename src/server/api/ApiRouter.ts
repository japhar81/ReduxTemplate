'use strict';

import * as express from 'express';
import { HelloRouter } from './HelloRouter';

/**
 * All routes prefixed by:  /api
 */
export class ApiRouter {
    public router: express.Router;

    public constructor() {
        this.router = express.Router({mergeParams: true});
        this.init();
    }

    private init() {
        this.router.use('/hello', (new HelloRouter()).router);
    }
}
