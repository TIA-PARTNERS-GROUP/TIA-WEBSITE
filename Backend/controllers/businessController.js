import db from "../config/db.js";
import businessModel from '../models/business.js';
import userModel from '../models/user.js';

export const getDashboard = async (req, res) => {
    const user = userModel(db);
    const business = businessModel(db);

    const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

    if (businessResult == null) {
        req.status(404).json({message: "No business exists for user"});
    }

    const businessId = businessResult.id;
    const bi = await business.infoFromId(businessId);
    const connections = await business.fetchConnections(businessId);


    return res.status(200).json(
        {
            message:"Success",
            businessName: bi.name,
            contactName: bi.contact_name,
            contactPhone: bi.contact_phone_no,
            contactEmail: bi.contactEmail,
            businessCategory: bi.category, 
            businessDescription: bi.description,
            connections : connections
        }
    );




    
}