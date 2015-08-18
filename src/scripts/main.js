
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

		monitorProgress();
	});


	/**
	 * 	NAV STUFF
	 */
	
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

				var percentage = (diff / height) * parseInt($this.attr('block-width'));

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

		$progress.empty();

		$blocks.each(function (index) {

			var $this = $(this);

			var top = $this.offset().top;

			var block = $('<div></div>')
						.addClass('progress-block')
						.attr('start', lastHeight)
						.attr('top', index === 0 ? top : top - progressOffset)
						.attr('block-width', index === 0 ? (blockWidth/2) : blockWidth);

			lastHeight = index === 0 ? top : top - progressOffset;

			$progress.append(block);
		});

		var block = $('<div></div>')
					.addClass('progress-block')
					.attr('start', lastHeight)
					.attr('top', lastHeight + 200)
					.attr('block-width', (blockWidth/2));

		$progress.append(block);
	}


	/**
	 *	QUIRKS
	 */

	$quirks.on('click', function (e) {

		$quirks.removeClass('selected');

		var $this = $(this),
			$text  = $this.find('.text');

		$this.addClass('selected');

		$('#quirk-text').text($text.text());
	});


	/**
	 *	TOYS
	 */

	$('.toys li').on('click', function (e) {

		$('.toys li').removeClass('selected');

		var $this = $(this),
			$text  = $this.find('.text');

		$this.addClass('selected');

		$('#toy-text').text($text.text());
	});


	/**
	 * 	TRICKS
	 */

	function trickHeight () {

		var $trick = $('.trick');

		$trick.height($trick.width());
	}


	/**
	 * 	INITIALIZE
	 */

	 trickHeight();

	 setNavBlocks();

})(jQuery);
