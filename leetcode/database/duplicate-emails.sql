SELECT Person.email AS email
FROM Person
GROUP BY Person.email
HAVING COUNT(1) > 1

/*
SELECT DISTINCT PersonLeft.email AS email
FROM Person as PersonLeft
INNER JOIN Person as PersonRight on (PersonLeft.email = PersonRight.email and PersonLeft.id != PersonRight.id)
*/

/*
select email 
from (
    SELECT Person.email AS email, COUNT(1) as count
    FROM Person
    GROUP BY Person.email
) as PersonGroupped
where count > 1
*/
