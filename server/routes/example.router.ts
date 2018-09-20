import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';

const router = express.Router();

function importJSON(filePath: string) {
    if (!filePath) {
        return [];
    }
    return JSON.parse(fs.readFileSync(path.join(__dirname, filePath), 'utf8'));
}

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <div class="container">
            <div class="col-xs">
                <h3> 
                    API Catalogue:  
                    <ul>
                        <li>/example/status</li>
                        <li>/example/message</li>
                    </ul>
                </h3>
            </div>
        </div>
    `);
    res.end();
});

router.get('/status', (req, res) => {
    res.status(200).send({
        message: 'Hello from the other side'
    });
});

router.get('/message', (req, res) => {
    res.status(200).send(importJSON('../data/example.json'));
})

export { router };
