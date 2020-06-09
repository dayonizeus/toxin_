import $ from 'jquery';

// Возвращает число с которого начинается календарь
function getCalendarFirstDay(year, month) {
	var firstDay = new Date(year, month, 1).getDay();
	if (firstDay === 0) {
		return -5;
	} else {
	return 1 - firstDay + 1;
	}
}
// Возвращает количество дней в месяце
function totalDays(year, month) {
	var totalDays = 32 - new Date(year, month, 32).getDate();
	return totalDays;
}
// Вставляет в форму данные календаря
export function drawCalendar(year, month) {
	var date = new Date(year, month);//Получение объекта с данными периода
	var month = date.getMonth();//Месяц
	var year = date.getFullYear();//Год
	var monthDays = totalDays(year, month);//Кол-во дней в месяце
	var monthString = months[date.getMonth()];//Строковое представление месяца
	// Запись месяца и года в форму
	$('.date-dropdown__calendar').find('.calendar__month')
	.text(monthString + ' ' + year);
	var calendarDay = getCalendarFirstDay(year, month);//Первое число в календаре
	// Запись чисел в календарь
	$('.date-dropdown__calendar').find('.calendar__data').each(function() {
		var data = new Date(year, month, calendarDay).getDate();
		$(this).text(data);
		if (calendarDay < 1 || calendarDay - monthDays > 0) {
			$(this)
			.removeClass('calendar__month-day')
			.addClass('calendar__month-day--deactivated');
		} else {
			$(this)
			.removeClass('calendar__month-day--deactivated')
			.addClass('calendar__month-day');
		}
		calendarDay += 1;
	});
	// Регулировка количества строк и высоты контейнера в зависимости
	// от количества недель в месяце
	if (Number($('.date-dropdown__calendar')
		.find('.calendar__sixth-week div:first-Child').text()) <= 8) {
		$('.calendar__sixth-week').css('display', 'none');
		$('.calendar').css('height', '369px');
	} else {
		$('.calendar__sixth-week').css('display', 'flex');
		$('.calendar').css('height', '409px');
	}
	if (Number($('.date-dropdown__calendar')
		.find('.calendar__fifth-week div:first-Child').text()) === 1) {
		$('.calendar__fifth-week').css('display', 'none');
		$('.calendar').css('height', '329px');
	} else {
		$('.calendar__fifth-week').css('display', 'flex');
	}
	// Метка текущей даты
	var todayDate = new Date();
	if (year == todayDate.getFullYear() && month == todayDate.getMonth()) {
		$('.calendar__month-day').each(function() {
			if (todayDate.getDate() == $(this).text()) {
				$(this).addClass('calendar__month-day--today')
			}
		})
	} else {
		$('.calendar__month-day--today').removeClass('calendar__month-day--today');
	}
}
// Кнопка "следующий месяц"
$('.calendar__btn-next').click(function() {
	// Удаление меток
	$(this).parent().next()
	.find('.calendar__month-day--included')
	.removeClass('calendar__month-day--included')
	.addClass('calendar__month-day');
	$(this).parent().next()
	.find('.calendar__month-day--selected-start')
	.removeClass('calendar__month-day--selected-start')
	.addClass('calendar__month-day');
	$(this).parent().next()
	.find('.calendar__month-day--selected-end')
	.removeClass('calendar__month-day--selected-end')
	.addClass('calendar__month-day');
	$('.calendar__month-day--selected')
	.removeClass('calendar__month-day--selected')
	.addClass('calendar__month-day');
	var monthStr = $(this).prev().text().split(' ')[0];
	var month = months.indexOf(monthStr);
	var year = Number($(this).prev().text().split(' ')[1]);
	month += 1;
	drawCalendar(year, month);
})
// Кнопка "предыдущий месяц"
$('.calendar__btn-prev').click(function() {
	// Удаление меток
	$(this).parent().next()
	.find('.calendar__month-day--included')
	.removeClass('calendar__month-day--included')
	.addClass('calendar__month-day');
	$(this).parent().next()
	.find('.calendar__month-day--selected-start')
	.removeClass('calendar__month-day--selected-start')
	.addClass('calendar__month-day');
	$(this).parent().next()
	.find('.calendar__month-day--selected-end')
	.removeClass('calendar__month-day--selected-end')
	.addClass('calendar__month-day');
	// Для поля конечной даты
	if (
		$(this).closest('.date-dropdown')
		.hasClass('date-dropdown--right-handle') === true
		) {		
		// Проверка на наличие в текущем календаре метки текущей даты
		if (
			$(this).parent().next()
			.find('.calendar__month-day--selected').length < 1
			) {
			// Удаление метки текущей даты
			$('.calendar__month-day--selected')
			.removeClass('calendar__month-day--selected')
			.addClass('calendar__month-day');
			// Данные для отрисовки календаря берем из поля начальной даты
			var monthStr = $(this).next().text().split(' ')[0];
			var month = months.indexOf(monthStr);
			var year = Number($(this).next().text().split(' ')[1]);
			month -= 1;
			// Отрисовка календаря
			drawCalendar(year, month);
		}
		// Метка начальной даты
		var arrival = $(this).closest('.date-dropdown').prev()
		.find('.date-dropdown__input-group').text().split('.');
		var arrivalDay = String(Number(arrival[0]));
		var arrivalMonth = months[Number(arrival[1]) - 1];
		var arrivalYear = String(Number(arrival[2]));
		if ($(this).next().text() === (arrivalMonth + ' ' + arrivalYear)) {
			$(this).parent().next().find('.calendar__month-day').each(function() {
				if ($(this).text() === arrivalDay) {
					$(this).removeClass('calendar__month-day')
					.addClass('calendar__month-day--selected');
				}
			})
		}
	// Для поля начальной даты
	} else {
		// Проверка на наличие в календаре сегодняшней даты
		if (
			$(this).parent().next()
			.find('.calendar__month-day--today').length < 1
		) {
			$('.calendar__month-day--selected')
			.removeClass('calendar__month-day--selected')
			.addClass('calendar__month-day');
			var monthStr = $(this).next().text().split(' ')[0];
			var month = months.indexOf(monthStr);
			var year = Number($(this).next().text().split(' ')[1]);
			month -= 1;
			drawCalendar(year, month);
		}
		
	}
})
// Выбор даты
$('.calendar__data').click(function() {
	var year = $(this).parent().parent().prev().find('.calendar__month')
	.text().split(' ')[1];
	var monthStr = $(this).parent().parent().prev().find('.calendar__month')
	.text().split(' ')[0];
	var month = months.indexOf(monthStr);
	var selectingDay = Number($(this).text());
	var selectingDate = new Date(year, month, selectingDay);
	var todayDate = new Date();
	// Для поля начальной даты
	if (
		$(this).closest('.date-dropdown')
		.hasClass('date-dropdown--right-handle') === false
		) {
		if (
			selectingDate > todayDate && 
			$(this).hasClass('calendar__month-day--deactivated') === false
		) {
			$('.calendar__month-day--selected')
			.removeClass('calendar__month-day--selected')
			.addClass('calendar__month-day');
			$(this)
			.addClass('calendar__month-day--selected')
			.removeClass('calendar__month-day');
		}
	// Для поля конечной даты
	} else {
		// Начальную дату берем из поля начальной даты
		var arrival = $(this).closest('.date-dropdown').prev()
		.find('.date-dropdown__input-group').text().split('.');
		var arrivalDay = Number(arrival[0]);
		var arrivalMonth = Number(arrival[1]) - 1;
		var arrivalYear = Number(arrival[2]);
		var arrivalDate = new Date(arrivalYear, arrivalMonth, arrivalDay);
		// Обрабатываем поля с датой больше начальной
		if (selectingDate > arrivalDate) {
				$(this).closest('.calendar__main')
				.find('.calendar__month-day--selected')
				.removeClass('calendar__month-day--selected')
				.addClass('calendar__month-day');
				$(this).closest('.calendar__main')
				.find('.calendar__month-day--included')
				.removeClass('calendar__month-day--included')
				.addClass('calendar__month-day');
				$(this).closest('.calendar__main')
				.find('.calendar__month-day--selected-start')
				.removeClass('calendar__month-day--selected-start')
				.addClass('calendar__month-day');
				$(this).closest('.calendar__main')
				.find('.calendar__month-day--selected-end')
				.removeClass('calendar__month-day--selected-end')
				.addClass('calendar__month-day');
				$(this).closest('.calendar__main').find('.calendar__month-day')
				.each(function() {
					var iterYear = $(this).closest('.calendar')
					.find('.calendar__month').text().split(' ')[1];
					var iterMonth =  $(this).closest('.calendar')
					.find('.calendar__month').text().split(' ')[0];
					iterMonth = months.indexOf(iterMonth);
					var iterDay = $(this).text();
					var iterDate = new Date(iterYear, iterMonth, iterDay);
					console.log(arrivalDate);
					console.log(iterDate);
					if (arrivalDate < iterDate && selectingDate > iterDate) {
						$(this).removeClass('calendar__month-day')
						.addClass('calendar__month-day--included')
					} else if (arrivalDate.getTime() === iterDate.getTime()) {
						console.log('this');
						$(this).removeClass('calendar__month-day')
						.addClass('calendar__month-day--selected-start');
					} else if (selectingDate.getTime() === iterDate.getTime()) {
						$(this).removeClass('calendar__month-day')
						.addClass('calendar__month-day--selected-end');
					}
				})
		}
	}
})
// Кнопка "очистить"
$('.calendar__btn-clean').click(function() {
	if (
		$(this).closest('.date-dropdown')
		.hasClass('date-dropdown--right-handle') === true
		) {
		$(this).closest('.date-dropdown')
		.find('.calendar__month-day--included')
		.removeClass('calendar__month-day--included')
		.addClass('calendar__month-day');
		$(this).closest('.date-dropdown')
		.find('.calendar__month-day--selected-start')
		.removeClass('calendar__month-day--selected-start')
		.addClass('calendar__month-day');
		$(this).closest('.date-dropdown')
		.find('.calendar__month-day--selected-end')
		.removeClass('calendar__month-day--selected-end')
		.addClass('calendar__month-day');
		// Начальную дату берем из поля начальной даты
		var arrival = $(this).closest('.date-dropdown').prev()
		.find('.date-dropdown__input-group').text().split('.');
		var arrivalDay = String(Number(arrival[0]));
		var arrivalMonth = Number(arrival[1]) - 1;
		var arrivalYear = Number(arrival[2]);
		// Отрисовка календаря
		drawCalendar(arrivalYear, arrivalMonth);
		// Метка начальной даты
		$(this).closest('.date-dropdown').find('.calendar__month-day')
		.each(function() {
			if ($(this).text() === arrivalDay) {
				$(this).removeClass('calendar__month-day')
				.addClass('calendar__month-day--selected');
			}
		})
	} else {
		// Убирает метку о выбранном дне
		$('.calendar__month-day--selected')
		.removeClass('calendar__month-day--selected')
		.addClass('calendar__month-day');
		// Рисует календарь текущего месяца
		var date = new Date();
		var month = date.getMonth();
		var year = date.getFullYear();
		drawCalendar(year, month);
	}
})
// Инициализация переменных
export const months = [
'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];
export const monthsNumber = [
'01', '02', '03', '04', '05', '06', 
'07', '08', '09', '10', '11', '12'
];