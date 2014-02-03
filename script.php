<?php 
  $code = $_POST["code"];
  
  if ($code == "")                // if user id is blank
    echo "***You must not leave it blank***";
    
  else{                              // if code anything else
      $file = fopen("test.c", "w") or die("Unable to Open File");
      system("chmod 777 test.c");
      fwrite($file, $code) or die("Unable to Write the File");
      passthru("gcc -Wall -o deven test.c 2>&1");
      system("chmod 777 deven");
      echo "\n";
      // set_time_limit(1);
      echo shell_exec("sh dev.sh");
      unlink("deven");
      unlink("test.c");    
  }
?>
