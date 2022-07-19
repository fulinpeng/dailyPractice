<?php
    $data = "{name:'flp', age:22}";
    $cb = $_GET['callBack'];
    echo $cb.'('.$data.')';
?>