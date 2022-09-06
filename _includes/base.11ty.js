exports.data = {
	title: "BAABO"
};

exports.render = function(data) {
return `
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>${ data.title }</title>
	<meta name="viewport" content="width=765px">

	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com"> 
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
	<link href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Noto+Emoji&family=Outfit:wght@500&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="/style.css">

	<!-- favicon idea from https://endtimes.dev/emojis-as-favicons/ -->
	<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔲</text></svg>">

	<script src="/baabo.js"></script>
	
</head>
<body>

${data.content}

</body>
</html>`;
};