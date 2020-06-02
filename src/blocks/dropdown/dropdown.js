import $ from 'jquery';

// Раскрытие и сворачивание формы по клику на поле ввода
$('.dropdown__input-group').click( function() {
	if ($(this).parent().hasClass('dropdown') === true) {
		// Сворачивание других таких же форм (если есть)
		$('.dropdown--selected').removeClass('dropdown--selected').addClass('dropdown');
		// Открытие формы
		$(this).parent().removeClass('dropdown').addClass('dropdown--selected');
	} else {
		// Сворачивание формы
		$(this).parent().removeClass('dropdown--selected').addClass('dropdown');
	}
} )

// Сворачивание формы по клику в другом месте документа
$(document).click( function(event) {
	if ( $(event.target).closest('.dropdown--selected').length ) {
		return;
	}
	$('.dropdown--selected').removeClass('dropdown--selected').addClass('dropdown');
} )

// Увеличение значения опции по клику на +
$('.dropdown__option-increase').click( function() {
	let dropdownOptionValue = $(this).prev().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	dropdownOptionValue += 1;
	$(this).prev().text(dropdownOptionValue);
} )

// Уменьшение значения опции по клику на -
$('.dropdown__option-decrease').click( function() {
	let dropdownOptionValue = $(this).next().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	if (dropdownOptionValue > 0) {
		dropdownOptionValue -= 1;
		$(this).next().text(dropdownOptionValue);
	}
} )

// Приведение значений всех опций к 0 по клику на "очистить"
$('.dropdown__options-clean').click( function() {
	$(this).parent().prev().find('.dropdown__option-value').text('0');
} )

// Подверждение выбранных параметров по клику на "применить"
$('.dropdown__options-apply').click( function() {
	let totalGuest = 0;
	$(this).parent().prev().find('.dropdown__option-value').each( function() {
		let dropdownOptionValue = $(this).text();
		dropdownOptionValue = Number(dropdownOptionValue)
		totalGuest += dropdownOptionValue;
	} )
	// Проверка для вывода правильного окончания
	if (totalGuest < 2) {
		var totalGuestLabel = ' Гость';
	} else if (totalGuest < 5) {
		var totalGuestLabel = ' Гостя';
	} else if (totalGuest < 21) {
		var totalGuestLabel = ' Гостей';
	} else if (
		String(totalGuest)[String(totalGuest).length - 1] === '1' && 
		String(totalGuest)[String(totalGuest).length - 2] + 
		String(totalGuest)[String(totalGuest).length - 1] != '11'
		) {
		var totalGuestLabel = ' Гость';
	} else if (
		String(totalGuest)[String(totalGuest).length - 1] === '2' && 
		String(totalGuest)[String(totalGuest).length - 2] + 
		String(totalGuest)[String(totalGuest).length - 1] != '12' || 
		String(totalGuest)[String(totalGuest).length - 1] === '3' && 
		String(totalGuest)[String(totalGuest).length - 2] + 
		String(totalGuest)[String(totalGuest).length - 1] != '13' || 
		String(totalGuest)[String(totalGuest).length - 1] === '4' && 
		String(totalGuest)[String(totalGuest).length - 2] + 
		String(totalGuest)[String(totalGuest).length - 1] != '14' 
		) {
		var totalGuestLabel = ' Гостя';
	} else {
		var totalGuestLabel = ' Гостей';
	}
	if (totalGuest > 0) {
		$(this).parent().parent().prev().find('.dropdown__input-form')
		.val(totalGuest + totalGuestLabel)
		.parent().parent().removeClass('dropdown--selected').addClass('dropdown');
	}
} )