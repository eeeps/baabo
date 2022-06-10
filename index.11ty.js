exports.data = {
	layout: "base.11ty.js"
};

exports.render = function(data) {
	return `<div>
	<header>
		<h1><a href="/">
			
			<ruby>B
			<rp>(</rp><rt>Bellingham</rt><rp>)</rp>
			</ruby>
				
			<ruby>A
			<rp>(</rp><rt>Adults</rt><rp>)</rp>
			</ruby>
				
			<ruby>A
			<rp>(</rp><rt>Against</rt><rp>)</rp>
			</ruby>
			
			<ruby>B
			<rp>(</rp><rt>B-</rt><rp>)</rp>
			</ruby>

			<ruby>o
			<rp>(</rp><rt>-oredom</rt><rp>)</rp>
			</ruby>

		</a></h1>
	</header>
	
	<h2>Players</h2>
	
	<ul>
		${ data.boards.map( board => 
			`<li><a href="/boards/${ board.player.toLowerCase() }">${ board.player }</a>`
		).join('\n\t\t') }
	</ul>
	
	<h2>Prizes</h2>
</div>`;
}