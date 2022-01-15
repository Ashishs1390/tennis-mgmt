const env = process.env.NODE_ENV || 'development';
 
const baseConfig = {
    env,
    isDev:env === 'development',

}

let envConfig = {};
switch (env){
    case 'development':
        envConfig = require('./dev');
        break;
    default:
        envConfig = require('./prod');
}


let  config = {...baseConfig,...envConfig};

// export default config;
module.exports = config;