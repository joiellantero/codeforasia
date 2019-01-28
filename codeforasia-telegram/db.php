<?php
if(defined('database_auth'))
{
    date_default_timezone_set('Asia/Kuala_Lumpur');
    $db['db_host'] = "localhost";
    $db['db_user'] = 'root';
    $db['db_pass'] = '';
    $db['db_name'] = 'cfa';
    foreach ($db as $key => $value)
    {
        define(strtoupper($key), $value);
    }
    unset($db['db_host']);
    unset($db['db_user']);
    unset($db['db_pass']);
    unset($db['db_name']);
    $con = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
}
else
{
    die('');
}
?>