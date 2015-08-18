
(function () {

	'use strict';

	/**
	 * 	SETUP
	 */
	
	var $document        = $(document),
		$header          = $('header'),
		$nav             = $('nav'),
		$quirks          = $('.quirks li'),
		$forewordSection = $('#foreword'),
		$toysSection     = $('#toys');


	/**
	 * 	SCROLL STUFF
	 */

	$document.scroll(function () {

		checkStickyNav();

		monitorProgress();
	})


	function checkStickyNav () {
		
		if($document.scrollTop() >= $header.height()) {

			$nav.addClass('sticky');

		} else {

			$nav.removeClass('sticky');
		}
	}


	function monitorProgress () {

		
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
	
	$(window).resize(function () {

		trickHeight();
	});

	function trickHeight () {

		var $trick = $('.trick');

		$trick.height($trick.width());
	}


	/**
	 * 	INITIALIZE
	 */

	 trickHeight();

})(jQuery);

