const express = require("express");
const app = express();
const uuid = require("uuid");
const apiRouter = express.Router();
app.use('/api', apiRouter);
app.use(express.json());
app.use(express.static('public'));

// temp data stores
let users = {};
let gameData = {};
let leaderboard = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// register
apiRouter.post('/auth/register', (req, res) => {
    const user = users[req.body.email];
    if (user) {
        res.status(409).send({ msg: "User already registered" });
    } else {
        const user = { email: req.body.email, username: req.body.username, password: req.body.password, token: uuid.v4() };
        users[user.email] = user;

        res.send({ token: user.token });
    }
});

// login
apiRouter.post('/auth/login', (req, res) => {
    const user = users[req.body.email];
    if (user) {
        if (req.body.password === user.password) {
            user.token = uuid.v4();
            res.send({ token: user.token });
            return;
        }
    }
    res.status(401).send({ msg: "Invalid Credentials" });
});

// logout
apiRouter.delete('/auth/logout', (req, res) => {
    const user = Object.values(users).find(u => u.token === req.body.token);
    if (user) {
        delete user.token;
    }
    res.status(204).end();
});

// get leaderboard
apiRouter.get('/leaderboard', (req, res) => {
    res.send(leaderboard);
});

// get single user game data
apiRouter.get('/game/:username', (req, res) => {
    const game = gameData[req.params.username];
    if (game) {
        res.send(game);
    } else {
        res.status(204).end();
    }
});

// get all games
apiRouter.get('/games', (req, res) => {
    res.send(gameData);
});

// update user game data and post money to leaderboard
apiRouter.post('/game', (req, res) => {
    const { username, gameState } = req.body;
    if (username in gameData) {
        gameData[username] = {
            ...gameData[username], ...gameState
        };
        res.status(200).send({ msg: "Updated successfully" })
    } else {
        gameData[username] = gameState;
        res.status(201).send({ msg: "New game created" });
    }
});
