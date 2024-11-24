const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('ragstoriches');
const userCollection = db.collection('users');
const gameCollection = db.collection('games');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
  console.log('Connected successfully to MongoDB');
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getUser(email) {
  return await userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return await userCollection.findOne({ token: token });
}

async function createUser(email, username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

async function updateUserToken(userId, token) {
  await userCollection.updateOne({ _id: userId }, { $set: { token: token } });
}

async function getLeaderboard() {
  return await gameCollection.find({}, { projection: { username: 1, money: 1, _id: 0 } })
    .sort({ money: -1 })
    .toArray();
}

async function getGameData(username) {
  return await gameCollection.findOne({ username: username });
}

async function getAllGames() {
  return await gameCollection.find({}).toArray();
}

async function updateGameData(username, gameState) {
  const result = await gameCollection.updateOne(
    { username: username },
    { $set: gameState },
    { upsert: true }
  );
  return result.upsertedCount > 0 ? 'created' : 'updated';
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  getLeaderboard,
  getGameData,
  getAllGames,
  updateGameData,
};