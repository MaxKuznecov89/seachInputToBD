<?php
function getResults($inputVal){
    $resArr = [];

    if(!$inputVal){
        return $resArr;
    }

    $host = '127.0.0.1';
    $username = 'root';
    $pass = 'root';
    $dbname = 'ishop';
    $port = 3306;
    $requestStr =$inputVal;

    $querySql = "SELECT title FROM category WHERE title LIKE '$requestStr%'";

    $mysqli = new mysqli($host, $username, $pass, $dbname,$port);

    if(!$mysqli){
        return $resArr;
    }

    $resSql = $mysqli->query($querySql);
    if(!$resSql){
        return $resArr;
    }

    $resSql = $resSql->fetch_all();
    $mysqli->close();

    foreach($resSql as $itemArr){
        $resArr[] = mb_strtolower($itemArr[0],'UTF-8');
    }

    sort($resArr);


    return $resArr;
}


echo(json_encode(getResults($_POST['inpValue'])));



function debug($arr, $die = false){
    echo "<pre>" . print_r($arr,true) . "</pre>";
    if($die){
        die("смертельный дебугер!");
    }
}