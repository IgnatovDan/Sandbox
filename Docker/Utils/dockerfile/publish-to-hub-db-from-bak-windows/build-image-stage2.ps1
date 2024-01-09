Write-Verbose "`n started"

start-service MSSQL`$SQLEXPRESS

Write-Verbose "`n Wait SQL server to start"
$res = sqlcmd -t 120 -b -Q "select 1"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n ATTACH DATABASE"
$res = sqlcmd -b -Q "CREATE DATABASE mydb ON (FILENAME = 'c:\\database\\mydb_data.mdf'), (FILENAME = 'c:\\database\\mydb_data.ldf') FOR ATTACH;"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n EXEC sp_changedbowner"
$res = sqlcmd -b -Q "USE [mydb]; EXEC sp_changedbowner 'sa';"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

# 'TRUSTWORTHY ON' + 'clr enabled' + 'RECONFIGURE' allow to execute stored procedures from .NET assembly ('error occurred in the Microsoft .NET Framework while trying to load assembly id xxxx...Could not load file or assembly MyAssembly' error)

Write-Verbose "`n SET TRUSTWORTHY ON"
$res = sqlcmd -b -Q "ALTER DATABASE [mydb] SET TRUSTWORTHY ON;"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n clr enabled"
$res = sqlcmd -b -Q "USE [mydb]; EXEC sp_configure 'clr enabled', 1;"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n RECONFIGURE"
$res = sqlcmd -b -Q "USE [mydb]; RECONFIGURE;"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n finished"
