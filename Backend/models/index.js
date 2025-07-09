import db from '../db.js';
import adminModel from './admin.js'
import chatModel from './chat.js'
import chatBotModel from './chatBot.js'
import projectModel from './project.js'
import connectModel from './connect.js'
import manageModel from './manage.js'
import referenceModel from './reference.js'
import userModel from './user.js';

const models = {
    Admin: adminModel(db),
    Chat: chatModel(db),
    ChatBot: chatBotModel(db),
    Project: projectModel(db),
    Connect: connectModel(db),
    Manage: manageModel(db),
    Reference: referenceModel(db),
    User: userModel(db),
};

// Joshua - Accses with models.<model_name>.<operation>
export default models;