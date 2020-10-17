<?php
//error_reporting(0);
/*$hostname		=	"localhost";
$username		=	"root";
$password	    =	"";
$database		=	"howmatch_new";*/

$hostname		=	"localhost";
$username		=	"facilejo_master";
$password	    =	",YzU,6q6{QPR";
$database		=	"facilejo_master";

global $db;
$db = mysqli_connect($hostname, $username, $password, $database) or die("not Server not connected");