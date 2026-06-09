const fs = require('fs');
const code = fs.readFileSync('code.md', 'utf8');

function extractFunction(source, funcName) {
  const keyword = `function ${funcName}`;
  const startIndex = source.indexOf(keyword);
  if (startIndex === -1) return null;
  const parenClose = source.indexOf(')', startIndex);
  const bodyStart = source.indexOf('{', parenClose);
  let braceCount = 0, inString = false, strChar = '';
  for (let i = bodyStart; i < source.length; i++) {
    const c = source[i];
    if ((c === '"' || c === "'" || c === "`") && source[i - 1] !== '\\') {
      if (!inString) { inString = true; strChar = c; }
      else if (strChar === c) inString = false;
    }
    if (!inString) {
      if (c === '{') braceCount++;
      else if (c === '}') {
        braceCount--;
        if (braceCount === 0) return source.substring(startIndex, i + 1);
      }
    }
  }
  return null;
}

const fn = extractFunction(code, 'viewToggleStyle');
if (fn) {
  const current = fs.readFileSync('apps/web/src/components/admin/AdminUI.tsx', 'utf8');
  fs.writeFileSync('apps/web/src/components/admin/AdminUI.tsx', current + '\n\n' + fn.replace('function viewToggleStyle', 'export function viewToggleStyle'));
}
