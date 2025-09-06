import db from "../config/db.js";
import caseStudyModel from "../models/caseStudies.js";
import userModel from '../models/user.js';

export const getMyCaseStudies = async (req, res) => {
    try {
        const user = userModel(db);
        const caseStudies = caseStudyModel(db);
        const userObj = await user.infoFromId(req.user.id);
        if (userObj == null) {
            return res.status(404).json({message: "User not found"})
        }
        const userCaseStudies = await caseStudies.getUserCaseStudies(userObj.id);
        if (userCaseStudies == null) {
            return res.status(200).json({message: "User has no case studies", caseStudies: []})
        }
        const formattedCaseStudies= [];
        for (const item of userCaseStudies) {
            formattedCaseStudies.push({
                id: item.id,
                postedBy: item.owner_user_id,
                title: item.title,
                date: item.date,
                content: item.content,
                status: item.published ? "published" : "draft"
            })
        }
        return res.status(200).json({message: "Success", caseStudies: formattedCaseStudies})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const addCaseStudy = async (req, res) => {
    try {
        const caseStudies = caseStudyModel(db);
        const { title, date, content, status } = req.body;
        if (!title || !date || !content || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (status != "published" && status != "draft") {
            return res.status(400).json({message: "Status must be draft or published"});
        }
        const dateObj = new Date(date);
        const mysqlDatetime = dateObj.toISOString().slice(0, 19).replace("T", " ");
        const caseStudyStatus = status == "published" ? 1 : 0
        const caseStudyId = await caseStudies.addCaseStudy(req.user.id, title, mysqlDatetime, content, caseStudyStatus);
        return res.status(201).json({message: "Success", caseStudyId: caseStudyId})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const removeCaseStudy = async (req, res) => {
    try {
        const caseStudies = caseStudyModel(db);
        const {id} = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const caseStudy = await caseStudies.getCaseStudy(id);
        if ( caseStudy == null || caseStudy.owner_user_id != req.user.id) {
            return res.status(404).json({ message: "No case study with that id" });
        }
        await caseStudies.deleteCaseStudy(id);
        return res.status(200).json({message: "Case study deleted"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const publishCaseStudy = async (req, res) => {
    try {
        const caseStudies = caseStudyModel(db);
        const {id} = req.body;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const caseStudy = await caseStudies.getCaseStudy(id)
        if ( caseStudy == null || caseStudy.poster_user_id != req.user.id) {
            return res.status(404).json({ message: "No case study with that id" });
        }
        await caseStudies.publishCaseStudy(id);
        return res.status(200).json({message: "Successfully published case study"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getUserCaseStudies = async (req, res) => {
    try {
        const user = userModel(db);
        const caseStudies = caseStudyModel(db);
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const userObj = await user.infoFromId(id);
        if (userObj == null) {
            return res.status(404).json({message: "User not found"})
        }
        // a user should never get another user's draft case studies,
        const userCaseStudies = await caseStudies.getUserCaseStudies(userObj.id, false);
        if (userCaseStudies == null) {
            return res.status(200).json({message: "User has no case studies", caseStudies: []});
        }
        const formattedCaseStudies= [];
        for (const item of userCaseStudies) {
            formattedCaseStudies.push({
                id: item.id,
                postedBy: item.poster_user_id,
                title: item.title,
                content: item.content,
                status: item.published ? "published" : "draft"
            })
        }
        return res.status(200).json({message: "Success", caseStudies: formattedCaseStudies});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}
