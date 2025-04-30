export const data = {
	permalink: `/env.js`
};

export function render(data) {
	return `
const databaseURL = "${ process.env.DATABASE_URL }";
const databaseToken = "${ process.env.DATABASE_TOKEN }";

export {
	databaseURL,
	databaseToken
}
`
}