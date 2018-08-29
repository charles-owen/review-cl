<?php
/**
 * @file
 * /cl/review/pending page
 */

namespace CL\Review;


use CL\Site\Site;

/**
 * /cl/review/pending page
 */
class ReviewsPendingView extends \CL\Course\View {
	/**
	 * SectionSelectorView constructor.
	 * @param Site $site Site object
	 */
	public function __construct(Site $site, $time=null) {
		parent::__construct($site);

		$this->set_autoback();
		$this->time = $time !== null ? $time : time();
		$this->setTitle('Pending Reviews');
	}


	/**
	 * Present the section selector
	 * @return string HTML
	 */
	public function present() {
		$html = '';

		$assignments = $this->section->assignments;
		$any = false;

		foreach($assignments->categories as $category) {
			$catname = $category->name;
			$nameshown = false;

			foreach($category->assignments as $assignment) {
				// If not reviewing, ignore
				$reviewing = $assignment->reviewing;
				if($reviewing === null) {
					continue;
				}

				// If not yet released, ignore
				if(!$assignment->after_release($this->time)) {
					continue;
				}

				// If reviews have closed, ignore
				if($reviewing->after_due($this->time)) {
					continue;
				}

				if(!$nameshown) {
					$html .= "<h2>$catname</h2><ul>";
					$nameshown = true;
				}
				$any = true;

				$name = $assignment->name;

				$html .= "<li>$name";

				$pending = $reviewing->get_reviews_can_do($this->user);
				if($pending === null) {
					$html .= ' <span class="smallred">You have not yet submitted!</span></li>';
					continue;
				}

				if(count($pending) === 0) {
					$html .= ' <span class="smallred">Your reviewees have not yet submitted!</span></li>';
					continue;
				}

				$html .= '<ul>';

				foreach($pending as $pend) {
					$id = $pend['id'];
					$tag = $assignment->tag;
					$html .= <<<HTML
<li><a href="../review/$id">Review</a>
HTML;

					if($pend['reviewtime'] === null) {
						$html .= " <span class=\"smallred\">not yet reviewed!</span></li>";
					} else if($pend['reviewtime'] < $pend['submittime']) {
						$html .= " <span class=\"smallred\">pending</span></li>";
					}
				}


				$html .= "</ul></li>";
			}

			if($nameshown) {
				$html .= "</ul>";
			}

		}

		if(!$any) {
			$html .= <<<HTML
<p class="center">You have no reviews to do at this time.</p>
HTML;
		}

		$html .= <<<HTML
<p>More <a class="cl-autoback" href="../peerreview">details on the peer review system</a> are available. </p>
HTML;

		return $html;
	}

	private $time;
}
