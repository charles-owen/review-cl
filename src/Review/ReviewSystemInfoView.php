<?php
/**
 * @file
 * Reviewing system information page
 */

namespace CL\Review;


use CL\Site\Site;
use \Toggle;

/**
 * Reviewing system information page
 */
class ReviewSystemInfoView extends \CL\Course\View {
	/**
	 * SectionSelectorView constructor.
	 * @param Site $site Site object
	 */
	public function __construct(Site $site) {
		parent::__construct($site);

		$this->set_autoback();
		$this->setTitle('Peer Review');
	}


	/**
	 * Present the section selector
	 * @return string HTML
	 */
	public function present() {
		$html = <<<HTML
<p>There is a link to your peer review assignments on the course home page. You can
check for assignments at any time via that link.</p>

<p>The peer review system allows assignment solutions to be submitted by students and then
    anonymously reviewed by other students. When an assignment is complete, it is uploaded
    on a submission page. This page allows you to see your submission and the reviews that
    are submitted. You can update your submission to reflect what you learn from the reviews. </p>
<p>Every submission will be assigned randomly to two peer reviewers. You will, in turn, have
    two of every assignment assigned to you for peer review. You must submit a completed assignment
    by the assignment due date. Reviews must be completed by the review due date.</p>
<p>When a review is completed by any reviewer, you can post revisions of your solutions for
    24 hours after the time of the review. This gives you time to revise your solution to take
    into account what you may learn from the review.</p>

<p class="centerbox comp">If you do not submit by the due date, you will not get credit
    for the submission. You will not be allowed to review any assignments until you have
    submitted a solution yourself.<br><br>
    If you do not get any reviews, you will not get the opportunity to revise your assignment
    after the assignment due date! There is no guarantee that you will get any reviews.
</p>

<p>You are required to perform a peer review on all assignments assigned to you. Failure to
    provide at least one review of any submission assigned to you will result in a deduction
    from the assignment grade.</p>
HTML;

		$html .= Toggle::begin("I didn't get any reviews", "p");
		$html .= <<<HTML
<p>There is no guarantee that someone will review your assignment. Students assigned to review
your assignment may not complete the assignment themselves, in which case they are not allowed
to review. Or, a student assigned as a reviewer may drop the course.</p>
HTML;


		$html .= Toggle::end();

		$html .= Toggle::begin("I didn't get any requests to review assignments", "p");
		$html .= <<<HTML
<p>Be sure you check the peer review link on the course home page. The system sends 
email when an assignment is available to review. Be sure that email is not going into 
a spam folder.</p>
HTML;

		$html .= Toggle::end();

		if($this->user->staff) {
			$html .= <<<STAFF
<h3>Staff information (visible only to course staff)</h3>
<p>We grade the final submission that they submit prior to the second closing time. They can update their designs due to the peer review process and make corrections. </p>

<p>Many will get better designs due to this. That is the idea. Some will see designs they are reviewing and may copy much of it. That can&apos;t be helped. I consider the peer review assignments sort of like a collaborative project. Not all assignments will be done this way.</p>
STAFF;
}

		return $html;
	}

}
