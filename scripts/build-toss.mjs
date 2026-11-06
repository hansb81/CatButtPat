// 앱인토스용 정적 번들을 dist/ 에 만들어요.
// 앱인토스는 외부 사이트/CDN 대신 번들 안의 파일로 화면을 그려야 해서
// three.js와 주아체 폰트를 node_modules에서 복사해 넣고, index.html의 외부 링크를 바꿔요.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const nm = join(root, "node_modules");

rmSync(dist, { recursive: true, force: true });
mkdirSync(join(dist, "vendor", "fonts", "files"), { recursive: true });

// three.js
cpSync(join(nm, "three", "build", "three.min.js"), join(dist, "vendor", "three.min.js"));

// 주아체 (woff2만)
const fontDir = join(nm, "@fontsource", "jua");
for (const f of readdirSync(join(fontDir, "files"))) {
  if (f.endsWith(".woff2")) cpSync(join(fontDir, "files", f), join(dist, "vendor", "fonts", "files", f));
}
const fontCss = readFileSync(join(fontDir, "400.css"), "utf8")
  .replace(/,\s*url\([^)]*\.woff\) format\('woff'\)/g, "");
writeFileSync(join(dist, "vendor", "fonts", "jua.css"), fontCss);

// 아이콘
for (const f of ["favicon.png", "apple-touch-icon.png"]) cpSync(join(root, f), join(dist, f));

// index.html
let html = readFileSync(join(root, "index.html"), "utf8");
const swap = (from, to, label) => {
  if (!html.includes(from)) throw new Error(`index.html에서 ${label}을(를) 찾지 못했어요: ${from}`);
  html = html.replace(from, to);
};
swap('<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>',
     '<script src="./vendor/three.min.js"></script>', "three.js CDN");
swap('<link rel="preconnect" href="https://fonts.googleapis.com">\n', "", "Google Fonts preconnect");
swap('<link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet">',
     '<link href="./vendor/fonts/jua.css" rel="stylesheet">', "Google Fonts");
// 앱인토스 비게임 가이드: 라이트 모드만
swap('<html lang="ko">', '<html lang="ko" data-theme="light">', "<html> 태그");
// 홈 화면 추가용 메타는 토스 안에서는 필요 없어요
html = html.replace(/<meta name="apple-mobile-web-app-[^>]*>\n/g, "");

const leftover = html.match(/(?:src|href)="https?:\/\/[^"]+"/g)?.filter((m) => !m.includes("og.png"));
if (leftover?.length) throw new Error("외부 리소스가 남아 있어요: " + leftover.join(", "));

writeFileSync(join(dist, "index.html"), html);
console.log("dist/ 준비 완료");
