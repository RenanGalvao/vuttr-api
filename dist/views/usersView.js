"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
function UserView(data, req, res) {
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
exports.default = UserView;
;
const errorNotFound = {
    error: 'Error',
    message: 'User(s) not found.',
};
function renderMany(users, req) {
    return users.map(user => render(user, req));
}
function render(user, req) {
    let viewObj = {
        id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    if (helpers_1.isAuthorized(req)) {
        viewObj = Object.assign(Object.assign({}, viewObj), { created_at: user === null || user === void 0 ? void 0 : user.created_at, updated_at: user === null || user === void 0 ? void 0 : user.updated_at });
    }
    return viewObj;
}
