<?php
header("Access-Control-Allow-Origin: *");

$fullname=$_POST['fullname'];
$amount=$_POST['sum'];
$email=$_POST['email'];
$tel=$_POST['tel'];

//DB ON MTA ENV
$host        = "host = 192.168.210.172";
$port        = "port = 5432";
$dbname      = "dbname = postgres";
$credentials = "user = postgres password=postgres";

$db = pg_connect("$host $port $dbname $credentials");
if(!$db) {
    echo "לא ניתן לגשת לדאטאבייס\n";
} else {
    echo "";
}

$sql="INSERT INTO project_mta.donations(fullname,amount,email,tel) VALUES ('$fullname','$amount','$email','$tel')";

if($result = pg_query($sql)){
    echo "הפרטים התקבלו - ניצור קשר בהקדם";
}
else{
    echo "תקלה בהכנסת הפרטים";
}
?>
