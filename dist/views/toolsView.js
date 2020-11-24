"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(tool) {
        let viewObj = {
            _id: tool === null || tool === void 0 ? void 0 : tool._id,
            title: tool === null || tool === void 0 ? void 0 : tool.title,
            link: tool === null || tool === void 0 ? void 0 : tool.link,
            description: tool === null || tool === void 0 ? void 0 : tool.description,
            tags: tool === null || tool === void 0 ? void 0 : tool.tags,
        };
        return viewObj;
    },
    renderMany(tools) {
        return tools.map(tool => this.render(tool));
    }
};
