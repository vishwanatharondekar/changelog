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
    prTitle = prTitle.replace(/<.*>/, "") + " " + allPRIds[index];
    const regex = /(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)/g;
    const match = prTitle.match(regex);
    if (match) {
        switch (match[0]) {
            case constants_1.FEAT_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.FEAT_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.FIX_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.FIX_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.DOCS_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.DOCS_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.STYLE_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.STYLE_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.REFACTOR_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.REFACTOR_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.PERF_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.PERF_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.TEST_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.TEST_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.BUILD_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.BUILD_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.CI_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.CI_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.CHORE_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.CHORE_CASE_CHECK].PRS.push(prTitle);
                break;
            case constants_1.REVERT_CASE_CHECK:
                constants_1.allFormattedPRS_MAP[constants_1.REVERT_CASE_CHECK].PRS.push(prTitle);
                break;
            default:
                constants_1.allFormattedPRS_MAP[constants_1.OTHERS].PRS.push(prTitle);
                break;
        }
    }
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
for (let key in constants_1.allFormattedPRS_MAP) {
    const allFormattedPR_MAP = constants_1.allFormattedPRS_MAP[key];
    logFormattedPRS(allFormattedPR_MAP.type, allFormattedPR_MAP.PRS);
}
console.log("------------------------------------CHANGE LOG ENDS------------------------------------------------\n");
//# sourceMappingURL=index.js.map