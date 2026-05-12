import urlSlugify from '../lib/urlSlugify.js';
import boards from './boards.json' with { type: 'json' };

export default async function() {
	return boards.map( b => ({ 
		game: urlSlugify( b.game ),
		name: b.player, // full, pretty version, e.g. "Stephen A."
		slug: urlSlugify( b.player ) // "stephen-a"
	 }) );
}