"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// This import is necessary for the connection to be shared through the mongoose object
require("../database/connection");
const userSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
}, {
    collection: 'users',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
let userCollection;
try {
    userCollection = mongoose_1.model('users', userSchema);
}
catch (_a) {
    userCollection = mongoose_1.model('users');
}
exports.default = userCollection;
