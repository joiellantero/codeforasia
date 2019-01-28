<?php
session_start();
ob_start();
define('database_auth',true);
require_once "vendor/autoload.php";
require_once "db.php";

    $sessionProvider = new EasyCSRF\NativeSessionProvider();
    $easyCSRF = new EasyCSRF\EasyCSRF($sessionProvider);
    $token = $easyCSRF->generate('$2a$12$33DzvIrK0DBYROolEDJV2e/kgCR4Y/a2.eCmlwgJh7SSLiyUHFataJDJhJDEyJDMzRHp2SXJLMERCWVJPb2xFREpWMmUva2dDUjRZL2EyLmVDbWx3Z0HX6-SEyFj\'`nXkt$l5VUhGYXRh0438dc6d62dbc0aa5f7ed9b0c5b7edf0');

    if(isset($_POST['date']))
    {
        $date = $_POST['date'];
        $date = mysqli_real_escape_string($con,$date);
    }
    else
    {
        header('Location:dashboard.php?message=Try again later');
    }

    if(isset($_POST['time']))
    {
        $time = $_POST['time'];
        $time = mysqli_real_escape_string($con,$time);
    }
    else
    {
        header('Location:dashboard.php?message=Try again later');
    }

    if(isset($_POST['userid']))
    {
    $userid = $_POST['userid'];
    $userid = mysqli_real_escape_string($con,$userid);
    }
    else
    {
        header('Location:dashboard.php?message=Try again later');
    }


    $sql = "INSERT INTO users_appoint (`user_id`,`date`,`time`) VALUE('{$userid}','{$date}','{$time}')";
    $sql_1 = "UPDATE users SET `appointment_set` = 1 WHERE `user_id` = {$userid}";
    $mysql_query = mysqli_query($con,$sql);
    $mysql_query_1 = mysqli_query($con,$sql_1);


    if($mysql_query)
    {
        if($mysql_query_1)
        {
            $_SESSION['token'] = $token;
            header("Location:dashboard.php?status=ok&token=$token");
        }
        else
        {
            echo "Error in SQL1" . mysqli_error($con);
        }
    }
    else
    {
        echo "Error in sql" . mysqli_error($con);
    }
    ob_end_flush();
?>
