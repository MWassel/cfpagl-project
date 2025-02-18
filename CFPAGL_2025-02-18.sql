# ************************************************************
# Sequel Ace SQL dump
# Version 20086
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.4.0)
# Database: CFPAGL
# Generation Time: 2025-02-18 09:21:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Author
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Author`;

CREATE TABLE `Author` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nationality` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;

INSERT INTO `Author` (`author_id`, `author_name`, `nationality`)
VALUES
	(1,'Ahmed Mousa','Egyption'),
	(2,'Ben khaldon','Tunisian'),
	(3,'ديستوفيسكي','روسي');

/*!40000 ALTER TABLE `Author` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Books
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Books`;

CREATE TABLE `Books` (
  `book_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_pages` int DEFAULT NULL,
  `publishing_year` int DEFAULT NULL,
  `stored_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `cover` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categorie_id` int NOT NULL,
  `publishing_house_id` int NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`book_id`),
  KEY `categorie_id` (`categorie_id`),
  KEY `publishing_house_id` (`publishing_house_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `Categories` (`categorie_id`),
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`publishing_house_id`) REFERENCES `publishing_house` (`publishing_house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;

INSERT INTO `Books` (`book_id`, `book_title`, `summary`, `total_pages`, `publishing_year`, `stored_date`, `cover`, `categorie_id`, `publishing_house_id`, `deleted`)
VALUES
	('0011133466','Funny Story',' Funny Story is a 2024 novel by American author Emily Henry. The romance novel follows librarian Daphne and Miles',540,2024,'2025-01-09 02:14:04','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1736388844364-194802722.jpg',4,4,0),
	('0061122416','The Alchemist','The Alchemist هو كتاب فلسفي وروحي يروي قصة شاب يُدعى سانتياغو يسعى لتحقيق حلمه في العثور على كنز. الكتاب يُعتبر من أكثر الكتب مبيعًا في العالم وقد ترجم إلى العديد من اللغات',208,1988,'2024-12-07 22:34:58','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1733610897750-18144590.jpg',4,5,0),
	('0061133416','Clean Code','aaaaaaaaaaaaaaaa',500,2003,'2024-12-26 14:02:45','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1735221764556-images.jpg',27,20,1),
	('0285534666','Rich Dad Poor Dad','Rich Dad Poor Dad is a 1997 book written by Robert T. Kiyosal',500,200,'2024-12-26 13:47:06','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1735220825861-81bsw6fnUiL._AC_UF894,1000_QL80_.jpg',11,13,0),
	('0385331612','Crime and Punishmentt','Crime and Punishmentt is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume.',897,1920,'2024-12-26 13:37:40','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1735220260311-61twuus+DSL._AC_UF1000,1000_QL80_.jpg',4,6,0),
	('0385531139','aaaaaa','aaaaaaaaa',111,1999,'2025-01-09 11:17:14','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1736421433698-21853621.jpg',5,12,1),
	('0385531611','Crime and Punishment','Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume.',900,1920,'2024-12-26 13:28:04','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1735219683488-61twuus+DSL._AC_UF1000,1000_QL80_.jpg',4,6,1),
	('0385531612','Crime and Punishment','Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume.',897,1920,'2024-12-26 13:35:30','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1735220130254-61twuus+DSL._AC_UF1000,1000_QL80_.jpg',4,6,1),
	('0385534444','aaaaaa','assasasasa',99,1999,'2025-01-09 09:16:56','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1736414216202-21853621.jpg',8,8,1),
	('0385534639','The Night Circus','الكتاب هو رواية خيالية تروي قصة سيرك سحري يظهر فجأة في مدن مختلفة ويختفي بسرعة، ويحوي بين طياته قصة حب معقدة تدور بين شخصين يتمتعان بقوى سحرية. يتميز الكتاب بأسلوبه الأدبي الجميل والمليء بالغموض والسحر.',375,2011,'2024-12-07 22:15:44','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1733609743545-71+whvJjE3L._SL1500_.jpg',4,7,1),
	('0385577669','The Prince','This book offers a pragmatic guide on political leadership, breaking away from traditional moral and ethical considerations.',255,1513,'2025-01-09 01:58:22','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1736387902263-The-Prince_-by-Niccolo-Machiavelli-768x1171.jpg',10,20,0),
	('0386634639','Clean Code Orginal','aaaaaaaaaaaaaaaa',500,1999,'2024-12-26 14:06:30','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1735221989799-images.jpg',27,8,0),
	('0985534666','who moved my cheese','Who Moved My Cheese? An Amazing Way to Deal with Change in Your Work and in Your Life is a 1998 motivational business fable by Spencer Johnson which describes four reactions to change.',311,1998,'2025-01-09 02:03:27','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1736388206681-610qYcFxhwL._AC_UF1000,1000_QL80_.jpg',13,9,0),
	('qw121234','The Brothers Karamazov','The Brothers Karamazov, also translated as The Karamazov Brothers, is the last novel by Russian author Fyodor Dostoevsky.',595,1925,'2025-02-10 01:16:03','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-covers/1739150162819-9780451530608.jpg',4,4,0);

/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Branch
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Branch`;

CREATE TABLE `Branch` (
  `branch_id` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `training_start_date` date NOT NULL,
  `training_end_date` date NOT NULL,
  `speciality_id` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `speciality_id` (`speciality_id`),
  CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`speciality_id`) REFERENCES `Speciality` (`speciality_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Branch` WRITE;
/*!40000 ALTER TABLE `Branch` DISABLE KEYS */;

INSERT INTO `Branch` (`branch_id`, `training_start_date`, `training_end_date`, `speciality_id`)
VALUES
	('12wqe','2024-12-25','2025-12-25','cc1123'),
	('q12w','2024-11-17','2025-11-17','as234'),
	('q1c2w','2024-10-17','2026-11-17','as234');

/*!40000 ALTER TABLE `Branch` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Categories`;

CREATE TABLE `Categories` (
  `categorie_id` int NOT NULL AUTO_INCREMENT,
  `categorie_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;

INSERT INTO `Categories` (`categorie_id`, `categorie_name`)
VALUES
	(4,'رويات و قصص'),
	(5,'آدب'),
	(6,'رياضة'),
	(7,'دين'),
	(8,'تاريخ'),
	(9,'علوم'),
	(10,'سياسة'),
	(11,'مال و أعمال'),
	(12,'فلسفة'),
	(13,'علم النفس و تطوير الذات'),
	(14,'السيرة الذاتية و المذكرات'),
	(15,'لغات'),
	(16,'قانون'),
	(17,'تكنولوجيا'),
	(18,'صحافة و إعلام'),
	(19,'طب و صحة'),
	(20,'الأسرة و الطفل'),
	(21,'تسلية'),
	(22,'فنون'),
	(23,'كتب أطفال'),
	(24,'السفر و الترحال'),
	(25,'ميثالوجيا و أساطير'),
	(26,'مراجع و أبحاث'),
	(27,'إعلام آلي');

/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Speciality
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Speciality`;

CREATE TABLE `Speciality` (
  `speciality_id` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `speciality` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `training_duration` int NOT NULL,
  `training_type` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`speciality_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Speciality` WRITE;
/*!40000 ALTER TABLE `Speciality` DISABLE KEYS */;

INSERT INTO `Speciality` (`speciality_id`, `speciality`, `training_duration`, `training_type`)
VALUES
	('as234','AIAR',303,'fgffff'),
	('cc1123','elecricity',12,'عن طريق التمهين'),
	('mm234','MATH',30,'aaaa'),
	('qw2323','wwq',30,'حضوري');

/*!40000 ALTER TABLE `Speciality` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Student
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Student`;

CREATE TABLE `Student` (
  `student_id` int NOT NULL,
  `first_name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `phone_number` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `branch_id` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `Branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;

INSERT INTO `Student` (`student_id`, `first_name`, `last_name`, `birth_date`, `phone_number`, `sex`, `branch_id`)
VALUES
	(123,'Omar','Amari','2004-10-17','','male','q12w'),
	(122400,'عبد المؤمن','لعيس','2001-09-12','077234578','ذكر','q12w');

/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table _prisma_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_prisma_migrations`;

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`)
VALUES
	('bd0d0930-b92a-492e-b480-2d200a42b6e4','d59189345996bd8f69f31c802977d091cdf01c2b9be452a27faf52f8e8e031b9','2024-11-15 15:42:34.276','20241115154234_cfpagl_db_a',NULL,NULL,'2024-11-15 15:42:34.121',1);

/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table book_authors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `book_authors`;

CREATE TABLE `book_authors` (
  `author_id` int NOT NULL,
  `book_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`author_id`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_authors_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Author` (`author_id`),
  CONSTRAINT `book_authors_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `book_authors` WRITE;
/*!40000 ALTER TABLE `book_authors` DISABLE KEYS */;

INSERT INTO `book_authors` (`author_id`, `book_id`)
VALUES
	(1,'0385534639');

/*!40000 ALTER TABLE `book_authors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table book_copys
# ------------------------------------------------------------

DROP TABLE IF EXISTS `book_copys`;

CREATE TABLE `book_copys` (
  `copy_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inventory_number` int NOT NULL,
  `location` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`copy_id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `book_copys` WRITE;
/*!40000 ALTER TABLE `book_copys` DISABLE KEYS */;

INSERT INTO `book_copys` (`copy_id`, `inventory_number`, `location`, `book_id`)
VALUES
	('123ewq',11223344,NULL,'0385534639'),
	('3443wq',110022,'A3','0061122416'),
	('qw12',222,'A1','abcd1234'),
	('qw121234-1',222,'A1','qw121234');

/*!40000 ALTER TABLE `book_copys` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table indexs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `indexs`;

CREATE TABLE `indexs` (
  `index_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `index_picture` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`index_id`,`book_id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `indexs` WRITE;
/*!40000 ALTER TABLE `indexs` DISABLE KEYS */;

INSERT INTO `indexs` (`index_id`, `index_picture`, `book_id`)
VALUES
	('','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1735221764579-9780132350884_p2_v1_s600x595.jpg','0061133416'),
	('','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1735220825878-Rich-dad-poor-dad-14-320.webp','0285534666'),
	('0011133466','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1736388844407-156f6edf-1d77-4bd5-ae49-b6dd60eda8b7.webp','0011133466'),
	('0385331612','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1735220260328-8318_look.jpg','0385331612'),
	('0385531139','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1736421433721-sim_nightingale-or-a-melange-de-litterature-a-periodical_1796_1_index_itemimage.png','0385531139'),
	('0385531612','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1735220130281-8318_look.jpg','0385531612'),
	('0385534444','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1736414216238-sim_nightingale-or-a-melange-de-litterature-a-periodical_1796_1_index_itemimage.png','0385534444'),
	('0385577669','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1736387902319-212788_3_toc.jpg','0385577669'),
	('0386634639','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1735221989819-9780132350884_p2_v1_s600x595.jpg','0386634639'),
	('0985534666','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1736388206738-who_moved_my_cheese_book_by_sp_1682767031_7856b521_progressive.jpg','0985534666'),
	('abcd1234a','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1732117450072-51EyaJeebHL._AC_UF1000,1000_QL80_.jpg','abcd1234'),
	('qw121234','/Users/wassel/Desktop/Code/Projects/cfpagl-project/backend/assets/book-indexs/1739150162942-index.jpg','qw121234');

/*!40000 ALTER TABLE `indexs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table loans
# ------------------------------------------------------------

DROP TABLE IF EXISTS `loans`;

CREATE TABLE `loans` (
  `loan_id` int NOT NULL AUTO_INCREMENT,
  `loan_start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loan_end_date` date DEFAULT NULL,
  `note` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_id` int NOT NULL,
  `manager_id` int NOT NULL,
  `copy_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`loan_id`),
  KEY `copy_id` (`copy_id`),
  KEY `manager_id` (`manager_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`),
  CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`manager_id`),
  CONSTRAINT `loans_ibfk_3` FOREIGN KEY (`copy_id`) REFERENCES `book_copys` (`copy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;

INSERT INTO `loans` (`loan_id`, `loan_start_date`, `loan_end_date`, `note`, `student_id`, `manager_id`, `copy_id`)
VALUES
	(1,'2024-11-21 14:50:42','2025-01-09','bbbbbbb',123,1,'qw12'),
	(2,'2024-12-29 22:55:34','2024-12-29','test',122400,1,'3443wq'),
	(3,'2025-01-09 08:39:29','2025-01-09','test',122400,1,'3443wq'),
	(4,'2025-01-09 09:18:00','2025-02-10','test',122400,1,'qw12'),
	(5,'2025-02-10 00:53:37',NULL,'```````',123,1,'qw12');

/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table managers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `managers`;

CREATE TABLE `managers` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passkey` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `unq_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;

INSERT INTO `managers` (`manager_id`, `username`, `passkey`, `first_name`, `last_name`, `sex`, `email`)
VALUES
	(1,'root','$2b$10$bN17XB0.ZcETYe5gvsAzX.G9d3nTUye4D.vx4APZQEpJIzWFHP6.G','su','su','male','');

/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table penalty_record
# ------------------------------------------------------------

DROP TABLE IF EXISTS `penalty_record`;

CREATE TABLE `penalty_record` (
  `penalty_id` int NOT NULL AUTO_INCREMENT,
  `penalty_start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `loan_id` int NOT NULL,
  `punishment_id` int NOT NULL,
  PRIMARY KEY (`penalty_id`),
  KEY `loan_id` (`loan_id`),
  KEY `punishment_id` (`punishment_id`),
  CONSTRAINT `penalty_record_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`loan_id`),
  CONSTRAINT `penalty_record_ibfk_2` FOREIGN KEY (`punishment_id`) REFERENCES `punishment` (`punishment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `penalty_record` WRITE;
/*!40000 ALTER TABLE `penalty_record` DISABLE KEYS */;

INSERT INTO `penalty_record` (`penalty_id`, `penalty_start_date`, `loan_id`, `punishment_id`)
VALUES
	(1,'2024-11-28 14:07:47',1,2),
	(2,'2024-12-30 00:37:57',1,2),
	(3,'2025-02-10 01:23:47',1,3);

/*!40000 ALTER TABLE `penalty_record` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table publishing_house
# ------------------------------------------------------------

DROP TABLE IF EXISTS `publishing_house`;

CREATE TABLE `publishing_house` (
  `publishing_house_id` int NOT NULL AUTO_INCREMENT,
  `publishing_house_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`publishing_house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `publishing_house` WRITE;
/*!40000 ALTER TABLE `publishing_house` DISABLE KEYS */;

INSERT INTO `publishing_house` (`publishing_house_id`, `publishing_house_name`)
VALUES
	(4,'بيرسون'),
	(5,'هاربر كولنز'),
	(6,'ماكميلان'),
	(7,'راندوم هاوس'),
	(8,'سيمون وشوستر'),
	(9,'ترانسورلد'),
	(10,'مجموعة هوتون ميفلين هاركورت'),
	(11,'أكسفورد يونيفرسيتي برس'),
	(12,'إلين ويلسون'),
	(13,'شيلدون'),
	(14,'بلومسبري'),
	(15,'ياي كودو كاتشو'),
	(16,'ليرنر للنشر'),
	(17,'فايكينغ للنشر'),
	(18,'برينتيس هول'),
	(19,'غارنيت للنشر'),
	(20,'الدار العالمية للنشر'),
	(21,'ماكجرو هيل'),
	(22,'فيابلي للنشر'),
	(23,'غراو للنشر'),
	(24,'لبنان للنشر');

/*!40000 ALTER TABLE `publishing_house` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table punishment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `punishment`;

CREATE TABLE `punishment` (
  `punishment_id` int NOT NULL AUTO_INCREMENT,
  `cause` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY (`punishment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `punishment` WRITE;
/*!40000 ALTER TABLE `punishment` DISABLE KEYS */;

INSERT INTO `punishment` (`punishment_id`, `cause`, `duration`)
VALUES
	(2,'missing book return dead line',3),
	(3,'تمزيق كتاب',30);

/*!40000 ALTER TABLE `punishment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table readers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `readers`;

CREATE TABLE `readers` (
  `read_session` int NOT NULL AUTO_INCREMENT,
  `entry_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `exit_time` timestamp NULL DEFAULT NULL,
  `note` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_id` int NOT NULL,
  `manager_id` int NOT NULL,
  `copy_id` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`read_session`),
  KEY `copy_id` (`copy_id`),
  KEY `manager_id` (`manager_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `readers_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`),
  CONSTRAINT `readers_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `managers` (`manager_id`),
  CONSTRAINT `readers_ibfk_3` FOREIGN KEY (`copy_id`) REFERENCES `book_copys` (`copy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `readers` WRITE;
/*!40000 ALTER TABLE `readers` DISABLE KEYS */;

INSERT INTO `readers` (`read_session`, `entry_time`, `exit_time`, `note`, `student_id`, `manager_id`, `copy_id`)
VALUES
	(1,'2024-11-21 15:25:31','2025-01-03 01:26:11','aaaaaaa',123,1,'qw12'),
	(2,'2025-01-03 00:53:09','2025-01-03 01:26:57','test',123,1,'123ewq'),
	(3,'2025-01-03 01:00:50',NULL,'test 2',122400,1,'3443wq'),
	(4,'2025-01-03 01:20:24',NULL,'test 3',122400,1,'qw12'),
	(5,'2025-01-09 08:44:16','2025-01-09 08:44:20','test',123,1,'3443wq'),
	(6,'2025-01-09 11:14:16','2025-01-09 11:14:20','test',123,1,'123ewq'),
	(7,'2025-02-10 00:59:07','2025-02-10 00:59:12','```````',123,1,'qw12');

/*!40000 ALTER TABLE `readers` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
