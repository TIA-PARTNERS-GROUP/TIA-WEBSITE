import db from "../config/db.js";
import postModel from "../models/posts.js";
import userModel from '../models/user.js';

export const getPosts = async (req, res) => {
    const user = userModel(db);
    const posts = postModel(db);

    const userObj = user.infoFromId(req.user.id);
    if (userObj == null) {
        return res.status(404).json({message: "User not found"})
    }

    const userPosts = await posts.getUserPosts(userObj.id);

    if (userPosts == null) {
        return res.status(200).json({message: "User has no posts", posts: []})
    }

    const formattedPosts= [];
    userPosts.foreach((item, index) => {
        formattedPosts.push({
            id: item.id,
            postedBy: item.poster_user_id,
            title: item.title,
            content: item.content,
            status: item.published ? "published" : "draft"
        })
    })

    return res.status(200).json({message: "Success", posts: formattedPosts})
}

export const addPost = async (req, res) => {
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

export const removePost = async (req, res) => {
    const posts = postModel(db);
    const {postId} = req.body;
    if (!postId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const post = await posts.getPost(postId);
    if ( post == null) {
        return res.status(404).json({ message: "No post with that id" });
    }

    if (post.poster_user_id != req.user.id) {
        return res.status(403).json({ message: "Can't delete another user's posts!" });
    }

    posts.deletePost(postId);

    return res.status(200).json({message: "Post deleted"});

}