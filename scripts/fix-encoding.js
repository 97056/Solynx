const fs = require("fs");
const path = require("path");

const dir = __dirname ? path.join(__dirname, "..") : process.cwd();
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));

let count = 0;
for (const file of files) {
  const full = path.join(dir, file);
  let buf = fs.readFileSync(full);
  let s = buf.toString("utf8");
  const orig = s;

  // mojibake for right arrow (UTF-8 of → misread as Windows-1252 then saved)
  s = s.split("â†’").join("->");
  s = s.split("â€”").join("-");
  s = s.split("â€“").join("-");
  s = s.split("â€™").join("'");
  s = s.split("Ã—").join("x");

  // Also replace any leftover unicode arrow with ASCII for safety
  s = s.replace(/\u2192/g, "->");
  s = s.replace(/\u2014/g, "-");
  s = s.replace(/\u2013/g, "-");

  if (s !== orig) {
    fs.writeFileSync(full, s, "utf8");
    count += 1;
    console.log("fixed", file);
  }
}
console.log("done", count);
