'use strict';
import appServer from '../appServer';
import * as supertest from 'supertest';

function setup() {
    return {
        request: supertest.agent(appServer)
    };
}

describe('HelloRouter', () => {
    it('should return HTTP/200', async () => {
        return new Promise((resolve: (result?: any) => void, reject: (err?: any) => void) => {
            const {request} = setup();

            return request
                .get('/api/hello')
                .expect(200)
                .end((err: any, res: supertest.Response) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    });
});
