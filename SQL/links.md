- WITH - https://www.geeksforgeeks.org/sql-with-clause/
```sql
WITH ProdAvg(avg) as (select avg(Price) from Products)
SELECT * FROM Products where Products.Price > ProdAvg.Price
```

- HAVING - https://stackoverflow.com/questions/9253244/sql-having-vs-where
```sql
SELECT department, avg(age) avg_age FROM employees
GROUP BY department
HAVING avg_age> 35;
```

- Transaction isolation levels: https://habr.com/ru/post/305600/
"Побочные эффекты" в работе транзакций - https://medium.com/pseudo-blog/%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%B7%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D0%B8-%D1%82%D1%80%D0%B0%D0%BD%D0%B7%D0%B0%D0%BA%D1%86%D0%B8%D0%B9-87cd2b129de1
Read Uncommitted, Read Committed (+ read_committed_snapshot on/off + NOLOCK), Repeatable Read, Serializable

- Clustered index - https://www.sqlshack.com/what-is-the-difference-between-clustered-and-non-clustered-indexes-in-sql-server/
```sql
CREATE CLUSTERED INDEX IX_tblStudent_Gender_Score
ON student(gender ASC, total_score DESC)
```

- [SQLServer docs: "Lock modes"](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver16#lock_modes)
- [Paul White: "The Serializable Isolation Level"](https://sqlperformance.com/2014/04/t-sql-queries/the-serializable-isolation-level)
