-- ============= Initial DB ============= 

use master
go
alter database [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88] set single_user with rollback immediate
go
drop database [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]
go

create database [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]
go
use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]
go

if(exists(select 1 from information_schema.tables where table_name = 'task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88'))
	drop table table1
go

create table table1(id int identity, name nvarchar(30), value nvarchar(30))
go

insert into table1(name, value) values('to-update-1', '')
insert into table1(name, value) values('to-update-2', '')
insert into table1(name, value) values('to-delete-1', '')
insert into table1(name, value) values('to-delete-2', '')

select * from table1
-- id	name	value
-- 1	to-update-1	
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	

-- >>>>>>>>>>>>>>> Start Session 1 >>>>>>>>>>>>>>>

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read uncommitted
begin transaction T1 
select @@TRANCOUNT
select transaction_isolation_level from sys.dm_exec_sessions where session_id = @@spid

update table1 set value = value + '10' where id = 1

select * from table1
-- 1	to-update-1	10
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	

-- >>>>>>>>>>>>>>> Start Session 2 >>>>>>>>>>>>>>>

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read uncommitted
begin transaction T2 
select @@TRANCOUNT
select transaction_isolation_level from sys.dm_exec_sessions where session_id = @@spid

select * from table1
-- 1	to-update-1	10
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	
-- visible uncommitted update from session1

select * from table1 where id = 1
-- 1	to-update-1	10
-- visible uncommitted update from session1

select * from table1 where name = 'to-update-1'
-- 1	to-update-1	10
-- visible uncommitted update from session1

update table1 set value = value + ' 2' where name = 'to-update-1'
-- lock, there is uncommitted update in table1 in session1

update table1 set value = value + ' 2' where id = 1
-- lock, there is uncommitted update in table1 in session1

update table1 set value = value + ' 2' where name = 'to-update-2'
-- lock, there is uncommitted update in table1 in session1

update table1 set value = value + ' 2' where id = 2
-- lock, there is uncommitted update in table1 in session1

delete from table1 where name = 'to-delete-2'
-- lock, there is uncommitted update in table1 in session1

insert into table1(name, value) values('inserted-2', '')
-- success

select * from table1
-- 1	to-update-1	10
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	
-- 5	inserted-2	
-- visible (uncommitted update from session1) AND (uncommitted insert from session2)

-- ============= Continue Session 1 ============= 

select * from table1
-- 1	to-update-1	10
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	
-- 5	inserted-2	
-- visible (uncommitted update from session1) AND (uncommitted insert from session2)

update table1 set value = value + '10' where name = 'inserted-1'
-- dead lock, there is uncommitted insert in table1 from session2

delete from table1 where name = 'to-delete-1'
-- dead lock, there is uncommitted insert in table1 from session2

insert into table1(name, value) values('inserted-1-2', '')
-- success

select * from table1
-- 1	to-update-1	10
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	
-- 5	inserted-2	
-- 6	inserted-1-2	
-- visible (uncommitted update + insert from session1) AND (insert from session2)

-- ============= Continue Session 2 ============= 

select * from table1

-- 1	to-update-1	10
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	
-- 5	inserted-2	
-- 6	inserted-1-2	
-- visible (uncommitted update + insert from session1) AND (insert from session2)
