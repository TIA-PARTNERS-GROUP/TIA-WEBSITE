import db from '../db.js';
import chatModel from './chat.js'
import chatBotModel from './chatBot.js'
import projectModel from './project.js'
import connectModel from './connect.js'
import manageModel from './manage.js'
import referenceModel from './reference.js'
import userModel from './user.js';

const models = {
    Chat: chatModel(db),
    ChatBot: chatBotModel(db),
    Project: projectModel(db),
    Connect: connectModel(db),
    Manage: manageModel(db),
    Reference: referenceModel(db),
    User: userModel(db),
};

export default models;