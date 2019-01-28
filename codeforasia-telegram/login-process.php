<?php
    session_start();
    ob_start();
    define('database_auth',true);
    require_once "db.php";
    if(isset($_POST['email']))
    {
        $email = $_POST['email'];
        $sql = "SELECT * from users where `email` = '{$email}'";
        $query = mysqli_query($con,$sql);
        if(!$query)
        {
            echo mysqli_error($con);
            die("Username/Password isn't correct");
            $_SESSION['logged_in'] = false;
        }
        else
        {
            while($assoc = mysqli_fetch_assoc($query))
            {
                $firstname = $assoc['firstname'];
                $lastname = $assoc['lastname'];
                $email = $assoc['email'];
                $username = $assoc['username'];
                $course_id = $assoc['course_id'];
            }
            $_SESSION['logged_in'] = true;
            $_SESSION['email'] = $email;
            $_SESSION['username'] = $username;
            header('Location:dashboard.php');
        }
    }
    else
    {
        $_SESSION['logged_in'] = false;
        die ("This user doesn't exists");
    }
    ob_end_flush();
?>