import esbuild from "esbuild";
import { writeFile, readFile } from "node:fs/promises";
import { replaceTscAliasPaths } from "tsc-alias";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));

const packageTemplate = {
  name: packageJson.name,
  version: packageJson.version,
  author: packageJson.author,
  license: packageJson.license,
  type: "module",
};

async function buildProject() {
  const outDir = "./dist";

  const buildOptions = {
    entryPoints: [
      "src/server/main.ts",
      "src/client/main.ts",
      "src/shared/main.ts",
    ],
    outdir: outDir,
    format: "esm",
    treeShaking: true,
    minify: false,
    bundle: true,
    logLevel: "info",
    platform: "neutral",
    target: "esnext",
  };

  try {
    await esbuild.build(buildOptions);
    await replaceTscAliasPaths({ outDir });
    await writeFile(`${outDir}/package.json`, JSON.stringify(packageTemplate, null, 2));

    console.log("Build completed successfully.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildProject();
