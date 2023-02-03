/*
https://leetcode.com/problems/delete-duplicate-emails/
Write an SQL query to delete all the duplicate emails, keeping only one unique email with the smallest id
*/

# Please write a DELETE statement and DO NOT write a SELECT statement.
# Write your MySQL query statement below

delete DeletePerson from Person as DeletePerson
left join (
    select min(id) as id
    from Person 
    group by email) AllPerson
    on DeletePerson.id = AllPerson.id
where AllPerson.id is null

/*
#ok
DELETE FROM Person
WHERE 
	id IN (
	SELECT 
		id 
	FROM (
		SELECT 
			id,
			ROW_NUMBER() OVER (
				PARTITION BY email
				ORDER BY email) AS row_num
		FROM 
			Person
	) t
    WHERE row_num > 1
);
*/

/*
#ok
DELETE PersonToDelete FROM Person as PersonToDelete
INNER JOIN Person as PersonToCount 
    on PersonToDelete.email = PersonToCount.email and PersonToDelete.id > PersonToCount.id
*/

/*
#ok
DELETE PersonToDelete FROM Person as PersonToDelete
INNER JOIN Person as PersonToCount
WHERE 
    PersonToDelete.id > PersonToCount.id AND 
    PersonToDelete.email = PersonToCount.email
*/

/*
#TODO
WITH cte AS (
SELECT 
    id, 
    email, 
    ROW_NUMBER() OVER (
        PARTITION BY 
            email
        ORDER BY 
            email
    ) row_num
    FROM 
    Person
)
DELETE FROM cte
WHERE row_num > 1;
*/

/*
#TODO
delete DeletePerson from Person as DeletePerson
where DeletePerson.id not in (select min(AllPerson.id) from Person as AllPerson group by AllPerson.email)
*/

/*
#TODO
delete from Person as PersonDelete
INNER JOIN Person as PersonRight on (PersonDelete.email = PersonRight.email and PersonDelete.id != PersonRight.id)
*/

/*
#TODO
delete from Person as PersonDelete
where (select max(id) from Person group by email having count(1) > 1)
*/
