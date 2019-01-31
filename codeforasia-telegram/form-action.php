<?php
    session_start();
    ob_start();


    if(isset($_POST['token']))
    {
        $token = $_POST['token'];
    }
    else
    {
        die('Not Authorized');
    }

    if($_POST['token'] === $_SESSION['auth_token'])
    {
        define('database_auth',true);
        require_once "db.php";
        require_once "fun.php";
        if(isset($_POST['firstname'])){$firstname = $_POST['firstname'];mysqli_real_escape_string($con,$firstname);};
        if(isset($_POST['lastname'])){$lastname = $_POST['lastname'];mysqli_real_escape_string($con,$lastname);};
        if(isset($_POST['username'])){$username = $_POST['username'];mysqli_real_escape_string($con,$username);};
        if(isset($_POST['email'])){$email = $_POST['email'];mysqli_real_escape_string($con,$email);};
        if(isset($_POST['password'])){$password = $_POST['password'];mysqli_real_escape_string($con,$password);};
        if(isset($_POST['course'])){$course = $_POST['course'];mysqli_real_escape_string($con,$course);};

        if(check_email($email) === "new")
        {
            $sql = "INSERT INTO users (`firstname`,`lastname`,`email`,`username`,`course_id`) VALUE('{$firstname}','{$lastname}','{$email}','{$username}','{$course}')";
            $mysql_query = mysqli_query($con, $sql);

            if ($mysql_query) {
                $_SESSION['logged_in'] = true;
                $_SESSION['email'] = $email;
                $_SESSION['username'] = $username;
                header('Location:dashboard.php');
            }
        }
        else if(check_email($email) == "found")
        {
            header('Location:form.php?msg=This email already exists try logging in instead');
        }
    }
    else
    {
        header('Location:form.php?msg=Not Authorized');
        //die("Not Authorized");
    }
ob_end_flush();
?>
