const express = require('express');
const cors = require('cors'); 
const db = require('./database.js');
const app = express();

// --- Middleware
app.use(cors()); // дозволяє фронтенду звертатись до сервера
app.use(express.json()); //allows the server to parse(converts json->js object)incoming JSON data in the request body.

// --- GET route to fetch all words from the database
app.get('/words', (req, res) => {
    const words = db.prepare('SELECT * FROM words ORDER BY id DESC').all();
    res.json(words);
})

// --- POST route to add a new word to the database
app.post('/words', (req, res) => {
    const { word, example, translation} = req.body;
    const result = db.prepare('INSERT INTO words (word, example, translation) VALUES (?, ?, ?)').run(word, example, translation);
    res.json({ id: result.lastInsertRowid, word, example, translation});
})

// --- DELETE route to remove a word from the database
app.delete('/words/:id', (req, res) => {
    const id = Number(req.params.id);
    db.prepare('DELETE FROM words WHERE id = ?').run(id);
    res.json({message: 'Word deleted'});
})

// --- PATCH route to edit a word in the database
app.patch('/words/:id', (req, res) => {
    const id = Number(req.params.id);
    const { word, example, translation } = req.body;
    db.prepare('UPDATE words SET word = ?, example = ?, translation = ? WHERE id = ?').run(word, example, translation, id);
    res.json({message: 'Word updated'});
})

//Listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});