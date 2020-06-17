import $ from 'jquery';
import {caseEnding} from '../../js/helperFunctions';
// Раскрытие и сворачивание формы по клику на поле ввода
$('.dropdown-interior__input-group').click(function() {
	if ($(this).parent().hasClass('dropdown-interior') === true) {
		// Сворачивание других таких же форм (если есть)
		$('.dropdown-interior--selected')
		.removeClass('dropdown-interior--selected').addClass('dropdown-interior');
		// Открытие формы
		$(this).parent()
		.removeClass('dropdown-interior').addClass('dropdown-interior--selected');
	} else {
		// Сворачивание формы
		$(this).parent()
		.removeClass('dropdown-interior--selected').addClass('dropdown-interior');
	}
})
// Сворачивание формы по клику в другом месте документа
$(document).click(function(event) {
	if ($(event.target).closest('.dropdown-interior--selected').length) {
		return;
	}
	$('.dropdown-interior--selected')
	.removeClass('dropdown-interior--selected').addClass('dropdown-interior');
})
// Увеличение значения опции по клику на +
$('.dropdown-interior__option-increase').click(function() {
	var dropdownOptionValue = $(this).prev().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	dropdownOptionValue += 1;
	$(this).prev().text(dropdownOptionValue);
	writeData(this);
})
// Уменьшение значения опции по клику на -
$('.dropdown-interior__option-decrease').click(function() {
	var dropdownOptionValue = $(this).next().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	if (dropdownOptionValue > 0) {
		dropdownOptionValue -= 1;
		$(this).next().text(dropdownOptionValue);
		writeData(this);
	}
})
// Функция записи значения в поле ввода
function writeData(target) {
	var resultString = '';
	$(target).closest('.dropdown-interior__options-list')
	.find('.dropdown-interior__option').each(function() {
		var optionCount = Number($(this)
		.find('.dropdown-interior__option-value').text());
		if (optionCount > 0) {
			if ($(this).find('.dropdown-interior__option-title').text() === 
				'спальни') {
				var optionCountLabel = caseEnding(optionCount, 
				" Спальня", " Спальни", " Спален");
				resultString += optionCount + optionCountLabel + ', ';
			} else if ($(this).find('.dropdown-interior__option-title').text() === 
				'кровати') {
				var optionCountLabel = caseEnding(optionCount, 
				" Кровать", " Кровати", " Кроватей");
				resultString += optionCount + optionCountLabel + ', ';
			} else if ($(this).find('.dropdown-interior__option-title').text() === 
				'ванные комнаты') {
				var optionCountLabel = caseEnding(optionCount, 
				" Ванная Комната", " Ванные Комнаты", " Ванных Комнат");
				resultString += optionCount + optionCountLabel + ', ';
			}
		}
	})
	resultString = resultString.slice(0, -2);
	if (resultString.length > 19) {
		resultString = resultString.slice(0, 20) + '...';
	}
	$(target).closest('.dropdown-interior__options').prev()
	.find('.dropdown-interior__input-form').val(resultString);
}