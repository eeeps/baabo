/* returned object looks like: 
{
  jake: [
    true,  false, false, true,
    false, false, true,  true,
    false, true,  true,  false,
    true,  false, false, false,
    false, false, false, false,
    false, false, true,  true,
    false
  ],
  andrea: [ ${ 25 booleans go here (includes free space!) } ],
  etc...
}

Now I need it to look like this...

[
	{
		game: '2023',
		player: 'jake',
		squareStates: [ true, false, &c... ]
	},
]

*/

import fetchChangeHistoryFromDatabaseWhere from '../lib/fetchChangeHistoryFromDatabaseWhere.js';
import boardStatesFromChangeHistory from '../lib/boardStatesFromChangeHistory.js';
import urlSlugify from '../lib/urlSlugify.js';

import boards from './boards.json' with { type: 'json' };

export default async function() {

	// fetch entire change history
	const changeHistory = await fetchChangeHistoryFromDatabaseWhere( {} );
	
	let gameAndPlayerNames = boards.reduce( ( acc, cv ) => {

		if ( !acc.find( item => {
			item.game === urlSlugify( cv.game ) &&
			item.player === urlSlugify( cv.player )
		} ) ) {
			acc.push( { game: urlSlugify( cv.game ), player: urlSlugify( cv.player ) } )
		}

		return acc;
	}, [] );
	
	return boardStatesFromChangeHistory( gameAndPlayerNames, changeHistory );
	
};
