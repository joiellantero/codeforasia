<?php
session_start();
ob_start();
if($_SESSION['logged_in'] === true)
{
    define('database_auth',true);
    require_once "db.php";
    require_once "fun.php";
    $username = $_SESSION['username'];
    $sql = "SELECT * from users where `username` = '{$username}'";
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
?>
    <html lang="en">

    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>Welcome @<?php echo $username;?></title>

        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <!-- Custom fonts for this template -->
        <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet">
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="css/resume.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

    </head>


    <body id="page-top">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
        <a class="navbar-brand js-scroll-trigger" href="">
            <span class="d-block d-lg-none">Welcome @<?php echo $username;?></span>
            <span class="d-none d-lg-block">
          <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="<?php echo get_author_picture($username)?>" alt="Picture">
        </span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

        </div>
    </nav>

    <div class="container-fluid p-0">

        <section class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
            <div class="my-auto">
                <span class="text-primary">Welcome @<?php echo $username;?></span>
                <p class="lead mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>



            <?php
                if($appoint_set == 0)
                {
                    ?>
                    <p class="lead mb-5">Please schedule your appointment below</p>
                    <form method="post" action="appointment-confirm.php">
                        <p>Select your date</p>
                        <input type='text' id="datepicker" name="date">

                        <p>Select your time</p>
                        <input type="text" id="timepicker" name="time">
                        <input type="hidden" name="userid" value="<?php echo $user_id; ?>">
                        <input type="submit">

                    </form>
                    <?php
                }
                else if($appoint_set == 1)
                    {
                    $user_appt_query = "SELECT * from users_appoint where `user_id` = {$user_id}";
                    $user_appt_result = mysqli_fetch_assoc(mysqli_query($con, $user_appt_query));
                    $appt_date = $user_appt_result['date'];
                    $appt_time = $user_appt_result['time'];
                    $_SESSION['userid'] = $user_id;
                    ?>
                    <p class="lead mb-5">Appointment Set on <?php echo $appt_date ?> at <?php echo $appt_time ?></p>
                    <?php
                    if ($telegram_flag == 0)
                    {
                    ?>


                    <script async src="https://telegram.org/js/telegram-widget.js?5" data-telegram-login="edvengersbot"
                            data-size="large"
                            data-auth-url="https://1a3664f0.ngrok.io/personal/codeforasia-demo/telegram-bot/send-message.php?<?php echo "user_id=" . $user_id ?>"
                            data-request-access="write"></script>

                    <?php
                }
                }
                ?>
            </div>
        </section>


    </div>

    <!-- Bootstrap core JavaScript -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>


    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for this template -->
    <script src="js/resume.min.js"></script>

    <script>

       flatpickr("#datepicker",{
           enableTime:false,
           dateFormat:"d/m/Y",
           minDate:"today",
           maxDate: new Date().fp_incr(7) // 14 days from now,
       });


        flatpickr("#timepicker",{
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
        })
    </script>

    </body>
    </html>
<?php
}
else
{
    header('Location:login.php');
}
ob_end_flush();
?>