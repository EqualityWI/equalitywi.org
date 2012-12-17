<?php

function getPageID($is_front) {
	if ($is_front) {
		$page_id = 'frontpage';
	}
	else {
		// Remove base path and any query string.
		global $base_path;
		list(,$path) = explode($base_path, $_SERVER['REQUEST_URI'], 2);
		list($path,) = explode('?', $path, 2);
		$path = rtrim($path, '/');
		// Construct the id name from the path, replacing slashes with dashes.
		$page_id = str_replace('/', '-', $path);
		// Construct the class name from the first part of the path only.
		list($body_class,) = explode('/', $path, 2);
	}

	return $page_id;
}


function getBodyID($is_front = false) {
	return 'page-' . getPageID($is_front);
}

function equalitywi_preprocess_node(&$variables) {
  if ($variables['submitted']) {
  	$user = user_load(array('uid'=>$variables['uid']));
  	$name = $user->field_first_name['und'][0]['value'];
  	$byname = (empty($name) || strlen($name)<2) ? '' : 'by ' . $name;
    $variables['submitted'] = t('Posted !user on !datetime', array('!user' => $byname , '!datetime' => format_date($variables['node']->created, 'custom', 'F j, Y')));
  }
}