import { $ }                   from "bun";
import { build, type Options } from "tsup";

const tsupConfig = {
  entry:     ["src/**/*.ts"],
  splitting: false,
  sourcemap: false,
  clean:     true,
  bundle:    true,
} satisfies Options;

await Promise.all([
  build({
    outDir:     "dist",
    format:     "esm",
    cjsInterop: false,
    ...tsupConfig,
  }),
  build({
    outDir: "dist/cjs",
    format: "cjs",
    ...tsupConfig,
  }),
]);

await $`tsc --project tsconfig.dts.json`;

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir:      "./dist",
  minify:      true,
  sourcemap:   "external",
});

await $`cp dist/*.d.ts dist/cjs`;

process.exit();
