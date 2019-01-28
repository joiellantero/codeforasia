<?php
define('database_auth',true);
require_once "../db.php";
function send_message($username,$chatid,$message)
{
    $token = "651223940:AAHOYwwMHs45EoPvGyKOkAdxWc6iAol8pQs";
    $request_parameters = [
        'chat_id'=>$chatid,
        'text'=>$message
    ];
    $request_url = "https://api.telegram.org/bot" . $token . "/sendMessage?" . http_build_query($request_parameters);
    file_get_contents($request_url);
    update_telegram();
}
function update_telegram()
{
    global $con;
    $sql = "UPDATE users SET `telegram_set` = 1";
    $mysql_query = mysqli_query($con,$sql);
    if($mysql_query)
    {
        echo "<script>window.history.pushState({page: \"dashboard\"}, \"dashboard\", \"dashboard.php\");</script>";
        header('Location:https://1a3664f0.ngrok.io/personal/codeforasia-demo/dashboard.php');
    }
}
?>