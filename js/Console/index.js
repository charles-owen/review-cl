/*
 * The Review Console system entry point
 */

import '../../_review.scss';
import {ReviewConsole} from './ReviewConsole';

if(Site.Console && !Site.Console.Review) {
	//
	// Install the console components
	//
	ReviewConsole.setup(Site.Console)
	Site.Console.Review = true;
}
