const fs = require("fs");

const md = fs.readFileSync("Pardes_Rimonim_Index_Translation.md", "utf8");
const lines = md.split("\n");

const gates = [];
let current = null;
let collectDesc = false;

for (const line of lines) {
    const gateMatch = line.match(
        /^## Gate (\d+)\s*—\s*"(.+?)"\s*\(\*(.+?)\*.*\)/
    );
    if (gateMatch) {
        current = {
            title: gateMatch[2],
            heTitle: gateMatch[3],
            description: "",
            chapters: [],
        };
        gates.push(current);
        collectDesc = true;
        continue;
    }

    if (current) {
        const chapMatch = line.match(/^(\d+)\.\s+(.+)$/);
        if (chapMatch) {
            collectDesc = false;
            current.chapters.push(chapMatch[2]);
        } else if (
            collectDesc &&
            line.startsWith("We named it")
        ) {
            current.description = line;
        }
    }
}

function mdToHtml(s) {
    return s
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

for (const gate of gates) {
    gate.description = mdToHtml(gate.description);
    gate.chapters = gate.chapters.map(mdToHtml);
}

const output = JSON.stringify({ gates }, null, 2);
fs.writeFileSync("index.json", output, "utf8");

console.log("Wrote index.json: " + gates.length + " gates, " +
    gates.reduce((s, g) => s + g.chapters.length, 0) + " chapters");
