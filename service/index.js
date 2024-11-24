const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Auth token cookie name
const authCookieName = 'token';

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/check', async (req, res) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        res.status(200).json({ authenticated: true, username: user.username });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

// User registration
apiRouter.post('/auth/register', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'User already registered' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ token: user.token, username: user.username });
    }
});

// User login
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = uuid.v4();
        await DB.updateUserToken(user._id, token);
        setAuthCookie(res, token);
        res.send({ token: token, username: user.username });
    } else {
        res.status(401).send({ msg: 'Invalid Credentials' });
    }
});

// User logout
apiRouter.delete('/auth/logout', (req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Get leaderboard
apiRouter.get('/leaderboard', async (req, res) => {
    const leaderboardData = await DB.getLeaderboard();
    res.json(leaderboardData);
});

// Secure router middleware
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    if (req.path.startsWith('/api/')) {
        // For API requests
        const authToken = req.cookies[authCookieName];
        const user = await DB.getUserByToken(authToken);
        if (user) {
            next();
        } else {
            res.status(401).send({ msg: 'Unauthorized' });
        }
    } else {
        // For page requests
        const authToken = req.cookies[authCookieName];
        const user = await DB.getUserByToken(authToken);
        if (user) {
            next();
        } else {
            res.redirect('/');
        }
    }
});

// Get leaderboard
secureApiRouter.get('/leaderboard', async (req, res) => {
    const leaderboardData = await DB.getLeaderboard();
    res.json(leaderboardData);
});

// Get single user game data
secureApiRouter.get('/game/:username', async (req, res) => {
    const game = await DB.getGameData(req.params.username);
    if (game) {
        res.status(200).send(game);
    } else {
        res.status(201).send({ msg: 'Game not found' });
    }
});

// Get all games
secureApiRouter.get('/games', async (req, res) => {
    const games = await DB.getAllGames();
    res.send(games);
});

// Update user game data and post money to leaderboard
secureApiRouter.post('/game', async (req, res) => {
    const { username, gameState } = req.body;
    const result = await DB.updateGameData(username, gameState);
    if (result === 'created') {
        res.status(201).send({ msg: 'New game created' });
    } else {
        res.status(200).send({ msg: 'Updated successfully' });
    }
});

// Set auth cookie
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});