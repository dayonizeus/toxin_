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
	let children = 0;
	let babies = 0;
	// Вычисление общего количества гостей
	$(this).parent().prev().find('.dropdown__option-value').each( function() {
		let dropdownOptionValue = $(this).text();
		dropdownOptionValue = Number(dropdownOptionValue);
		totalGuest += dropdownOptionValue;
		// Вычисление количества детей
		if ($(this).prev().prev().text() === 'Дети') {
			children += dropdownOptionValue;
		// Вычисление количества младенцев
		} else if ($(this).prev().prev().text() === 'Младенцы') {
			babies += dropdownOptionValue;
		}
	} )
	// Общее количество гостей
	let totalGuestLabel = caseEnding(totalGuest, " Гость", " Гостя", " Гостей");
	// Количество детей из общего количества гостей
	if (children > 0) {
		let childrenLabel = caseEnding(children, " Ребёнок", " Ребёнка", " Детей");
		var childrenValue = (', ' + children + childrenLabel);
	} else {
		var childrenValue = '';
	}
	// Количество младенцев из общего количества гостей
	if (babies > 0) {
		let babiesLabel = caseEnding(babies, " Младенец", " Младенца", " Младенцев");
		var babiesValue = (', ' + babies + babiesLabel);
	} else {
		var babiesValue = '';
	}
	// Запись результата выбора в результирующее поле ввода
	if (totalGuest > 0) {
		$(this).parent().parent().prev().find('.dropdown__input-form')
		.val(totalGuest + totalGuestLabel + childrenValue + babiesValue)
		.parent().parent().removeClass('dropdown--selected').addClass('dropdown');
	}
} )