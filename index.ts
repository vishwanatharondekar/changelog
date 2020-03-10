import { execSync } from "child_process";
import { allFormattedPRS_MAP, OTHERS, REVERT_CASE_CHECK } from "./constants";
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

export const allPRsFormatted = allPRs.split("\n").map((prTitle, index) => {
  let key: keyof typeof allFormattedPRS_MAP;
  let concatAllRegex: string = "";
  prTitle = prTitle.replace(/<.*>/, "") + " " + allPRIds[index];
  for (key in allFormattedPRS_MAP) {
    if (key !== OTHERS) {
      concatAllRegex += allFormattedPRS_MAP[key].regex;
      if (key !== REVERT_CASE_CHECK) {
        concatAllRegex += "|";
      }
    }
  }
  const regex = new RegExp(concatAllRegex, "g");
  const match = prTitle.match(regex);
  key = (match && (match[0] as keyof typeof allFormattedPRS_MAP)) || OTHERS;
  allFormattedPRS_MAP[key].PRS.push(prTitle);
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

let key: keyof typeof allFormattedPRS_MAP;

for (key in allFormattedPRS_MAP) {
  const allFormattedPR_MAP: COMMITIZEN_PR_TYPE = allFormattedPRS_MAP[key];
  logFormattedPRS(allFormattedPR_MAP.type, allFormattedPR_MAP.PRS);
}

console.log(
  "------------------------------------CHANGE LOG ENDS------------------------------------------------\n"
);
