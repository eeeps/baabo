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
	<link rel="stylesheet" href="/style.css">
	<script>
		const playerNames = [ ${ data.boards.map( b => `"${ b.player.toLowerCase() }"` ).join(', ') } ];
	</script>
	<script src="/baabo.js"></script>
	
</head>
<body>

${data.content}

</body>
</html>`;
};