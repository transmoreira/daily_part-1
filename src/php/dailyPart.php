<?php

date_default_timezone_set('America/Sao_Paulo');

var_dump($_ENV);

if($_SERVER['REQUEST_METHOD'] == 'GET'){

    //echo time();
    
    $stringDailyPart = file_get_contents("dailyPart.json");

    echo $stringDailyPart;

}elseif($_SERVER["REQUEST_METHOD"] == "POST"){
    //$data = $_POST["data"];
    //var_dump($_SERVER);
    //echo $data;
}

?>