<html>
    <head>
  <meta charset="utf-8">
  <title>jQuery UI Draggable - Default functionality</title>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
  <link rel="stylesheet" href="/resources/demos/style.css">
  <style>
  #draggable { width: 150px; height: 150px; padding: 0.5em; }
  </style>
  <script>
  $(function() {
    $( "#draggable" ).draggable();
  });
  </script>
<script>
    function PostData() {
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
            if (xhr.status == 200 && xhr.status < 300) {
                document.getElementById('results').value = xhr.responseText;
            }
        }
    }
    // 2. Define what to do when XHR feed you the response from the server - Start

    var code = document.getElementById("code").value;

    // 3. Specify your action, location and Send to the server - Start 
    xhr.open('POST', 'script.php');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("code=" + code);
    // 3. Specify your action, location and Send to the server - End
}
</script>
</head>
<body>
<div id="draggable" class="ui-widget-content" style="float:right">
  <p>Drag me around</p>
</div>
    <form>
    <label for="userid">Code:</label><br>
    <textarea name ="code" id="code" onblur="" cols ="50" rows="10"></textarea>
    <br><label for="userid">Results:</label><br>
    <br><textarea name ="results" id="results" onblur="" cols="50" rows="10"></textarea>
    <br><br><input type="button" value ="Compile and Run" onclick="PostData();" />
</form>
  </body>
</html>
