"use strict";
const fs = require('fs');
const path = require('path');
// Access Token
module.exports.accessPublicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'access_public.pen'));
module.exports.accessPrivateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'access_private.pen'));
module.exports.accessOptions = { algorithm: 'RS256', expiresIn: '15m' };
// Refresh Token
module.exports.refreshPublicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'refresh_public.pen'));
module.exports.refreshPrivateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'refresh_private.pen'));
module.exports.refreshOptions = { algorithm: 'RS256', expiresIn: '30m' };
