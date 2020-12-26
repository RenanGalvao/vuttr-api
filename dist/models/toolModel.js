"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// This import is necessary for the connection to be shared through the mongoose object
require("../database/connection");
const toolSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    link: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    tags: { type: Array, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', required: true },
}, {
    collection: 'tools',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
let toolCollection;
try {
    toolCollection = mongoose_1.model('tools', toolSchema);
}
catch (_a) {
    toolCollection = mongoose_1.model('tools');
}
exports.default = toolCollection;
