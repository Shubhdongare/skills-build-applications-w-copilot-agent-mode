"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/users', (_req, res) => {
    res.json([]);
});
app.get('/api/activities', (_req, res) => {
    res.json([]);
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB at', mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit backend running at ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
startServer();
