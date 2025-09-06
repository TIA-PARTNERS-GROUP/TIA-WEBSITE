import db from "../config/db.js";
import businessModel from '../models/business.js';
import userModel from '../models/user.js';

export const getMyProfile = async (req, res) => {
    const user = userModel(db);
    const business = businessModel(db);

    const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

    if (businessResult == null) {
        res.status(404).json({message: "No business exists for user"});
    }

    const businessId = businessResult.id;
    const bi = await business.infoFromId(businessId);
    const connections = await business.getConnections(businessId);
    const services = await business.getServices(businessId);
    const clients = await business.getClients(businessId);


    return res.status(200).json(
        {
            message:"Success",
            businessName: bi.name,
            contactName: bi.contact_name,
            contactPhone: bi.contact_phone_no,
            contactEmail: bi.contact_email,
            businessCategory: bi.category, 
            businessDescription: bi.description,
            connections : connections,
            services: services,
            clients: clients
            
        }
    );
}

export const getUserProfile = async (req, res) => {
    const user = userModel(db);
    const business = businessModel(db);
    const { id } = req.params;

    const businessResult = { id: id }

    if (businessResult == null) {
        return res.status(404).json({message: "No business exists for user"});
    }

    const businessId = businessResult.id;
    const bi = await business.infoFromId(businessId);
    const connections = await business.getConnections(businessId);
    const services = await business.getServices(businessId);
    const clients = await business.getClients(businessId);


    return res.status(200).json(
        {
            message:"Success",
            businessName: bi.name,
            contactName: bi.contact_name,
            contactPhone: bi.contact_phone_no,
            contactEmail: bi.contact_email,
            businessCategory: bi.category, 
            businessDescription: bi.description,
            connections : connections,
            services: services,
            clients: clients
            
        }
    );
}

export const updateProfile = async (req, res) => {
    try {
        const business = businessModel(db);
        const user = userModel(db);
        const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

        if (businessResult == null) {
            res.status(404).json({message: "No business exists for user"});
        }
        const businessId = businessResult.id;

        try {
            await business.updateBusiness(businessId, req.body);
        } catch (error) {
            return res.status(400).json({message: "Bad request"});
        }

        return res.status(201).json({message: "Business updated"});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

export const addServices = async (req, res) => {
    try {
        const { services } = req.body;
        if (!services || services.length == 0) {
            return res.status(400).json({message: "No services provided"})
        }
        const business = businessModel(db);
        const user = userModel(db);
        const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

        if (businessResult == null) {
            res.status(404).json({message: "No business exists for user"});
        }
        const businessId = businessResult.id;

        let newServices = {}
        for (const index in services) {
            const serviceName = services[index]
            const id = await business.addService(businessId, serviceName);
            newServices[serviceName] = id;

        }

        return res.status(201).json({message: "Success", newServices: newServices})


    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

export const addClients = async (req, res) => {
    try {
        const { clients } = req.body;
        console.log(clients);
        if (!clients || clients.length == 0) {
            return res.status(400).json({message: "No clients provided"})
        }
        const business = businessModel(db);
        const user = userModel(db);
        const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

        if (businessResult == null) {
            res.status(404).json({message: "No business exists for user"});
        }
        const businessId = businessResult.id;

        let newClients = {}
        for (const index in clients) {
            const clientName = clients[index]
            const id = await business.addClient(businessId, clientName);
            newClients[clientName] = id;
        }

        return res.status(201).json({message: "Success", newClients: newClients})


    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}


export const removeServices = async (req, res) => {
    try {
        const { services } = req.body;
        console.log(services);
        if (!services || services.length == 0) {
            return res.status(400).json({message: "No services provided"})
        }
        const business = businessModel(db);
        const user = userModel(db);
        const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

        if (businessResult == null) {
            res.status(404).json({message: "No business exists for user"});
        }
        const businessId = businessResult.id;

        let outcomes = {}
        for (const index in services) {
            const serviceId = services[index]
            const rowsAffected = await business.removeService(serviceId, businessId);
            if (rowsAffected) {
                outcomes[serviceId] = "Success";
            } else {
                outcomes[serviceId] = "No service with that id for this business";
            }
        }

        return res.status(201).json({message: "Success", outcomes: outcomes})


    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

export const removeClients = async (req, res) => {
    try {
        const { clients } = req.body;
        console.log(clients);
        if (!clients || clients.length == 0) {
            return res.status(400).json({message: "No clients provided"})
        }
        const business = businessModel(db);
        const user = userModel(db);
        const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);

        if (businessResult == null) {
            res.status(404).json({message: "No business exists for user"});
        }
        const businessId = businessResult.id;

        let outcomes = {}
        for (const index in clients) {
            const clientId = clients[index]
            const rowsAffected = await business.removeClient(clientId, businessId);
            if (rowsAffected) {
                outcomes[clientId] = "Success";
            } else {
                outcomes[clientId] = "No client with that id for this business";
            }
        }

        return res.status(201).json({message: "Success", outcomes: outcomes})


    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}