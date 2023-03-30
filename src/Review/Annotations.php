<?php
/** @file
 * Class for the annotation table
 */

namespace CL\Review;

use CL\Tables\Table;

/**
 * Manage the annotation table
 *
 * This table represents actual annotations in the annotation system
 */
class Annotations extends Table {
	/**
	 * Annotations constructor.
	 * @param \CL\Tables\Config $config Database configuration object
	 */
	function __construct(\CL\Tables\Config $config) {
		parent::__construct($config, "annotation");
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
  annotation  mediumtext NOT NULL,
  width int(11) NOT NULL,
  height int(11) NOT NULL,
  review_id int(11) NOT NULL,
  time       datetime NOT NULL,
  PRIMARY KEY (id));

SQL;

		return $query;
	}


	/**
	 * Add an assignment annotation
	 * @param Annotation $annotation Annotation to add
	 * @return int ID if successful
	 */
	public function add(Annotation $annotation) {
		$pdo = $this->pdo();

		$sql = <<<SQL
insert into $this->tablename(annotation, width, height, review_id, time)
values(?, ?, ?, ?, ?)
SQL;

		$stmt = $pdo->prepare($sql);
		if(!$stmt->execute($annotation->exec($this))) {
			return false;
		}

		$annotation->id = $pdo->lastInsertId();

		return $annotation->id;
	}

	/**
	 * Get the annotation associated with a given review
	 *
	 * @param int $review_id Given review id
	 */
	public function get_annotation($review_id) {
		$pdo = $this->pdo();

		$sql = <<<SQL
select *
from $this->tablename
where review_id=?
limit 1
SQL;

		$stmt = $pdo->prepare($sql);
		$stmt->execute([$review_id]);
		$row = $stmt->fetch(\PDO::FETCH_ASSOC);
		if($row === false || $row === null) {
			return null;
		}

		return $row;
	}
}
