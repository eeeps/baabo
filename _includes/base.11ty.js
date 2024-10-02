export const data = {
	title: "BAABO"
};

export function render(data) {
return `
<!doctype html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<title>${ data.title }</title>
	<meta name="viewport" content="width=765px">

	<link rel="stylesheet" href="/style.css">

	<!-- favicon idea from https://endtimes.dev/emojis-as-favicons/ -->
	<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔲</text></svg>">
	
</head>
<body>

${data.content}

</body>
</html>`;
};