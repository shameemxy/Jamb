const DBMS_PROGRAMS = [
    {
        title: "1. Employee Table - Constraints & Rollback",
        code: `-- 1. Create Employee table
CREATE TABLE Employee (
    EMPNO INT,
    ENAME VARCHAR(50),
    JOB VARCHAR(50),
    MANAGER_NO INT,
    SAL DECIMAL (10, 2),
    COMMISSION DECIMAL (10, 2)
);

-- 1. Create a user and grant all permissions to the user.
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON Employee TO 'myuser'@'localhost';

-- 2. Insert the any three records and use rollback.
INSERT INTO Employee (EMPNO, ENAME, JOB, MANAGER_NO, SAL, COMMISSION)
VALUES
(1, 'John Doe', 'Manager', 1001, 5000.00, 1000.00),
(2, 'Jane Smith', 'Analyst', 1001, 4000.00, NULL),
(3, 'Mike Johnson', 'Clerk', 1002, 3000.00, 500.00);

-- Use ROLLBACK to undo the changes (not committing the transaction)
ROLLBACK;

-- 3. Add primary key constraint and not null constraint.
ALTER TABLE Employee
ADD CONSTRAINT PK_Employee PRIMARY KEY (EMPNO);

ALTER TABLE Employee
MODIFY EMPNO INT NOT NULL;

ALTER TABLE Employee
MODIFY ENAME VARCHAR(50) NOT NULL;

ALTER TABLE Employee
MODIFY JOB VARCHAR(50) NOT NULL;

-- 4. Insert null values into the Employee table and verify the result.
-- (Note: Since we added NOT NULL constraints, inserting null values will result in an error)
INSERT INTO Employee (EMPNO, ENAME, JOB, MANAGER_NO, SAL, COMMISSION)
VALUES (4, NULL, 'Intern', NULL, NULL, NULL);`
    },
    {
        title: "2. Employee Table - Alter & Update",
        code: `-- Create a table called Employee
CREATE TABLE Employee (
    EMPNO INT,
    ENAME VARCHAR(50),
    JOB VARCHAR(50),
    MGR INT,
    SAL DECIMAL(10, 2)
);

-- 1. Add a column commission with domain to the Employee table
ALTER TABLE Employee
ADD COLUMN COMMISSION DECIMAL(10, 2);

-- 2. Insert any five records into the table
INSERT INTO Employee (EMPNO, ENAME, JOB, MGR, SAL)
VALUES (101, 'John Doe', 'Manager', NULL, 5000.00);

INSERT INTO Employee (EMPNO, ENAME, JOB, MGR, SAL)
VALUES (102, 'Jane Smith', 'Developer', 101, 4000.00);

INSERT INTO Employee (EMPNO, ENAME, JOB, MGR, SAL)
VALUES (103, 'Alice Johnson', 'Analyst', 101, 3500.00);

INSERT INTO Employee (EMPNO, ENAME, JOB, MGR, SAL)
VALUES (104, 'Bob Williams', 'Tester', 102, 3000.00);

INSERT INTO Employee (EMPNO, ENAME, JOB, MGR, SAL)
VALUES (105, 'Emily Davis', 'Designer', 102, 4500.00);

-- 3. Update the column details of job
UPDATE Employee
SET JOB = 'Senior Developer'
WHERE EMPNO = 102;

-- 4. Rename the column of Employ table using alter command
ALTER TABLE Employee
RENAME COLUMN MGR TO MANAGER_NO;

-- 5. Delete the employee whose Empno is 105
DELETE FROM Employee
WHERE EMPNO = 105;`
    },
    {
        title: "3. Aggregate Functions & Grouping",
        code: `-- 1. Create Employee table containing all Records
CREATE TABLE Employee (
    E_id INT,
    E_name VARCHAR(50),
    Age INT,
    Salary DECIMAL(10, 2)
);

-- Insert Records into the Employee Table:
INSERT INTO Employee (E_id, E_name, Age, Salary)
VALUES
(1, 'John Doe', 30, 5000.00),
(2, 'Jane Smith', 25, 4000.00),
(3, 'Mike Johnson', 35, 6000.00),
(4, 'Sarah Williams', 28, 4500.00),
(5, 'Chris Brown', 32, 5500.00);

-- 2. Count number of employee names from employee table
SELECT COUNT(E_name) AS TotalEmployees FROM Employee;

-- 3. Find the Maximum age from employee table
SELECT MAX(Age) AS MaxAge FROM Employee;

-- 4. Find the Minimum age from employee table
SELECT MIN(Age) AS MinAge FROM Employee;

-- 5. Find salaries of employee in Ascending Order
SELECT Salary FROM Employee ORDER BY Salary ASC;

-- 6. Find grouped salaries of employees
SELECT Salary, COUNT(*) AS NumberOfEmployees
FROM Employee
GROUP BY Salary;`
    },
    {
        title: "4. Row Level Triggers",
        code: `-- Create Customers Table
CREATE TABLE customers (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255),
    AGE INT,
    ADDRESS VARCHAR(255),
    SALARY DECIMAL(10, 2)
);

INSERT INTO customers (ID, NAME, AGE, ADDRESS, SALARY)
VALUES (1, 'John Doe', 30, '123 Main St', 50000);

INSERT INTO customers (ID, NAME, AGE, ADDRESS, SALARY)
VALUES (2, 'Jane Smith', 25, '456 Elm St', 60000);

INSERT INTO customers (ID, NAME, AGE, ADDRESS, SALARY)
VALUES (3, 'Mike Johnson', 35, '789 Oak St', 70000);

-- Trigger for INSERT operations
DELIMITER //
CREATE TRIGGER customers_insert_salary_change
BEFORE INSERT ON customers
FOR EACH ROW
BEGIN
    DECLARE new_salary DECIMAL(10, 2);
    SET new_salary = NEW.salary;
    SET @message = CONCAT('New salary: ', new_salary);
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message;
END;
//
DELIMITER ;

-- Trigger for UPDATE operations
DELIMITER //
CREATE TRIGGER customers_update_salary_change
BEFORE UPDATE ON customers
FOR EACH ROW
BEGIN
    DECLARE old_salary DECIMAL(10, 2);
    DECLARE new_salary DECIMAL(10, 2);
    SET old_salary = OLD.salary;
    SET new_salary = NEW.salary;
    SET @message = CONCAT('Salary difference: ', (new_salary - old_salary));
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message;
END;
//
DELIMITER ;

-- Trigger for DELETE operations
DELIMITER //
CREATE TRIGGER customers_delete_salary_change
BEFORE DELETE ON customers
FOR EACH ROW
BEGIN
    DECLARE old_salary DECIMAL(10, 2);
    SET old_salary = OLD.salary;
    SET @message = CONCAT('Salary before deletion: ', old_salary);
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message;
END;
//
DELIMITER ;`
    },
    {
        title: "5. PL/SQL Cursor",
        code: `-- Create Employee table & extract values using Cursor
CREATE TABLE Employee (
    E_id INT PRIMARY KEY,
    E_name VARCHAR(255),
    Age INT,
    Salary DECIMAL(10, 2)
);

INSERT INTO Employee (E_id, E_name, Age, Salary) VALUES (1, 'John Doe', 30, 50000.00);
INSERT INTO Employee (E_id, E_name, Age, Salary) VALUES (2, 'Jane Smith', 25, 60000.00);
INSERT INTO Employee (E_id, E_name, Age, Salary) VALUES (3, 'Alice Johnson', 35, 70000.00);

DELIMITER //
CREATE PROCEDURE extract_employee_values()
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE emp_id INT;
    DECLARE emp_name VARCHAR(255);
    DECLARE emp_age INT;
    DECLARE emp_salary DECIMAL(10, 2);

    DECLARE cur CURSOR FOR
    SELECT E_id, E_name, Age, Salary FROM Employee;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    emp_loop: LOOP
        FETCH cur INTO emp_id, emp_name, emp_age, emp_salary;
        IF done THEN
            LEAVE emp_loop;
        END IF;

        -- Print the extracted values
        SELECT emp_id, emp_name, emp_age, emp_salary;
    END LOOP;

    CLOSE cur;
END //
DELIMITER ;

-- This statement calls the stored procedure to extract employee values
CALL extract_employee_values();`
    },
    {
        title: "6. Parameterized Cursor (Merge Data)",
        code: `-- Merge data from N_RollCall to O_RollCall
CREATE TABLE N_RollCall (
    column1 INT,
    column2 VARCHAR(50)
);

CREATE TABLE O_RollCall (
    column1 INT,
    column2 VARCHAR(50)
);

DELIMITER //
CREATE PROCEDURE MergeRollCallData()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_column1 INT; 
    DECLARE v_column2 VARCHAR(50); 
    
    -- Declare cursor for selecting data from N_RollCall
    DECLARE new_roll_call_cur CURSOR FOR
    SELECT column1, column2 FROM N_RollCall; 
    
    -- Declare handlers for exceptions
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN new_roll_call_cur;

    read_loop: LOOP
        FETCH new_roll_call_cur INTO v_column1, v_column2;

        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Check if record already exists in O_RollCall
        IF NOT EXISTS (
            SELECT * FROM O_RollCall
            WHERE column1 = v_column1 AND column2 = v_column2
        ) THEN
            -- If record doesn't exist, insert into O_RollCall
            INSERT INTO O_RollCall VALUES (v_column1, v_column2);
        END IF;
    END LOOP;

    CLOSE new_roll_call_cur;

    SELECT 'Data merge complete.';
END //
DELIMITER ;`
    },
    {
        title: "7. MongoDB CRUD Operations",
        code: `/*
 * Steps to Install MongoDB Compass on Windows
 * Step 1: Go to MongoDB website and download MongoDB Compass.
 * Step 2: Unzip File after downloading / Run Installer.
 * Step 3: Double click the installer icon.
 * Step 4: Follow the installation prompts and customize the installation.
 * Step 5: Configure Hostname to localhost and Port to 27017 to connect.
 */

// Execute MongoDB basic Queries using CRUD operations

// 1. CREATE (Insert Data)
db.employees.insertOne({
    empno: 1,
    ename: "John Doe",
    job: "Manager",
    salary: 50000
});

db.employees.insertMany([
    { empno: 2, ename: "Jane Smith", job: "Analyst", salary: 40000 },
    { empno: 3, ename: "Mike Johnson", job: "Clerk", salary: 30000 }
]);

// 2. READ (Retrieve Data)
// Find all employees
db.employees.find({});

// Find employees with salary greater than 35000
db.employees.find({ salary: { $gt: 35000 } });

// 3. UPDATE (Modify Data)
// Update job title for John Doe
db.employees.updateOne(
    { ename: "John Doe" },
    { $set: { job: "Senior Manager" } }
);

// Give a raise to all Analysts
db.employees.updateMany(
    { job: "Analyst" },
    { $inc: { salary: 5000 } }
);

// 4. DELETE (Remove Data)
// Delete a specific employee
db.employees.deleteOne({ ename: "Mike Johnson" });

// Delete all employees matching a condition
db.employees.deleteMany({ job: "Intern" });`
    }
];