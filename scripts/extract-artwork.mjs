import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "src/assets/artwork")

function loadPaths(rel) {
  const source = fs.readFileSync(path.join(root, rel), "utf8")
  const body = source.replace(/^export default\s*/, "").trim()
  return new Function(`return (${body})`)()
}

function esc(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function pathEl(d, fill, extra = "") {
  const evenodd = extra.includes("norule")
    ? ""
    : ' clip-rule="evenodd" fill-rule="evenodd"'
  return `  <path${evenodd} d="${esc(d)}" fill="${fill}"/>`
}

function svg(viewBox, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="${viewBox}" preserveAspectRatio="none">
${inner}
</svg>
`
}

function write(name, viewBox, inner) {
  fs.writeFileSync(path.join(outDir, name), svg(viewBox, inner))
}

const desktop = loadPaths("src/imports/404DesktopRefined1441/svg-63zx3hak77.ts")
const mobile1 = loadPaths("src/imports/1V2/svg-vy8oobu6l3.ts")
const mobile2 = loadPaths("src/imports/2V2-1/svg-gfwgngoxnt.ts")
const mobile3 = loadPaths("src/imports/3V2/svg-46i3mmpxoe.ts")
const mobile4 = loadPaths("src/imports/4V2/svg-2fx4btn5du.ts")
const mobile5 = loadPaths("src/imports/5V2/svg-cwrkicwdob.ts")
const mobile6 = loadPaths("src/imports/6V2/svg-1oppkiw3ux.ts")
const mobile7 = loadPaths("src/imports/7V2/svg-bxgtjz1iuf.ts")
const mobile8 = loadPaths("src/imports/8V2/svg-sj3gkng97d.ts")
const mobile9 = loadPaths("src/imports/9V2/svg-ezw7h45yix.ts")
const mobile10 = loadPaths("src/imports/10V2State2-1/svg-sxvnmxr5yz.ts")
const mobile11 = loadPaths("src/imports/11V2/svg-we3evo8zed.ts")

fs.mkdirSync(outDir, { recursive: true })

const dropShadow = (
  id,
  x,
  y,
  width,
  height,
) => `  <filter id="${id}" x="${x}" y="${y}" width="${width}" height="${height}" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feOffset dy="2.89405"/>
    <feGaussianBlur stdDeviation="1.44703"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow"/>
    <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape"/>
  </filter>`

write(
  "desktop-hero.svg",
  "0 0 865.369 268.188",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p2503b500, "#BD3133")}
${pathEl(desktop.p194ad280, "#FBF9F6")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="865.369" height="268.188"/></clipPath>
  </defs>`,
)

write(
  "desktop-challenge.svg",
  "0 0 486 342",
  `  <g clip-path="url(#clip)">
    <g filter="url(#shadow0)">${pathEl(desktop.p37583900, "#FBF9F6")}</g>
    <g filter="url(#shadow1)">${pathEl(desktop.p295bf200, "#BD3133")}</g>
  </g>
  <defs>
${dropShadow("shadow0", "-2.56805", "0", "475.022", "409.056")}
${dropShadow("shadow1", "-2.89405", "113.592", "475.295", "121.921")}
    <clipPath id="clip"><rect fill="white" width="486" height="342"/></clipPath>
  </defs>`,
)

write(
  "desktop-bigtech.svg",
  "0 0 486 281",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.pdda4d00, "#FBF9F6")}
${pathEl(desktop.pa647b00, "#BD3133")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="486" height="281"/></clipPath>
  </defs>`,
)

write(
  "desktop-missing.svg",
  "0 0 450.741 373.12",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p34029700, "#FBF9F6")}
${pathEl(desktop.p228b2800, "#FBF9F6")}
${pathEl(desktop.p33ec5380, "#FBF9F6")}
${pathEl(desktop.p1232d400, "#BD3133")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="450.741" height="373.12"/></clipPath>
  </defs>`,
)

write(
  "desktop-cta-search.svg",
  "0 0 280 64",
  pathEl(desktop.p23772980, "#FBF9F6"),
)

write(
  "desktop-investigate.svg",
  "0 0 486 210.849",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p27357c00, "#FBF9F6")}
${pathEl(desktop.p2cd9f400, "#BD3133")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="486" height="210.849"/></clipPath>
  </defs>`,
)

write(
  "desktop-external-systems.svg",
  "0 0 360 109.434",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p27c200, "#FBF9F6")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="360" height="109.434"/></clipPath>
  </defs>`,
)

write(
  "desktop-media-files.svg",
  "0 0 304.124 116",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p1819a400, "#FBF9F6")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="304.124" height="116"/></clipPath>
  </defs>`,
)

write(
  "desktop-chat.svg",
  "0 0 486 116.179",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p13a72a00, "#FBF9F6")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="486" height="116.179"/></clipPath>
  </defs>`,
)

write(
  "desktop-not-for-you.svg",
  "0 0 400.072 641.676",
  `${pathEl(desktop.p3219ea00, "#FBF9F5")}
${pathEl(desktop.p3ef00900, "#BC3034")}`,
)

write(
  "desktop-not-for-you-items.svg",
  "0 0 333.221 534.454",
  `${pathEl(desktop.p37e45900, "#FBF9F5")}
${pathEl(desktop.p196b3f40, "#BC3034")}`,
)

write(
  "desktop-characters.svg",
  "0 0 450 427.455",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.pd52c600, "#FBF9F6")}
${pathEl(desktop.p359eaa00, "#BD3133")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="450" height="427.455"/></clipPath>
  </defs>`,
)

write(
  "desktop-cta-ready.svg",
  "0 0 109.705 28.4324",
  pathEl(desktop.p2eab2500, "#FBF9F6"),
)

write(
  "desktop-quests.svg",
  "0 0 486 258.702",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p351a8c00, "#FBF9F6")}
${pathEl(desktop.p37213300, "#BD3133")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="486" height="258.702"/></clipPath>
  </defs>`,
)

write(
  "desktop-quests-items.svg",
  "0 0 238.11 124",
  `  <mask id="mask" maskUnits="userSpaceOnUse" x="0" y="0" width="239" height="124" style="mask-type:alpha">
    <rect fill="#D9D9D9" width="238.11" height="124"/>
  </mask>
  <g mask="url(#mask)">
${pathEl(desktop.p27e0f400, "#FBF9F6")}
${pathEl(desktop.p4605f00, "#BD3133")}
  </g>`,
)

write(
  "desktop-immersion.svg",
  "0 0 486 383.566",
  `  <g clip-path="url(#clip)">
${pathEl(desktop.p2f71bb00, "#FBF9F6")}
${pathEl(desktop.p11084f0, "#BD3133")}
  </g>
  <defs>
    <clipPath id="clip"><rect fill="white" width="486" height="383.566"/></clipPath>
  </defs>`,
)

write(
  "desktop-pricing-headline.svg",
  "0 0 502.579 105.379",
  pathEl(desktop.p186b37f0, "#FBF9F6"),
)
write(
  "desktop-price.svg",
  "0 0 339.165 236.451",
  pathEl(desktop.p1a82de80, "#BD3133"),
)
write(
  "desktop-cta-buy.svg",
  "0 0 259.504 28",
  pathEl(desktop.pbb24180, "#FBF9F5"),
)

write(
  "desktop-benefit-1.svg",
  "0 0 363.257 42.916",
  `${pathEl(desktop.p18d86300, "#BD3133")}
${pathEl(desktop.p9df9a00, "#FBF9F5")}`,
)
write(
  "desktop-benefit-2.svg",
  "0 0 419.963 43.0235",
  `${pathEl(desktop.p3a395780, "#BD3133")}
${pathEl(desktop.p3248ea00, "#FBF9F5")}`,
)
write(
  "desktop-benefit-3.svg",
  "0 0 559.677 42.0165",
  `${pathEl(desktop.p1226a20, "#BD3133")}
${pathEl(desktop.p2ddb1480, "#FBF9F5")}`,
)
write(
  "desktop-benefit-4.svg",
  "0 0 588 42.837",
  `${pathEl(desktop.p2aeb400, "#BD3133", "norule")}
${pathEl(desktop.p3eca6600, "#FBF9F5")}`,
)
write(
  "desktop-benefit-5.svg",
  "0 0 407.4 42.837",
  `${pathEl(desktop.p2aeb400, "#BD3133", "norule")}
${pathEl(desktop.p1703a580, "#FBF9F5")}`,
)
write(
  "desktop-benefit-6.svg",
  "0 0 472.156 42.837",
  `${pathEl(desktop.p1f14ac80, "#BD3133", "norule")}
${pathEl(desktop.p2a4ea400, "#FBF9F5")}`,
)

write(
  "desktop-faq.svg",
  "0 0 486 453.655",
  `${pathEl(desktop.p364c9000, "#FBF9F6")}
${pathEl(desktop.p1558f000, "#BD3133")}`,
)

write(
  "mobile-hero.svg",
  "0 0 390 844",
  `  <rect fill="black" width="390" height="844"/>
${pathEl(mobile1.pa22aa00, "#FBF9F6")}
${pathEl(mobile1.p309aa480, "#BD3133")}`,
)

write(
  "mobile-challenge.svg",
  "0 0 390 788",
  `  <rect fill="black" width="390" height="788"/>
${pathEl(mobile2.p3a82f7b0, "#BD3133")}
${pathEl(mobile2.p10aabc00, "#FBF9F6")}`,
)

write(
  "mobile-bigtech-red.svg",
  "0 0 243.823 117.428",
  pathEl(mobile3.p823ce80, "#BD3133"),
)
write(
  "mobile-bigtech.svg",
  "0 0 306 198.857",
  pathEl(mobile3.p2039cc80, "#FBF9F6"),
)

write(
  "mobile-missing-yet-another.svg",
  "0 0 267.635 60.8732",
  pathEl(mobile4.p205bfd00, "#FBF9F6"),
)
write(
  "mobile-missing-genius.svg",
  "0 0 146.402 61.5506",
  pathEl(mobile4.pecc9b00, "#FBF9F6"),
)
write(
  "mobile-missing-ai-developer.svg",
  "0 0 278.485 62.0419",
  pathEl(mobile4.p18808b80, "#FBF9F6"),
)
write(
  "mobile-missing-gone.svg",
  "0 0 305.527 58.2796",
  pathEl(mobile4.p2a00b100, "#BD3133"),
)
write(
  "mobile-missing-subtitle.svg",
  "0 0 182.65 13.5045",
  pathEl(mobile4.p3935b900, "#FBF9F6"),
)
write(
  "mobile-cta-search.svg",
  "0 0 200.044 28",
  pathEl(mobile4.p3dfe5ac0, "#FBF9F6"),
)

write(
  "mobile-investigate-01.svg",
  "0 0 15.1313 17.6345",
  pathEl(mobile5.p29707800, "#BD3133"),
)
write(
  "mobile-investigate-02.svg",
  "0 0 18.6159 17.6068",
  pathEl(mobile5.p318fee80, "#BD3133"),
)
write(
  "mobile-investigate-03.svg",
  "0 0 18.0745 16.8743",
  pathEl(mobile5.p23b38cf0, "#BD3133"),
)
write(
  "mobile-investigate.svg",
  "0 0 306 132.588",
  pathEl(mobile5.p19cbce30, "#FBF9F6"),
)
write(
  "mobile-investigate-red.svg",
  "0 0 191.056 62.6447",
  pathEl(mobile5.p31a80680, "#BD3133"),
)
write(
  "mobile-external-systems.svg",
  "0 0 212.777 64.6703",
  pathEl(mobile5.p29366080, "#FBF9F6"),
)
write(
  "mobile-media-files.svg",
  "0 0 166.731 63.5948",
  pathEl(mobile5.p1bb1e600, "#FBF9F6"),
)
write(
  "mobile-chat.svg",
  "0 0 263.755 63.0477",
  pathEl(mobile5.pda9eb00, "#FBF9F6"),
)

write(
  "mobile-not-for-you-items.svg",
  "0 0 239.215 383.678",
  `${pathEl(mobile6.p1f427500, "#FBF9F5")}
${pathEl(mobile6.p364f0100, "#BC3034")}`,
)
write(
  "mobile-not-for-you.svg",
  "0 0 306.055 490.882",
  `${pathEl(mobile6.p34cba700, "#FBF9F5")}
${pathEl(mobile6.pd74df00, "#BC3034")}`,
)

write(
  "mobile-characters.svg",
  "0 0 306 329.25",
  pathEl(mobile7.p21c7d840, "#FBF9F6"),
)
write(
  "mobile-characters-red.svg",
  "0 0 258.215 142.298",
  pathEl(mobile7.p255d2800, "#BD3133"),
)
write(
  "mobile-cta-ready.svg",
  "0 0 108.036 28",
  pathEl(mobile7.p282a0300, "#FBF9F6"),
)

write(
  "mobile-quests.svg",
  "0 0 242.673 247.542",
  pathEl(mobile8.p3d13db00, "#FBF9F6"),
)
write(
  "mobile-quests-red.svg",
  "0 0 305.284 190.577",
  pathEl(mobile8.p16abfe00, "#BD3133"),
)

write(
  "mobile-immersion.svg",
  "0 0 258.111 284.285",
  pathEl(mobile9.pea0a000, "#FBF9F6"),
)
write(
  "mobile-immersion-red.svg",
  "0 0 305.575 160.916",
  pathEl(mobile9.p35155200, "#BD3133"),
)

write(
  "mobile-pricing-cta.svg",
  "0 0 266.238 28.7265",
  pathEl(mobile10.p2e50400, "#FBF9F5"),
)
write(
  "mobile-pricing-headline.svg",
  "0 0 316.438 66.3499",
  pathEl(mobile10.p1da0ea00, "#FBF9F6"),
)
write(
  "mobile-price.svg",
  "0 0 228.682 159.428",
  pathEl(mobile10.p39d89700, "#BD3133"),
)
write(
  "mobile-benefit-1.svg",
  "0 0 156.88 18.5344",
  `${pathEl(mobile10.p32223500, "#BD3133")}
${pathEl(mobile10.p36f8c300, "#FBF9F6")}`,
)
write(
  "mobile-benefit-2.svg",
  "0 0 181.37 18.5806",
  `${pathEl(mobile10.pbab4f00, "#BD3133")}
${pathEl(mobile10.p270a1c00, "#FBF9F6")}`,
)
write(
  "mobile-benefit-3.svg",
  "0 0 241.708 18.1457",
  `${pathEl(mobile10.p4f6ec00, "#BD3133")}
${pathEl(mobile10.p16ba3f00, "#FBF9F6")}`,
)
write(
  "mobile-benefit-4.svg",
  "0 0 253.94 18.5",
  `${pathEl(mobile10.p1ccc2f00, "#BD3133", "norule")}
${pathEl(mobile10.p23e05b80, "#FBF9F5")}`,
)
write(
  "mobile-benefit-5.svg",
  "0 0 175.944 18.5",
  `${pathEl(mobile10.p1c06e080, "#BD3133", "norule")}
${pathEl(mobile10.p1f547c80, "#FBF9F5")}`,
)
write(
  "mobile-benefit-6.svg",
  "0 0 203.91 18.5",
  `${pathEl(mobile10.p3d1d900, "#BD3133", "norule")}
${pathEl(mobile10.p11876400, "#FBF9F5")}`,
)

write(
  "mobile-faq.svg",
  "0 0 306 285.635",
  `${pathEl(mobile11.p5a5800, "#FBF9F6")}
${pathEl(mobile11.p233700, "#BD3133")}`,
)

const files = fs.readdirSync(outDir).filter((name) => name.endsWith(".svg"))
console.log(`wrote ${files.length} svg files to ${outDir}`)
