<?php
/** @file
 * Course Assigment declarations
 */

use CL\Course\Assignments;

return function(Assignments $assignments) {
	/*
	 * Course grading categories and assignments
	 */

	$designs = $assignments->add_category("designs", "Design Assignments", 15);

    //
    // Design 2
    //
    $design = $designs->add_step("design2", "Design 2");
    $design->set_release('8/28/2018 1:00am', '9/6/2018 11:55pm');
    $design->set_reviews_due('9/10/2018 11:55pm');

    //
    // Design 3
    //
    $design = $designs->add_step("design3", "Design 3");
    $design->set_release('8/28/2018 1:00am', '9/15/2018 11:55pm');
    $design->set_reviews_due('9/17/2018 4 11:55pm');
};
