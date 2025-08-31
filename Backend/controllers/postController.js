import db from "../config/db.js";
import postModel from "../models/posts.js";
import userModel from '../models/user.js';

export const getMyPosts = async (req, res) => {
    try {
        const user = userModel(db);
        const posts = postModel(db);

        const userObj = await user.infoFromId(req.user.id);
        if (userObj == null) {
            return res.status(404).json({message: "User not found"})
        }

        const userPosts = await posts.getUserPosts(userObj.id);
        console.log(userPosts);

        if (userPosts == null) {
            return res.status(200).json({message: "User has no posts", posts: []})
        }

        const formattedPosts= [];
        for (const item of userPosts) {
            formattedPosts.push({
                id: item.id,
                postedBy: item.poster_user_id,
                title: item.title,
                content: item.content,
                status: item.published ? "published" : "draft"
            })
        }

        return res.status(200).json({message: "Success", posts: formattedPosts})
    }
    catch (error) {
                console.log(error);
                res.status(500).json({message: "Internal server error"});
            }
}

export const addPost = async (req, res) => {
    try {
        const posts = postModel(db);
        const { title, date, content, status } = req.body;
        if (!title || !date || !content || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (status != "published" && status != "draft") {
            return res.status(400).json({message: "Status must be draft or published"});
        }

        const dateObj = new Date(date);
        const mysqlDatetime = dateObj.toISOString().slice(0, 19).replace("T", " ");

        const postStatus = status == "published" ? 1 : 0

        const postId = await posts.addPost(req.user.id, title, mysqlDatetime, content, postStatus);

        return res.status(201).json({message: "Success", postId: postId})
    }
    catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }

}

export const removePost = async (req, res) => {
    try {
        const posts = postModel(db);
        const {id} = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const post = await posts.getPost(id);
        if ( post == null || post.poster_user_id != req.user.id) {
            return res.status(404).json({ message: "No post with that id" });
        }

        await posts.deletePost(id);

        return res.status(200).json({message: "Post deleted"});
    }
    catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
}

export const publishPost = async (req, res) => {
    try {
        const posts = postModel(db);
        const {id} = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const post = await posts.getPost(id)
        if ( post == null || post.poster_user_id != req.user.id) {
            return res.status(404).json({ message: "No post with that id" });
        }

        await posts.publishPost(id);

        return res.status(200).json({message: "Successfully published post"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const user = userModel(db);
        const posts = postModel(db);

        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const userObj = await user.infoFromId(id);
        if (userObj == null) {
            return res.status(404).json({message: "User not found"})
        }
        // a user should never get another user's draft posts,
        const userPosts = await posts.getUserPosts(userObj.id, false);

        if (userPosts == null) {
            return res.status(200).json({message: "User has no posts", posts: []});
        }

        const formattedPosts= [];

        for (const item of userPosts) {
            formattedPosts.push({
                id: item.id,
                postedBy: item.poster_user_id,
                title: item.title,
                content: item.content,
                status: item.published ? "published" : "draft"
            })
        }


        return res.status(200).json({message: "Success", posts: formattedPosts});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}