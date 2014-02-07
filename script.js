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
$(function() {

	// Target all classed with ".lined"	
	$(".lined").linedtextarea(
	{selectedLine: 0}
	);

	// Target a single one
	$("#mytextarea").linedtextarea();

	});
  $(function() {
    $( "#draggable" ).draggable();
  });

  function PostData() {
        document.getElementById('results').value='';
        var list=document.getElementsByTagName("body")[0];
        list.style.cursor = 'wait'; 
       // 1. Create XHR instance - Start
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        throw new Error("Ajax is not supported by this browser");
    }
    // 1. Create XHR instance - End
    
    // 2. Define what to do when XHR feed you the response from the server - Start
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && xhr.status < 300) {
                document.getElementById('results').value = xhr.responseText;
                document.body.style.cursor = 'auto';
            }
        }
    }
    // 2. Define what to do when XHR feed you the response from the server - Start

    var code = document.getElementById("code").value;

    // 3. Specify your action, location and Send to the server - Start 
    xhr.open('POST', 'script.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(code));
    // 3. Specify your action, location and Send to the server - End
};