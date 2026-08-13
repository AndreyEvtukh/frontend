import 'dotenv/config';
import express from 'express';
import { ProductsService } from '@org/api/products';

const host: string = process.env.API_HOST ?? 'http://localhost';
const port: number = Number(process.env.API_PORT);

const SPRING_GRAPHQL_URL: string = process.env.SPRING_GRAPHQL_URL ??
    `http://localhost:${process.env.REMOTE_PORT || 8080}/graphql`;

const app = express();
const productsService = new ProductsService();

app.use(express.json());

// CORS configuration for Angular app
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowed = [
        'http://localhost:4200',
        'https://dev.andrey-evtukh.vercel.app',
        'https://andrey-evtukh.vercel.app',
    ];

    if (origin && allowed.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }

    next();
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello API', springGraphql: SPRING_GRAPHQL_URL });
});

app.post('/api/graphql', async (req, res) => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (req.headers.authorization) {
            headers['Authorization'] = String(req.headers.authorization);
        }

        const response = await fetch(SPRING_GRAPHQL_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: req.body?.query,
                variables: req.body?.variables,
                operationName: req.body?.operationName,
            }),
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('GraphQL proxy error:', error);
        res.status(502).json({
            errors: [
                {
                    message:
                        error instanceof Error ? error.message : 'Proxy error',
                },
            ],
        });
    }
});

app.listen(port, host, () => {
    console.log(`[SSR API] http://${host}:${port}`);
    console.log(`[Proxy →] ${SPRING_GRAPHQL_URL}`);
});
