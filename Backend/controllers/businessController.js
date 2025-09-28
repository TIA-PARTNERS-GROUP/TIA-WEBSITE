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
            id: bi.id,
            businessName: bi.name,
            contactName: bi.contact_name,
            contactPhone: bi.contact_phone_no,
            contactEmail: bi.contact_email,
            businessCategory: bi.category, 
            businessDescription: bi.description,
            businessValue: bi.value,
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

export const addConnection = async (req, res) => {
    try {
        const business = businessModel(db);
        const user = userModel(db);
        const { initiatingBusinessId, receivingBusinessId } = req.body;
        const businessResult = await user.fetchBusinessFromOwnerId(req.user.id);
        if (businessResult == null) {
            res.status(404).json({message: "No business exists for user"});
        }
        const userBusinessId = businessResult.id;
        if (!receivingBusinessId) {
            return res.status(400).json({message: "No receiving business id provided"})
        }
        if (!initiatingBusinessId) {
            return res.status(400).json({message: "No initiating business id provided"})
        }

        if (userBusinessId != initiatingBusinessId & userBusinessId != receivingBusinessId) {
            return res.status(403).json({message: "You can only create connections for your own business"})
        }
        
        
        

        if (initiatingBusinessId == receivingBusinessId) {
            return res.status(400).json({message: "Cannot connect to self"})
        }
        const connectionId = await business.addConnection(initiatingBusinessId, receivingBusinessId);
        return res.status(201).json({message: "Connection added", connectionId: connectionId})

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

export const removeConnection = async (req, res) => {
    try {
        const business = businessModel(db);
        const user = userModel(db);
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({message: "No connection id provided"})
        }
        const userBusiness = await user.fetchBusinessFromOwnerId(req.user.id);
        if (userBusiness == null) {
            res.status(404).json({message: "No business exists for user"});
        }

        const connection = await business.getConnectionInfo(id);

        if (connection == null) {
            return res.status(404).json({message: "No connection with that id"});
        }


        const initiatingBusinessId = connection.initiating_business_id;
        const receivingBusinessId = connection.receiving_business_id;
        

        console.log(id)
        console.log(initiatingBusinessId)
        console.log(receivingBusinessId)
        
        if (userBusiness.id != initiatingBusinessId && userBusiness.id != receivingBusinessId) {
            return res.status(403).json({message: "You can only remove connections for your own business"})
        }
        const rowsAffected = await business.removeConnection(id);
        if (rowsAffected == 0) {
            return res.status(404).json({message: "No connection with that id"})
        }

        return res.status(200).json({message: "Connection removed"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}
        
export const queryBusinesses = async (req, res) => {
  try {
    const business = businessModel(db);
    
    // Query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    // Tags
    let tags = [];
    if (req.query.tags) {
      tags = Array.isArray(req.query.tags) 
        ? req.query.tags.map(tag => parseInt(tag)) 
        : [parseInt(req.query.tags)];
    }

    // Validate parameters
    if (page < 1) {
      return res.status(400).json({ message: "Page must be at least 1" });
    }
    if (limit < 1 || limit > 100) {
      return res.status(400).json({ message: "Limit must be between 1 and 100" });
    }

    // Get paginated results
    const result = await business.getPaginated(page, limit, tags, search);

    return res.status(200).json({
      message: "Success",
      data: result.data,
      pagination: result.pagination
    });

  } catch (error) {
    console.error("Error in getBusinesses:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
