import { execSync } from "child_process";
import {
  OTHERS,
  FIX_CASE_CHECK,
  DOCS_CASE_CHECK,
  FEAT_CASE_CHECK,
  STYLE_CASE_CHECK,
  REFACTOR_CASE_CHECK,
  PERF_CASE_CHECK,
  TEST_CASE_CHECK,
  BUILD_CASE_CHECK,
  CI_CASE_CHECK,
  CHORE_CASE_CHECK,
  REVERT_CASE_CHECK,
  allFormattedPRS_MAP
} from "./constants";

const args = process.argv.slice(2);
const prevRelease = args[0];
const curRelease = args[1];
const command = `git log --pretty="format:<%s> %b" ${prevRelease}..${curRelease} | grep "Merge pull"`;
const allPRs = execSync(command, { cwd: process.cwd() }).toString();

const allPRIds = allPRs.split("\n").map(prTitle => {
  const matches = prTitle.match(/#[\d]+/);
  if (matches != null && matches.length > 0) {
    return matches[0];
  }
  return "";
});

export const allPRsFormatted = allPRs.split("\n").map((prTitle, index) => {
  prTitle = prTitle.replace(/<.*>/, "") + " " + allPRIds[index];
  const regex = /(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)/g;
  const match = prTitle.match(regex);
  if (match) {
    switch (match[0]) {
      case FEAT_CASE_CHECK:
        allFormattedPRS_MAP[FEAT_CASE_CHECK].PRS.push(prTitle);
        break;
      case FIX_CASE_CHECK:
        allFormattedPRS_MAP[FIX_CASE_CHECK].PRS.push(prTitle);
        break;
      case DOCS_CASE_CHECK:
        allFormattedPRS_MAP[DOCS_CASE_CHECK].PRS.push(prTitle);
        break;
      case STYLE_CASE_CHECK:
        allFormattedPRS_MAP[STYLE_CASE_CHECK].PRS.push(prTitle);
        break;
      case REFACTOR_CASE_CHECK:
        allFormattedPRS_MAP[REFACTOR_CASE_CHECK].PRS.push(prTitle);
        break;
      case PERF_CASE_CHECK:
        allFormattedPRS_MAP[PERF_CASE_CHECK].PRS.push(prTitle);
        break;
      case TEST_CASE_CHECK:
        allFormattedPRS_MAP[TEST_CASE_CHECK].PRS.push(prTitle);
        break;
      case BUILD_CASE_CHECK:
        allFormattedPRS_MAP[BUILD_CASE_CHECK].PRS.push(prTitle);
        break;
      case CI_CASE_CHECK:
        allFormattedPRS_MAP[CI_CASE_CHECK].PRS.push(prTitle);
        break;
      case CHORE_CASE_CHECK:
        allFormattedPRS_MAP[CHORE_CASE_CHECK].PRS.push(prTitle);
        break;
      case REVERT_CASE_CHECK:
        allFormattedPRS_MAP[REVERT_CASE_CHECK].PRS.push(prTitle);
        break;
      default:
        allFormattedPRS_MAP[OTHERS].PRS.push(prTitle);
        break;
    }
  }
});

console.log(
  "\n--------------------------------CHANGE LOG STARTS-----------------------------------------"
);
console.log("\n");

const logFormattedPRS = (type: string, PRS: Array<string>) => {
  if (PRS.length === 0) return;
  console.log(`## ${type}`);
  for (let i = 0; i < PRS.length; i++) {
    console.log("*" + PRS[i]);
  }
  console.log("\n");
};

for (let key in allFormattedPRS_MAP) {
  const allFormattedPR_MAP = allFormattedPRS_MAP[key];
  logFormattedPRS(allFormattedPR_MAP.type, allFormattedPR_MAP.PRS);
}

console.log(
  "------------------------------------CHANGE LOG ENDS------------------------------------------------\n"
);
