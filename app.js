const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Post = require('./models/posts')
const port = process.env.PORT || 3000

const mongoDB = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.apxur.mongodb.net/posts?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get("/", (req, res) => {
    Post
   .find({}, (err, data) => res.send(data));
});

app.post("/messages", (req, res) =>
 Post
   .create({ title: "Great article", author: "me", body: "lorem ipsum" })
   .then(function (newMessage) {
     res.send(newMessage);
   })
);

app.put("/", (req, res) =>
 Post
   .updateMany({title: "Old Title"}, { $set: { title: "New Title" } })
   .then(function (newPosts) {
     res.send(newPosts);
   })
);

app.delete("/:id", (req, res) =>
 Post
   .deleteOne({_id: req.params.id})
   .then(function () {
     res.end();
   })
);





app.listen(port, () => console.log('connected'));

