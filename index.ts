import { execSync } from "child_process";
const args = process.argv.slice(2);
const lastRelease = args[0];
const thisRelease = args[1];
const command = `git log --pretty="format:<%s> %b" ${lastRelease}..${thisRelease} | grep "Merge pull"`;
const allPRs = execSync(command, { cwd: process.cwd() }).toString();

const allPRIds = allPRs.split("\n").map(prTitle => {
  const matches = prTitle.match(/#[\d]+/);
  if (matches != null && matches.length > 0) {
    return matches[0];
  }
  return "";
});

const changeLog = allPRs
  .split("\n")
  .map((prTitle, index) => {
    return "*" + prTitle.replace(/<.*>/, "") + " " + allPRIds[index];
  })
  .sort(function(a: string, b: string) {
    return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
  })
  .join("\n");

console.log("changeLog: \n", changeLog);
