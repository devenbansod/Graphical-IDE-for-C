 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!-- saved from url=(0049)http://layout.jquery-dev.net/demos/accordion.html -->
<html xmlns="http://www.w3.org/1999/xhtml" style="overflow: hidden; height: 100%; border: none; padding: 0px; margin: 0px;">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <meta name="language" content="en">
  
  <title>Code In-C-eption Trial</title>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
  <script type="text/javascript" src="script.js"></script>
  <link rel="stylesheet" href="style.css">
<script src="jquery-linedtextarea.js"></script>
  <link href="jquery-linedtextarea.css" type="text/css" rel="stylesheet" />
    
  <link rel="stylesheet" type="text/css" href="./layout_files/layout-default-latest.css">
  <link rel="stylesheet" type="text/css" href="./layout_files/jquery.ui.all.css">
  <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
  <!-- CUSTOMIZE/OVERRIDE THE DEFAULT CSS -->
  <style type="text/css">
    
  /* remove padding and scrolling from elements that contain an Accordion OR a content-div */
      .ui-layout-center , /* has content-div */
      .ui-layout-west , /* has Accordion */
      .ui-layout-east , /* has content-div ... */
      .ui-layout-east .ui-layout-content {
        /* content-div has Accordion */
    padding: 0;
    overflow: hidden;
      }
      .ui-layout-center P.ui-layout-content {
    line-height:  1.4em;
    margin:     0;
        /* remove top/bottom margins from <P> used as content-div */
      }
      h3, h4 {
        /* Headers & Footer in Center & East panes */
    font-size:    1.1em;
    background:   #EEF;
    border:     1px solid #BBB;
    border-width: 0 0 1px;
    padding:    7px 10px;
    margin:     0;
      }
      .ui-layout-east h4 {
        /* Footer in East-pane */
    font-size:    0.9em;
    font-weight:  normal;
    border-width: 1px 0 0;
      }
  </style>
  
  <!-- REQUIRED scripts for layout widget -->
  <script type="text/javascript" src="./layout_files/jquery-latest.js">
  </script>
  <script type="text/javascript" src="./layout_files/jquery-ui-latest.js">
  </script>
  <script type="text/javascript" src="./layout_files/jquery.layout-latest.js">
  </script>
  <script type="text/javascript" src="./layout_files/jquery.layout.resizePaneAccordions-latest.js">
  </script>
  <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
  
  <script type="text/javascript" src="./layout_files/themeswitchertool.js">
  </script>  
  <script type="text/javascript" src="./layout_files/debug.js">
  </script>
  
  <script type="text/javascript">
  $(document).ready( function() {
      
      myLayout = $('body').layout({
        west__size:     300
    , east__size:     300
          // RESIZE Accordion widget when panes resize
          , west__onresize:   $.layout.callbacks.resizePaneAccordions
          , east__onresize:   $.layout.callbacks.resizePaneAccordions
    }
                                   );
      
      // ACCORDION - in the West pane
      $("#accordion1").accordion({
        heightStyle:  "fill"
      }
                                );
      
      // ACCORDION - in the East pane - in a 'content-div'
      $("#accordion2").accordion({
        heightStyle:  "fill"
    , active:     1
    }
                                  );
      
      
      // THEME SWITCHER
      addThemeSwitcher('.ui-layout-north',{
        top: '12px', right: '5px' }
                      );
      // if a new theme is applied, it could change the height of some content,
      // so call resizeAll to 'correct' any header/footer heights affected
      // NOTE: this is only necessary because we are changing CSS *AFTER LOADING* using themeSwitcher
      setTimeout( myLayout.resizeAll, 1000 );
      /* allow time for browser to re-render with new theme */
      
  }
                     );
  </script>
  
  </head>
  <body style="zoom: 1; overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;" class="ui-layout-container">
    
    <div class="ui-layout-north ui-widget-content ui-layout-pane ui-layout-pane-north" style="display: block; position: absolute; margin: 0px; top: 0px; bottom: auto; left: 0px; right: 0px; width: auto; z-index: 0; height: 25px; visibility: visible;">
      <div style="float: right; margin-right: 160px;">
    <button onclick="resizeWidgets()">
          Resize
      </button>
      &nbsp;
      <button onclick="removeUITheme(); myLayout.resizeAll()">
        Remove Theme
      </button>
  </div>
Graphical IDE for C : Code In-C-eption
  <div id="themeContainer" style="position: absolute; overflow-x: hidden; top: 12px; right: 5px; z-index: 10;">
    <a href="http://layout.jquery-dev.net/demos/accordion.html#" class="jquery-ui-themeswitcher-trigger" style="font-family: &#39;Trebuchet MS&#39;, Verdana, sans-serif; font-size: 11px; color: rgb(102, 102, 102); background-image: url(http://jqueryui.com/themeroller/themeswitchertool/images/buttonbg.png); background-color: rgb(238, 238, 238); border: 1px solid rgb(204, 204, 204); border-top-left-radius: 6px; border-top-right-radius: 6px; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; text-decoration: none; padding: 3px 3px 3px 8px; width: 139px; display: block; height: 14px; outline: 0px; background-position: 50% 50%; background-repeat: repeat no-repeat;">
      <span class="jquery-ui-themeswitcher-icon" style="float: right; width: 16px; height: 16px; background-image: url(http://jqueryui.com/themeroller/themeswitchertool/images/icon_color_arrow.gif); background-position: 50% 50%; background-repeat: no-repeat no-repeat;">
      </span>
      <span class="jquery-ui-themeswitcher-title">
        Switch Theme
      </span>
    </a>
  </div>
  </div>
  
  <div class="ui-layout-south ui-widget-content ui-state-error ui-layout-pane ui-layout-pane-south" style="display: block; position: absolute; margin: 0px; top: auto; bottom: 0px; left: 0px; right: 0px; width: auto; z-index: 0; height: 18px; visibility: visible;">
    Credits: Nihav, Nirant, Deven, Yash
  </div>
  
  <div class="ui-layout-center ui-layout-pane ui-layout-pane-center" style="display: block; position: absolute; margin: 0px; left: 306px; right: 306px; top: 53px; bottom: 46px; height: 533px; width: 700px; z-index: 0; visibility: visible;">
    
  <h3 class="ui-widget-header">
      Graphical Workspace
  </h3>
<!--     <pre>
<code>
$('body').layout({
west__size:      300
,   east__size:      300
<i>
// RESIZE Accordion widget when panes resize
</i>
,   west__onresize:  $.layout.callbacks.resizePaneAccordions
,   east__onresize:  $.layout.callbacks.resizePaneAccordions
});

<i>
// ACCORDION - in the West pane
</i>
$("#accordion1").accordion({ heightStyle: "fill" });

<i>
// ACCORDION - in the East pane - in a 'content-div'
</i>
$("#accordion2").accordion({
heightStyle: "fill"
,   active:      1 
<i>
// set active accordion-panel
</i>
});
</code>
</pre> -->
  </div>
  </div>
  
  <div class="ui-layout-west ui-layout-pane ui-layout-pane-west" style="display: block; position: absolute; margin: 0px; left: 0px; right: auto; top: 53px; bottom: 46px; height: 533px; z-index: 0; width: 298px; visibility: visible;">
  <div id="accordion1" class="basic ui-accordion ui-widget ui-helper-reset" role="tablist">
      
      <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons" role="tab" id="ui-accordion-accordion1-header-0" aria-controls="ui-accordion-accordion1-panel-0" aria-selected="true" tabindex="0">
        <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s">
        </span>
        <a href="http://layout.jquery-dev.net/demos/accordion.html#">
          Data Types
        </a>
      </h3>
      <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" style="display: block; height: 319.79999923706055px; overflow: auto;" id="ui-accordion-accordion1-panel-0" aria-labelledby="ui-accordion-accordion1-header-0" role="tabpanel" aria-expanded="true" aria-hidden="false">
        <h5>
          West Pane
        </h5>
        <p>
          Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. 
          Integer ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit amet, nunc.
        </p>
        <p>
          Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. 
          Vestibulum a velit eu ante scelerisque vulputate.
        </p>
      </div>
      
      <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-accordion1-header-1" aria-controls="ui-accordion-accordion1-panel-1" aria-selected="false" tabindex="-1">
        <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e">
        </span>
        <a href="http://layout.jquery-dev.net/demos/accordion.html#">
          Branch Statements
        </a>
      </h3>
      <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" style="display: none; height: 319.79999923706055px; overflow: auto;" id="ui-accordion-accordion1-panel-1" aria-labelledby="ui-accordion-accordion1-header-1" role="tabpanel" aria-expanded="false" aria-hidden="true">
        <h5>
          Sed Non Urna
        </h5>
        <p>
          Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus.
          Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit,
          faucibus interdum tellus libero ac justo.
        </p>
        <p>
          Vivamus non quam. In suscipit faucibus urna.
        </p>
      </div>
      
      <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-accordion1-header-2" aria-controls="ui-accordion-accordion1-panel-2" aria-selected="false" tabindex="-1">
        <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e">
        </span>
        <a href="http://layout.jquery-dev.net/demos/accordion.html#">
          Loops
        </a>
      </h3>
      <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" style="display: none; height: 319.79999923706055px; overflow: auto;" id="ui-accordion-accordion1-panel-2" aria-labelledby="ui-accordion-accordion1-header-2" role="tabpanel" aria-expanded="false" aria-hidden="true">
        <p>
          Nam enim risus, molestie et, porta ac, aliquam ac, risus. Quisque lobortis.
          Phasellus pellentesque purus in massa. Aenean in pede.
        </p>
        <p>
          Phasellus ac libero ac tellus pellentesque semper. Sed ac felis. Sed commodo, 
          magna quis lacinia ornare, quam ante aliquam nisi, eu iaculis leo purus venenatis dui.
        </p>
        <ul>
          <li>
            List item one
          </li>
          <li>
            List item two
          </li>
          <li>
            List item three
          </li>
        </ul>
      </div>
      
      <h3 class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-accordion1-header-3" aria-controls="ui-accordion-accordion1-panel-3" aria-selected="false" tabindex="-1">
        <span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e">
        </span>
        <a href="http://layout.jquery-dev.net/demos/accordion.html#">
          Most Used Functions
        </a>
      </h3>
      <div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" style="display: none; height: 319.79999923706055px; overflow: auto;" id="ui-accordion-accordion1-panel-3" aria-labelledby="ui-accordion-accordion1-header-3" role="tabpanel" aria-expanded="false" aria-hidden="true">
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
      
  </div>
  </div>
  
  <div class="ui-layout-east ui-layout-pane ui-layout-pane-east ui-layout-pane-hover ui-layout-pane-east-hover ui-layout-pane-open-hover ui-layout-pane-east-open-hover" style="display: block; position: absolute; margin: 0px; left: auto; right: 0px; top: 53px; bottom: 46px; height: 533px; z-index: 0; width: 298px; visibility: visible;">
  <h3 class="ui-widget-header">
      Code and Output
  </h3>
  
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
    <textarea class = "lined" name ="code" id="code" onblur="" rows="19" placeholder="Your code goes here" ></textarea>
    <!-- <textarea class = "lined" name ="code" id="code" onblur="" placeholder="Your code goes here" ></textarea> -->
        <input type="button" class="fullwidth" value ="Compile and Run" onclick="PostData();" />
    <p id="waiting"></p>
    <textarea name ="results" id="results" onblur="" rows="10" placeholder="Your output will be displayed here" cols="30" rows="3"></textarea>

</form>
  </div>
  
  <h4 class="ui-widget-content ui-state-hover">
  </h4>
  </div>
  
  
  <div style="position: absolute; float: left; font-family: &#39;Trebuchet MS&#39;, Verdana, sans-serif; font-size: 12px; background-color: rgb(0, 0, 0); color: rgb(255, 255, 255); padding: 8px 3px 3px; border-width: 0px 1px 1px; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-right-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; z-index: 999999; width: 144px; display: none; background-position: initial initial; background-repeat: initial initial;">
  
  <ul style="list-style: none; margin: 0px; padding: 0px; overflow-y: auto; overflow-x: hidden; height: 200px;">
    
    <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
      <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-lightness/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
        
        <img src="./layout_files/theme_30_ui_light.png" alt="UI Lightness" title="UI Lightness" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
        
        <span class="themeName" style="float: left; margin: 3px 0px;">
          UI lightness
        </span>
    
  </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-darkness/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_ui_dark.png" alt="UI Darkness" title="UI Darkness" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        UI darkness
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_smoothness.png" alt="Smoothness" title="Smoothness" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Smoothness
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_start_menu.png" alt="Start" title="Start" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Start
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_windoze.png" alt="Redmond" title="Redmond" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Redmond
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/sunny/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_sunny.png" alt="Sunny" title="Sunny" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Sunny
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/overcast/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_overcast.png" alt="Overcast" title="Overcast" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Overcast
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/le-frog/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_le_frog.png" alt="Le Frog" title="Le Frog" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Le Frog
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/flick/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_flick.png" alt="Flick" title="Flick" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Flick
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/pepper-grinder/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_pepper_grinder.png" alt="Pepper Grinder" title="Pepper Grinder" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Pepper Grinder
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/eggplant/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_eggplant.png" alt="Eggplant" title="Eggplant" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Eggplant
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dark-hive/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_dark_hive.png" alt="Dark Hive" title="Dark Hive" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Dark Hive
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/cupertino/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_cupertino.png" alt="Cupertino" title="Cupertino" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Cupertino
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/south-street/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_south_street.png" alt="South St" title="South St" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        South Street
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/blitzer/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_blitzer.png" alt="Blitzer" title="Blitzer" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Blitzer
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/humanity/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_humanity.png" alt="Humanity" title="Humanity" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Humanity
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/hot-sneaks/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_hot_sneaks.png" alt="Hot Sneaks" title="Hot Sneaks" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Hot sneaks
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/excite-bike/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_excite_bike.png" alt="Excite Bike" title="Excite Bike" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Excite Bike
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/vader/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_black_matte.png" alt="Vader" title="Vader" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Vader
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dot-luv/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_dot_luv.png" alt="Dot Luv" title="Dot Luv" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Dot Luv
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/mint-choc/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_mint_choco.png" alt="Mint Choc" title="Mint Choc" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Mint Choc
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/black-tie/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_black_tie.png" alt="Black Tie" title="Black Tie" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Black Tie
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/trontastic/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_trontastic.png" alt="Trontastic" title="Trontastic" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Trontastic
      </span>
      
    </a>
  </li>
  
  <li style="width: 120px; padding: 2px; margin: 1px; border: 1px solid rgb(17, 17, 17); clear: left; float: left;">
    <a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/swanky-purse/jquery-ui.css" style="color: rgb(170, 170, 170); text-decoration: none; float: left; width: 100%; outline: 0px;">
      
      <img src="./layout_files/theme_30_swanky_purse.png" alt="Swanky Purse" title="Swanky Purse" style="float: left; border: 1px solid rgb(51, 51, 51); margin: 0px 2px;">
      
      <span class="themeName" style="float: left; margin: 3px 0px;">
        Swanky Purse
      </span>
      
    </a>
  </li>
  
  </ul>
  </div>
  </body>
</html>