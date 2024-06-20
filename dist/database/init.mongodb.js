'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    static instance;
    constructor() {
        this.connect('mongodb');
    }
    connect(type) {
        if (type === 'mongodb') {
            if (1 === 1) {
                mongoose_1.default.set('debug', true);
                mongoose_1.default.set('debug', { color: true });
            }
            const connectString = 'mongodb+srv://socialnetwork:IsBSBM6L1CFiiQWL@socialcluster.i599n1a.mongodb.net/SocialProDEV';
            mongoose_1.default
                .connect(connectString, {
                maxPoolSize: 50
            })
                .then(() => {
                console.log('Connected to MongoDB');
            })
                .catch((err) => {
                console.log('Error connecting to MongoDB');
                console.log(err);
            });
        }
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceDB = Database.getInstance();
exports.default = instanceDB;
//# sourceMappingURL=init.mongodb.js.map