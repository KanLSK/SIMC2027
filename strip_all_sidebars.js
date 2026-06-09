const fs = require('fs');

// For each file, replace the ArtFrame + inline-sidebar wrapper with just the content div
const fixes = [
  {
    path: 'apps/web/src/app/admin/applicants/edit/page.tsx',
    from: `  return (
    <ArtFrame tone="cool" dense={false}>
      <div style={{ padding: "24px 32px", height: "100%", display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {/* Sidebar (same as admin) */}`,
    to: `  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Main */}`,
    sidebarEnd: `        </div>\n\n        {/* Main */}`,
    endFrom: `        </div>\n      </div>\n    </ArtFrame>`,
    endTo: `    </div>`,
  },
  {
    path: 'apps/web/src/app/admin/comms/new/page.tsx',
    from: `    <ArtFrame tone="cool" dense={false}>
      <div style={{ padding: "24px 32px", height: "100%", display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
        {/* Sidebar */}`,
    to: `    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>`,
    endFrom: `      </div>\n    </ArtFrame>`,
    endTo: `    </div>`,
  },
];

for (const fix of fixes) {
  let content = fs.readFileSync(fix.path, 'utf8');

  // Find the sidebar block start
  const fromIdx = content.indexOf(fix.from);
  if (fromIdx === -1) {
    console.log('Could not find FROM in', fix.path);
    continue;
  }

  // Find the end of the sidebar block: look for "{/* Main */}" after the sidebar
  const mainCommentIdx = content.indexOf('{/* Main */}', fromIdx);
  if (mainCommentIdx === -1) {
    console.log('Could not find Main comment in', fix.path);
    continue;
  }

  // Replace from ArtFrame open to just before Main comment
  content = content.substring(0, fromIdx) + fix.to + '\n        ' + content.substring(mainCommentIdx);

  // Fix end
  content = content.replace(fix.endFrom, fix.endTo);

  fs.writeFileSync(fix.path, content);
  console.log('Fixed:', fix.path);
}

// comms/page.tsx - already empty ArtFrame, just remove it
let commsContent = fs.readFileSync('apps/web/src/app/admin/comms/page.tsx', 'utf8');
commsContent = commsContent.replace(
  `    <ArtFrame tone="cool" dense={false}>\n\n    </ArtFrame>`,
  `    <div></div>`
);
fs.writeFileSync('apps/web/src/app/admin/comms/page.tsx', commsContent);
console.log('Fixed: comms/page.tsx');

console.log('All done!');
