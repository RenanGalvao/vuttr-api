"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
const util_1 = require("util");
// Setting debug name for the file
const debug = util_1.debuglog('tools-view');
function ToolView(data, req, res) {
    debug(util_1.formatWithOptions({ colors: true }, '[TOOL_VIEW][INPUT] Data: %O\nRequest Method: %O\nResponse Locals: %O', data, req.method, res.locals));
    // Does the user has a valid jwt?
    let isUserAuthorized = helpers_1.isAuthorized(res);
    // If empty
    if (data == null || data instanceof Array && data.length == 0) {
        debug(util_1.formatWithOptions({ colors: true }, '[TOOL_VIEW][OUTPUT] Status: %O \n JSON: %O', 404, errorNotFound));
        return res.status(404).json(errorNotFound);
    }
    // Array
    else if (data instanceof Array) {
        const jsonResponse = renderMany(data, isUserAuthorized);
        debug(util_1.formatWithOptions({ colors: true }, '[TOOL_VIEW][OUTPUT] Status: %O \n JSON: %O', 200, jsonResponse));
        return res.json(jsonResponse);
    }
    // One
    else {
        const status = req.method == 'POST' ? 201 : req.method == 'DELETE' ? 204 : 200;
        const jsonResponse = render(data, isUserAuthorized);
        debug(util_1.formatWithOptions({ colors: true }, '[TOOL_VIEW][OUTPUT] Status: %O \n JSON: %O', status, jsonResponse));
        return res.status(status).json(jsonResponse);
    }
}
exports.default = ToolView;
;
const errorNotFound = {
    error: 'Error',
    message: 'Tool(s) not found.',
};
function renderMany(tools, isAuthorized) {
    return tools.map(tool => render(tool, isAuthorized));
}
function render(tool, isAuthorized) {
    let viewObj = {
        id: tool === null || tool === void 0 ? void 0 : tool._id,
        title: tool === null || tool === void 0 ? void 0 : tool.title,
        link: tool === null || tool === void 0 ? void 0 : tool.link,
        description: tool === null || tool === void 0 ? void 0 : tool.description,
        tags: tool === null || tool === void 0 ? void 0 : tool.tags,
        userId: tool === null || tool === void 0 ? void 0 : tool.userId,
    };
    if (isAuthorized) {
        viewObj = Object.assign(Object.assign({}, viewObj), { created_at: tool === null || tool === void 0 ? void 0 : tool.created_at, updated_at: tool === null || tool === void 0 ? void 0 : tool.updated_at });
    }
    return viewObj;
}
