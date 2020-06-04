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
// Возвращает количества дней в месяце
function totalDays(year, month) {
	var totalDays = 32 - new Date(year, month, 32).getDate();
	return totalDays;
}
// Вставляет в форму данные календаря
function drawCalendar(year, month) {
	date = new Date(year, month);//Получение объекта с данными необходмиого периода
	month = date.getMonth();//Месяц
	year = date.getFullYear();//Год
	var monthDays = totalDays(year, month);//Кол-во дней в месяце
	var monthString = months[date.getMonth()];//Строковое представление месяца
	// Запись месяца и года в форму
	$('.calendar__month').text(monthString + ' ' + year);
	var calendarDay = getCalendarFirstDay(year, month);//Первое число в календаре
	// Запись чисел в календарь
	$('.calendar__data').each(function() {
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
	if (Number($('.calendar__sixth-week div:first-Child').text()) <= 8) {
		$('.calendar__sixth-week').css('display', 'none');
		$('.calendar').css('height', '369px');
	} else {
		$('.calendar__sixth-week').css('display', 'flex');
		$('.calendar').css('height', '409px');
	}
	if (Number($('.calendar__fifth-week div:first-Child').text()) === 1) {
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
// Инициализация переменных
const months = [
'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
// Вставка календаря текущего месяца
drawCalendar(year, month);

// Следующий месяц
$('.calendar__btn-next').click(function() {
	month += 1;
	drawCalendar(year, month);
})
// Предыдущий месяц
$('.calendar__btn-prev').click(function() {
	month -= 1;
	drawCalendar(year, month);
})

// Выбор даты
$('.calendar__data').click(function() {
	var selectingDay = Number($(this).text());
	var selectingDate = new Date(year, month, selectingDay);
	var todayDate = new Date();

	if (selectingDate > todayDate && $(this).hasClass('month-day--deactivated') === false) {
		$('.calendar__month-day--selected')
		.removeClass('calendar__month-day--selected')
		.addClass('calendar__month-day');
		$(this)
		.addClass('calendar__month-day--selected')
		.removeClass('calendar__month-day');
	}
})