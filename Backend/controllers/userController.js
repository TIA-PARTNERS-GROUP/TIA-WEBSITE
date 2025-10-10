import db from "../config/db.js";
import userModel from "../models/user.js";

export const checkUserExists = async (req, res) => {
    try {
        const user = userModel(db);
        const {email} = req.params;
        const existingUser = await user.findByLoginEmail(email);
        if (existingUser == null) {
            return res.status(200).json( {
                message: "User does not exist",
                exists: false
            });
        }
        return res.status(200).json( {
                message: "User exists",
                exists: true
            });


    } catch (error) {
        console.error('', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const user = userModel(db);
        const {id} = req.params;

        const userInfo = await user.infoFromId(id);

        if (userInfo == null) {
            return res.status(404).json(
                {
                    message: "User not found"
                }
            );
        }

        return res.status(200).json(
            {
                message: "Success",
                data: {
                    id: userInfo.id,
                    firstName: userInfo.first_name,
                    lastName: userInfo.last_name,
                    contactEmail: userInfo.contact_email,
                    contactPhone: userInfo.contact_phone_no,
                    loginEmail: userInfo.login_email
                }
            }
        );

    } catch (error) {
        console.error('', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const getMe = async (req, res) => {
    try {
        const user = userModel(db);
        const userInfo = await user.infoFromId(req.user.id)
        return res.status(200).json(
            {
                message: "Success",
                data: {
                    id: userInfo.id,
                    firstName: userInfo.first_name,
                    lastName: userInfo.last_name,
                    contactEmail: userInfo.contact_email,
                    contactPhone: userInfo.contact_phone_no,
                    loginEmail: userInfo.login_email
                }
            }
        )

    } catch (error) {
        console.error('', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getDashboardConfig = async (req, res) => {
    try {
        const user = userModel(db);
        const userConfig = await user.fetchDashboardConfig(req.user.id);

        if (!userConfig) {
            return res.status(404).json({message: 'User has no config recorded'})
        }

        return res.status(200).json({message: "Success", config: userConfig.config})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
};


export const updateDashboardConfig = async (req, res) => {
    try {
        const user = userModel(db);
        const {config} = req.body;
        if (!config) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await user.updateDashboardConfig(req.user.id, config);
        return res.status(200).json({message: "Success"});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
