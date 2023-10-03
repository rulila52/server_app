import { IncomingMessage, ServerResponse } from 'http';

type MessageWithBody = IncomingMessage & { body: any };

type RequestProps = {
    method?: string;
    path: string;
    handler: (req: MessageWithBody, res: ServerResponse) => void;
};

export class Router {
    endpoints: Record<string, Record<string, (req: MessageWithBody, res: ServerResponse) => any>>;

    constructor() {
        this.endpoints = {};
    }

    request = ({ method = 'GET', path, handler }: RequestProps) => {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {};
        }

        const endpoint = this.endpoints[path];
        if (endpoint[method]) throw Error(`Метод ${method} по адресу ${path} уже существует`);

        endpoint[method] = handler;
    };

    get = ({ path, handler }: Pick<RequestProps, 'path' | 'handler'>) =>
        this.request({ path, handler });

    post = ({ path, handler }: Pick<RequestProps, 'path' | 'handler'>) =>
        this.request({ method: 'POST', path, handler });

    put = ({ path, handler }: Pick<RequestProps, 'path' | 'handler'>) =>
        this.request({ method: 'PUT', path, handler });

    delete = ({ path, handler }: Pick<RequestProps, 'path' | 'handler'>) =>
        this.request({ method: 'DELETE', path, handler });
}
