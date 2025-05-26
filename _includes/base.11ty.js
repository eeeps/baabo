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

	<link
	  rel="preload"
	  href="/fonts/Outfit-Medium.woff2"
	  as="font"
	  type="font/woff2"
	  crossorigin="anonymous"
	>
	<link
	  rel="preload"
	  href="/fonts/BungeeShade-Regular.woff2"
	  as="font"
	  type="font/woff2"
	  crossorigin="anonymous"
	>

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
	
	<!-- todo don't block on whole body, or on every page?	-->
    <link rel="expect" href="#body" blocking="render">
	<script>'render-blocking workaround https://bsky.app/profile/nomster.bsky.social/post/3loxku2sppk2j'</script>

</head>
<body id=body>

${data.content}

</body>
</html>`;
};