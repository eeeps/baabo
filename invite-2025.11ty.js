export const data = {
	layout: "base.11ty.js",
	permalink: `invite-2025/`,
	title: `BAABO 2025`,
	head: `
		<meta property="og:image" content="/assets/baabo-2025-kickoff.png" />
		<meta property="og:title" content="BAABO 2025" />
	`
};

export function render(data) {

	return `
<style>
@font-face {
  font-family: "Bungee Regular";
  src: url("/fonts/Bungee-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

body {
	padding: 0;
	margin: 0;
}
@media (min-width: 748px) {
	body, html {
		overflow-x: clip;
	}
}

.mainContain {
	padding-top: 6rem;
	padding-bottom: 5rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
}

p, address, ul {
	font-size: 1.5rem;
}
p {
	padding-left: 1rem;
	padding-right: 1rem;
}

hgroup {
	text-align: center;
	display: grid;
	justify-items: center;
	align-items: center;
	margin-top: -14rem;
	margin-bottom: -8rem;
}

hgroup > * {
	grid-column: 1/1;
	grid-row: 1/1;
}

h1 {
	transform: skew( 0, 7deg );
}

h2 {
	font-size: 1.25rem;
	padding-top: 0.5625rem;
	padding-bottom: 0.5625rem;
}

h2:not(:first-child) {
	margin-top: 3rem;
	margin-bottom: 3rem;
}

.baabo-and-year {
	display: block;
	text-align: center;
	font-family: var(--display-font);
	font-weight: normal;
	position: relative;
}

.baabo {
	display: block;
	margin-left: 2rem;
	font-size: 8rem;
	margin-top: -2.5rem;
}

.baabo::after {
	content: "BAABO";
	color: white;
	font-family: "Bungee Regular";
	letter-spacing: 0.137ch;
	margin-left: -5.545ch;
	position: relative;
	z-index: -1;
}

.year {
	display: block;
	margin-left: 2rem;
	font-size: 11rem;
	margin-top: -0.375em;
	z-index: 2;
}

.year::after {
	content: "2025";
	color: white;
	margin-left: -4.04ch;
	font-family: "Bungee Regular";
	letter-spacing: 0.137ch;
	position: relative;
	z-index: -1;
}

.kickoff-party {
	display: block;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.15em;
	font-weight: normal;
	font-size: 2.25rem;
	
}

.when {
	text-align: center;
	font-size: 2rem;
	text-transform: uppercase;
	letter-spacing: 0.25ch;
	font-weight: 300;
}

address {
	font-style: normal;
	text-align: center;
}

.burst {
	width: 110%;
	aspect-ratio: 1/1;
	position: relative;
	top: -1rem;
	z-index: -2;
	background-image: url(/assets/burst2.svg);
	background-repeat: no-repeat;
	background-position: center center;
	animation-name: spin;
	animation-duration: 180s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>

<div class="mainContain">

<h2>It’s BAABO time!</h2>

<hgroup>
<div class="burst"></div>
<h1>
	<span class="baabo-and-year">
		<span class="baabo">BAABO</span>
		<span class=year>2025</span>
	</span>
	<span class=kickoff-party>kickoff party</span>
</h1>
</hgroup>


<h2>
When
</h2>

<p class="when">
Sunday, June 1st<br>
4pm
</p>

<h2>
Where
</h2>

<address>
Britt and Eric’s house<br>
<a href="https://www.google.com/maps/place/2824+Madrona+St,+Bellingham,+WA+98225/@48.7675736,-122.5078455,17z/">2824 Madrona St</a><br>
Bellingham
</address>

<h2>
What to bring
</h2>

<ul class="what-to-bring-list">
<li>A few challenges (more than zero, less than... seven),
<li>One idea for a prize
<li>The criteria that other players must meet in order to win your prize
<li>Any and all BAABO-curious friends – everybody’s welcome!
</ul>

<p>(Look at <a href="/">previous years</a> for inspiration.)</p>

<h2>
Food
</h2>

<p>We’ll have a salad bar with greens, veggies, and dressings. Feel free to bring proteins, toppings, sides, and/or beverages to share.</p>

<h2>What if I want to play but can't attend?</h2>

<p>No problem! Send your challenges, prize, and criteria to <a href="mailto:e@ericportis.com">e@ericportis.com</a> before the party starts.</p>

</div><!-- /.mainContain -->
`;
}