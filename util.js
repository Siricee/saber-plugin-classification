/**
 * The function is used to format tag or category key, replace all spaces in url with dash.
 * @param {String} url
 * @return {String}
 */
module.exports = function formatUrl(url) {
    return url.trim().replace(/\ +/g, "-");
}