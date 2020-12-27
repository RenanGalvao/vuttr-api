// Only uses secure in production mode, test and dev enviroment uses http only
const secure = process.env.NODE_ENV == 'production' ? true : false;

// Acess Token Cookie
const accessTokenExpires = new Date( Date.now() +1000 * 60 * 15); // 15 minutes
module.exports.accessCookieOptions = {
  expires: accessTokenExpires,
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: secure,
};

// Refresh Token Cookie
const refreshTokenExpires = new Date( Date.now() + 1000 * 60 * 30); // 30 minutes
module.exports.refreshCookieOptions = {
  expires: refreshTokenExpires,
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: secure,
}
