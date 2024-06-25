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
		<li><a href="summer2024">
			<span style="display: block; font-size: 0.6em;">Summer</span>
			<span style="display: block; margin-top: -0.25em;">2024</span>
		</a></li>
		<li><a href="winter2023-24">
			<span style="display: block; font-size: 0.625em;">Winter</span>
			<span style="display: block; font-size: 0.45em; margin-top: -0.33em;">2023-2024</span>
		</a></li>
		<li><a href="2023">2023</a></li>
		<li><a href="2022">2022</a></li>
	</ul>
</div>
</div> <!--/maincontain-->
`;

}