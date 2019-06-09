const path = require("path");
const express = require("express");
const app = express();

const { connection, User, Post } = require("./db");
connection
    .authenticate()
    .then(() => {
        console.log('Connected to db');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


app.use(express.static("client"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"))
});

app.post("/users", async (req, res) => {
    User
        .create({name: req.body.name})
        .then(user => {
            res.status(201).json({user: user.dataValues})
        })
        .catch(e => console.log(e));
});

app.get("/users", (req, res) => {
    User
        .findAll()
        .then(users => {
            console.log(users);
            res.status(200).json(users)
        })
        .catch(e => console.log(e));
});

app.get("/posts", (req, res) => {
    Post
        .findAll({
            where: {
                user_id: 7
            },
            include:[{
                model: User
            }],
            attributes: ["id", "text"]
        })
        .then(posts => {
            res.status(200).json({posts});
        })
        .catch(e => console.error(e));
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    User
        .destroy({
            where: {
                id
            }
        })
        .then(() => {
            res.status(204).end();
        })
});

app.listen(80, () => console.log("Server is running"));