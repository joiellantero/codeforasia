<?php
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
function send_telegram_message($username,$chatid,$message)
{
    $token = "651223940:AAHOYwwMHs45EoPvGyKOkAdxWc6iAol8pQs";
    $request_parameters = [
        'chat_id'=>$chatid,
        'text'=>$message
    ];
    $request_url = "https://api.telegram.org/bot" . $token . "/sendMessage?" . http_build_query($request_parameters);
    file_get_contents($request_url);
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
function get_author_picture($username)
{
    $user_picture_url = "https://ui-avatars.com/api/?size=128&name=$username&background=ffffff";
    return $user_picture_url;
}
function delete_appointment($user_id)
{
    global $con;

    $delete_query = "DELETE from `users_appoint` where `user_id` = '{$user_id}'";
    $delete_query = mysqli_query($con,$delete_query);

    if(!$delete_query)
    {
        echo "Error : " . mysqli_error($con);
    }

    $update_query = "UPDATE `users` set `appointment_set` = 0 where `user_id`={$user_id};";
    $update_query = mysqli_query($con,$update_query);


    if(!$update_query)
    {
        echo "Error : " . mysqli_error($con);
    }

    $reset_user_id = "SET @num := 0;UPDATE `users_appoint` SET `user_id` = @num := (@num+1);ALTER TABLE `users_appoint` AUTO_INCREMENT = 1;";
    $reset_user_id_query = mysqli_multi_query($con,$reset_user_id);
}
?>