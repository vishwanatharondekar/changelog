"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const constants_1 = require("./constants");
const args = process.argv.slice(2);
const prevRelease = args[0];
const curRelease = args[1];
const command = `git log --pretty="format:<%s> %b" ${prevRelease}..${curRelease} | grep "Merge pull"`;
const allPRs = child_process_1.execSync(command, { cwd: process.cwd() }).toString();
const allPRIds = allPRs.split("\n").map(prTitle => {
    const matches = prTitle.match(/#[\d]+/);
    if (matches != null && matches.length > 0) {
        return matches[0];
    }
    return "";
});
exports.allPRsFormatted = allPRs.split("\n").map((prTitle, index) => {
    let key;
    let concatAllRegex = "";
    prTitle = prTitle.replace(/<.*>/, "") + " " + allPRIds[index];
    for (key in constants_1.allFormattedPRS_MAP) {
        if (key !== constants_1.OTHERS) {
            concatAllRegex += constants_1.allFormattedPRS_MAP[key].regex;
            if (key !== constants_1.REVERT_CASE_CHECK) {
                concatAllRegex += "|";
            }
        }
    }
    const regex = new RegExp(concatAllRegex, "g");
    const match = prTitle.match(regex);
    key = (match && match[0]) || constants_1.OTHERS;
    constants_1.allFormattedPRS_MAP[key].PRS.push(prTitle);
});
console.log("\n--------------------------------CHANGE LOG STARTS-----------------------------------------");
console.log("\n");
const logFormattedPRS = (type, PRS) => {
    if (PRS.length === 0)
        return;
    console.log(`## ${type}`);
    for (let i = 0; i < PRS.length; i++) {
        console.log("*" + PRS[i]);
    }
    console.log("\n");
};
let key;
for (key in constants_1.allFormattedPRS_MAP) {
    const allFormattedPR_MAP = constants_1.allFormattedPRS_MAP[key];
    logFormattedPRS(allFormattedPR_MAP.type, allFormattedPR_MAP.PRS);
}
console.log("------------------------------------CHANGE LOG ENDS------------------------------------------------\n");
//# sourceMappingURL=index.js.map