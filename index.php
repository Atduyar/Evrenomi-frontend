<?php
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    // print_r($x);
    if (count($x) > 2){
        $y = __DIR__ . '/' . $x[1] . '.html';
        require $y;
        echo '<script type="text/javascript">',
             'setParam("' . $x[2] . '");',
             '</script>';
    }
    elseif(strpos($x[1], '.xml') !== false){
        $y = __DIR__ . '/' . $x[1] ;
    }
    elseif(count($x) > 1 and $x[1] != ''){
        $y = __DIR__ . '/' . $x[1] . '.html';
        require $y;
    }else {
        $y = __DIR__ . '/blogs.html';
        require $y;
    }
?>