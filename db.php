<?php
$host = 'localhost';
$user = 'bookandb_pkbehera';
$pass = 'Pkbehera12';
$db   = 'bookandb_calender';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
