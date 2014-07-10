<?php

//Check if already installed
if (!file_exists(dirname(__FILE__) . '/editor/data/diagramo.db') ) { //no settings file
    #print 'Application already installed';
    header("Location: ./install/step1.php");
    exit();
}

// $_SESSION['userId'] = 1;
//End Check installation

header("Location: ./editor/editor.php?diagramId=1");
?>
