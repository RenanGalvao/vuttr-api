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
const util_1 = require("util");
// Setting debug name for the file
const debug = util_1.debuglog('helpers');
function isAuthorized(res) {
    debug(util_1.formatWithOptions({ colors: true }, '[IS_AUTHORIZED][INPUT] Response Locals: %O', res.locals));
    if (res.locals && typeof res.locals.jwt === 'object' && Object.keys(res.locals.jwt).length >= 1) {
        debug(util_1.formatWithOptions({ colors: true }, '[IS_AUTHORIZED][OUTPUT] Boolean: %O', true));
        return true;
    }
    else {
        debug(util_1.formatWithOptions({ colors: true }, '[IS_AUTHORIZED][OUTPUT] Boolean: %O', false));
        return false;
    }
}
exports.isAuthorized = isAuthorized;
// Creates a filter object from request.query
// _start = skip, _end = limit, ,_sort = field, _order = asc/desc 
function createFilter(query) {
    debug(util_1.formatWithOptions({ colors: true }, '[CREATE_FILTER][INPUT] Request Query: %O', query));
    // Default values to avoid crashing the query
    let { _start: skip = 0, _end: limit = 20, // 20 items per page
    _order: order = 'asc', _sort: field = '_id' } = query, others = __rest(query, ["_start", "_end", "_order", "_sort"]);
    // For a value in a specific field, works like the LIKE operator from SQL
    // Allows a loose search
    let queryConditions = Object();
    for (let i = 0; i < Object.keys(others).length; i++) {
        queryConditions[Object.keys(others)[i]] = {
            $regex: `${Object.values(others)[i]}`,
            $options: 'i',
        };
    }
    let filter = {
        skip: Number(skip),
        limit: Number(limit),
        order: String(order),
        field: String(field),
        queryConditions
    };
    debug(util_1.formatWithOptions({ colors: true }, '[CREATE_FILTER][OUTPUT] Object: %O', filter));
    return filter;
}
exports.createFilter = createFilter;
exports.default = { isAuthorized, createFilter };
