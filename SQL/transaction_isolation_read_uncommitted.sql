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

create table table1(id int identity, value nvarchar(30))
go

insert into table1(value) values('updated')
insert into table1(value) values('deleted')
select * from table1
-- 1	updated
-- 2	deleted

-- ============= Session 1 ============= 

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read uncommitted
begin transaction T1 
update table1 set value = value + '10' where id = 1

insert into table1(value) values('inserted')
delete from table1 where value = 'deleted'

select * from table1
-- 1	updated
-- 2	deleted

-- ============= Session 2 ============= 

-- > start Session 2
use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read uncommitted
begin transaction T1 
select * from table1
-- 1	updated10
-- 3	inserted

-- updated in session1, not committed
update table1 set value = value + '20' where id = 1
-- lock
delete from table1 where id = 1
-- lock

-- inserted in session 1, not committed
update table1 set value = value + '20' where id = 3
-- lock
delete from table1 where id = 3
-- lock

-- deleted in session 1, not committed
update table1 set value = value + '20' where id = 2
-- lock
delete from table1 where id = 2
-- lock

insert into table1(value) values('inserted20')

select * from table1
-- 1	updated10
-- 3	inserted
-- 4	inserted20

rollback transaction
select * from table1
-- 1	updated10
-- 3	inserted

-- ============= Session 1 ============= 
select * from table1
-- 1	updated10
-- 3	inserted
-- 4	inserted20

-- inserted in session 2
update table1 set value = value + '10' where id = 4
-- lock

rollback transaction
select * from table1
-- 1	updated
-- 2	deleted

-- <
