"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
function ToolView(data, req, res) {
    // If empty
    if (data == null || data instanceof Array && data.length == 0) {
        return res.status(404).json(errorNotFound);
    }
    else if (data instanceof Array) {
        return res.json(renderMany(data, req));
    }
    else {
        const status = req.method == 'POST' ? 201 : req.method == 'DELETE' ? 204 : 200;
        return res.status(status).json(render(data, req));
    }
}
exports.default = ToolView;
;
const errorNotFound = {
    error: 'Error',
    message: 'Tool(s) not found.',
};
function renderMany(tools, req) {
    return tools.map(tool => render(tool, req));
}
function render(tool, req) {
    let viewObj = {
        id: tool === null || tool === void 0 ? void 0 : tool._id,
        title: tool === null || tool === void 0 ? void 0 : tool.title,
        link: tool === null || tool === void 0 ? void 0 : tool.link,
        description: tool === null || tool === void 0 ? void 0 : tool.description,
        tags: tool === null || tool === void 0 ? void 0 : tool.tags,
    };
    if (helpers_1.isAuthorized(req)) {
        viewObj = Object.assign(Object.assign({}, viewObj), { created_at: tool === null || tool === void 0 ? void 0 : tool.created_at, updated_at: tool === null || tool === void 0 ? void 0 : tool.updated_at });
    }
    return viewObj;
}
