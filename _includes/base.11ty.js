export const data = {
	title: "BAABO",
	og_image: "https://baabo.ericportis.com/assets/opengraph-image.png",
	og_image_width: "1800",
	og_image_height: "945",
	og_description: "Bellingham Adults Against Boredom"
};

export function render(data) {
return `
<!doctype html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<title>${ data.title }</title>
	<meta name="viewport" content="width=765">

	<link rel="stylesheet" href="/style.css">

	<!-- icons -->
	<link rel="icon" href="/favicon.ico" sizes="32x32">
	<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
	<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" type="image/png">
	<link rel="manifest" href="/manifest.webmanifest">

	<!-- open graph -->
	<meta property="og:image" content="${ data.og_image }">
	<meta property="og:image:width" content="${ data.og_image_width }">
	<meta property="og:image:height" content="${ data.og_image_height }">
	<meta property="og:description" content="${ data.og_description }">
	
	${ data.head ? data.head : '' }
	
</head>
<body>

${data.content}

</body>
</html>`;
};