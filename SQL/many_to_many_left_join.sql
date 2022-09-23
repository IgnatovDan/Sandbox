/*

Исходное задание:

В базе данных MS SQL Server есть продукты и категории.
Одному продукту может соответствовать много категорий, в одной категории может быть много продуктов.
Напишите SQL запрос для выбора всех пар «Имя продукта – Имя категории».
Если у продукта нет категорий, то его имя все равно должно выводиться.

*/

USE [master]
GO

/*
I can switch database to single use to close existing connections to database: https://www.mytechmantra.com/sql-server/drop-database-in-sql-server-by-killing-existing-connections/
But I prefer to drop it manually.

DROP DATABASE [Task-D9DE5C6B-1371-4A1E-9CBF-2273A44F2AA6]
GO
*/

/* Create empty sandbox database */

CREATE DATABASE [Task-D9DE5C6B-1371-4A1E-9CBF-2273A44F2AA6]
GO

USE [Task-D9DE5C6B-1371-4A1E-9CBF-2273A44F2AA6]
GO

/* Create Product, Categories and [ProductCategories] tables */

CREATE TABLE [Products](
	[id] [uniqueidentifier] ROWGUIDCOL DEFAULT NEWID() NOT NULL PRIMARY KEY,
	[name] [varchar](50) NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE [Categories](
	[id] [uniqueidentifier] ROWGUIDCOL DEFAULT NEWID() NOT NULL PRIMARY KEY,
	[name] [varchar](50) NOT NULL,
) ON [PRIMARY]
GO

CREATE TABLE [ProductCategories](
	[product] [uniqueidentifier] NOT NULL,
	[category] [uniqueidentifier] NOT NULL,
	FOREIGN KEY (product) REFERENCES Products(id),
	FOREIGN KEY (category) REFERENCES Categories(id),
	CONSTRAINT PK_Product_Category PRIMARY KEY (product, category)
) ON [PRIMARY]
GO

/* Create two Products */
INSERT INTO Products (name) VALUES ('Product_1');
INSERT INTO Products (name) VALUES ('Product_2');
GO

/* Create two Categories */
INSERT INTO Categories (name) VALUES ('Category_1');
INSERT INTO Categories (name) VALUES ('Category_2');
GO

/* Link Product_1 to Category_1 via ProductCategories table */
DECLARE @product1 [uniqueidentifier]
SET @product1 = (SELECT [id] FROM Products WHERE [name] = 'Product_1')

DECLARE @category1 [uniqueidentifier]
SET @category1 = (SELECT [id] FROM Categories WHERE [name] = 'Category_1')

INSERT INTO ProductCategories (product, category) VALUES (@product1, @category1);
GO

/* Show rows from all tables */
SELECT * from [ProductCategories]
GO
SELECT * from Products
GO
SELECT * from Categories
GO

/* 
"Напишите SQL запрос для выбора всех пар «Имя продукта – Имя категории». Если у продукта нет категорий, то его имя все равно должно выводиться."
See below:
*/
SELECT Products.[name] as Product_Name, Categories.[name] as Category_Name from Products
left join ProductCategories on ProductCategories.product = Products.id
left join Categories on ProductCategories.category = Categories.id
GO