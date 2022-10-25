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
-- id	name
-- 1	to-update-1
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	

-- >>>>>>>>>>>>>>> Start Session 1 >>>>>>>>>>>>>>>

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level repeatable read
begin transaction T1
select transaction_isolation_level from sys.dm_exec_sessions where session_id = @@spid
select @@TRANCOUNT

select * from table1 where name = 'to-update-1'
-- 1	to-update-1	

-- >>>>>>>>>>>>>>> Start Session 2 >>>>>>>>>>>>>>>

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read committed
begin transaction T1 
select transaction_isolation_level from sys.dm_exec_sessions where session_id = @@spid
select @@TRANCOUNT

select * from table1
-- 1	to-update-1	
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2

update table1 set value = value + ' 20' where name = 'to-update-1'
-- lock wait occurs, there is 'select' in session 1

update table1 set value = value + ' 20' where name = 'to-update-2'
-- lock wait occurs, there is 'select' in session 1

delete from table1 where name = 'to-update-1'
-- lock wait occurs, there is 'select' in session 1

delete from table1 where name = 'to-delete-2'
-- lock wait occurs, there is 'select' in session 1

insert into table1(name, value) values('to-update-1', '')
-- lock wait occurs, there is 'select' in session 1

insert into table1(name, value) values('to-update-2', '')
-- lock wait occurs, there is 'select' in session 1

