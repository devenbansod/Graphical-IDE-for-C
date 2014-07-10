<?php
	

	function start_run() {

		if (isset($_REQUEST['diagramId'])) { 

			$c_file = fopen("test.c", "w");	

			$diagramId = $_REQUEST['diagramId'];

			$dia_file = fopen("diagrams/". $diagramId . ".dmo", "r");

			$file_contents = fread ( $dia_file,filesize ("diagrams/". $diagramId . ".dmo" ) );

			$decoded = json_decode ( $file_contents );

			$figures = $decoded->s->figures;  //Figures Object array

			$connectors = $decoded->m->connectors; //Connectors Object Array


			$xf = array();
			$yf = array();
			$xc1 = array();
			$yc1 = array();
			$xc2 = array();
			$yc2 = array();

			parse_json ( $figures, $connectors ,  $figures[0] ); // First Call, Parameters - > Figures Obj Array, Connectors Obj Array and START block
			fclose( $c_file );

			compile_and_run( $c_file );
		}	
		else{
			echo "No diagram found";
			exit();
		}
	}	


function parse_json ( $figures, $connectors , $current ) {

	global $c_file;
	//For Storing Xs and Xs of all points of Current
	$yf = array(); 
	$xf = array();

	if ( $current->primitives[1]->str == 'Start' ) {

		$c_file = fopen("test.c", "a");
		fwrite($c_file, "#include <stdio.h>\nint main() { \n\n ");
		fclose($c_file);

	}

	//Base Case
	elseif ($current->primitives[1]->str == 'End') {

		$c_file = fopen("test.c", "a");
		fwrite($c_file, "\nreturn 0;\n\n}");
		fclose($c_file);

		return ;

	}

	else {

		$block_content =  $current->primitives[1]->str;
		
		if ( strpos( $block_content, "IF" ) || strpos( $block_content, "DO" ) || strpos( $block_content, "WHILE" ) || strpos( $block_content, "FOR" ) ) {
			echo "IF SPOTTED";
		}


		//Else if the Block are normal statements
		else {

			$c_file = fopen("test.c", "a");
			fwrite($c_file, trim($block_content));
			fclose($c_file);
			// sleep(1);	
		}


	}


	//Following Code to traverse the Canvas in Y direction


	for( $i = 0; $i < sizeof($current->primitives[0]->points) ; $i++) {
				
		$xf[$i] = $current->primitives[0]->points[$i]->x;
		$yf[$i] = $current->primitives[0]->points[$i]->y;
			
	}

	$i = 0; 
	

	//Find a Connector from Connectors Object Array such that Cuurent's Maximum Y Coordinate is Equal to its Start Point 
	foreach ($connectors as $conn ) {

		 	if ( $conn->turningPoints[0]->y == max($yf) || ( $conn->turningPoints[0]->y > max($yf) - 10 && $conn->turningPoints[0]->y < max($yf) + 10 )) {

		 		break;

		 	}

		$i = $i + 1;

	}

	$j = 0 ;
		echo $i;

	$conn_reqd = $connectors[$i]; //Get the Reqd Connector

	//Find a Figure from Figures Object Array such that Conn_reqd's Endpoint Y Coordinate is Equal to Figure's Minimum Y coordinate 
	foreach ($figures as $fig ) {
	
		for( $i = 0; $i < sizeof( $fig->primitives[0]->points) ; $i++) {
			
			$xf[$i] = $fig->primitives[0]->points[$i]->x;
			$yf[$i] = $fig->primitives[0]->points[$i]->y;
		
		}

	 	if ( min($yf) == $conn_reqd->turningPoints[1]->y || ( ( min($yf) > $conn_reqd->turningPoints[1]->y - 10 ) && ( min($yf) < $conn_reqd->turningPoints[1]->y + 10 ))) {

	 		break;

	 	}

		$j = $j + 1;
	}

	$next = $figures[$j]; //Get the Next Figure to evalutate

	parse_json( $figures, $connectors, $next); //Recursive Call

}


// ****NOTE : Works only on LINUX DISTRIBUTIONS****

function compile_and_run ( $c_file ) {

	system("chmod 777 " . $c_file );
	passthru("gcc -Wall -o deven " . $c_file . " 2>&1");
	system("chmod 777 deven");
	// echo shell_exec("sh dev.sh");
	echo shell_exec(".deven");
	unlink("deven");
	unlink($c_file);

}
	
?>
