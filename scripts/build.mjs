import { readFile, writeFile } from "fs/promises";
import fs from "fs-extra";
import { glob } from "glob";
import sharp from "sharp";
import { optimize } from "svgo";

const sizes = [64, 128, 256, 512];

const outDirs = {
  png: sizes.map((s) => `png/${s}`),
  webp: sizes.map((s) => `webp/${s}`),
};

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

async function ensureDirs() {
  for (const kind of Object.keys(outDirs)) {
    for (const dir of outDirs[kind]) await fs.ensureDir(dir);
  }
}

async function build() {
  await ensureDirs();

  const svgFiles = await glob("svg/*.svg");
  const index = [];

  for (const file of svgFiles) {
    const name = file.split("/").pop().replace(".svg", "");
    const id = slugify(name);
    const raw = await readFile(file, "utf8");

    // SVGO optimize
    const { data: svg } = optimize(raw, {
      multipass: true,
      floatPrecision: 2,
      plugins: [
        "removeDimensions",
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

    // keep optimized SVG as source-of-truth too (optional)
    await writeFile(file, svg, "utf8");

    const promises = [];

    for (const size of sizes) {
      const pngOut = `png/${size}/${id}.png`;
      const webpOut = `webp/${size}/${id}.webp`;

      // rasterize from SVG for each size
      const img = sharp(Buffer.from(svg));
      promises.push(
        img
          .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png({ compressionLevel: 9 })
          .toFile(pngOut)
      );

      promises.push(
        sharp(Buffer.from(svg))
          .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ lossless: true })
          .toFile(webpOut)
      );
    }

    await Promise.all(promises);

    index.push({
      id,
      name,
      files: {
        svg: `svg/${id}.svg`,
        png: sizes.map((s) => `png/${s}/${id}.png`),
        webp: sizes.map((s) => `webp/${s}/${id}.webp`),
      },
    });
  }

  await writeFile("index.json", JSON.stringify(index, null, 2));
  console.log(`Built ${index.length} icons.`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
