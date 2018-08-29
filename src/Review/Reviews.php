<?php
/** @file
 * Class for the review table
 */
 
namespace CL\Review;

use CL\Site\MetaData;
use CL\Tables\Table;
use CL\Users\User;
use CL\Course\Members;
use CL\Course\Member;


/**
 * Manange the review table
 *
 * This table represents actual reviews in the review system
 */
class Reviews  extends Table {
	/**
	 * Grades constructor.
	 * @param \CL\Tables\Config $config Database configuration object
	 */
	function __construct(\CL\Tables\Config $config) {
		parent::__construct($config, "review");
	}

	/**
	 * SQL create table command
	 *
	 * Function to create an SQL create table command
	 * for the grades table
	 * @returns string SQL
	 */
	public function createSQL() {
		$query = <<<SQL
CREATE TABLE IF NOT EXISTS `$this->tablename` (
  id         int(11) NOT NULL AUTO_INCREMENT, 
  assigntag  varchar(30) NOT NULL, 
  time       datetime NOT NULL, 
  metadata   mediumtext NOT NULL, 
  reviewerid int(11) NOT NULL, 
  revieweeid int(11) NOT NULL, 
  PRIMARY KEY (id), 
  INDEX (assigntag), 
  INDEX (reviewerid), 
  INDEX (revieweeid));

SQL;

		return $query;
	}


	/**
	 * Add an assignment review
	 * @param Review $review Review to add
	 * @return bool True if successful
	 */
	public function add(Review $review) {
		$pdo = $this->pdo();

		$sql = <<<SQL
insert into $this->tablename(assigntag, time, metadata, reviewerid, revieweeid)
values(?, ?, ?, ?, ?)
SQL;

		$stmt = $pdo->prepare($sql);
		if(!$stmt->execute($review->exec($this))) {
			return false;
		}

		$review->id = $pdo->lastInsertId();

		return true;
	}

	/**
	 * For an assigned review (reviewer/reviewee combination), get the date of the most recent review
	 * @param string $assignTag Assignment tag
	 * @param int $reviewer
	 * @param int $reviewee
	 * @return int Time value of null if no review
	 */
	public function get_assigned_review_date($assignTag, $reviewerId, $revieweeId) {
		$pdo = $this->pdo();

		$sql = <<<SQL
select max(time) as time
from $this->tablename
where reviewerid=? and revieweeid=? and assigntag=?
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$reviewerId, $revieweeId, $assignTag]);
		$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		if($row === false || $row === null || $row['time'] === null) {
			return null;
		}

		return strtotime($row['time']);
	}

	/**
	 * For reviewee and assignment, get the date of the most recent review
	 * @param string $assignTag Assignment tag
	 * @param int $reviewee
	 * @return int|null Time value of null if no review
	 */
	public function get_recent_review_date($assignTag, $revieweeId) {
		$pdo = $this->pdo();

		$sql = <<<SQL
select max(time) as time
from $this->tablename
where revieweeid=? and assigntag=?
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$revieweeId, $assignTag]);
		$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		if($row === false || $row === null || $row['time'] === null) {
			return null;
		}

		return strtotime($row['time']);
	}

	/**
	 * Determine if a reviewer has done any reviews up till now for a given reviewee.
	 * @param string $assignTag Assignment tag
	 * @param int $reviewer
	 * @param int $reviewee
	 * @return int Time value of null if no review
	 */
	public function has_reviewed($assignTag, $reviewerId, $revieweeId) {
		$pdo = $this->pdo();

		$sql = <<<SQL
select time
from $this->tablename
where reviewerid=? and revieweeid=? and assigntag=?
limit 1
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$reviewerId, $revieweeId, $assignTag]);
		$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		if($row === false || $row === null || $row['time'] === null) {
			return false;
		}

		return true;
	}

	/**
	 * Get all reviews for a given assignment/reviewer/reviewee combination.
	 * @param string $assignTag
	 * @param int $reviewerId
	 * @param int $revieweeId
	 */
	public function get_reviewing($assignTag, $reviewerId, $revieweeId) {
		$pdo = $this->pdo();

		$sql = <<<SQL
select *
from $this->tablename
where reviewerid=? and revieweeid=? and assigntag=?
order by time desc
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$reviewerId, $revieweeId, $assignTag]);
		$ret = [];
		foreach($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
			$ret[] = [
				'time'=>strtotime($row['time']),
				'meta'=>(new MetaData(null, $row['metadata']))->data
			];
		}

		return $ret;
	}

	/**
	 * Get all reviews for a given user
	 * @param int $revieweeId Member ID
	 * @param string $assignTag Assignment
	 * @return array Review objects
	 */
	public function get_reviews($revieweeId, $assignTag) {
		$members = new Members($this->config);
		$sql = $members->memberUserJoinSQL(
			"reviewerid as review_reviewerid, revieweeid as review_revieweeid, review.id as review_id, review.metadata as review_metadata, review.time as review_time",
			false, null, 'member_');

		$sql .= <<<SQL
join $this->tablename review
on reviewerid=member.id
where assigntag=? and revieweeid=?
order by review.time desc
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			// echo "\n" . $this->sub_sql($sql, [$assignTag]);
			$stmt->execute([$assignTag, $revieweeId]);
			$ret = [];
			foreach($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
				$ret[] = new Review($row);
			}

			return $ret;
		} catch(\PDOException $e) {
			return [];
		}
	}

	/**
	 * Get all reviews by a given user
	 * @param int $reviewerId Member ID
	 * @param string $assignTag Assignment
	 * @return array of Review objects
	 */
	public function get_reviews_by($reviewerId, $assignTag) {
		$members = new Members($this->config);
		$sql = $members->memberUserJoinSQL(
			"reviewerid as review_reviewerid, revieweeid as review_revieweeid, review.id as review_id, review.metadata as review_metadata, review.time as review_time",
			false, null, 'reviewee_');

		$sql .= <<<SQL
join $this->tablename review
on revieweeid=member.id
where assigntag=? and reviewerid=?
order by review.time desc
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$stmt->execute([$assignTag, $reviewerId]);
			$ret = [];
			foreach($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
				$ret[] = new Review($row);
			}

			return $ret;
		} catch(\PDOException $e) {
			return [];
		}
	}

	public function get_review_counts($semester, $sectionId, $assignTag) {
		$members = new Members($this->config);

		$sql = <<<SQL
select review.reviewerid as reviewerid, review.revieweeid as revieweeid, count(review.id) as count
from $this->tablename review
join $members->tablename member
on review.revieweeid=member.id or review.reviewerid=member.id
where member.semester=? and member.section=? and review.assigntag=?
group by review.reviewerid, review.revieweeid
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			// echo "\n" . $this->sub_sql($sql, [$semester, $sectionId, $assignTag]);
			$stmt->execute([$semester, $sectionId, $assignTag]);
			return $stmt->fetchAll(\PDO::FETCH_ASSOC);
		} catch(\PDOException $e) {
			return [];
		}
	}

//	/** Get all reviews for a given reviewee and assignment
//	 * @param Assignment $assignment The assignment we are looking for reviews for
//	 * @param User $reviewee The reviewee
//	 * @returns Array of results
//	 */
//	public function get_reviews(\Assignments\Assignment $assignment, \User $reviewee) {
//		$pdo = $this->pdo();
//
//		$users = new \Users($this->course);
//		$usersTable = $users->get_tablename();
//
//		$sql = <<<SQL
//select review.id as id, reviewer, date, review, name, role
//from $this->tablename review
//join $usersTable user
//on reviewer=user.id
//where reviewee=? and assigntag=?
//order by date desc
//SQL;
//
//		$stmt = $pdo->prepare($sql);
//		$stmt->execute(array($reviewee->get_id(), $assignment->get_tag()));
//
//		$rs = new ReviewSubmissions($this->course);
//
//		$ret = array();
//		foreach($stmt as $row) {
//			$submissions = $rs->get_submissions($row['id']);
//			$ret[] = array(
//				'id' => $row['id'],
//				'reviewer' => $row['reviewer'],
//				'date' => strtotime($row['date']),
//				'review' => $row['review'],
//				'name' => $row['name'],
//				'role' => $row['role'],
//				'submissionids' => $submissions);
//		}
//
//		return $ret;
//	}
//
//	/** Get all reviews for a given reviewer and assignment
//	 * @param Assignment $assignment The assignment we are looking for reviews for
//	 * @param User $reviewer The reviewer
//	 * @returns Array of results
//	 */
//	public function get_reviewing(\Assignments\Assignment $assignment, \User $reviewer) {
//		$pdo = $this->pdo();
//
//		$users = new \Users($this->course);
//		$usersTable = $users->get_tablename();
//
//		$sql = <<<SQL
//select review.id as id, reviewee, date, review, name, role
//from $this->tablename review
//join $usersTable user
//on reviewee=user.id
//where reviewer=? and assigntag=?
//order by date desc
//SQL;
//
//		$stmt = $pdo->prepare($sql);
//		$stmt->execute(array($reviewer->get_id(), $assignment->get_tag()));
//
//		$rs = new ReviewSubmissions($this->course);
//
//		$ret = array();
//		foreach($stmt as $row) {
//			$submissions = $rs->get_submissions($row['id']);
//			$ret[] = array(
//				'id' => $row['id'],
//				'reviewee' => $row['reviewee'],
//				'date' => strtotime($row['date']),
//				'review' => $row['review'],
//				'name' => $row['name'],
//				'role' => $row['role'],
//				'submissionids' => $submissions);
//		}
//
//		return $ret;
//	}



//	/**
//	 * Determine how many reviews there are for a given assignment and section for all reviewer/reviewee combinations
//	 * @param \Assignments\Assignment $assignment The assignment
//	 * @param \Section $section The course Section
//	 * @return array of rows with the keys: reviewer, reviewee, count
//	 *
//	 */
//	public function review_counts(\Assignments\Assignment $assignment, \Section $section) {
//		$tag = $assignment->get_tag();
//		$sectionId = $section->get_id();
//
//		$ra = new ReviewAssignments($this->course);
//		$raTable = $ra->get_tablename();
//
//		$sql = <<<SQL
//SELECT r.reviewer as reviewer, r.reviewee as reviewee, count(review) as count FROM `$raTable` ra
//join $this->tablename r
//on ra.reviewer=r.reviewer and ra.reviewee = r.reviewee
//WHERE ra.assigntag=? and r.assigntag=? and section=?
//group by r.reviewer, r.reviewee
//order by reviewer, reviewee
//SQL;
//
//		//echo "\n" . $this->sub_sql($sql, array($tag, $tag, $sectionId)) . "\n";
//
//		$stmt = $this->pdo()->prepare($sql);
//		$stmt->execute(array($tag, $tag, $sectionId));
//		return $stmt->fetchAll(\PDO::FETCH_ASSOC);
//	}


}
