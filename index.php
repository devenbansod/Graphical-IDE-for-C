<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!-- saved from url=(0049)http://layout.jquery-dev.net/demos/accordion.html -->

<html style="overflow: hidden; height: 100%; border: none; padding: 0px; margin: 0px;" xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	<meta content="en" name="language" />

	<title>Code In-C-eption Trial</title>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script src="script.js" type="text/javascript"></script>
	<link href="style.css" rel="stylesheet" />
	<script src="jquery-linedtextarea.js"></script>
	<link href="jquery-linedtextarea.css" rel="stylesheet" type="text/css" />
	<link href="./layout_files/layout-default-latest.css" rel="stylesheet" type="text/css" />
	<link href="./layout_files/jquery.ui.all.css" rel="stylesheet" type="text/css" />
	<link href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" /><!-- REQUIRED scripts for layout widget -->
	<link rel="stylesheet" type="text/css" href="construct.css">
</head>

<body class="ui-layout-container" style="zoom: 1; overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
	<div class="ui-layout-north ui-widget-content ui-layout-pane ui-layout-pane-north" style="display: block; position: absolute; margin: 0px; top: 0px; bottom: auto; left: 0px; right: 0px; width: auto; z-index: 0; height: 25px; visibility: visible;">
		<div style="float: right; margin-right: 160px;">
			&nbsp; <button onclick="removeUITheme(); myLayout.resizeAll()">Remove Theme</button>
		</div>Graphical IDE for C : Code In-C-eption

		<div id="themeContainer" style="position: absolute; overflow-x: hidden; top: 12px; right: 5px; z-index: 10;">
			<a class="jquery-ui-themeswitcher-trigger" href="http://layout.jquery-dev.net/demos/accordion.html#" style="font-family: &#39;Trebuchet MS&#39;, Verdana, sans-serif; font-size: 11px; color: rgb(102, 102, 102); background-image: url(http://jqueryui.com/themeroller/themeswitchertool/images/buttonbg.png); background-color: rgb(238, 238, 238); border: 1px solid rgb(204, 204, 204); border-top-left-radius: 6px; border-top-right-radius: 6px; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; text-decoration: none; padding: 3px 3px 3px 8px; width: 139px; display: block; height: 14px; outline: 0px; background-position: 50% 50%; background-repeat: repeat no-repeat;"><span class="jquery-ui-themeswitcher-title">Switch Theme</span></a>
		</div>
	</div>

	<div class="ui-layout-south ui-widget-content ui-state-error ui-layout-pane ui-layout-pane-south" style="display: block; position: absolute; margin: 0px; top: auto; bottom: 0px; left: 0px; right: 0px; width: auto; z-index: 0; height: 18px; visibility: visible;">
		Credits: Nihav, Nirant, Deven, Yash
	</div>

	<div class="ui-layout-center ui-layout-pane ui-layout-pane-center main-workspace" style="display: block; position: absolute; margin: 0px; left: 306px; right: 306px; top: 53px; bottom: 46px; height: 533px; width: 700px; z-index: 0; visibility: visible;">
		<h3 class="ui-widget-header">Graphical Workspace</h3>
		<!-- <div class=""></div> -->
	</div>

	<div class="ui-layout-west ui-layout-pane ui-layout-pane-west" style="display: block; position: absolute; margin: 0px; left: 0px; right: auto; top: 53px; bottom: 46px; height: 533px; z-index: 0; width: 298px; visibility: visible;">
		<div class="basic ui-accordion ui-widget ui-helper-reset" id="accordion1">
			<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons" id="ui-accordion-accordion1-header-0" tabindex="0"><a href="http://layout.jquery-dev.net/demos/accordion.html#">Data Types</a></h3>

			<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" id="ui-accordion-accordion1-panel-0" style="display: block; height: 319.79999923706055px; overflow: auto;">
				<ul>
					<li>
						<div class="varHold varHoldRt hub"></div>
						<div class="varHold varHoldLt hub"></div>
					</li>
				</ul>
			</div>

			<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" id="ui-accordion-accordion1-header-1" tabindex="-1"><a href="http://layout.jquery-dev.net/demos/accordion.html#">Branch Statements</a></h3>

			<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-accordion1-panel-1" style="display: none; height: 319.79999923706055px; overflow: auto;">
				Branching divs go here
			</div>

			<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" id="ui-accordion-accordion1-header-2" tabindex="-1"><a href="http://layout.jquery-dev.net/demos/accordion.html#">Loops</a></h3>

			<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-accordion1-panel-2" style="display: none; height: 319.79999923706055px; overflow: auto;">
				Loop constructs go here
			</div>

			<h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" id="ui-accordion-accordion1-header-3" tabindex="-1"><a href="http://layout.jquery-dev.net/demos/accordion.html#">Most Used Functions</a></h3>

			<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-accordion1-panel-3" style="display: none; height: 319.79999923706055px; overflow: auto;">
				<p>Most frequently used functions such as printf go here.</p>
			</div>
		</div>
	</div>

	<div class="ui-layout-east ui-layout-pane ui-layout-pane-east ui-layout-pane-hover ui-layout-pane-east-hover ui-layout-pane-open-hover ui-layout-pane-east-open-hover" style="display: block; position: absolute; margin: 0px; left: auto; right: 0px; top: 53px; bottom: 46px; height: 533px; z-index: 0; width: 298px; visibility: visible;">
		<h3 class="ui-widget-header">Code and Output</h3>

		<div class="ui-layout-content" style="position: relative; height: 465px; visibility: visible;">
			<!-- <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-accordion2-header-3" aria-controls="ui-accordion-accordion2-panel-3" aria-selected="false" tabindex="-1"> -->
			<!-- <a href="http://layout.jquery-dev.net/demos/accordion.html#">
					Section 4
				</a>
			</h3>
			<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" style="display: none; height: 251.79999923706055px; overflow: auto;" id="ui-accordion-accordion2-panel-3" aria-labelledby="ui-accordion-accordion2-header-3" role="tabpanel" aria-expanded="false" aria-hidden="true">
				<p>
					Cras dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames 
					ac turpis egestas.
				</p>
				<p>
					Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
					Aenean lacinia mauris vel est.
				</p>
				<p>
					Suspendisse eu nisl. Nullam ut libero. Integer dignissim consequat lectus.
					Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
				</p>
			</div>

			 -->

			<form>
				<textarea class="lined" id="code" name="code" onblur="" placeholder="Your code goes here" rows="19"></textarea> <!-- <textarea class = "lined" name ="code" id="code" onblur="" placeholder="Your code goes here" ></textarea> -->
				 <input class="fullwidth" onclick="PostData();" type="button" value="Compile and Run" />

				<p id="waiting"></p>
				<textarea cols="30" id="results" name="results" onblur="" placeholder="Your output will be displayed here" rows="3"></textarea>
			</form>
		</div>

		<h4 class="ui-widget-content ui-state-hover"></h4>
	</div>

	<div style="position: absolute; float: left; font-family: &#39;Trebuchet MS&#39;, Verdana, sans-serif; font-size: 12px; background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); padding: 8px 3px 3px; border-width: 0px 1px 1px; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-right-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; z-index: 999999; width: 144px; display: none; background-position: initial initial; background-repeat: initial initial;">
		<ul style="list-style: none; margin: 0px; padding: 0px; overflow-y: auto; overflow-x: hidden; height: 200px;">
			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-lightness/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="UI Lightness" src="./layout_files/theme_30_ui_light.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="UI Lightness" /> <span class="themeName" style="float: left; margin: 3px 0px;">UI lightness</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-darkness/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="UI Darkness" src="./layout_files/theme_30_ui_dark.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="UI Darkness" /> <span class="themeName" style="float: left; margin: 3px 0px;">UI darkness</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Smoothness" src="./layout_files/theme_30_smoothness.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Smoothness" /> <span class="themeName" style="float: left; margin: 3px 0px;">Smoothness</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Start" src="./layout_files/theme_30_start_menu.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Start" /> <span class="themeName" style="float: left; margin: 3px 0px;">Start</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Redmond" src="./layout_files/theme_30_windoze.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Redmond" /> <span class="themeName" style="float: left; margin: 3px 0px;">Redmond</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/sunny/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Sunny" src="./layout_files/theme_30_sunny.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Sunny" /> <span class="themeName" style="float: left; margin: 3px 0px;">Sunny</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/overcast/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Overcast" src="./layout_files/theme_30_overcast.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Overcast" /> <span class="themeName" style="float: left; margin: 3px 0px;">Overcast</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/le-frog/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Le Frog" src="./layout_files/theme_30_le_frog.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Le Frog" /> <span class="themeName" style="float: left; margin: 3px 0px;">Le Frog</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/flick/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Flick" src="./layout_files/theme_30_flick.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Flick" /> <span class="themeName" style="float: left; margin: 3px 0px;">Flick</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/pepper-grinder/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Pepper Grinder" src="./layout_files/theme_30_pepper_grinder.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Pepper Grinder" /> <span class="themeName" style="float: left; margin: 3px 0px;">Pepper Grinder</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/eggplant/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Eggplant" src="./layout_files/theme_30_eggplant.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Eggplant" /> <span class="themeName" style="float: left; margin: 3px 0px;">Eggplant</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dark-hive/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Dark Hive" src="./layout_files/theme_30_dark_hive.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Dark Hive" /> <span class="themeName" style="float: left; margin: 3px 0px;">Dark Hive</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/cupertino/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Cupertino" src="./layout_files/theme_30_cupertino.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Cupertino" /> <span class="themeName" style="float: left; margin: 3px 0px;">Cupertino</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/south-street/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="South St" src="./layout_files/theme_30_south_street.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="South St" /> <span class="themeName" style="float: left; margin: 3px 0px;">South Street</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/blitzer/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Blitzer" src="./layout_files/theme_30_blitzer.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Blitzer" /> <span class="themeName" style="float: left; margin: 3px 0px;">Blitzer</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/humanity/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Humanity" src="./layout_files/theme_30_humanity.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Humanity" /> <span class="themeName" style="float: left; margin: 3px 0px;">Humanity</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/hot-sneaks/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Hot Sneaks" src="./layout_files/theme_30_hot_sneaks.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Hot Sneaks" /> <span class="themeName" style="float: left; margin: 3px 0px;">Hot sneaks</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/excite-bike/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Excite Bike" src="./layout_files/theme_30_excite_bike.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Excite Bike" /> <span class="themeName" style="float: left; margin: 3px 0px;">Excite Bike</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/vader/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Vader" src="./layout_files/theme_30_black_matte.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Vader" /> <span class="themeName" style="float: left; margin: 3px 0px;">Vader</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dot-luv/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Dot Luv" src="./layout_files/theme_30_dot_luv.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Dot Luv" /> <span class="themeName" style="float: left; margin: 3px 0px;">Dot Luv</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/mint-choc/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Mint Choc" src="./layout_files/theme_30_mint_choco.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Mint Choc" /> <span class="themeName" style="float: left; margin: 3px 0px;">Mint Choc</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/black-tie/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Black Tie" src="./layout_files/theme_30_black_tie.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Black Tie" /> <span class="themeName" style="float: left; margin: 3px 0px;">Black Tie</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/trontastic/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Trontastic" src="./layout_files/theme_30_trontastic.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Trontastic" /> <span class="themeName" style="float: left; margin: 3px 0px;">Trontastic</span></a></li>

			<li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;"><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/swanky-purse/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;"><img alt="Swanky Purse" src="./layout_files/theme_30_swanky_purse.png" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;" title="Swanky Purse" /> <span class="themeName" style="float: left; margin: 3px 0px;">Swanky Purse</span></a></li>
		</ul>
	</div>
	<script src="./layout_files/jquery-latest.js" type="text/javascript"></script>
	<script src="./layout_files/jquery-ui-latest.js" type="text/javascript"></script>
	<script src="./layout_files/jquery.layout-latest.js" type="text/javascript"></script>
	<script src="./layout_files/jquery.layout.resizePaneAccordions-latest.js" type="text/javascript"></script>
	<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js" type="text/javascript"></script>
	<script src="./layout_files/themeswitchertool.js" type="text/javascript"></script>
	<script src="./layout_files/debug.js" type="text/javascript"></script>
	<script type="text/javascript" src="constructscript.js"></script>
</body>
</html>