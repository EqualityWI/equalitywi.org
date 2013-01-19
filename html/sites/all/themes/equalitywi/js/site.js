jQuery.noConflict();

function is_mobile() {
	var mobile_resolution = 'only screen and (-webkit-min-device-pixel-ratio: 1.5), '
						  + 'only screen and (min--moz-device-pixel-ratio: 1.5), '
						  + 'only screen and (-o-min-device-pixel-ratio: 3/2), '
						  + 'only screen and (min-device-pixel-ratio: 1.5), '
						  + 'only screen and (min-device-width: 320px) and (max-device-width: 480px)';
	//return true;
	return Modernizr.mq(mobile_resolution);
}

function slugify(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap – for n, etc
	var from = "ˆ‡Š‰‘“’•”˜—š™œŸ–á/_,:;";
	var to = "aaaaeeeeiiiioooouuuunc------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
	.replace(/\s+/g, '-') // collapse whitespace and replace by -
	.replace(/-+/g, '-'); // collapse dashes
	return str;
}

jQuery(document).ready(function() {
	if (is_mobile()) mobile_dom_updates();
	else desktop_dom_updates();
});

function desktop_dom_updates() {
	resize_blocks_vertically();
	prepare_latest_articles_block();
}

function resize_blocks_vertically() {
	var current_offset = 0;
	var current_row_i = 1;
	var current_row = [];
	var current_max_h = 0;
	var blocks = jQuery('#before_content .block > div');
	blocks.each(function(i, e) {
		jQuery(e).find('.field-name-field-image img').removeAttr('height').removeAttr('width');
		if (jQuery(e).offset().left <= current_offset) {
			jQuery.each(current_row, function(j, f) {
				var headline = jQuery(f).find('h2');
				if (headline.length) jQuery(f).parent().addClass('block-' + slugify(headline.html()));
				jQuery(f).css({
					'min-height': current_max_h + 'px'
				}).parent().addClass('row-' + current_row_i);
			});
			current_row_i++;
			current_row = [];
			current_max_h = 0;
			current_offset = 0;
		}
		if (jQuery(e).height()+15 > current_max_h) current_max_h = jQuery(e).height()+15;
		current_row.push(jQuery(e));
		current_offset = jQuery(e).offset().left;
		if (i == blocks.length - 1) {
			jQuery.each(current_row, function(j, f) {
				var headline = jQuery(f).find('h2');
				if (headline.length) jQuery(f).parent().addClass('block-' + slugify(headline.html()));
				jQuery(f).css({
					'min-height': current_max_h + 'px'
				}).parent().addClass('row-' + current_row_i);
			});
		}
	});
}

function prepare_latest_articles_block() {
	var items = jQuery('#block-views-latest-articles-block .item-list > ul > li');
	items.first().addClass('active');
	jQuery.each(items, function(i, e) {
		jQuery(e).find('h2[property="dc:title"] > a').attr('href', '#').click(function() {
			jQuery(this).closest('li').addClass('active').siblings().removeClass('active');
			return false;
		});
	});
	var timer = jQuery.timer(function() {
		makeNextActive = false;
		jQuery.each(items, function(i, e) {
			if(makeNextActive) {
				jQuery(e).addClass('active');
				return false;
			}
			if(jQuery(e).hasClass('active')) {
				jQuery(e).removeClass('active');
				if(i == items.length-1) {
					items.first().addClass('active');
					return false;
				}
				makeNextActive = true;
			}
		});
	});
	timer.set({time: 4000, autostart: true});
	jQuery('#block-views-latest-articles-block').hover(function() {
		timer.pause();
	}, function() {
		timer.play(false);
	});
}

function mobile_dom_updates() {
	resize_menu_tabs();
}

function resize_menu_tabs() {
	var current_max_w = 0;
	var items = jQuery('body > header #block-system-main-menu .menu > li');
	items.each(function(i, e) {
		if(jQuery(e).width() > current_max_w) current_max_w = jQuery(e).width();
	});
	items.each(function(i, e) {
		jQuery(e).width(current_max_w+20);
	});
	
}

