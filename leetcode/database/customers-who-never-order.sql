/*
https://leetcode.com/problems/customers-who-never-order/
Write an SQL query to report all customers who never order anything.
*/

/* not in */
SELECT name as Customers FROM Customers
where Customers.id not in (select Orders.customerId from Orders)

/* left join */
SELECT name as Customers FROM Customers
left join Orders on Orders.customerId = Customers.id
where Orders.customerId is null

/* not exists */
SELECT name as Customers FROM Customers
where not exists (select 1 from Orders where Orders.customerId = Customers.id)
