import dts from 'bun-plugin-dts';

await Bun.build({
    entrypoints: ['./src/index.ts'],
    target: 'node',
    outdir: './dist',
    packages: 'external',
    format: 'esm',
    naming: "[dir]/[name].js",
    plugins: [
        dts()
    ],
});