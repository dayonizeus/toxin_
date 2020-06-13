import $ from 'jquery';
import caseEnding from '../../js/helperFunctions';

function setReviewRecency() {
	$('.review__recency').each(function() {
		// Получаем значение давности отзыва
		var recency = Number($(this).attr('value'));
		// Вычисляем правильную подпись
		if (recency < 1) {
			var recencyLabel = 'Сегодня';
		} else if (recency < 7) {
			var recencyLabel = 
			`${recency} ${caseEnding(recency, "день", "дня", "дней")} назад`;
		} else if (recency < 14) {
			var recencyLabel = 'Неделю назад';
		} else if (recency < 30) {
			var recencyLabel =
			`${Math.round(recency / 7)} недели назад`;
		} else if (recency < 60) {
			var recencyLabel = 'Месяц назад';
		} else if (recency < 365) {
			var recencyLabel =
			`${Math.round(recency / 30)} ${caseEnding(Math.round(recency / 30), "месяц", "месяца", "месяцев")} назад`;
		} else {
			var recencyLabel = 'Более года назад'
		}
		// Записываем получившееся значение в поле давности отзыва
		$(this).text(recencyLabel);
	})
}	

setReviewRecency();