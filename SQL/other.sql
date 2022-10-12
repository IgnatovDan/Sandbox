- WITH - https://www.geeksforgeeks.org/sql-with-clause/
WITH ProdAvg(avg) as (select avg(Price) from Products)
SELECT * FROM Products where Products.Price > ProdAvg.Price

- Clustered index - https://www.sqlshack.com/what-is-the-difference-between-clustered-and-non-clustered-indexes-in-sql-server/
CREATE CLUSTERED INDEX IX_tblStudent_Gender_Score
ON student(gender ASC, total_score DESC)
