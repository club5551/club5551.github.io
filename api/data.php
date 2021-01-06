<?php 

$sever_name = 'localhost' ;
$DBusername = 'root';
$DBpassword = '';
$DBname = 'user';

$conn = mysqli_connect($sever_name,$DBusername,$DBpassword,$DBname);
if (!$conn){
    die('Connection failed: '.mysqli_connect_error());
}


?>