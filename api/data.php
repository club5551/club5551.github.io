<?php 

$sever_name = 'localhost' ;
$DBusername = 'mcvtutest';
$DBpassword = 'Runner111402';
$DBname = 'mcvtutest_main';

$conn = mysqli_connect($sever_name,$DBusername,$DBpassword,$DBname);
if (!$conn){
    die('Connection failed: '.mysqli_connect_error());
}


?>