import $ from 'jquery';

// Раскрытие и сворачивание формы
$('div[name="dropdown"]').find('.dropdown__input-group').click(function() {
	if ($('div[name="dropdown"]').hasClass('dropdown') === true) {
		$('div[name="dropdown"]').removeClass('dropdown').addClass('dropdown--selected');
	} else {
		$('div[name="dropdown"]').removeClass('dropdown--selected').addClass('dropdown');
	}
})

// Увеличение значения опции по клику на +
$('.dropdown__option-increase').click(function() {
	let dropdownOptionValue = $(this).prev().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	dropdownOptionValue += 1;
	$(this).prev().text(dropdownOptionValue);
})

// Уменьшение значения опции по клику на -
$('.dropdown__option-decrease').click(function() {
	let dropdownOptionValue = $(this).next().text();
	dropdownOptionValue = Number(dropdownOptionValue);
	if (dropdownOptionValue > 0) {
		dropdownOptionValue -= 1;
		$(this).next().text(dropdownOptionValue);
	}
})

// Приведение значений всех опций к 0
$('.dropdown__options-clean').click(function() {
	$('.dropdown__option-value').text('0');
})

// Подверждение выбранных параметров
$('.dropdown__options-apply').click(function() {
	let totalGuest = 0;
	$('.dropdown__option-value').each(function() {
		let dropdownOptionValue = $(this).text();
		dropdownOptionValue = Number(dropdownOptionValue)
		totalGuest += dropdownOptionValue;
	})
	console.log(totalGuest);
})