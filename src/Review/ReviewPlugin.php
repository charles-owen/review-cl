<?php
/**
 * @file
 * Plugin class for the Peer Review Subsystem
 */

namespace CL\Review;

use CL\Console\ConsoleView;
use CL\Site\Site;
use CL\Site\System\Server;
use CL\Course\AssignmentCategory;
use CL\Course\Assignment;
use CL\Site\Router;
use CL\Course\Section;
use CL\Site\Extendible;

/**
 * Plugin class for the Peer Review Subsystem
 */
class ReviewPlugin extends \CL\Site\Plugin implements \CL\Site\IExtension {
	/**
	 * A tag that represents this plugin
	 * @return string A tag like 'course', 'users', etc.
	 */
	public function tag() {return 'review';}

	/**
	 * Return an array of tags indicating what plugins this one is dependent on.
	 * @return array of tags this plugin is dependent on
	 */
	public function depends() {return ['course'];}

	/**
	 * Property get magic method
	 *
	 * <b>Properties</b>
	 * Property | Type | Description
	 * -------- | ---- | -----------
	 *
	 * @param string $property Property name
	 * @return mixed
	 */
	public function __get($property) {
		switch($property) {


			default:
				return parent::__get($property);
		}
	}
	/**
	 * Install the plugin
	 * @param Site $site The Site configuration object
	 */
	public function install(Site $site) {
		$this->site = $site;
//		$site->install("grades", $this);
	}


	/**
	 * Ensure the tables necessary for peer review all exist.
	 * @param Site $site The site configuration component
	 */
	public function ensureTables(Site $site) {
		$maker = new ReviewTables($site->db);
		$maker->create(false);
	}

	/**
	 * Amend existing object
	 * The Router is amended with routes for the login page
	 * and for the user API.
	 * @param $object Object to amend.
	 */
	public function amend($object) {
		if($object instanceof Router) {
			$router = $object;

			$router->addRoute(['reviews', 'pending'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$view = new ReviewsPendingView($site);
				return $view->whole();
			});

			$router->addRoute(['review', ':id'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$view = new ReviewView($site, $server, $properties);
				return $view->vue();
			});

			$router->addRoute(['api', 'review', '*'], function(Site $site, Server $server, array $params, array $properties, $time) {
				$resource = new ReviewApi();
				return $resource->apiDispatch($site, $server, $params, $properties, $time);
			});
		} else if($object instanceof Assignment) {
			$object->addProperty('review', false, true);
			$object->extend('set_reviews_due', $this);
		} else if($object instanceof ConsoleView) {
			$object->addJS('review');
		} else if($object instanceof \CL\Grades\GradeView) {
			$object->addJS('review');
		}
	}

	/**
	 * @param Extendible $extendible Extendible that is calling this function
	 * @param string $name Name of the function
	 * @param array $arguments Arguments to the function
	 * @return mixed
	 */
	public function extension(Extendible $extendible, $name, array $arguments) {
		if($name !== 'set_reviews_due') {
			return;
		}

		$assignment = $extendible;
		$reviewing = new Reviewing($assignment);
		$assignment->reviewing = $reviewing;
		$assignment->review = true;

		// Parameters to set_reviews_due:
		// int $due When the reviews are due
		// int $revisionHours Number of hours after review for resubmission, default is 24
		// bool $revised true if the due date is a revision
		$argCnt = count($arguments);
		$due = $arguments[0];
		$revisionHours = $argCnt > 1 ? $arguments[1] : 24;
		$revised = $argCnt > 2 ? $arguments[2] : false;

		$reviewing->set_due($due, $revisionHours, $revised);
	}

	/* @var Site */
	private $site;
}