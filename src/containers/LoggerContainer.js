/**
 * @author = { DollnKey }; // https://github.com/DollnKey
 * @description = 'Logger, alertar ações no terminal';
 * @version = "v14.7.1";
 */

const {
    magenta, blueBright, whiteBright, greenBright, yellowBright, redBright, cyanBright
} = require('chalk');

module.exports = class LoggerContainer {
    constructor(options={ scope: '' || undefined }) {
        this.scope = options?.scope;
    };

    info(text='') {
        return console.log(`${this.base} › ${cyanBright('info')} — ${whiteBright(text)}`);
    };

    debug(text='') {
        return console.log(`${this.base} › ${greenBright('debug')} — ${whiteBright(text)}`);
    };

    warn(text='') {
        return console.log(`${this.base} › ${yellowBright('warn')} — ${text}`);
    };

    error(text='', error=null) {
        if(error) console.error(error);
        return console.log(`${this.base} › ${redBright('error')} — ${whiteBright(text)}`);
    };

    get base() {
        return `${magenta.bold('['+this.scope+']')}`;
    };
};