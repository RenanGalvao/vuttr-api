"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(user) {
        let viewObj = {
            _id: user === null || user === void 0 ? void 0 : user._id,
            name: user === null || user === void 0 ? void 0 : user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
        };
        return viewObj;
    },
    renderMany(users) {
        return users.map(user => this.render(user));
    }
};
