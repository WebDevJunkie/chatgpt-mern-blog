const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Blog post model
const BlogPost = mongoose.model('BlogPost', {
    title: String,
    body: String,
    date: Date
});

// API routes
app.get('/api/posts', async (req, res) => {
    const posts = await BlogPost.find();
    res.send(posts);
});

app.post('/api/posts', async (req, res) => {
    const { error } = validatePost(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const post = new BlogPost({
        title: req.body.title,
        body: req.body.body,
        date: new Date()
    });

    await post.save();
    res.send(post);
});

function validatePost(post) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        body: Joi.string().min(10).required()
    });
    return schema.validate(post);
}

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});
