import $ from 'jquery';

// Раскрытие и сворачивание формы по клику на заголовке формы
$('.expandable-checkbox-list__title').click(function() {
	if ($(this).parent().hasClass('expandable-checkbox-list') === true) {
		// Сворачивание других таких же форм (если есть)
		$('.expandable-checkbox-list--selected')
		.removeClass('expandable-checkbox-list--selected')
		.addClass('expandable-checkbox-list');
		// Открытие формы
		$(this).parent().removeClass('expandable-checkbox-list')
		.addClass('expandable-checkbox-list--selected');
	} else {
		// Сворачивание формы
		$(this).parent().removeClass('expandable-checkbox-list--selected')
		.addClass('expandable-checkbox-list');
	}
})

// Сворачивание формы по клику в другом месте документа
$(document).click( function(event) {
	if ($(event.target).closest('.expandable-checkbox-list--selected').length) {
		return;
	}
	$('.expandable-checkbox-list--selected')
	.removeClass('expandable-checkbox-list--selected')
	.addClass('expandable-checkbox-list');
})