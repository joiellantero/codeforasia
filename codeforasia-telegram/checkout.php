<?php
define('database_auth',true);
require_once "db.php";
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <title>Code for Asia - Demo</title>

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
    <!-- Custom styles for this template -->
</head>
<body class="bg-light">
<div class="container">
    <div class="py-5 text-center">
        <h2>Course Checkout</h2>
    </div>

    <div class="row">
        <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Personal Information</h4>
            <form method = "get" action = "form-action.php">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="username">Username  <span class="text-muted">(Telegram Username)</span></label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input type="text" class="form-control" id="username" placeholder="Username" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" class="form-control" name="password" id="email" placeholder="you@example.com">
                </div>

                <div class="mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="your password">
                </div>


                <div class="mb-3">
                    <label for="confirmpassword">Confirm Password</label>
                    <input type="password" class="form-control" name="confirmpassword" id="confirmpassword" placeholder="your password">
                </div>

                <hr class="mb-4">
                <h4 class="mb-3">Course Selection</h4>

                <div class="d-block my-3">
                    <?php


                    $mysql_query = "SELECT * from courses";
                    $query = mysqli_query($con,$mysql_query);
                    while($assoc = mysqli_fetch_assoc($query))
                    {

                        ?>

                        <div class="custom-control custom-radio">
                            <input name="course" type="radio" id = "<?php echo $assoc['course_id'];?>" class="custom-control-input" checked required>
                            <label class="custom-control-label" for="<?php echo $assoc['course_id'];?>"><?php echo $assoc['course_name'];?></label>
                        </div>

                    <?php

                    }


                    ?>
                </div>
                <hr class="mb-4">
                <input class="btn btn-primary btn-lg btn-block" type="submit">
            </form>
        </div>
    </div>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; <?php echo date("Y");?> Code for Asia</p>
    </footer>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script></html>
