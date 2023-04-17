<?php
/** @file
 * Class for the review table
 */

namespace CL\Review;

use CL\Site\MetaData;
use CL\Tables\Table;
use CL\Course\Members;
use CL\Site\Site;

/**
 * Manage the review table
 *
 * This table represents actual reviews in the review system
 */
class Reviews  extends Table {
	/**
	 * Reviews constructor.
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
  status tinyint NOT NULL default 1,
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
	 * @param int $reviewerId
	 * @param int $revieweeId
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
	 * @param int $revieweeId
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
	 * @param int $reviewerId
	 * @param int $revieweeId
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
	 * @return array
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
				'id'=>$row['id'],
				'time'=>strtotime($row['time']),
				'meta'=>(new MetaData(null, $row['metadata']))->data
			];
		}

		return $ret;
	}

	/**
	 * Get all reviews for a given user.
     *
     * This gets the reviewer User and Member object, so $review->reviewer is valid.
     * It does not get the reviewee User and Member objects, so $review->reviewee is not valid.
     *
     * This is mainly because we know who we are getting reviews for so the join is not
     * necessary for the reviewee.
     *
	 * @param int $revieweeId Member ID
	 * @param string $assignTag Assignment
	 * @return array Review objects
	 */
    public function get_reviews($revieweeId, $assignTag, $status=0) {
        $members = new Members($this->config);
        $sql = $members->memberUserJoinSQL(
            "reviewerid as review_reviewerid, revieweeid as review_revieweeid, " .
            "review.id as review_id, review.metadata as review_metadata, review.time as review_time, " .
            "assigntag as review_assigntag",
            false, null, 'member_');
        if (empty($status)){
            $sql .= <<<SQL
                    join $this->tablename review
                    on reviewerid=member.id
                    where assigntag=? and revieweeid=?
                    and status = 1
                    order by review.time desc
                    SQL;
        }else{
            $sql .= <<<SQL
                    join $this->tablename review
                    on reviewerid=member.id
                    where assigntag=? and revieweeid=?
                    order by review.time desc
                    SQL;
        }


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
     * Get all reviews by and for a given user.
     * @param Site $site The Site object
     * @param string $assignTag Assignment tag
     * @param int $memberId Member ID we are fetching for
     * @return array[] with keys 'for' and 'by', each an array
     */
    public function getByFor(Site $site, $assignTag, $memberId) {
        $annotations = new Annotations($site->db);
        $reviews = new Reviews($site->db);
        $by = $reviews->get_reviews_by($memberId, $assignTag);
        $for = $reviews->get_reviews($memberId, $assignTag);

        $forData = [];
        foreach($for as $review) {
            $forData[] = [
                'id'=>$review->id,
                'time'=>$review->time,
                'meta'=>$review->meta->data,
                'reviewer'=>$review->reviewer->data(),
                'annotation'=>$annotations->get_annotation($review->id),
            ];
        }


        $byData = [];
        foreach($by as $review) {
            $byData[] = [
                'id'=>$review->id,
                'time'=>$review->time,
                'meta'=>$review->meta->data,
                'reviewee'=>$review->reviewee->data(),
                'annotation'=>$annotations->get_annotation($review->id),
            ];
        }

        return [
            'for'=>$forData,
            'by'=>$byData
        ];
    }

	/**
	 * Get all reviews by a given user.
     *
     * This gets the reviewee User and Member object, so $review->reviewee is valid.
     * It does not get the reviewer User and Member objects, so $review->reviewer is not valid.
     *
     * This is mainly because we know who we are getting reviews by so the join is not
     * necessary for the reviewer.
     *
	 * @param int $reviewerId Member ID
	 * @param string $assignTag Assignment
	 * @return array of Review objects
	 */
    public function get_reviews_by($reviewerId, $assignTag, $status=0) {
        $members = new Members($this->config);
        $sql = $members->memberUserJoinSQL(
            "reviewerid as review_reviewerid, revieweeid as review_revieweeid, " .
            "review.id as review_id, review.metadata as review_metadata, " .
            "review.time as review_time, assigntag as review_assigntag",
            false, null, 'reviewee_');
        if (empty($status)){
            $sql .= <<<SQL
                    join $this->tablename review
                    on revieweeid=member.id
                    where assigntag=? and reviewerid=?
                    and status = 1
                    order by review.time desc
                    SQL;
        }else{
            $sql .= <<<SQL
                    join $this->tablename review
                    on revieweeid=member.id
                    where assigntag=? and reviewerid=?
                    order by review.time desc
                    SQL;
        }


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

    /**
     * Get all reviews by a given user for a given reviewee
     *
     * @param int $reviewerId Member ID
     * @param int $revieweeId Member ID
     * @param string $assignTag Assignment
     * @return array of Review objects
     */
    public function get_num_reviews_by_for($reviewerId, $revieweeId, $assignTag) {
        //TODO Make the query consider context to ensure the reviewer is the reviewer in the meta:context
        $members = new Members($this->config);
        $sql = $members->memberUserJoinSQL(
            "reviewerid as review_reviewerid, revieweeid as review_revieweeid, " .
            "review.id as review_id, review.metadata as review_metadata, " .
            "review.time as review_time, assigntag as review_assigntag",
            false, null, 'reviewee_');

        $sql .= <<<SQL
join $this->tablename review
on revieweeid=member.id
where assigntag=? and reviewerid=? and revieweeid=?
order by review.time desc
SQL;

        $pdo = $this->pdo;
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$assignTag, $reviewerId, $revieweeId]);
            return $stmt->rowCount();
        } catch(\PDOException $e) {
            return 0;
        }
    }

	/**
	 * Get the reviewing counts for an assignment.
     *
     * Only fetches for valid members.
     *
	 * @param $semester
	 * @param $sectionId
	 * @param $assignTag
	 * @return array of reviewer/reviewee counts. Keys are reviewerid, revieweeid, count
	 */
	public function get_review_counts($semester, $sectionId, $assignTag) {
		$members = new Members($this->config);

		$sql = <<<SQL
select review.reviewerid as reviewerid, review.revieweeid as revieweeid, count(distinct review.id) as count
from $this->tablename review
join $members->tablename member
on review.revieweeid=member.id or review.reviewerid=member.id
where member.semester=? and member.section=? and review.assigntag=?
group by review.reviewerid, review.revieweeid
order by review.reviewerid, review.revieweeid
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

    /**
     * Withdraw message
     * @param $reviewerId
     * @return bool
     */
    public function remove($reviewerId)
    {
        $sql = <<<SQL
                update $this->tablename set status = ? where id = ?
                SQL;
        $pdo = $this->pdo;
        try {
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([0,$reviewerId]);
        } catch(\PDOException $e) {
            return false;
        }
    }

    /**
     * Get Data
     * @param $reviewerId
     * @return array|false
     * @throws \CL\Tables\TableException
     */
    public function getRows($reviewerId)
    {
        $pdo = $this->pdo();
        $sql = <<<SQL
                select * from $this->tablename where id=?
                SQL;
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$reviewerId]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Edit message
     * @param $reviewerId
     * @param $metadata
     * @return bool
     * @throws \CL\Tables\TableException
     */
    public function updateReview($reviewerId,$metadata)
    {
        $pdo = $this->pdo();
        $sql = <<<SQL
        update $this->tablename set metadata = ? where id = ?
        SQL;
        try {
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$metadata,$reviewerId]);
        } catch(\PDOException $e) {
            return false;
        }
    }
}
