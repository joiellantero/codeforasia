<?php
define('database_auth',true);
require_once "db.php";
require_once "fun.php";
date_default_timezone_set("Asia/Kuala_Lumpur");
$date_now = date("d/m/Y");
$time_now = date("H:i");
$sql = "SELECT * from `users_appoint` where `date` = '{$date_now}' and `time` = '{$time_now}'";
$mysql_query = mysqli_query($con,$sql);
if(!$mysql_query)
{
    echo mysqli_error($con);
}
if($mysql_query->num_rows > 0)
{
    while($assoc = mysqli_fetch_assoc($mysql_query))
    {
        $user_id = $assoc['user_id'];
    }
    $sql = "SELECT * from users where `user_id` = '{$user_id}'";
    $query = mysqli_query($con,$sql);
    while($assoc = mysqli_fetch_assoc($query))
    {
        $user_id = $assoc['user_id'];
        $firstname = $assoc['firstname'];
        $lastname = $assoc['lastname'];
        $email = $assoc['email'];
        $username = $assoc['username'];
        $course_id = $assoc['course_id'];
        $appoint_set = $assoc['appointment_set'];
        $telegram_flag = $assoc['telegram_set'];
    }
    $sql_2 = "SELECT * from `users_telegram` where `user_id` = '{$user_id}'";
    $query_2 = mysqli_query($con,$sql_2);
    while($assoc = mysqli_fetch_assoc($query_2))
    {
        $user_id = $assoc['user_id'];
        $telegram_user_id = $assoc['telegram_user_id'];
        $telegram_firstname = $assoc['telegram_first_name'];
        $telegram_lastname = $assoc['telegram_last_name'];
        $telegram_username = $assoc['telegram_username'];
    }
    send_telegram_message($telegram_username,$telegram_user_id,"Hello $firstname your appointment is now so check your email");
    delete_appointment($user_id);
}
else
{
    echo "It's not yet";
}

?>