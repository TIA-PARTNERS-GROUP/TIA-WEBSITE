import db from "../config/db.js";
import testimonialModel from "../models/testimonials.js";
import userModel from '../models/user.js';

export const getMyTestimonials = async (req, res) => {
    try {
        const user = userModel(db);
        const testimonials = testimonialModel(db);
        const userObj = await user.infoFromId(req.user.id);
        if (userObj == null) {
            return res.status(404).json({message: "User not found"})
        }
        const userTestimonials = await testimonials.getUserTestimonials(userObj.id);
        if (userTestimonials == null) {
            return res.status(200).json({message: "User has no testimonials", testimonials: []})
        }
        const formattedTestimonials= [];
        for (const item of userTestimonials) {
            formattedTestimonials.push({
                id: item.id,
                postedBy: item.poster_user_id,
                title: item.title,
                content: item.content,
                status: item.published ? "published" : "draft"
            })
        }
        return res.status(200).json({message: "Success", testimonials: formattedTestimonials})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const addTestimonial = async (req, res) => {
    try {
        const testimonials = testimonialModel(db);
        const { title, date, content, status } = req.body;
        if (!title || !date || !content || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (status != "published" && status != "draft") {
            return res.status(400).json({message: "Status must be draft or published"});
        }
        const dateObj = new Date(date);
        const mysqlDatetime = dateObj.toISOString().slice(0, 19).replace("T", " ");
        const testimonialStatus = status == "published" ? 1 : 0
        const testimonialId = await testimonials.addTestimonial(req.user.id, title, mysqlDatetime, content, testimonialStatus);
        return res.status(201).json({message: "Success", testimonialId: testimonialId})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const removeTestimonial = async (req, res) => {
    try {
        const testimonials = testimonialModel(db);
        const {id} = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const testimonial = await testimonials.getTestimonial(id);
        if ( testimonial == null || testimonial.poster_user_id != req.user.id) {
            return res.status(404).json({ message: "No testimonial with that id" });
        }
        await testimonials.deleteTestimonial(id);
        return res.status(200).json({message: "Testimonial deleted"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const publishTestimonial = async (req, res) => {
    try {
        const testimonials = testimonialModel(db);
        const {id} = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const testimonial = await testimonials.getTestimonial(id)
        if ( testimonial == null || testimonial.poster_user_id != req.user.id) {
            return res.status(404).json({ message: "No testimonial with that id" });
        }
        await testimonials.publishTestimonial(id);
        return res.status(200).json({message: "Successfully published testimonial"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getUserTestimonials = async (req, res) => {
    try {
        const user = userModel(db);
        const testimonials = testimonialModel(db);
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const userObj = await user.infoFromId(id);
        if (userObj == null) {
            return res.status(404).json({message: "User not found"})
        }
        // a user should never get another user's draft testimonials,
        const userTestimonials = await testimonials.getUserTestimonials(userObj.id, false);
        if (userTestimonials == null) {
            return res.status(200).json({message: "User has no testimonials", testimonials: []});
        }
        const formattedTestimonials= [];
        for (const item of userTestimonials) {
            formattedTestimonials.push({
                id: item.id,
                postedBy: item.poster_user_id,
                title: item.title,
                content: item.content,
                status: item.published ? "published" : "draft"
            })
        }
        return res.status(200).json({message: "Success", testimonials: formattedTestimonials});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}
