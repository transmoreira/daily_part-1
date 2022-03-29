<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    var_dump($_POST);
    $id = $_POST['id'];

    $date = $_POST['date'];
    $version = $_POST['version'];
    
    require_once('./connection/connect.php');
    
    $sqlLoad = "select journey from time_table where id = '"+$id+"'";
    
    $dados = mysqli_query($conn, $sqlLoad);
    $rows = array();
    
    if(sizeof($rows) > 0){
        while ($r = mysqli_fetch_assoc($dados)) {
            $rows[] = $r;
        }
        echo json_encode($rows);
    }else{
        $sql = "INSERT INTO time_table(holiday, id, journey, date, version)"
            . " VALUES ('$holiday', '$id', '$journey', '$date', '$version')";
    
        /*if(mysqli_query($conn, $sql)){
            $result["success"] = "1";
            $result["message"] = "Cadastro realizado com sucesso!";
        }else{
            $result["success"] = "0";
            $result["message"] = $sql;
        }
    
        echo json_encode($result);*/
        echo json_encode($sql);
    }
    
    mysqli_close($conn);

    echo json_encode($sqlLoad);

}

$sqlLoad = "select * from time_table where id = '4HdPCRI9lAWdCQVkfU5KYRikJUZ2_02-05-2020'";
    
    $dados = mysqli_query($conn, $sql);
    $rows = array();
    
    while ($r = mysqli_fetch_assoc($dados)) {
        echo $r;
        $rows[] = $r;
    }

    echo $rows;
    mysqli_close($conn);
?>


