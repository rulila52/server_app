import dotenv from 'dotenv';
import { Application } from './src/Application.js';
import { Router } from './src/Router.js';
import { users } from './src/users.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const application = new Application();
const router = new Router();

router.get({
    path: '/users',
    handler: (req, res) => {
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(JSON.stringify(users));
    },
});

router.post({
    path: '/users',
    handler: (req, res) => {
        users.push(req.body);
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(JSON.stringify(req.body));
    },
});

application.addRouter({ router });

application.listen({ port: +PORT, callback: () => console.log(`Server started!`) });
