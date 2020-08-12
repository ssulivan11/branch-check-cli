const shell = require("shelljs");
const chalk = require("chalk");
const wcm = require("wildcard-match");
import getBranch from "./getBranch";

const { Command } = require("commander");
const program = new Command();

program
  .option("-m, --match <regex>", "regex for validation matching, eg: '*/*'")
  .option("-d, --dir <list>", "array of valid checks, eg: 'features/ bugs/'")
  .parse(process.argv);

const regExMatch = program?.match && wcm(program.match, "/");
const validBranchDirs = program?.dir?.split(" ");

const BranchCheck = () => {
  getBranch((err: string, branchName: string): (() => void) => {
    if (err) throw err;

    let validName = false;
    // branchName matches array, if provided
    if (validBranchDirs?.length) {
      for (let i = 0; i !== validBranchDirs.length; i += 1) {
        if (branchName.indexOf(validBranchDirs[i]) !== -1) validName = true;
      }
    }
    // branchName matches wildcard, if provided
    if (regExMatch?.test(branchName)) validName = true;

    // error message and exit
    if (!validName) {
      const checks = `${validBranchDirs ? validBranchDirs : ""} ${
        regExMatch ? regExMatch : ""
      }`;
      console.log(
        `${`\n ❌  Git Branch Name Error:`} ${chalk.grey(branchName)} \n`
      );
      console.log(
        `    ▶ Your branch name does not match the validation checks.\n      Please use of the following:`
      );
      console.log(`      ${chalk.blue(checks)}\n\n`);
      return shell.exec(process.exit(1));
    }

    // success
    console.log(
      `${chalk.green("\n ✔")}  Git Branch Name Valid - ${chalk.grey(
        branchName
      )} \n`
    );
    return shell.exec(process.exit(0));
  });
};

BranchCheck();

export default BranchCheck;
