import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
	// browser-friendly UMD build
	{
        input: "src/index.ts",
		output: {
			name: 'howLongUntilLunch',
			file: packageJson.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
            typescript({ tsconfig: "./tsconfig.json" })
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.ts',
		external: ['ms'],
		output: [
			{ file: packageJson.main, format: 'cjs', sourcemap: true },
			{ file: packageJson.module, format: 'es', sourcemap: true }
		],
        plugins: [dts()]
	}
];

