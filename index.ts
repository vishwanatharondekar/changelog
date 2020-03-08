import { execSync } from "child_process";
import {
  FEATURES,
  FIXES,
  DOCS,
  STYLE,
  REFACTOR,
  PERFORMANCE,
  TEST,
  BUILD,
  CI,
  CHORE,
  REVERT,
  OTHERS
} from "./constants";
import COMMITIZEN_PR_TYPE from "./interfaces";

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

const FEAT_PRS: Array<string> = [];
const FIX_PRS: Array<string> = [];
const DOCS_PRS: Array<string> = [];
const STYLE_PRS: Array<string> = [];
const REFACTOR_PRS: Array<string> = [];
const PERF_PRS: Array<string> = [];
const TEST_PRS: Array<string> = [];
const BUILD_PRS: Array<string> = [];
const CI_PRS: Array<string> = [];
const CHORE_PRS: Array<string> = [];
const REVERT_PRS: Array<string> = [];
const OTHER_PRS: Array<string> = [];

export const allPRsFormatted = allPRs.split("\n").map((prTitle, index) => {
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

const allFormattedPRS_TYPES: Array<COMMITIZEN_PR_TYPE> = [
  { type: FEATURES, PRS: FEAT_PRS },
  { type: FIXES, PRS: FIX_PRS },
  { type: DOCS, PRS: DOCS_PRS },
  { type: STYLE, PRS: STYLE_PRS },
  { type: REFACTOR, PRS: REFACTOR_PRS },
  { type: PERFORMANCE, PRS: PERF_PRS },
  { type: TEST, PRS: TEST_PRS },
  { type: BUILD, PRS: BUILD_PRS },
  { type: CI, PRS: CI_PRS },
  { type: CHORE, PRS: CHORE_PRS },
  { type: REVERT, PRS: REVERT_PRS },
  { type: OTHERS, PRS: OTHER_PRS }
];

for (let i = 0; i < allFormattedPRS_TYPES.length; i++) {
  const allFormattedPRS_TYPE = allFormattedPRS_TYPES[i];
  logFormattedPRS(allFormattedPRS_TYPE.type, allFormattedPRS_TYPE.PRS);
}

console.log(
  "------------------------------------CHANGE LOG ENDS------------------------------------------------\n"
);
