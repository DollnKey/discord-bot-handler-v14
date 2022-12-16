/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Arquivo de configuração da Source (facil e rápido)';
 * @version = "v14.7.1";
 */

require('dotenv').config();
module.exports = {
    token: process.env.TOKEN,
    mongodb: process.env.DATABASE,
}