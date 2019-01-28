<?php
session_start();
ob_start();
define('database_auth',true);
require_once "../db.php";
require_once "../fun.php";

if(isset($_SESSION['userid']))
{
    $userid = $_SESSION['userid'];
}
else
{
   if(isset($_GET['user_id']))
   {
       $userid = $_GET['user_id'];
   }
   else
   {
       die("Error");
   }
}

if(isset($_GET['id']))
{
    $telegram_chatid = $_GET['id'];
}
if(isset($_GET['first_name']))
{
    $first_name = $_GET['first_name'];
}
if(isset($_GET['last_name']))
{
    $last_name = $_GET['last_name'];
}
if($_GET['username'])
{
    $username = $_GET['username'];
}
if($_GET['photo_url'])
{
    $photo_url = $_GET['photo_url'];
}
if($_GET['auth_date'])
{
    $auth_date = $_GET['auth_date'];
}

$sql = "INSERT INTO users_telegram (`user_id`,`telegram_user_id`,`telegram_first_name`,`telegram_last_name`,`telegram_username`,`telegram_photo_url`,`telegram_auth_date`) VALUE('{$userid}','{$telegram_chatid}','{$first_name}','{$last_name}','{$username}','{$photo_url}','{$auth_date}')";
$mysql_query = mysqli_query($con,$sql);

$user_appt_query = "SELECT * from users_appoint where `user_id` = {$userid}";
$user_appt_result = mysqli_fetch_assoc(mysqli_query($con,$user_appt_query));
$appt_date = $user_appt_result['date'];
$appt_time = $user_appt_result['time'];
send_message($username,$telegram_chatid,"Welcome to EDvengers $username I'll send to you notification before $appt_time with 1 minute on $appt_date");

ob_end_flush();
?>