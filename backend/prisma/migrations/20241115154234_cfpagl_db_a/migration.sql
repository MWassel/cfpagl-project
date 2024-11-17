-- CreateTable
CREATE TABLE `Author` (
    `author_id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(60) NOT NULL,
    `nationality` VARCHAR(30) NULL,

    PRIMARY KEY (`author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `branch_id` VARCHAR(15) NOT NULL,
    `training_start_date` DATE NOT NULL,
    `training_end_date` DATE NOT NULL,
    `speciality_id` VARCHAR(15) NULL,

    INDEX `speciality_id`(`speciality_id`),
    PRIMARY KEY (`branch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `categorie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categorie_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`categorie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Speciality` (
    `speciality_id` VARCHAR(15) NOT NULL,
    `speciality` VARCHAR(50) NOT NULL,
    `training_duration` INTEGER NOT NULL,
    `training_type` VARCHAR(25) NULL,

    PRIMARY KEY (`speciality_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `student_id` INTEGER NOT NULL,
    `first_name` VARCHAR(25) NOT NULL,
    `last_name` VARCHAR(25) NOT NULL,
    `birth_date` DATE NOT NULL,
    `phone_number` VARCHAR(15) NULL,
    `sex` VARCHAR(10) NOT NULL,
    `branch_id` VARCHAR(15) NULL,

    INDEX `branch_id`(`branch_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_authors` (
    `author_id` INTEGER NOT NULL,
    `book_id` VARCHAR(25) NOT NULL,

    INDEX `book_id`(`book_id`),
    PRIMARY KEY (`author_id`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_copys` (
    `copy_id` VARCHAR(25) NOT NULL,
    `inventory_number` INTEGER NOT NULL,
    `location` VARCHAR(5) NULL,
    `book_id` VARCHAR(25) NOT NULL,

    INDEX `book_id`(`book_id`),
    PRIMARY KEY (`copy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `book_id` VARCHAR(25) NOT NULL,
    `book_title` VARCHAR(200) NOT NULL,
    `summary` VARCHAR(255) NULL,
    `total_pages` INTEGER NULL,
    `publishing_year` INTEGER NULL,
    `stored_date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cover` VARCHAR(250) NULL,
    `categorie_id` INTEGER NOT NULL,
    `publishing_house_id` INTEGER NOT NULL,

    INDEX `categorie_id`(`categorie_id`),
    INDEX `publishing_house_id`(`publishing_house_id`),
    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `indexs` (
    `index_id` VARCHAR(20) NOT NULL,
    `index_picture` VARCHAR(250) NULL,
    `book_id` VARCHAR(25) NOT NULL,

    INDEX `book_id`(`book_id`),
    PRIMARY KEY (`index_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loans` (
    `loan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `loan_start_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `loan_end_date` DATE NULL,
    `note` VARCHAR(50) NULL,
    `student_id` INTEGER NOT NULL,
    `manager_id` INTEGER NOT NULL,
    `copy_id` VARCHAR(25) NOT NULL,

    INDEX `copy_id`(`copy_id`),
    INDEX `manager_id`(`manager_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`loan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `managers` (
    `manager_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(25) NOT NULL,
    `passkey` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(25) NOT NULL,
    `last_name` VARCHAR(25) NOT NULL,
    `sex` VARCHAR(10) NOT NULL,
    `email` VARCHAR(50) NULL,

    PRIMARY KEY (`manager_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penalty_record` (
    `penalty_id` INTEGER NOT NULL AUTO_INCREMENT,
    `penalty_start_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `loan_id` INTEGER NOT NULL,
    `punishment_id` INTEGER NOT NULL,

    INDEX `loan_id`(`loan_id`),
    INDEX `punishment_id`(`punishment_id`),
    PRIMARY KEY (`penalty_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publishing_house` (
    `publishing_house_id` INTEGER NOT NULL AUTO_INCREMENT,
    `publishing_house_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`publishing_house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `punishment` (
    `punishment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cause` VARCHAR(100) NOT NULL,
    `duration` INTEGER NOT NULL,

    PRIMARY KEY (`punishment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `readers` (
    `read_session` INTEGER NOT NULL AUTO_INCREMENT,
    `entry_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `exit_time` TIMESTAMP(0) NULL,
    `note` VARCHAR(50) NULL,
    `student_id` INTEGER NOT NULL,
    `manager_id` INTEGER NOT NULL,
    `copy_id` VARCHAR(25) NOT NULL,

    INDEX `copy_id`(`copy_id`),
    INDEX `manager_id`(`manager_id`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`read_session`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`speciality_id`) REFERENCES `Speciality`(`speciality_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`branch_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_authors` ADD CONSTRAINT `book_authors_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Author`(`author_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `book_authors` ADD CONSTRAINT `book_authors_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `Categories`(`categorie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`publishing_house_id`) REFERENCES `publishing_house`(`publishing_house_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `managers`(`manager_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_ibfk_3` FOREIGN KEY (`copy_id`) REFERENCES `book_copys`(`copy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `penalty_record` ADD CONSTRAINT `penalty_record_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loans`(`loan_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `penalty_record` ADD CONSTRAINT `penalty_record_ibfk_2` FOREIGN KEY (`punishment_id`) REFERENCES `punishment`(`punishment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `readers` ADD CONSTRAINT `readers_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `readers` ADD CONSTRAINT `readers_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `managers`(`manager_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `readers` ADD CONSTRAINT `readers_ibfk_3` FOREIGN KEY (`copy_id`) REFERENCES `book_copys`(`copy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
