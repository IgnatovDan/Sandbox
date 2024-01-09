Write-Verbose "`n started"

$PSVersionTable

start-service MSSQL`$SQLEXPRESS

Write-Verbose "`n Wait SQL server to start"
$res = sqlcmd -t 120 -b -Q "select 1"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

# 'RESTORE FILELISTONLY' shows content of the 'bak' file without creating database: 'RESTORE DATABASE' command should use the same logical names for files
Write-Verbose "`n RESTORE FILELISTONLY"
$res = sqlcmd -b -Q "RESTORE FILELISTONLY FROM DISK = 'c:/database_bak/mydb.bak'"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n create c:\database"
New-Item -ItemType Directory -Path c:\database

Write-Verbose "`n RESTORE DATABASE"
$res = sqlcmd -b -Q "RESTORE DATABASE mydb FROM DISK = 'c:/database_bak/mydb.bak' WITH MOVE 'mydb' TO 'c:/database/mydb_data.mdf', MOVE 'mydb_log' TO 'c:/database/mydb_data.ldf' "
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n ALTER DATABASE"
$res = sqlcmd -b -Q "ALTER DATABASE mydb SET RECOVERY simple "
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

# Reduce size of the Log file to 10Mb (in bak file its size is 18Gb)
Write-Verbose "`n SHRINKFILE"
$res = sqlcmd -b -Q "USE [mydb]; DBCC SHRINKFILE(N'mydb_log', 10); "
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n sp_detach_db"
$res = sqlcmd -b -Q "EXEC sp_detach_db 'mydb', 'true';"
Write-Verbose "$res"
if ( $LASTEXITCODE -ne 0 ) {
    Write-Verbose "Error occurs"
    exit 1
}

Write-Verbose "`n New-Item c:\database_files"
New-Item -ItemType Directory -Path c:\database_files

# Avoid 'EOF' error (cannot find why) when copying files from this stage to the next dockerfile stage
Write-Verbose "`n Copy-Item c:\database_files"
Copy-Item -Path "C:\database\*" -Destination "C:\database_files"

Write-Verbose "`n finished"
