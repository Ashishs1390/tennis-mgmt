const env = process.env.NODE_ENV || 'development';
 
const baseConfig = {
    env,
    isDev:env === 'development',

}
console.log("00000000")
console.log(require('./dev'));
let envConfig = {};

switch (env){
    case 'dev':
    case 'development':
        // console.log()
        envConfig = require('./dev');
        break;
    default:
        envConfig = require('./prod');
}


let  config = {...baseConfig,...envConfig};

// export default config;
module.exports = config;