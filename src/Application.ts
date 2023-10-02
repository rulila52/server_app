import EventEmitter from 'events';
import http, { Server } from 'http';
import { Router } from './Router.js';

type GetRouteMaskProps = {
    method: string;
    path: string;
};

type AddRouterProps = { router: Router };

type ListenProps = { port: number; callback: () => void };

export class Application {
    #emitter: EventEmitter;
    #server: Server;

    constructor() {
        this.#emitter = new EventEmitter();
        this.#server = this.#createServer();
    }

    listen = ({ port, callback }: ListenProps) => {
        this.#server.listen(port, callback);
    };

    #getRouteMask = ({ path, method }: GetRouteMaskProps) => `[${path}]:[${method}]`;

    addRouter = ({ router }: AddRouterProps) => {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                this.#emitter.on(this.#getRouteMask({ path, method }), handler);
            });
        });
    };

    #createServer = () =>
        http.createServer((req, res) => {
            const emitted = this.#emitter.emit(
                this.#getRouteMask({ path: req.url, method: req.method }),
                req,
                res
            );
            if (!emitted) {
                res.end();
            }
        });
}
