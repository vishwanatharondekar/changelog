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
  REVERT
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
    }
  }
});

console.log(
  "\n--------------------------------CHANGE LOG STARTS-----------------------------------------"
);
console.log("\n");

const logFormattedPRS = (type: string, PRS: Array<string>) => {
  console.log(`## ${type}`);
  for (let i = 0; i < PRS.length; i++) {
    console.log("*" + PRS[i]);
  }
  console.log("\n");
};

if (FEAT_PRS.length > 0) logFormattedPRS(FEATURES, FEAT_PRS);
if (FIX_PRS.length > 0) logFormattedPRS(FIXES, FIX_PRS);
if (FIX_PRS.length > 0) logFormattedPRS(DOCS, FIX_PRS);
if (STYLE_PRS.length > 0) logFormattedPRS(STYLE, STYLE_PRS);
if (REFACTOR_PRS.length > 0) logFormattedPRS(REFACTOR, REFACTOR_PRS);
if (PERF_PRS.length > 0) logFormattedPRS(PERFORMANCE, PERF_PRS);
if (TEST_PRS.length > 0) logFormattedPRS(TEST, TEST_PRS);
if (BUILD_PRS.length > 0) logFormattedPRS(BUILD, BUILD_PRS);
if (CI_PRS.length > 0) logFormattedPRS(CI, CI_PRS);
if (CHORE_PRS.length > 0) logFormattedPRS(CHORE, CHORE_PRS);
if (REVERT_PRS.length > 0) logFormattedPRS(REVERT, REVERT_PRS);

console.log(
  "------------------------------------CHANGE LOG ENDS------------------------------------------------\n"
);
