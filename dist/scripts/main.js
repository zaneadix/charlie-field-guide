
(function () {

	'use strict';

	$('.quirks li').on('click', function (e) {

		$('.quirks li').removeClass('selected');

		var $this = $(this),
			$text  = $this.find('.text');

		$this.addClass('selected');

		console.log($text.text());

		$('#quirk-text').text($text.text());
	});

})(jQuery);

