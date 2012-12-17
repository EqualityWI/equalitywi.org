<?php if(!isSet($_GET["ajax"]) && !isSet($_POST["ajax"])) { ?>

<!DOCTYPE html>
<html class="no-js">
	<head>
	
		<?php if($is_front) { ?>
			<title><?php echo trim(array_pop(explode('|', $head_title))); ?></title>
		<?php } else { ?>
			<title><?php print $head_title; ?></title>
		<?php } ?>
		<?php print $head; ?>
		<?php print $styles; ?>
		<?php print $scripts; ?>
		
		<link rel="apple-touch-icon" href="<?php print path_to_theme(); ?>/images/apple-touch-icon.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="<?php print path_to_theme(); ?>/images/apple-touch-icon-ipad.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="<?php print path_to_theme(); ?>/images/apple-touch-icon-iphone4.png" />
		<link rel="icon" href="/<?php print path_to_theme(); ?>/favicon.ico" />
		<meta name="apple-mobile-web-app-title" content="Equality WI">
		
		<script type="text/javascript">
			if(is_mobile()) document.write('<meta name="viewport" content="initial-scale=1, maximum-scale=1"></meta>');
		</script>
	
	</head>
	
	<body class="<?php print $classes; ?>" <?php print $attributes;?> id="<?php print getBodyID($is_front); ?>">

		<?php print $page_top; ?>
		<?php print $page; ?>
		<?php print $page_bottom; ?>
	
	</body>	
</html>

<?php } ?>