<?php
/**
 * Created by PhpStorm.
 * User: gento
 * Date: 16/5/2015
 * Time: 2:14 PM
 */?>


<html>
<head>
    <?= $head ?>
</head>
<body ng-app="tinhthue">
<header style="max-height:10%">
    <div class="top-nav">
        <?= $header ?>
    </div>
<!--    <ul class="side-nav fixed">--><?//= $navigation ?><!--</ul>-->
</header>

<main style="max-height:80%">
    <?= $content ?>
    <?= $footer ?>
</main>
</body>
</html>



