import dotenv from 'dotenv';
import { Application } from './src/Application.js';
import { Router } from './src/Router.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const application = new Application();

const router = new Router();

router.get({ path: '/users', handler: (req, res) => res.end('Request to /users') });
router.get({ path: '/products', handler: (req, res) => res.end('Request to /products') });

application.addRouter({ router });

application.listen({ port: +PORT, callback: () => console.log(`Server started!`) });
