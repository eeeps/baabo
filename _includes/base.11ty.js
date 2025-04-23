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

	<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
	<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" type="image/png">
	
	${ data.head ? data.head : '' }
	
</head>
<body>

${data.content}

</body>
</html>`;
};