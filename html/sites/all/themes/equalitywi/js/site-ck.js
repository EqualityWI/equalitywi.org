/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://jchavannes.com/jquery-timer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

;(function($) {
	$.timer = function(func, time, autostart) {	
	 	this.set = function(func, time, autostart) {
	 		this.init = true;
	 	 	if(typeof func == 'object') {
		 	 	var paramList = ['autostart', 'time'];
	 	 	 	for(var arg in paramList) {if(func[paramList[arg]] != undefined) {eval(paramList[arg] + " = func[paramList[arg]]");}};
 	 			func = func.action;
	 	 	}
	 	 	if(typeof func == 'function') {this.action = func;}
		 	if(!isNaN(time)) {this.intervalTime = time;}
		 	if(autostart && !this.active) {
			 	this.active = true;
			 	this.setTimer();
		 	}
		 	return this;
	 	};
	 	this.once = function(time) {
			var timer = this;
	 	 	if(isNaN(time)) {time = 0;}
			window.setTimeout(function() {timer.action();}, time);
	 		return this;
	 	};
		this.play = function(reset) {
			if(!this.active) {
				if(reset) {this.setTimer();}
				else {this.setTimer(this.remaining);}
				this.active = true;
			}
			return this;
		};
		this.pause = function() {
			if(this.active) {
				this.active = false;
				this.remaining -= new Date() - this.last;
				this.clearTimer();
			}
			return this;
		};
		this.stop = function() {
			this.active = false;
			this.remaining = this.intervalTime;
			this.clearTimer();
			return this;
		};
		this.toggle = function(reset) {
			if(this.active) {this.pause();}
			else if(reset) {this.play(true);}
			else {this.play();}
			return this;
		};
		this.reset = function() {
			this.active = false;
			this.play(true);
			return this;
		};
		this.clearTimer = function() {
			window.clearTimeout(this.timeoutObject);
		};
	 	this.setTimer = function(time) {
			var timer = this;
	 	 	if(typeof this.action != 'function') {return;}
	 	 	if(isNaN(time)) {time = this.intervalTime;}
		 	this.remaining = time;
	 	 	this.last = new Date();
			this.clearTimer();
			this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
		};
	 	this.go = function() {
	 		if(this.active) {
	 			this.action();
	 			this.setTimer();
	 		}
	 	};
	 	
	 	if(this.init) {
	 		return new $.timer(func, time, autostart);
	 	} else {
			this.set(func, time, autostart);
	 		return this;
	 	}
	};
})(jQuery);

/* **********************************************
     Begin site.js
********************************************** */

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
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
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

