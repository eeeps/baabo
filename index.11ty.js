exports.data = {
	layout: "base.11ty.js"
};

exports.render = function(data) {

// console.log( data.boardStates );

	return `
<div class="centerContainer">
<div>
	<h2>BAABO</h2>
	
	<ul class="years">
		<li><a href="2023">2023</a></li>
		<li><a href="2022">2022</a></li>
	</ul>
</div>
</div> <!--/maincontain-->
`;
}