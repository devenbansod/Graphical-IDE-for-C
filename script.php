<?php 
  $code = $_POST["code"];
  
  if ($code == "")                // if user id is blank
    echo "***You must not leave it blank***";
    
  else{                              // if code anything else
      $file = fopen("test.c", "w") or die("Unable to Open File");
      system("chmod 777 test.c");
      fwrite($file, $code) or die("Unable to Write the File");
      passthru("gcc test.c 2>&1");
      system("chmod 777 a.out");
      echo "\n";
	set_time_limit(1);
      system("./a.out 2>&1");
      unlink("a.out");
      unlink("test.c");    
  }
 ?>
