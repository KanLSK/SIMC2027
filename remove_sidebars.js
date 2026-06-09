const fs = require('fs');

// Utility to remove a block between two patterns
function removeSidebarBlock(content) {
  // Pattern: find the wrapping grid div, remove the first child (sidebar div)
  // The sidebar always starts with: {/* Sidebar */} or {/* Sidebar header */} or {/* Sidebar (same as admin) */}
  // and ends before the {/* Main */} or the second top-level div inside the grid
  
  // Strategy: find each {/* Sidebar */} comment and remove the surrounding <div ...>...</div>
  const sidebarComments = ['{/* Sidebar */}', '{/* Sidebar (same as admin) */}'];
  
  for (const comment of sidebarComments) {
    while (content.includes(comment)) {
      const commentIdx = content.indexOf(comment);
      // Find the opening <div before this comment
      // Walk backwards to find the opening tag
      let searchFrom = commentIdx - 1;
      while (searchFrom > 0 && content[searchFrom] !== '>') searchFrom--;
      
      // Find the matching <div start
      let divStart = content.lastIndexOf('<div', searchFrom);
      if (divStart === -1) break;
      
      // Now find the closing </div> for this div - count braces
      let depth = 0;
      let pos = divStart;
      let end = -1;
      while (pos < content.length) {
        if (content.startsWith('<div', pos)) {
          depth++;
          pos += 4;
        } else if (content.startsWith('</div>', pos)) {
          depth--;
          if (depth === 0) {
            end = pos + 6;
            break;
          }
          pos += 6;
        } else {
          pos++;
        }
      }
      
      if (end === -1) break;
      
      // Remove from divStart to end, also any leading whitespace/newlines
      let removeFrom = divStart;
      while (removeFrom > 0 && (content[removeFrom-1] === ' ' || content[removeFrom-1] === '\n' || content[removeFrom-1] === '\r')) {
        removeFrom--;
      }
      
      content = content.substring(0, removeFrom) + '\n' + content.substring(end);
    }
  }
  
  return content;
}

// Also fix the grid layout so the sidebar column is removed
function fixGridLayout(content, originalCols, newCols) {
  return content.replace(originalCols, newCols);
}

const files = [
  {
    path: 'apps/web/src/app/admin/page.tsx',
    oldGrid: 'gridTemplateColumns: "240px 1fr"',
    newGrid: 'gridTemplateColumns: "1fr"',
  },
  {
    path: 'apps/web/src/app/admin/applicants/page.tsx',
    oldGrid: 'gridTemplateColumns: "240px 220px 1fr"',
    newGrid: 'gridTemplateColumns: "220px 1fr"',
  },
  {
    path: 'apps/web/src/app/admin/applicants/edit/page.tsx',
    oldGrid: 'gridTemplateColumns: "240px 1fr"',
    newGrid: 'gridTemplateColumns: "1fr"',
  },
  {
    path: 'apps/web/src/app/admin/comms/page.tsx',
    oldGrid: 'gridTemplateColumns: "240px 380px 1fr"',
    newGrid: 'gridTemplateColumns: "380px 1fr"',
  },
  {
    path: 'apps/web/src/app/admin/comms/new/page.tsx',
    oldGrid: 'gridTemplateColumns: "240px 1fr"',
    newGrid: 'gridTemplateColumns: "1fr"',
  },
];

for (const f of files) {
  let content = fs.readFileSync(f.path, 'utf8');
  content = removeSidebarBlock(content);
  if (f.oldGrid) content = content.replace(f.oldGrid, f.newGrid);
  fs.writeFileSync(f.path, content);
  console.log('Fixed:', f.path);
}

// Exams has its own special left panel (not just a sidebar), keep as-is
console.log('Done!');
