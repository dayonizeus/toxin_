import $ from 'jquery';
import caseEnding from '../../js/helperFunctions';

// Функция отрисовки круговой диаграммы
function drawChart() {
	$('.satisfaction-chart').each(function() {
		// Присвоение контекста холсту
		var ctx = $(this).find('.satisfaction-chart__graph-border')[0].getContext('2d');
		// Определение общего количества голосов
		var total = Number($(this).find('.satisfaction-chart__total').text());
		// Назначение начала диаграммы
		var graphStart = -0.5 * Math.PI;
		// Инициализация переменных
		var segmentStart = graphStart;
		var segmentEnd =  graphStart;
		var segmentValue = Number();
		var borderStart = Number();
		var borderEnd = Number();
		var borderValue = 0.03;
		var chartRadius = 60;
		// Отрисовка сегментов для каждого назначенного значения
		$(this).find('.satisfaction-chart__grade-value').each(function() {
			ctx.beginPath();
			// Вычисление начала сегмента
			segmentStart = segmentEnd;
			// Вычисление размера сегмента
			segmentValue = Number($(this).text()) / total * 2 * Math.PI;
			// Вычисление конца сегмента
			segmentEnd = segmentStart - segmentValue;
			// Определение сектора в котором находится начало сегмента
			var gradientStart = segmentStart / Math.PI * 2 + 1;
			if (gradientStart <= 0 && gradientStart >= -1) {
				var gradientStartPosition = 'LeftTop';
			} else if (gradientStart <= -1 && gradientStart >= -2) {
				var gradientStartPosition = 'LeftBottom';
			} else if (gradientStart <= -2 && gradientStart >= -3) {
				var gradientStartPosition = 'RightBottom';
			} else {
				var gradientStartPosition = 'RightTop'
			}
			// Определение сектора в котором находится конец сегмента
			var gradientEnd = segmentEnd / Math.PI * 2 + 1;
			if (gradientEnd < 0 && gradientEnd >= -1) {
				var gradientEndPosition = 'LeftTop';
			} else if (gradientEnd < -1 && gradientEnd >= -2) {
				var gradientEndPosition = 'LeftBottom';
			} else if (gradientEnd < -2 && gradientEnd >= -3) {
				var gradientEndPosition = 'RightBottom';
			} else {
				var gradientEndPosition = 'RightTop'
			}
			// Рисуем сегмент
			ctx.arc(chartRadius, chartRadius, chartRadius, segmentStart, segmentEnd, true);
			ctx.lineTo(chartRadius, chartRadius);
			// Определение координат начала и конца градиентной заливки
			if (
				gradientStartPosition === 'LeftTop' &&
				gradientEndPosition === 'LeftTop'
			) {
				var gradientTopY = Math.abs(Math.round(gradientStart * chartRadius));
				var gradientBottomY = chartRadius;
			} else if (
				gradientStartPosition === 'LeftTop' &&
				gradientEndPosition === 'LeftBottom'
			) {
				var gradientTopY = Math.abs(Math.round(gradientStart * chartRadius));
				var gradientBottomY = Math.abs(Math.round(gradientEnd * chartRadius));
			} else if (
				gradientStartPosition === 'LeftTop' &&
				gradientEndPosition === 'RightBottom'
			) {
				var gradientTopY = Math.abs(Math.round(gradientStart * chartRadius));
				var gradientBottomY = chartRadius * 2;
			} else if (
				gradientStartPosition === 'LeftTop' &&
				gradientEndPosition === 'RightTop'
			) {
				var gradientTopY = Math.abs(Math.round(gradientStart * chartRadius));
				var gradientBottomY = chartRadius * 2;
			} else if (
				gradientStartPosition === 'LeftBottom' &&
				gradientEndPosition === 'LeftBottom'
			) {
				var gradientTopY = chartRadius;
				var gradientBottomY = Math.abs(Math.round(gradientEnd * chartRadius));
			} else if ( 
				gradientStartPosition === 'LeftBottom' &&
				gradientEndPosition === 'RightBottom'
			) {
				var gradientTopY = chartRadius;
				var gradientBottomY = chartRadius * 2;
			} else if (
				gradientStartPosition === 'LeftBottom' &&
				gradientEndPosition === 'RightTop'
			) {
				var gradientTopY = Math.abs(Math.round((gradientEnd + 4) * chartRadius));
				var gradientBottomY = chartRadius * 2;
			} else if (
				gradientStartPosition === 'RightBottom' &&
				gradientEndPosition === 'RightBottom'
			) {
				var gradientTopY = chartRadius;
				var gradientBottomY = Math.abs(Math.round((gradientStart + 4) * chartRadius));
			} else if (
				gradientStartPosition === 'RightBottom' &&
				gradientEndPosition === 'RightTop'
			) {
				var gradientTopY = Math.abs(Math.round((gradientEnd + 4) * chartRadius));
				var gradientBottomY = Math.abs(Math.round((gradientStart + 4) * chartRadius));
			} else if (
				gradientStartPosition === 'RightTop' &&
				gradientEndPosition === 'RightTop'
			) {
				var gradientTopY = Math.abs(Math.round((gradientEnd + 4) * chartRadius));
				var gradientBottomY = chartRadius;
			}
			// Оределение градиента заливки
			var gradient = ctx.createLinearGradient(0, gradientTopY, 0, gradientBottomY);
			if ($(this).parent().hasClass('satisfaction-chart__great') === true) {
				gradient.addColorStop(0,"#FFE39C");
				gradient.addColorStop(1,"#FFBA9C");
			} else if ($(this).parent().hasClass('satisfaction-chart__good') === true) {
				gradient.addColorStop(0,"#6FCF97");
				gradient.addColorStop(1,"#66D2EA");
			} else if ($(this).parent().hasClass('satisfaction-chart__satisfactorily') === true) {
				gradient.addColorStop(0,"#BC9CFF");
				gradient.addColorStop(1,"#8BA4F9");
			} else if ($(this).parent().hasClass('satisfaction-chart__unsatisfactorily') === true) {
				gradient.addColorStop(0,"#919191");
				gradient.addColorStop(1,"#3D4975");
			}
			// Заливка сектора градиентом
			ctx.fillStyle = gradient;
			ctx.fill();
			// Отрисовка границы между сегментами
			ctx.beginPath();
			borderStart = segmentEnd + borderValue;
			borderEnd = borderStart - borderValue;
			ctx.arc(chartRadius, chartRadius, chartRadius, borderStart, borderEnd, true);
			ctx.lineTo(chartRadius, chartRadius);
			ctx.fillStyle = 'white';
			ctx.fill();
		})
	})
}

// Функция вставки в диаграмму подписи к общему числу голосов
function insertTotalVoteLabel() {
	$('.satisfaction-chart').each(function() {
		var total = Number($(this).find('.satisfaction-chart__total').text());
		var label = caseEnding(total, "голос", "голоса", "голосов");
		$(this).find('.satisfaction-chart__total-label').text(label);
	})
}


drawChart();
insertTotalVoteLabel();