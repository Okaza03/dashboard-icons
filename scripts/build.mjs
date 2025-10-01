import { readFile, writeFile } from "fs/promises";
import fs from "fs-extra";
import { glob } from "glob";
import sharp from "sharp";
import { optimize } from "svgo";

// output sizes
const sizes = [64, 128, 256, 512];

// categories and their input/output roots
const categories = [
  { key: "color", inDir: "svg/color", outDir: "png/color" },
  { key: "mono", inDir: "svg/mono", outDir: "png/mono" },
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

async function ensureDirs() {
  for (const { outDir } of categories) {
    for (const size of sizes) {
      await fs.ensureDir(`${outDir}/${size}`);
    }
  }
}

async function buildCategory({ key, inDir, outDir }) {
  const svgFiles = await glob(`${inDir}/*.svg`);
  const items = [];

  for (const file of svgFiles) {
    const name = file.split("/").pop().replace(".svg", "");
    const id = slugify(name);
    const raw = await readFile(file, "utf8");

    // Optimize SVG
    const { data: svg } = optimize(raw, {
      multipass: true,
      floatPrecision: 2,
      plugins: [
        "removeDoctype",
        "removeXMLProcInst",
        "removeComments",
        "removeMetadata",
        "removeEditorsNSData",
        "removeEmptyAttrs",
        "convertStyleToAttrs",
        "convertColors",
      ],
    });

    // Optionally overwrite source with optimized SVG
    await writeFile(file, svg, "utf8");

    // Generate PNGs
    const tasks = [];
    for (const size of sizes) {
      const pngOut = `${outDir}/${size}/${id}.png`;
      // transparent background, squared, contain
      tasks.push(
        sharp(Buffer.from(svg))
          .resize(size, size, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png({ compressionLevel: 9 })
          .toFile(pngOut)
      );
    }
    await Promise.all(tasks);

    items.push({
      id,
      name,
      type: key, // "color" or "mono"
      files: {
        svg: `${inDir}/${id}.svg`,
        png: sizes.map((s) => `${outDir}/${s}/${id}.png`),
      },
    });
  }

  return items;
}

async function build() {
  await ensureDirs();

  const all = [];
  for (const c of categories) {
    const items = await buildCategory(c);
    all.push(...items);
  }

  // write a top-level index, + per-category (nice for consumers)
  await writeFile("index.json", JSON.stringify(all, null, 2));
  await writeFile(
    "index.color.json",
    JSON.stringify(
      all.filter((i) => i.type === "color"),
      null,
      2
    )
  );
  await writeFile(
    "index.mono.json",
    JSON.stringify(
      all.filter((i) => i.type === "mono"),
      null,
      2
    )
  );

  console.log(
    `Built ${all.length} icons across ${categories.length} categories.`
  );
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
