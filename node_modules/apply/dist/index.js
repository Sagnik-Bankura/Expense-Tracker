"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliui_1 = require("@poppinss/cliui");
const exports_1 = require("@/exports");
exports_1.container
    .resolve(exports_1.CommandLineInterface)
    .run(process.argv)
    .catch((error) => {
    cliui_1.logger.fatal('An uncaught error has occured. This should not happen, so feel free to report an issue.');
    cliui_1.logger.fatal(error);
    process.exitCode = 1;
})
    .then((code) => (process.exitCode = code || 0));
