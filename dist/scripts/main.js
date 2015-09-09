
(function ($) {


	'use strict';

	/**
	 * 	SETUP
	 */
	
	var $document        = $(document),
		$window 		 = $(window),
		$header          = $('header'),
		$nav             = $('nav'),
		$progressBar	 = $nav.find('.percentage'),
		$quirks          = $('.quirks li'),
		$forewordSection = $('#foreword'),
		$toysSection     = $('#toys');

	var progressOffset = $nav.height();


	/**
	 * 	WINDOW STUFF
	 */

	$document.scroll(function () {

		checkStickyNav();

		monitorProgress();
	});


	$window.resize(function () {

		trickHeight();

		setNavBlocks();

		// monitorProgress();
	});

	
	$nav.find('a').on('click', function () {

		var scrollTo = $(this).attr('scrollTo');

		var offset = (scrollTo == 'foreword' ? 0 : progressOffset);

	    $('html, body').animate({

	        scrollTop: $('#' + scrollTo).offset().top - offset

	    }, 1000);

	});


	function checkStickyNav () {
		
		if($document.scrollTop() >= $header.height()) {

			$nav.addClass('sticky');

		} else {

			$nav.removeClass('sticky');
		}
	}


	function monitorProgress () {

		var scrollTop = $document.scrollTop();

		$('.progress-block').each(function (index) {

			var $this = $(this);
			var top   = parseInt($this.attr('top'));
			var start = parseInt($this.attr('start'));

			if (scrollTop > top) {

				$this.width($this.attr('block-width') + '%');

			} else if (scrollTop > start) {

				var height = top - start;
				var diff = scrollTop - start;


				var percentage = (diff / height) * parseFloat($this.attr('block-width'));

				$this.width(percentage + '%');

			} else {

				$this.width(0);
			}
		});
	}


	function setNavBlocks () {

		var $progress      = $('#progress');
		var $blocks        = $('.nav-block');
		var blockWidth     = 100 / ($blocks.length);
		var lastHeight     = 0;

		progressOffset = $nav.height();

		$progress.empty();

		$blocks.each(function (index) {

			var $this = $(this);

			var top = $this.offset().top;

			var $block = $('<div></div>')
						.addClass('progress-block')
						.attr('start', lastHeight)
						.attr('top', index === 0 ? top : top - progressOffset)
						.attr('block-width', index === 0 ? (blockWidth/2) : blockWidth);

			console.log($block.attr('start'));

			lastHeight = index === 0 ? top : top - progressOffset;

			$progress.append($block);
		});

		var $block = $('<div></div>')
					.addClass('progress-block')
					.attr('start', lastHeight)
					.attr('top', lastHeight + 200)
					.attr('block-width', (blockWidth/2));

		$progress.append($block);

		monitorProgress();
	}

	$('#menu-toggle').on('click', function (e) {

		$nav.find('#navigation').toggleClass('on');
	});


	/**
	 *	QUIRKS
	 */

	$quirks.on('click', function (e) {

		$quirks.removeClass('selected');

		var $this = $(this),
			$text  = $this.find('.text');

		$this.addClass('selected');

		$('#quirk-text').text($text.text());

		setNavBlocks();
	});


	/**
	 *	TOYS
	 */

	$('.toys li').on('click', function (e) {

		$('.toys li').removeClass('selected');

		var $this    = $(this),
			$name    = $this.find('.name'),
			$text    = $this.find('.text');


		$this.addClass('selected');

		$('#toy-text').text($text.text());
		$('#toys .all-name').text($name.text());

		setNavBlocks();
	});


	/**
	 *	WALKS
	 */

	$('.walks li').on('mouseover', function (e) {

		$('.walks li').removeClass('selected');

		var $this 	  = $(this),
			$right    = $('#walks').find('.right'),
			$icon     = $this.find('.icon'),
			$name     = $this.find('.name'),
			$text     = $this.find('.text');

		console.log($right);

		$this.addClass('selected');

		$right.find('.icon').html($icon.html());
		$right.find('.name').text($name.text());
		$right.find('.text').text($text.text());

		setNavBlocks();
	});


	/**
	 * 	TRICKS
	 */

	function trickHeight () {

		var $trick = $('.trick');

		if ($window.width() > 992) {

			$trick.height($trick.width());

		} else if ($window.width() > 720){

			$trick.height(200);
		}
	}


	/**
	 * 	INITIALIZE
	 */

	trickHeight();

	$(window).load(function() {
		
	    setNavBlocks();
	});
	 

})(jQuery);
