<?php

class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('mysqlitedb.db');
    }
}


$sql = new SQLite3('mysqlitedb.db');
print_r( $sql->version());

$sql->close();
?>