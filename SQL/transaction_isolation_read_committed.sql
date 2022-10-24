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

-- ============= Session 1 ============= 

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read committed
begin transaction T1
select @@TRANCOUNT

update table1 set value = value + '10' where name = 'to-update-1'
insert into table1(name, value) values('inserted-1', '')
delete from table1 where name = 'to-delete-1'

select * from table1
-- id	name        value
-- 1	to-update-1	10
-- 2	to-update-2	
-- 4	to-delete-2	
-- 5	inserted-1	

-- ============= Session 2 ============= 

-- > start Session 2
use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read committed
begin transaction T1 
select @@TRANCOUNT

select * from table1
-- lock, there are uncommitted changes (insert/update/delete) in session 1

select * from table1 where name = 'to-update-2'
-- lock, there are uncommitted changes (insert/update/delete) in session 1

update table1 set value = value + '20' where name = 'to-update-2'
-- lock, there are uncommitted changes (insert/update/delete) in session 1

delete from table1 where name = 'to-delete-2'
-- lock, there are uncommitted changes (insert/update/delete) in session 1

insert into table1(name, value) values('inserted-2', '')
-- succeess

-- ============= Session 1 ============= 
> continue in session 1

select * from table1
-- lock, there is uncommitted 'insert' in session 2

update table1 set value = value + ' 10' where name = 'to-update-1'
-- dead lock, there is uncommitted 'insert' in session 2

insert into table1(name, value) values('inserted-1-2', '')
-- succeess

rollback transaction

set transaction isolation level read committed
select * from table1
-- lock, uncommitted 'insert' in session 2
rollback transaction

-- ============= Session 2 ============= 
> continue in session 2

select * from table1
-- 1	to-update-1	
-- 2	to-update-2	
-- 3	to-delete-1	
-- 4	to-delete-2	
-- 6	inserted-2	
-- visible uncommitted insert from session2

rollback transaction
