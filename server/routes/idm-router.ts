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

router.post('/evaluate_user', (req, res) => {
    res.writeHead(302, {
        'Location': 'http://localhost:2998/idm/login?u=platform.admin@veritas.com&r=http%3A%2F%2Flocalhost%3A2998%2F&c=0oac6fqvqjqm6NS3m0h7&ae=1234'
    });
    res.end();
});

router.post('/login', (req, res) => {
    res.status(401).send({ err: 'Wrong Credentials'});
});

router.post('/resetPassword', (req, res) => {
    res.status(200).send({
        authEvent: '1234'
    });
});

router.get('/authorize', (req, res) => {
    res.writeHead(302, {
        'Location': 'http://localhost:2998/idm/authorize/callback?code=ohiSmXS04tH3b1rU-vEt&state=598dc370-5aa8-584b-fd75-77a6d325b55'
    });
    res.end();
});

router.get('/auth_events', (req, res) => {
    res.status(200).send({status: 'Ok'});
});

router.get('/contexts', (req, res) => {
    res.status(200).send([
        {
            name: 'platform-admin',
            id: '1234'
        },
        {
            name: 'tenant-admin',
            id: '4567'
        },
        {
            name: 'partner-admin',
            id: '7890'
        },
        {
            name: 'it-admin',
            id: '75636'
        }
    ])
});

router.get('/authorize/callback', (req, res) => {
    res.writeHead(302, {
        'Location': 'http://localhost:3000/?t=eyJhY2Nlc3NfdG9rZW4iOiJleUpyYVdRaU9pSnRZMGN3VkhZeE9EbEtNa1k1VWw4eFVGVnBRMVpoYlcxRVltWjJYMUF3WlMxMVNreHVjMHhrUWtkWklpd2lZV3huSWpvaVVsTXlOVFlpZlEuZXlKMlpYSWlPakVzSW1wMGFTSTZJa0ZVTG1oRU5IZHdXbUZ1VjBGMVMzWlFVbmxST1ZCSVFrSm9VVmR0TkZoV2NURktZMFIzT1dzemFTMVJYMUV1TUZGSlNFbDRTakZGZUdkVE5qSktkazR5U0d4T1dtUmtiMk5hUVZZMWIwdGhWek5FY0dVd2FUSXdSVDBpTENKcGMzTWlPaUpvZEhSd2N6b3ZMM1psY21sMFlYTnRZMlJ0Y0Mxa1pYWXViMnQwWVhCeVpYWnBaWGN1WTI5dEwyOWhkWFJvTWk5a1pXWmhkV3gwSWl3aVlYVmtJam9pWVhCcE9pOHZaR1ZtWVhWc2RDSXNJbWxoZENJNk1UVTBNRFV3TnpBMk5pd2laWGh3SWpveE5UUXdOVEV3TmpZMkxDSmphV1FpT2lJd2IyRmpObVp4ZG5GcWNXMDJUbE16YlRCb055SXNJblZwWkNJNklqQXdkV2R1YVRkcloyRTFNRGg2V1ZaNE1HZzNJaXdpYzJOd0lqcGJJbTltWm14cGJtVmZZV05qWlhOeklpd2liM0JsYm1sa0lsMHNJbk4xWWlJNklqazFZemMzWVRBeUxXSmtaVFV0TkdFMFlpMDVORGt6TFRkbU1tVmxPRGd5WTJFNE5IQnNZWFJtYjNKdExtRmtiV2x1UUhabGNtbDBZWE11WTI5dElpd2ljbTlzWlhNaU9sc2ljR3hoZEdadmNtMHRZV1J0YVc0aVhTd2lZM1Z6ZEc5dFpYSkpaQ0k2SWpFeE1URXhNVEV4TFRFeE1URXRNVEV4TVMweE1URXhMVEV4TVRFeE1URXhNVEV4TVNJc0luUmxibUZ1ZEVsa0lqb2lNREF3TURBd01EQXRNREF3TUMwd01EQXdMVEF3TURBdE1EQXdNREF3TURBd01EQXdJaXdpWTI5dWRHVjRkRWxrSWpvaU1UaGpOakJsWkRFdE5tUmxZUzAwTmpJeExXRXdZV0V0TVRNME16bG1PV1V6TkRObElpd2ljR3hoZEdadmNtMUpaQ0k2SWpFNFl6WXdaV1F4TFRaa1pXRXRORFl5TVMxaE1HRmhMVEV6TkRNNVpqbGxNelF6WlNJc0luQmhjblJ1WlhKSlpDSTZJakl5TWpJeU1qSXlMVEl5TWpJdE1qSXlNaTB5TWpJeUxUSXlNakl5TWpJeU1qSXlNaUlzSW5WelpYSlVlWEJsSWpvaVVHeGhkR1p2Y20waUxDSjFjMlZ5U1dRaU9pSmtNV0ZpTVRFM09DMDJOVGc1TFRRM016Z3RPVGcxTkMxaU1HVmpOak5pTkRNMU5UVWlmUS5Zb3FmVU1lRGZSMGNDbGQ1ZTY1a0hEVUdMcWdQRE1hR3JTU0g5cEs3d3NyUUdFUGF1ZkVicnpfdW5wejEtR2xkR2FEejFVVDF5UWZtUHoyTzNfRXBjcFgzV3BzTmhjWGZISnRMSWgyNG5sak5KLWtBckFtNVVfSEJDV05oY25oSkhGeUNzcVA3THZ4Qkx2WktYRlZRSUZJQmJodHJWQl8tdlA5SkNlOGxxWWp2eTh3aHNjdjRVQ1htMl9TWFQ3VFZneGhCS1NpTGpYVjk5aUM0R0tGV0JrVE16QTByVFUxVjFvQkFJTVFyamxtWFpORWx5cVJ0cjh6N0EyWk44Q2NJQnB3cUJmOF92VkwxWjM3RFRObUVJX21idE9YN3IyaGhkNmxmMk9QbXEyUjFyWXZ6Mk5DUWtTZmZETWZaOTZfeS02MUFfRnBIUXZvVjNDdWZsVHpsOVEiLCJpZF90b2tlbiI6bnVsbCwicmVmcmVzaF90b2tlbiI6bnVsbCwidG9rZW5fdHlwZSI6IkJlYXJlciIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3Mgb3BlbmlkIiwiZXhwaXJlc19pbiI6MzYwMH0%3D'
    });
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
