<?php
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    
    //$personJSON = '{"name":"Johny Carson","title":"CTO"}';
    //$person = json_decode($personJSON);
    //echo $person->name; // Johny Carson

    //print_r($x);
    if (count($x) > 2){
        if($x[1] == "blogView"){
            $y = __DIR__ . '/' . $x[1] . '.html';

            $tmp = explode("-", $x[2]);
            $content = @file_get_contents("https://api.evrenomi.com/api/blogs/getBlogMeta?id=" . end($tmp));
            if($content == false){//true){
                echo '<!DOCTYPE html>',
                     '<html lang="tr">',
                     '<head>',
                     '<meta name="description" content="Evrenomi ile bizimle bilimi keşfedin.">',
                     '<meta property="og:title" content="Evrenomi">',
                     '<meta property="og:description" content="Evrenomi ile bizimle bilimi keşfedin.">',
                     '<meta property="og:image" content="https://api.evrenomi.com/ConstImage/titleBanner.png">',
                     '<meta property="og:site_name" content="Evrenomi">',
                     '<meta name="twitter:title" content="Evrenomi">',
                     '<meta name="twitter:description" content="Evrenomi ile bizimle bilimi keşfedin.">',
                     '<meta name="twitter:image" content="https://api.evrenomi.com/ConstImage/titleBanner.png">',
                     '<meta name="twitter:card" content="https://api.evrenomi.com/ConstImage/titleBanner.png">';
            }
            else{
                //print_r($content);
                $result = json_decode($content);
                //print_r($result);
                $result->blogSummary = htmlentities($result->blogSummary);
                $result->blogTitle = htmlentities($result->blogTitle);
                
                echo '<!DOCTYPE html>',
                     '<html lang="tr">',
                     '<head>',
                     '<meta name="description" content="' . $result->blogSummary . '">',
                     '<meta property="og:title" content="' . $result->blogTitle . '">',
                     '<meta property="og:description" content="' . $result->blogSummary . '">',
                     '<meta property="og:image" content="' . $result->blogTitlePhotoUrl . '">',
                     '<meta property="og:site_name" content="Evrenomi">',
                     '<meta name="twitter:title" content="' . $result->blogTitle . '">',
                     '<meta name="twitter:description" content="' . $result->blogSummary . '">',
                     '<meta name="twitter:image" content="' . $result->blogTitlePhotoUrl . '">',
                     '<meta name="twitter:card" content="' . $result->blogTitlePhotoUrl . '">';
            }

            require $y;
            echo '<script type="text/javascript">',
                 'console.log("blogView");',
                 'setParam("' . $x[2] . '");',
                 '</script>';
        }
        else{
            $y = __DIR__ . '/' . $x[1] . '.html';
            
            echo '<!DOCTYPE html>',
                 '<html lang="tr">',
                 '<head>',
                 '<meta name="description" content="Evrenomi ile bizimle bilimi keşfedin.">',
                 '<meta property="og:title" content="Evrenomi">',
                 '<meta property="og:description" content="Evrenomi ile bizimle bilimi keşfedin.">',
                 '<meta property="og:image" content="https://api.evrenomi.com/ConstImage/titleBanner.png">',
                 '<meta property="og:site_name" content="Evrenomi">',
                 '<meta name="twitter:title" content="Evrenomi">',
                 '<meta name="twitter:description" content="Evrenomi ile bizimle bilimi keşfedin.">',
                 '<meta name="twitter:image" content="https://api.evrenomi.com/ConstImage/titleBanner.png">',
                 '<meta name="twitter:card" content="https://api.evrenomi.com/ConstImage/titleBanner.png">';

            require $y;
            echo '<script type="text/javascript">',
                 'setParam("' . $x[2] . '");',
                 '</script>';
        }
    }
    elseif(strpos($x[1], '.xml') !== false){
        $y = __DIR__ . '/' . $x[1] ;
    }
    elseif(count($x) > 1 and $x[1] != ''){
        echo '<html>',
             '<head>';
        $y = __DIR__ . '/' . $x[1] . '.html';
        require $y;
    }else {
        echo '<!DOCTYPE html>',
             '<html lang="tr">',
             '<head>';
        $y = __DIR__ . '/blogs.html';
        require $y;
    }
?>