"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    link: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    tags: { type: Array, required: true },
}, {
    collection: 'tools',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});
