const fs = require("fs");
const util = require("util");
const find = require("findup-sync");
const readFile = util.promisify(fs.readFile);

const getBranch = (
  cwd: string,
  callback?: (n: string, response: {}) => void
): () => void => {
  if (typeof cwd === "function") {
    callback = cwd;
    cwd = "";
  }
  const promise = readFile(gitHeadPath(cwd)).then((buf: string) =>
    parseBranch(buf)
  );
  if (typeof callback === "function") {
    promise.then((res: {}) => callback && callback("", res)).catch(callback);
  }
  return promise;
};

const parseBranch = (buf: string) => {
  const match = /ref: refs\/heads\/([^\n]+)/.exec(buf.toString());
  return match ? match[1] : null;
};

const gitHeadPath = (cwd: string) => {
  const filepath = find(".git/HEAD", { cwd: cwd || process.cwd() });
  if (!fs.existsSync(filepath)) throw new Error(".git/HEAD does not exist");
  return filepath;
};

getBranch.sync = (cwd: string) =>
  parseBranch(fs.readFileSync(gitHeadPath(cwd)));

module.exports = getBranch;
