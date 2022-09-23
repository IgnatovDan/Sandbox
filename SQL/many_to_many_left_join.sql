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
)
GO

CREATE TABLE [Categories](
	[id] [uniqueidentifier] ROWGUIDCOL DEFAULT NEWID() NOT NULL PRIMARY KEY,
	[name] [varchar](50) NOT NULL,
)
GO

CREATE TABLE [ProductCategories](
	[product] [uniqueidentifier] NOT NULL,
	[category] [uniqueidentifier] NOT NULL,
	FOREIGN KEY (product) REFERENCES Products(id),
	FOREIGN KEY (category) REFERENCES Categories(id),
	CONSTRAINT PK_Product_Category PRIMARY KEY (product, category)
)
GO

/* Create 3 Products */
INSERT INTO Products (name) VALUES ('Product_1');
INSERT INTO Products (name) VALUES ('Product_2');
INSERT INTO Products (name) VALUES ('Product_3');
GO

/* Create 3 Categories */
INSERT INTO Categories (name) VALUES ('Category_1');
INSERT INTO Categories (name) VALUES ('Category_2');
INSERT INTO Categories (name) VALUES ('Category_3');
GO

DECLARE @product1 [uniqueidentifier]
SET @product1 = (SELECT [id] FROM Products WHERE [name] = 'Product_1')

DECLARE @product2 [uniqueidentifier]
SET @product2 = (SELECT [id] FROM Products WHERE [name] = 'Product_2')

DECLARE @category1 [uniqueidentifier]
SET @category1 = (SELECT [id] FROM Categories WHERE [name] = 'Category_1')

DECLARE @category2 [uniqueidentifier]
SET @category2 = (SELECT [id] FROM Categories WHERE [name] = 'Category_2')

/* Link Product_1 to Category_1 */
INSERT INTO ProductCategories (product, category) VALUES (@product1, @category1);

/* Link Product_2 to Category_1 AND Category_2 */
INSERT INTO ProductCategories (product, category) VALUES (@product2, @category1);
INSERT INTO ProductCategories (product, category) VALUES (@product2, @category2);
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

/*
Results:
Product_2	Category_2
Product_2	Category_1
Product_1	Category_1
Product_3	NULL
*/
