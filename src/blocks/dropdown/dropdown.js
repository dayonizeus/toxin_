import $ from 'jquery';
import caseEnding from '../../js/helperFunctions';

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
	if ($(event.target).closest('.dropdown--selected').length) {
		return;
	}
	$('.dropdown--selected').removeClass('dropdown--selected').addClass('dropdown');
})

// Увеличение значения опции по клику на +
$('.dropdown__option-increase').click( function() {
	var dropdownOptionValue = $(this).prev().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	dropdownOptionValue += 1;
	$(this).prev().text(dropdownOptionValue);
} )

// Уменьшение значения опции по клику на -
$('.dropdown__option-decrease').click( function() {
	var dropdownOptionValue = $(this).next().text();
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
	var totalGuest = 0;
	var children = 0;
	var babies = 0;
	// Вычисление общего количества гостей
	$(this).parent().prev().find('.dropdown__option-value').each( function() {
		var dropdownOptionValue = $(this).text();
		dropdownOptionValue = Number(dropdownOptionValue);
		totalGuest += dropdownOptionValue;
		// Вычисление количества детей
		if ($(this).prev().prev().text() === 'дети') {
			children += dropdownOptionValue;
		// Вычисление количества младенцев
		} else if ($(this).prev().prev().text() === 'младенцы') {
			babies += dropdownOptionValue;
		}
	} )
	// Общее количество гостей
	var totalGuestLabel = caseEnding(totalGuest, " Гость", " Гостя", " Гостей");
	// Количество детей из общего количества гостей
	if (children > 0) {
		var childrenLabel = caseEnding(children, " Ребёнок", " Ребёнка", " Детей");
		var childrenValue = (', ' + children + childrenLabel);
	} else {
		var childrenValue = '';
	}
	// Количество младенцев из общего количества гостей
	if (babies > 0) {
		var babiesLabel = caseEnding(babies, " Младенец", " Младенца", " Младенцев");
		var babiesValue = (', ' + babies + babiesLabel);
	} else {
		var babiesValue = '';
	}
	// Запись результата выбора в результирующее поле ввода
	if (totalGuest > 0) {
		var resultString = totalGuest + totalGuestLabel + childrenValue + babiesValue;
		var inputLength = Number($(this).closest('.dropdown__options').prev()
		.find('.dropdown__input-form').css('width').replace('px', ''));
		if (inputLength < 300) {
			resultString = resultString.slice(0, 29) + '...';
		}
		$(this).parent().parent().prev().find('.dropdown__input-form')
		.val(resultString).parent().parent().removeClass('dropdown--selected')
		.addClass('dropdown');
	}
} )