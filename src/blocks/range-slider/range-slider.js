import $ from 'jquery';

// Обработчик бегунков
$(document).mousedown(function(event) {
	// Правый бегунок
	if ($(event.target).hasClass('range-slider__right-marker') === true) {
		// Позиция начала шкалы
		var scaleStart = $(event.target).parent().offset().left;
		// Вычисление пределов движения бегунка
		var scaleLeftSide = $(event.target).parent().offset().left;
		var scaleWidth = Number($(event.target).parent()
		.css('width').replace('px', ''));
		var rightLimit = scaleLeftSide + scaleWidth - 16 - scaleStart;
		var leftLimit = $(event.target).prev().prev()
		.offset().left + 4 - scaleStart + 10;
		// Обработчик движения бегунка
		$(this).mousemove(function(eventCursor) {
			// Вычисление позиции курсора
			var cursorPosition = eventCursor.pageX;
			// Центрирование бегунка относительно курсора
			var newElemPosition = cursorPosition - scaleStart;
			// Движение бегунка
			if(newElemPosition < rightLimit && newElemPosition > leftLimit ) {
				$(event.target).css('left', newElemPosition);
				// Изменение шкалы между бегунками
				var mercuryWidth = String(newElemPosition + 26 - leftLimit) + 'px';
				$(event.target).prev().css('width', mercuryWidth);
				// Вычисление цены для отображения
				var elemPosition = $(event.target).position().left;
				var maxPrice = String(elemPosition * 100 + 100);
				// Нормализация внешнего вида цены
				if (maxPrice.length > 3) {
					maxPrice = maxPrice.slice(0, -3) + ' ' + maxPrice.slice(-3);
				}
				// Запись цены
				$(event.target).closest('.range-slider__main').prev()
				.find('.range-slider__top-price').text(maxPrice);
			}
		})
	// Левый бегунок
	} else if ($(event.target).hasClass('range-slider__left-marker') === true) {
		// Позиция начала шкалы
		var scaleStart = $(event.target).parent().offset().left;
		// Вычисление пределов движения бегунка
		var leftLimit = $(event.target).parent()
		.offset().left - 2 - scaleStart;
		var rightLimit = $(event.target).next().next()
		.offset().left - 16 - scaleStart;
		// Обработчик движения бегунка
		$(this).mousemove(function(eventCursor) {
			// Вычисление позиции курсора
			var cursorPosition = eventCursor.pageX;
			// Центрирование бегунка относительно курсора
			var newElemPosition = cursorPosition - scaleStart;
			// Движение бегунка
			if(newElemPosition < rightLimit && newElemPosition > leftLimit ) {
				$(event.target).css('left', newElemPosition);
				// Изменение шкалы между бегунками
				$(event.target).next().css('left', newElemPosition + 1);
				var mercuryWidth = String(rightLimit + 26 - newElemPosition) + 'px';
				$(event.target).next().css('width', mercuryWidth);
				// Вычисление цены для отображения
				var elemPosition = $(event.target).position().left;
				var minPrice = String(elemPosition * 100 + 100);
				// Нормализация внешнего вида цены
				if (minPrice.length > 3) {
					minPrice = minPrice.slice(0, -3) + ' ' + minPrice.slice(-3);
				}
				// Запись значения цены
				$(event.target).closest('.range-slider__main').prev()
				.find('.range-slider__lower-price').text(minPrice);
			}
		})
	}
	// Удаление обработчика движения при отпускании кнопки
	$(this).mouseup(function() {
		$(this).off('mousemove');
	})
})
// Функция установки начальных параметров виджета
function rangeSliderInitializing() {
	// Включение шкалы
	$(document).find('.range-slider__scale').css('display', 'flex');
	// Левый бегунок
	$(document).find('.range-slider__lower-price').each(function(){
		var lowerPrice = Number($(this).text().replace(' ', ''));
		var leftMarkerPosition = lowerPrice / 100 - 1;
		$(this).closest('.range-slider__header').next()
		.find('.range-slider__left-marker')
		.css('left', String(leftMarkerPosition) + 'px');
	})
	// Правый бегунок
	$(document).find('.range-slider__top-price').each(function() {
		var topPrice = Number($(this).text().replace(' ', ''));
		var rightMarkerPosition = topPrice / 100 - 1;
		$(this).closest('.range-slider__header').next()
		.find('.range-slider__right-marker')
		.css('left', String(rightMarkerPosition) + 'px');
	})
	// Шкала между бегунками
	$(document).find('.range-slider__delimiter').each(function() {
		var lowerPrice = Number($(this).prev()
		.find('.range-slider__lower-price').text().replace(' ', ''));
		var leftMarkerPosition = lowerPrice / 100 + 1;
		var topPrice = Number($(this).next()
		.find('.range-slider__top-price').text().replace(' ', ''));
		var rightMarkerPosition = topPrice / 100 + 1;
		var mercuryWidth = rightMarkerPosition - leftMarkerPosition;
		var mercuryStyle = {
			left: String(leftMarkerPosition) + 'px',
			width: String(mercuryWidth) + 'px'
		}
		$(this).closest('.range-slider__header').next()
		.find('.range-slider__mercury').css(mercuryStyle);
	})
}

rangeSliderInitializing();