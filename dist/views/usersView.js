"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
const util_1 = require("util");
// Setting debug name for the file
const debug = util_1.debuglog('users-view');
function UserView(data, req, res) {
    debug(util_1.formatWithOptions({ colors: true }, '[USER_VIEW][INPUT] Data: %O\nRequest Method: %O\nResponse Locals: %O', data, req.method, res.locals));
    // Does the user has a valid jwt?
    let isUserAuthorized = helpers_1.isAuthorized(res);
    // If empty
    if (data == null || data instanceof Array && data.length == 0) {
        debug(util_1.formatWithOptions({ colors: true }, '[USER_VIEW][OUTPUT] Status: %O \n JSON: %O', 404, errorNotFound));
        return res.status(404).json(errorNotFound);
    }
    // Array
    else if (data instanceof Array) {
        const jsonResponse = renderMany(data, isUserAuthorized);
        debug(util_1.formatWithOptions({ colors: true }, '[USER_VIEW][OUTPUT] Status: %O \n JSON: %O', 200, jsonResponse));
        return res.json(jsonResponse);
    }
    // One
    else {
        const status = req.method == 'POST' ? 201 : req.method == 'DELETE' ? 204 : 200;
        const jsonResponse = render(data, isUserAuthorized);
        debug(util_1.formatWithOptions({ colors: true }, '[USER_VIEW][OUTPUT] Status: %O \n JSON: %O', status, jsonResponse));
        return res.status(status).json(jsonResponse);
    }
}
exports.default = UserView;
;
const errorNotFound = {
    error: 'Error',
    message: 'User(s) not found.',
};
function renderMany(users, isAuthorized) {
    return users.map(user => render(user, isAuthorized));
}
function render(user, isAuthorized) {
    let viewObj = {
        id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    if (isAuthorized) {
        viewObj = Object.assign(Object.assign({}, viewObj), { created_at: user === null || user === void 0 ? void 0 : user.created_at, updated_at: user === null || user === void 0 ? void 0 : user.updated_at });
    }
    return viewObj;
}
