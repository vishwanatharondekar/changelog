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
const FEAT_PRS = [];
const FIX_PRS = [];
const DOCS_PRS = [];
const STYLE_PRS = [];
const REFACTOR_PRS = [];
const PERF_PRS = [];
const TEST_PRS = [];
const BUILD_PRS = [];
const CI_PRS = [];
const CHORE_PRS = [];
const REVERT_PRS = [];
const OTHER_PRS = [];
exports.allPRsFormatted = allPRs.split("\n").map((prTitle, index) => {
    prTitle = prTitle.replace(/<.*>/, "") + " " + allPRIds[index];
    const regex = /(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)/g;
    const match = prTitle.match(regex);
    if (match) {
        switch (match[0]) {
            case "feat":
                FEAT_PRS.push(prTitle);
                break;
            case "fix":
                FIX_PRS.push(prTitle);
                break;
            case "docs":
                DOCS_PRS.push(prTitle);
                break;
            case "style":
                STYLE_PRS.push(prTitle);
                break;
            case "refactor":
                REFACTOR_PRS.push(prTitle);
                break;
            case "perf":
                PERF_PRS.push(prTitle);
                break;
            case "test":
                TEST_PRS.push(prTitle);
                break;
            case "build":
                BUILD_PRS.push(prTitle);
                break;
            case "ci":
                CI_PRS.push(prTitle);
                break;
            case "chore":
                CHORE_PRS.push(prTitle);
                break;
            case "revert":
                REVERT_PRS.push(prTitle);
                break;
            default:
                OTHER_PRS.push(prTitle);
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
const allFormattedPRS_TYPES = [
    { type: constants_1.FEATURES, PRS: FEAT_PRS },
    { type: constants_1.FIXES, PRS: FIX_PRS },
    { type: constants_1.DOCS, PRS: DOCS_PRS },
    { type: constants_1.STYLE, PRS: STYLE_PRS },
    { type: constants_1.REFACTOR, PRS: REFACTOR_PRS },
    { type: constants_1.PERFORMANCE, PRS: PERF_PRS },
    { type: constants_1.TEST, PRS: TEST_PRS },
    { type: constants_1.BUILD, PRS: BUILD_PRS },
    { type: constants_1.CI, PRS: CI_PRS },
    { type: constants_1.CHORE, PRS: CHORE_PRS },
    { type: constants_1.REVERT, PRS: REVERT_PRS },
    { type: constants_1.OTHERS, PRS: OTHER_PRS }
];
for (let i = 0; i < allFormattedPRS_TYPES.length; i++) {
    const allFormattedPRS_TYPE = allFormattedPRS_TYPES[i];
    logFormattedPRS(allFormattedPRS_TYPE.type, allFormattedPRS_TYPE.PRS);
}
console.log("------------------------------------CHANGE LOG ENDS------------------------------------------------\n");
//# sourceMappingURL=index.js.map