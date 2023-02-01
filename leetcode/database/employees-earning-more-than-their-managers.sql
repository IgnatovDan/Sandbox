SELECT Employee.name as Employee FROM Employee 
JOIN Employee as Manager ON Employee.managerId = Manager.Id
WHERE Employee.salary > Manager.salary
