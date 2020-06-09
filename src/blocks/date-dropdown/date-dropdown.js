import $ from 'jquery';
import {months, drawCalendar} from '../calendar/calendar';
// Сворачивание/разворачивание формы по клику на поле ввода
$('.date-dropdown__input-group').click(function() {
	if ($(this).next().hasClass('date-dropdown__calendar--disabled') === true) {
		// Сворачивание других таких же форм если есть
		$('.date-dropdown__calendar')
		.removeClass('date-dropdown__calendar')
		.addClass('date-dropdown__calendar--disabled');
		// Условия для формы ввода даты выезда
		if ($(this).parent().hasClass('date-dropdown--right-handle') === true) {
			if($(this).parent().prev().find('.date-dropdown__input-form').text() !=
				'ДД.ММ.ГГГГ') {
					var day = $(this).parent().prev()
					.find('.date-dropdown__input-form').text().split('.')[0];
					var month = Number($(this).parent().prev()
					.find('.date-dropdown__input-form').text().split('.')[1]) - 1;
					var year = $(this).parent().prev()
					.find('.date-dropdown__input-form').text().split('.')[2];
					// Разворачивание формы
					$(this).next()
					.removeClass('date-dropdown__calendar--disabled')
					.addClass('date-dropdown__calendar');
					// Отрисовка календаря
					drawCalendar(year, month);
					// Метка даты прибытия
					$(this).next().find('.calendar__month-day').each(function() {
						if ($(this).text() === day) {
							$(this).removeClass('calendar__month-day')
							.addClass('calendar__month-day--selected')
						}
					})
					// Удаляем лишние метки
					$(this).closest('.date-dropdown')
					.find('.calendar__btn-next').click();
					$(this).closest('.date-dropdown')
					.find('.calendar__btn-prev').click();
			}
		// Условия для формы ввода даты прибытия
		} else {
			// Разворачивание формы и отрисовка календаря 
			// текущего месяца по клику на поле ввода
			$(this).next()
			.removeClass('date-dropdown__calendar--disabled')
			.addClass('date-dropdown__calendar');
			// Если текущее значение поля ввода выставлено по умолчанию,
			// то отрисовываем календарь текущего месяца
			if ($(this).children().first().text() === 'ДД.ММ.ГГГГ') {
				$(this).next().find('.calendar__btn-clean').click();
			} else {
				var day = $(this).parent()
				.find('.date-dropdown__input-form').text().split('.')[0];
				var month = Number($(this).parent()
				.find('.date-dropdown__input-form').text().split('.')[1]) - 1;
				var year = $(this).parent()
				.find('.date-dropdown__input-form').text().split('.')[2];
				// Разворачивание формы и отрисовка календаря
				$(this).next()
				.removeClass('date-dropdown__calendar--disabled')
				.addClass('date-dropdown__calendar');
				// Отрисовка календаря
				drawCalendar(year, month);
				// Метка даты прибытия
				$(this).next().find('.calendar__month-day').each(function() {
					if ($(this).text() === day) {
						$(this).removeClass('calendar__month-day')
						.addClass('calendar__month-day--selected')
					}
				})
			}
		}
		
	} else {
		// Сворачивание формы по клику на поле ввода
		$(this).next()
		.removeClass('date-dropdown__calendar')
		.addClass('date-dropdown__calendar--disabled');
	}
})
// Сворачивание формы по клику в другом месте документа
$(document).click(function(event) {
	// Если цель клика открытая форма, то ничего не делаем
	if ($(event.target).closest('.date-dropdown').length) {
		return;
	}
	// Если цель клика что-либо другое, то сворачиваем форму
	$('.date-dropdown__calendar')
	.removeClass('date-dropdown__calendar')
	.addClass('date-dropdown__calendar--disabled');
})
// Подтверждение выбранной даты по клику на применить
$('.calendar__btn-apply').click(function() {
	// Данные для записи берём из тела календаря
	var year = $(this).parent().prev().prev().find('.calendar__month')
	.text().split(' ')[1];
	var monthStr = $(this).parent().prev().prev().find('.calendar__month')
	.text().split(' ')[0];
	var month = String(months.indexOf(monthStr) + 1);
	if (month.length < 2) {
		month = '0' + month;
	}
	if (
		$(this).closest('.date-dropdown')
		.hasClass('date-dropdown--right-handle') === true
		) {
		var day = $('.calendar__month-day--selected-end').text();
	} else {
		var day = $('.calendar__month-day--selected').text();
	}
	if (day != '') {
		if (day.length < 2) {
			day = '0' + day;
		}
		var appliedDate = day + '.' + month + '.' + year;
		// Записываем данные в форму
		$(this).closest('.date-dropdown')
		.find('.date-dropdown__input-form').html(appliedDate);
		// Сворачиваем форму
		$(this).closest('.date-dropdown__calendar')
		.removeClass('date-dropdown__calendar')
		.addClass('date-dropdown__calendar--disabled');
	}
})