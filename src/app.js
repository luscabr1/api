const express = require('express')
const app = express()
const Post = require('./models/Posts')
require('dotenv').config()

const cors = require('cors')


const port = process.env.PORT;

app.use(express.json())
app.use(cors())

app.get('/hello_world', (req, res) => {
    res.send('Testando')

})

app.post('/create', (req, res) => {
    const title = req.body.title
    
      res.send(`Post: ${title}`)
})
app.post('/create_post', async (req, res) => {
    
      try {

      
    
    
    

    const { title, content } = req.body
    const post = await Post.create({ title, content })


    res.send(post)
      }catch(err) {
          res.status(400).send(err)
      }
})
    

    
    

app.get('/list_posts', async (req, res) => {
    try {
       const posts = await Post.find()
       res.send({posts})
    }catch(err) {
        res.status(400).send(err)
    }
    
})

app.get('/show_post/:post_id', async (req, res) => {
    try {
        const postId = req.params.post_id
        const post = await Post.findById(postId)
        res.send(post)

    } catch(err) {
        res.status(400).send(err)
    }
})

app.patch('/update_post/:post_id', async (req, res) => {
     try {
        const postId = req.params.post_id
        const { title, content } = req.body
        const post = await Post.findByIdAndUpdate(postId, { title, content }, {new: true})
        res.send({ post })
     } catch(err) {
        res.status(400).send(err)
     }
})

app.delete('/delete_post/:post_id', async (req, res) => {
    try{
        const postId = req.params.post_id

        await Post.findByIdAndDelete(postId)
        res.send({msg: 'Deletado'})

    } catch(err) {
        res.status(400).send(err)
    }
})

app.listen(port, () => {
    console.log('Server running: ' + port)
})


