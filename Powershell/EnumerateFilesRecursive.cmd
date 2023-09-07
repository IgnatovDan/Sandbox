for i in /sources/test/*.sql; do
    echo '$i is started'
    res=$(/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'sapwd' -i $i -b)
    exit_code=$?
    if [ $xit_code -eq 0 ]; then
        echo "$i completed: $res"
    else
        echo "$i failed: $res"
        exit 1
    fi
done
