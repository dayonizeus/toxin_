import $ from 'jquery';

$('.button-like').click(function() {
	if ($(this).hasClass('button-like--active') === true) {
		var value = Number($(this).text()) - 1;
		$(this).text(value);
		$(this).addClass('button-like').removeClass('button-like--active');
	} else {
		var value = Number($(this).text()) + 1;
		$(this).text(value);
		$(this).addClass('button-like--active').removeClass('button-like');
	}
})

$('.button-like--active').click(function() {
	if ($(this).hasClass('button-like') === true) {
		var value = Number($(this).text()) + 1;
		$(this).text(value);
		$(this).addClass('button-like--active').removeClass('button-like');
	} else {
		var value = Number($(this).text()) - 1;
		$(this).text(value);
		$(this).addClass('button-like').removeClass('button-like--active');
	}
})