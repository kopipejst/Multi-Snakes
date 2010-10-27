<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="SHORTCUT ICON" href="favicon.ico" type="image/x-icon" />

<meta name="description" content="Coin Slider: jQuery Image Slider Plugin with Unique Effects" />
<meta name="keywords" content="jquery plugin,image slider,slideshow, slider" />


<script type="text/javascript" src="snake_2.js"></script>

<style>
	html { font-family: Courier; color: gray; }
	#scoreboard div { float: left; clear: left; }
	#help { position: fixed; right: 10px; }
</style>


<title>Snake</title>
</head>
<body> 

	<div id="help">
		Chase red box<br />
		Control snake with arrows<br />
		Press '2' to add new snake<br />
		Control new snake with AWDS<br />
		Press '3' to add another snake<br />
		Control new snake with HUKJ
	</div>


</body>

<script>

	panel.initialize();

	// add new snakes on '2' and '3' keys
	window.addEventListener('keydown', function(e){
		if(e.keyCode == 50){
			snake2 = new snake;
			snake2.controls = {
				87 : 'up',
				68 : 'right',
				83 : 'down',
				65 : 'left'
			}
			snake2.color = 'green';
			snake2.left = document.width;
			snake2.top = 20;
			snake2.current_direction	= 'left';
			snake2.previous_direction	= 'left';
			snake2.initialize();
		};

		if(e.keyCode == 51){
			snake3 = new snake;
			snake3.controls = {
				85 : 'up',
				75 : 'right',
				74 : 'down',
				72 : 'left'
			}
			snake3.color = 'yellow';
			snake3.top = 40;
			snake3.initialize();
		};		
	},false);	
	

</script>
</html>