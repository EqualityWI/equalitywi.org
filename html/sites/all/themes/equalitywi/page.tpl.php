<?php if(!isset($_GET["ajax"]) && !isset($_POST["ajax"])) { ?>


<header><div id="header_region_wrap">
	<?php print render($page['header']); ?>
</div></header>

<div id="main" role="main">
	
	<div id="before_content">
		<?php print render($page['before-content']); ?>
	</div>
	
	<div id="help_content">
		<?php print render($page['help']); ?>
	</div>
	
	<div id="page_content">
		<?php print render($page['content']); ?>
	</div>
	
	<div id="after_content">
		<?php print render($page['after-content']); ?>
	</div>
	
</div>

<footer><div id="footer_region_wrap">
	<?php print render($page['footer']); ?>
</div></footer>

<?php
} else {
   print render($page['content']);
}
?>