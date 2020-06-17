import $ from 'jquery';
import {caseEnding, spaceInsert} from '../../js/helperFunctions';

// Подсчет количества дней пребывания
function getTotalDays(event){
	var departure = $(event).closest('.date-dropdown')
	.find('.date-dropdown__input-form').text().split('.');
	departure = new Date
	(Number(departure[2]), Number(departure[1]) - 1, Number(departure[0]));
	var arrival = $(event).closest('.date-dropdown').prev()
	.find('.date-dropdown__input-form').text().split('.');
	arrival = new Date(Number(arrival[2]), Number(arrival[1]) - 1, Number(arrival[0]));
	var totalDays = (departure - arrival);
	totalDays = totalDays/86400000;
	return totalDays;
}
// Подсчет цены за номер
function getTotalPrice(event){
	var dayPrice = Number($(event).closest('.card-confirmatrion__time')
	.prev().find('.card-confirmation__day-price-number').text().replace(' ', ''));
	var totalDays = getTotalDays(event);
	var fee = Number($(event).closest('.card-confirmatrion__time').next().next()
	.find('.card-confirmation__service-charge-sum').text().replace('₽', ''));
	var discount = $(event).closest('.card-confirmatrion__time').next().next()
	.find('.card-confirmation__service-charge-title-text').text();
	if (discount.length > 0) {
		discount = discount.replace('скидка', '');
		discount = discount.replace('₽', '');
		discount = discount.trim();
		discount = Number(discount.replace(' ', ''));
	} else {
		discount = 0;
	}
	var additionalFee = Number($(event).closest('.card-confirmatrion__time').next().next()
	.find('.card-confirmation__additional-services-sum').text().replace('₽', ''))
	var totalPrice = dayPrice * totalDays + fee + additionalFee - discount;
	return totalPrice;
}

export function setPrice(event) {
	var dayPrice = Number($(event).closest('.card-confirmatrion__time').prev()
	.find('.card-confirmation__day-price-number').text().replace(' ', ''));
	var dayPriceString = $(event).closest('.card-confirmatrion__time').prev()
	.find('.card-confirmation__day-price-number').text();
	var totalDays = getTotalDays(event);
	var daysLabel = caseEnding(totalDays, 'сутки', 'суток', 'суток');
	var priceCalculation = `${dayPriceString}₽ x ${totalDays} ${daysLabel}`
	$(event).closest('.card-confirmatrion__time').next().next()
	.find('.card-confirmation__for-days-title').text(priceCalculation);
	var priceCalculationTotal = `${spaceInsert(String(dayPrice * totalDays))}₽`;
	$(event).closest('.card-confirmatrion__time').next().next()
	.find('.card-confirmation__for-days-sum').text(priceCalculationTotal);
	var totalPriceString = `${spaceInsert(String(getTotalPrice(event)))}₽`;
	$(event).closest('.card-confirmatrion__time').next().next().next()
	.find('.card-confirmation__total-sum').text(totalPriceString);
}

// Добавление пробела в отображении цены в верхнем правом углу
$('.card-confirmation__day-price-number').each(function() {
	$(this).text(spaceInsert($(this).text()));
})

// Форматирование поля скидки
$('.card-confirmation__service-charge-title-text').each(function() {
	var discount = Number($(this).text());
	if (discount > 0) {
		var discountString = `скидка ${spaceInsert($(this).text())}₽`;
	} else {
		var discountString = '';
	}
	$(this).text(discountString);
})
// Форматирование поля "Сбор за услуги"
$('.card-confirmation__service-charge-sum').each(function() {
	var fee = `${spaceInsert(Number($(this).text()))}₽`;
	$(this).text(fee);
})

// Форматирование поля "Сбор за дополнительные услуги"
$('.card-confirmation__additional-services-sum').each(function() {
	var fee = `${spaceInsert(Number($(this).text()))}₽`;
	$(this).text(fee);
})