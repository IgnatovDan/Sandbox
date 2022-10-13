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

-- ============= Session 1 ============= 

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

--set transaction isolation level read committed
begin transaction T1 
update table1 set value = value + '10' where id = 1

update table1 set value = 'upd-10' where id = 1

insert into table1(value) values('inserted')
delete from table1 where value = 'deleted'

select * from table1

commit transaction T2
rollback transaction T1

-- ============= Session 2 ============= 

use [task-5BC3B61B-BCAA-4EBE-90FC-35C0BF657D88]

set transaction isolation level read uncommitted
set transaction isolation level read committed
set transaction isolation level repeatable read
set transaction isolation level serializable
set transaction isolation level snapshot

begin transaction T1
select * from table1 with(nolock)
select * from table1
select * from table1 where id = 2

update table1 set value = value + '11' where id = 1 -- lock until commit/rollback, 'updated1011' if commit
update table1 set value = 'upd-11' where id = 1

select * from table1 where id = 1

select transaction_isolation_level from sys.dm_exec_sessions where session_id = @@spid

rollback transaction
