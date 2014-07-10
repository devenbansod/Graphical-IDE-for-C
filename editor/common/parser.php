<?php

	if ($_REQUEST['diagramId']) {
		$c_file = fopen("test.c", "w");
		$diagramId = $_REQUEST['diagramId'];
		$dia_file = fopen("../data/diagrams/" . $diagramId . ".dmo", "r");
		$file_contents = fread($dia_file, filesize("../data/diagrams/" . $diagramId . ".dmo"));
		$decoded = json_decode($file_contents);
		$figures = $decoded->s->figures; //Figures Object array
		$connectors = $decoded->m->connectors; //Connectors Object Array
		$xf = array();
		$yf = array();
		$xc1 = array();
		$yc1 = array();
		$xc2 = array();
		$yc2 = array();
		$figures_done = array();
		$curr_traversed = - 1;
		for ($i = 0; $i <= sizeof($figures); $i++) {
			$figures_done[$i] = 0;
		}
	}

	else {
		echo "No Diagram Found";
	}

start_run();

function start_run()
{
	global $figures,$connectors;
	parse_json($figures, $connectors, $figures[0]); // First Call, Parameters - > Figures Obj Array, Connectors Obj Array and START block
	end_the_file();
	// compile_and_run();
}

function end_the_file()
{
	global $figures,$connectors;
	$c_file = fopen("test.c", "a");
	fwrite($c_file, "\n\nreturn 0; \n\n\n}");
	fclose($c_file);
}

function parse_json($figures, $connectors, $current)
{
	global $figures,$connectors;
	$yf = array();
	$xf = array();
	global $figures_done;
	global $curr_traversed;

	// Store Current's all points' Xs and Ys

	if ($current->primitives[1]->str == 'Start') {
		for ($m = 0; $m <= $curr_traversed; $m++) {
			if ($figures_done[$m] == $current->id) {
				return;
			}
		}

		$curr_traversed++;
		$figures_done[$curr_traversed] = $current->id;
		$c_file = fopen("test.c", "a");
		fwrite($c_file, "#include <stdio.h>\nint main() { \n\n");
		fclose($c_file);
		$next_fig = find_next_y($figures, $connectors, $current);
		parse_json($figures, $connectors, $next_fig);
	}
	elseif ($current->primitives[1]->str == 'End') {

		$curr_traversed++;
		$figures_done[$curr_traversed] = $current->id;

		return;
	}
	elseif ($current->name == 'Diamond') {
		// echo "<br />" . $curr_traversed . "<br />";
		for ($m = 0; $m <= $curr_traversed; $m++) {
			if ($figures_done[$m] == $current->id) {
				$c_file = fopen("test.c", "a");
				fwrite($c_file, "goto: l" . $current->id);
				fclose($c_file);
				return;
			}
		}

		$curr_traversed++;
		$figures_done[$curr_traversed] = $current->id;
		$c_file = fopen("test.c", "a");
		fwrite($c_file, "l" . $current->id . ": if ( " . $current->primitives[1]->str . " ) { \n\n");
		fclose($c_file);
		for ($i = 0; $i < sizeof($current->primitives[0]->points); $i++) {
			$xf[$i] = $current->primitives[0]->points[$i]->x;

			// echo $xf[$i]."<br />";

			$yf[$i] = $current->primitives[0]->points[$i]->y;

			// echo $yf[$i]."<br />";

		}

		$i = 0;

		// Find a Connector from Connectors Object Array such that Cuurent's Maximum Y Coordinate is Equal to its Start Point

		foreach($connectors as $conn) {
			if ($conn->turningPoints[0]->x == max($xf) || ($conn->turningPoints[0]->x > max($xf) - 10 && $conn->turningPoints[0]->x < max($xf) + 10)) {
				break;
			}

			$i = $i + 1;
		}

		$conn_yes = $connectors[$i]; //Get the Reqd Connector
		$j = 0; //J is the index of the Next figure in Figures Array
		foreach($figures as $fig) {
			for ($i = 0; $i < sizeof($fig->primitives[0]->points); $i++) {
				$xf[$i] = $fig->primitives[0]->points[$i]->x;
				$yf[$i] = $fig->primitives[0]->points[$i]->y;
			}

			if ((max($xf) + min($xf)) / 2 == $conn_yes->turningPoints[1]->x || (((max($xf) + min($xf)) / 2 < $conn_yes->turningPoints[1]->x + 10) && ((max($xf) + min($xf)) / 2 > $conn_yes->turningPoints[1]->x - 10))) {
				break;
			}

			$j = $j + 1;
		}

		$next_fig = $figures[$j];
		parse_json($figures, $connectors, $next_fig);
		$i = 0;

		// Now For NO

		$c_file = fopen("test.c", "a");
		fwrite($c_file, "\n } \n" . "else { \n");
		fclose($c_file);
		for ($i = 0; $i < sizeof($current->primitives[0]->points); $i++) {
			$xf[$i] = $current->primitives[0]->points[$i]->x;
			// echo "X :: " . $xf[$i] . "<br />";
			$yf[$i] = $current->primitives[0]->points[$i]->y;

			// echo $yf[$i]."<br />";

		}

		// echo min($xf);
		$i = 0;
		foreach($connectors as $conn) {
			if ($conn->turningPoints[0]->x == min($xf) || ($conn->turningPoints[0]->x > min($xf) - 10 && $conn->turningPoints[0]->x < min($xf) + 10)) {
				break;
			}

			// echo $i;
			$i = $i + 1;
		}

		// echo $i;
		$conn_yes = $connectors[$i]; //Get the Reqd Connector
		$j = 0; //J is the index of the Next figure in Figures Array
		foreach($figures as $fig) {
			for ($i = 0; $i < sizeof($fig->primitives[0]->points); $i++) {
				$xf[$i] = $fig->primitives[0]->points[$i]->x;
				$yf[$i] = $fig->primitives[0]->points[$i]->y;
			}

			if ((max($xf) + min($xf)) / 2 == $conn_yes->turningPoints[1]->x || (((max($xf) + min($xf)) / 2 < $conn_yes->turningPoints[1]->x + 10) && ((max($xf) + min($xf)) / 2 > $conn_yes->turningPoints[1]->x - 10))) {
				break;
			}

			$j = $j + 1;
		}

		$next_fig_no = $figures[$j];
		parse_json($figures, $connectors, $next_fig_no);
		return;
	}
	elseif ($current->name == 'Rectangle') {
		for ($m = 0; $m < $curr_traversed; $m++) {
			if ($figures_done[$m] == $current->id) {
				$c_file = fopen("test.c", "a");
				fwrite($c_file, "goto: l" . $current->id);
				fclose($c_file);
				return;
			}
		}

		$curr_traversed++;
		$figures_done[$curr_traversed] = $current->id;
		$block_content = $current->primitives[1]->str;
		$c_file = fopen("test.c", "a");
		fwrite($c_file, "l" . $current->id . " : " . $block_content . " ; \n"); //Need to check the Semi Colon
		fclose($c_file);
		$curr_traversed++;
		$figures_done['curr_traversed'] = $current->id;
		$next_fig = find_next_y($figures, $connectors, $current);
		parse_json($figures, $connectors, $next_fig);
		return;
	}
	else {

		// Fatal Error

	}
}

function find_next_y($figures, $connectors, $current)
{ //Returns the Next Figure by Y

	global $figures,$connectors;
	for ($i = 0; $i < sizeof($current->primitives[0]->points); $i++) {
		$xf[$i] = $current->primitives[0]->points[$i]->x;

		// echo $xf[$i]."<br />";

		$yf[$i] = $current->primitives[0]->points[$i]->y;

		// echo $yf[$i]."<br />";

	}

	$i = 0;

	// Find a Connector from Connectors Object Array such that Cuurent's Maximum Y Coordinate is Equal to its Start Point

	foreach($connectors as $conn) {
		if ($conn->turningPoints[0]->y == max($yf) || ($conn->turningPoints[0]->y > max($yf) - 10 && $conn->turningPoints[0]->y < max($yf) + 10)) {
			break;
		}

		$i = $i + 1;
	}

	$conn_no = $connectors[$i]; //Get the Reqd Connector
	$j = 0; //J is the index of the Next figure in Figures Array
	foreach($figures as $fig) {
		for ($i = 0; $i < sizeof($fig->primitives[0]->points); $i++) {
			$xf[$i] = $fig->primitives[0]->points[$i]->x;
			$yf[$i] = $fig->primitives[0]->points[$i]->y;
		}

		if ((min($yf) == $conn_no->turningPoints[1]->y || ((min($yf) > $conn_no->turningPoints[1]->y - 10) && (min($yf) < $conn_no->turningPoints[1]->y + 10))) || (max($yf) == $conn_no->turningPoints[1]->y || ((max($yf) < $conn_no->turningPoints[1]->y + 10) && (max($yf) > $conn_no->turningPoints[1]->y - 10)))) {
			break;
		}

		$j = $j + 1;
	}

	return $figures[$j];
}

// ****NOTE : Works only on LINUX DISTRIBUTIONS****

function compile_and_run()
{
	global $figures,$connectors;
	system("chmod 777 " . "test.c");
	passthru("gcc -Wall -o deven " . $c_file . " 2>&1");
	system("chmod 777 deven");

	// echo shell_exec("sh dev.sh");

	echo shell_exec(".deven");

	// unlink("deven");
	// unlink($c_file);

}

?>