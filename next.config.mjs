// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify      : true,
	i18n           : {
		locales      : ["en"],
		defaultLocale: "en"
	},
	env            : {
		GITHUB_ID    : '',
		GITHUB_SECRET: '',
		GIPHY_API_KEY: '',
		AWS_ACCESS_KEY_ID: '',
		AWS_SECRET_ACCESS_KEY: '',
		AWS_BUCKET:'adim-interview',
		AWS_REGION:'us-east-1',
	}
};
export default config;
