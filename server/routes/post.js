const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToker = require('../middleware/auth')

//@route GET api/posts
//@desc get post
//@access Private

router.get('/', verifyToker, async(req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({success: true, posts})
    } catch (error) {
        console.log(error)
            res
                .status(500)
                .json({success: false, message: 'Internal server error'})
    }
})

//@route POST api/posts
//@desc Create post
//@access Private
router.post('/', verifyToker, async(req, res) => {
    const {title, description, url, status} = req.body

    //simple validation
    if (!title) 
        return res
            .status(400)
            .json({success: false, message: 'Title is required'})
    
        try {
            const newPost = new Post ({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            })

            await newPost.save()

            res.json({success: true, message: 'Happy learning', post: newPost})
        } catch (error) {
            console.log(error)
                res
                    .status(500)
                    .json({success: false, message: 'Internal server error'})
        }
})

//@route PUT api/posts
//@desc Update post
//@access Private
router.put('/:id', verifyToker, async(req, res) => {
    const {title, description, url, status} = req.body

    //simple validation
    if (!title) 
        return res
            .status(400)
            .json({success: false, message: 'Title is required'})
    
        try {
            let updatedPost = {
                title, 
                description: description || '', 
                url: (url.startsWith('https://') ? url : `https://${url}`) || '', 
                status: status || 'TO LEARN'
            }

            const postUpdateCondition = {_id: req.params.id, user: req.userId}

            updatedPost = await Post.findOneAndUpdate(
                postUpdateCondition, 
                updatedPost, 
                {new: true}
            )

            // User not authorised to update post or post not found
            if (!updatedPost)
                return res
                    .status(401)
                    .json({
                        success: false, 
                        message: 'Post not found or user not authorised'
                    })

                res.json({success: true, message: 'Excellent Progress', updatedPost})
        } catch (error) {
            console.log(error)
                res
                    .status(500)
                    .json({success: false, message: 'Internal server error'})
        }
})

//@route DELETE api/posts
//@desc Delete post
//@access Private
router.delete('/:id', verifyToker, async(req, res) => {
    try{
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        // User not authorised to update post or post not found
        if (!deletedPost)
        return res
            .status(401)
            .json({
                 success: false, 
                 message: 'Post not found or user not authorised'
            })

         res.json({success: true, post: deletedPost}) 
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({success: false, message: 'Internal server error'})
    }
})

module.exports= router