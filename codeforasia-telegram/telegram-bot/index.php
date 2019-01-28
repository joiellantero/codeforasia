<?php

$token = "651223940:AAHOYwwMHs45EoPvGyKOkAdxWc6iAol8pQs";

$update = json_decode(file_get_contents('php://input') ,true);



$chatID = $update['message']['chat']['id'];
$firstName = $update['message']['chat']['first_name'];
$lastName = $update['message']['chat']['last_name'];
$username = $update['message']['chat']['username'];
$message = $update['message']['text'];

$msg = "Hello $username I just echo back your message $message";

$request_parameters = [
    'chat_id'=>$chatID,
    'text'=>$msg
];

$request_url = "https://api.telegram.org/bot" . $token . "/sendMessage?" . http_build_query($request_parameters);
file_get_contents($request_url);


?>