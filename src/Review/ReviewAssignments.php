<?php
/**
 * @file
 * Class that represents the peer review system reviewassignment table.
 */
 
namespace CL\Review;

use CL\Tables\Table;
use CL\Users\User;
use CL\Course\Members;
use CL\Course\Member;

/**
 * Represents the peer review system reviewassignment table.
 *
 * This table assigns reviewers to reviewees for an assignment
 */
class ReviewAssignments  extends Table {
	/**
	 * Grades constructor.
	 * @param \CL\Tables\Config $config Database configuration object
	 */
	function __construct(\CL\Tables\Config $config) {
		parent::__construct($config, "reviewassignment");
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
  reviewerid int(11) NOT NULL, 
  revieweeid int(11) NOT NULL, 
  assigntag  varchar(30) NOT NULL, 
  PRIMARY KEY (id), 
  INDEX (assigntag));

SQL;

		return $query;
	}

	/**
	 * Assign reviewing.
	 * @param int $reviewerId Member ID for the reviewer
	 * @param int $revieweeId Member ID for the reviewee
	 * @param int $assignTag Assignment tag
	 * @return bool True if successful
	 */
	public function assignReviewing($reviewerId, $revieweeId, $assignTag) {
		$sql = <<<SQL
replace into $this->tablename(reviewerid, revieweeid, assigntag)
values(?, ?, ?)
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			return $stmt->execute([$reviewerId, $revieweeId, $assignTag]);
		} catch(\PDOException $e) {
			return false;
		}
	}

	/**
	 * Is this a valid reviewer/reviewee combination for this assignment?
	 * @param int $reviewerId
	 * @param int $revieweeId
	 * @param int $assignTag
	 * @return bool
	 */
	public function isReviewer($reviewerId, $revieweeId, $assignTag) {
		$sql = <<<SQL
select *
from $this->tablename
where reviewerid=? and revieweeid=? and assigntag=?
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$stmt->execute([$reviewerId, $revieweeId, $assignTag]);
			return $stmt->rowCount() > 0;
		} catch(\PDOException $e) {
			return false;
		}
	}

	/**
 * Get all reviewers for a given reviewee and assignment
 * @param int $revieweeId The reviewee ID
 * @param string $assignTag The assignment tag
 * @return array of User objects
 */
	public function getMemberReviewers($revieweeId, $assignTag) {
		$members = new Members($this->config);
		$sql = $members->memberUserJoinSQL("reviewassign.id as assignid");

		$sql .= <<<SQL
join $this->tablename reviewassign
on reviewerid=member.id
where revieweeid=? and assigntag=?
order by reviewerid
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$stmt->execute([$revieweeId, $assignTag]);
			$ret = [];
			foreach($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
				$user = new User($row);
				$user->member = new Member($row);
				$ret[] = ['reviewer'=>$user, 'id'=>$row['assignid']];
			}

			return $ret;
		} catch(\PDOException $e) {
			return [];
		}
	}

	/**
	 * Get all reviewees for a given reviewer and assignment
	 * @param int $reviewerId The reviewer ID
	 * @param string $assignTag The assignment tag
	 * @return array of User objects
	 */
	public function getMemberReviewees($reviewerId, $assignTag) {
		$members = new Members($this->config);
		$sql = $members->memberUserJoinSQL("reviewassign.id as assignid");

		$sql .= <<<SQL
join $this->tablename reviewassign
on revieweeid=member.id
where reviewerid=? and assigntag=?
order by revieweeid
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			//echo "<pre>\n" . $this->sub_sql($sql, [$reviewerId, $assignTag]);
			$stmt->execute([$reviewerId, $assignTag]);
			$ret = [];
			foreach($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
				$user = new User($row);
				$user->member = new Member($row);
				$ret[] = ['reviewee'=>$user, 'id'=>$row['assignid']];
			}

			return $ret;
		} catch(\PDOException $e) {
			return [];
		}
	}

	/**
	 * Get all reviewing assignments for a course assignnment.
	 * @param string $semester The semester, as in 'SS19'
	 * @param string $sectionId The section ID
	 * @param string $assignTag Assignment tag
	 * @return array of arrays, each with keys 'reviewer' and 'reviewee' (holding member ID's)
	 */
	public function getReviewers($semester, $sectionId, $assignTag) {
		$members = new Members($this->config);
		$sql = $members->memberUserJoinSQL(
			"reviewassign.reviewerid as reviewerid, reviewassign.revieweeid as revieweeid");

		$sql .= <<<SQL
join $this->tablename reviewassign
on reviewassign.revieweeid=member.id
where reviewassign.assigntag=? and member.semester=? and member.section=?
order by reviewassign.reviewerid, reviewassign.revieweeid
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			// echo "\n" . $this->sub_sql($sql, [$assignTag]);
			$stmt->execute([$assignTag, $semester, $sectionId]);
			$ret = [];
			foreach($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
				$ret[] = ['reviewer'=>$row['reviewerid'], 'reviewee'=>$row['revieweeid']];
			}

			return $ret;
		} catch(\PDOException $e) {
			return [];
		}
	}

	/**
	 * Get reviewing assignment by ID
	 * @param int $id Assignment internal ID
	 * @return array with keys for the record fields.
	 */
	public function get($id) {
		$sql = <<<SQL
select * from $this->tablename
where id=?
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$exec = [$id];
			// echo "\n" . $this->sub_sql($sql, $exec);
			if($stmt->execute($exec) === false) {
				return null;
			}

			$row = $stmt->fetch(\PDO::FETCH_ASSOC);
			return $row !== false ? $row : null;
		} catch(\PDOException $e) {
			return null;
		}
	}

	/**
	 * Clear all reviewing assignments for a given semester/section/assignment
	 * @param string $semester
	 * @param string $sectionId
	 * @param string $assignTag
	 * @return bool
	 */
	public function clear($semester, $sectionId, $assignTag) {
		$members = new Members($this->config);

		$sql = <<<SQL
delete from $this->tablename
where assigntag=? and (revieweeid in (
	select id from $members->tablename
	where semester=? and section=?
) or reviewerid in (
	select id from $members->tablename
	where semester=? and section=?
))
SQL;

		$pdo = $this->pdo;
		try {
			$stmt = $pdo->prepare($sql);
			$exec = [$assignTag, $semester, $sectionId, $semester, $sectionId];
			// echo "\n" . $this->sub_sql($sql, $exec);
			return $stmt->execute($exec);
		} catch(\PDOException $e) {
			return false;
		}
	}

//<!--week5 Zhuofan Zeng new added content-->
    /**
     * Get the list of reviewer
     * @param $revieweeid
     * @return array|false
     */
    public function getReviewerIds($revieweeid)
    {
        $sql = <<<SQL
                    select reviewerid
                    from capstone_reviewassignment
                    where revieweeid = $revieweeid 
                    and assigntag = 'design3'
                SQL;
        $pdo = $this->pdo;
        try {
            $stmt = $pdo->prepare($sql); //(Pre-processing via pdo)
            $stmt->execute();  //(Execution of queries)
            return $stmt->fetchAll(\PDO::FETCH_ASSOC); //(after querying, fetchAll: get all result)
        } catch(\PDOException $e) {
            return false;
        }
    }

    /**
     * Get messages from current reviewer
     * @param  $revieweeid  (I check)
     * @param  $reviewerid  (Check my works)
     * @return array|false
     */
    public function getReviewContent($revieweeid,$reviewerid)
    {
        $sql = <<<SQL
                    select id,metadata,time,reviewerid,revieweeid
                    from capstone_review
                    where reviewerid = $reviewerid
                    and  revieweeid = $revieweeid
                    and assigntag = 'design3'
                SQL;
        //var_dump($sql);die();
        $pdo = $this->pdo;
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch(\PDOException $e) {
            return false;
        }
    }
}
//<!--week5 end-->
