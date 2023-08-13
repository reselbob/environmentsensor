/**
 * This code is used the edgeEngine microservice to
 * report value defined in environment variables
 * @returns {*}
 */
function env() {
    return global.context.env;
}

module.exports = {
    env,
};
