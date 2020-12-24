"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilter = exports.isAuthorized = void 0;
function isAuthorized(req) {
    if (req.locals && typeof req.locals.jwt === 'object' && Object.keys(req.locals.jwt).length >= 1) {
        return true;
    }
    else {
        return false;
    }
}
exports.isAuthorized = isAuthorized;
// Creates a filter object from request.query
// _start = skip, _end = limit, ,_sort = field, _order = asc/desc 
function createFilter(query) {
    // Default values to avoid crashing the query
    let { _start: skip = 0, _end: limit = 0, _order: order = 'asc', _sort: field = '_id' } = query, others = __rest(query, ["_start", "_end", "_order", "_sort"]);
    // For a value in a specific field, works like the LIKE operator from SQL
    // Allows a loose search
    let queryConditions = Object();
    for (let i = 0; i < Object.keys(others).length; i++) {
        queryConditions[Object.keys(others)[i]] = {
            $regex: `${Object.values(others)[i]}`,
            $options: 'i',
        };
    }
    return {
        skip: Number(skip),
        limit: Number(skip),
        order: String(order),
        field: String(field),
        queryConditions
    };
}
exports.createFilter = createFilter;
exports.default = { isAuthorized, createFilter };
