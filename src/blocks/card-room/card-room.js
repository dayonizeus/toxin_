import $ from 'jquery';
import {caseEnding} from '../../js/helperFunctions';

$('.card-room_reviews-quantity').each(function() {
	var reviewsQuantity = Number($(this).text());
	var reviewLabel = caseEnding(reviewsQuantity, 'Отзыв', 'Отзыва', 'Отзывов');
	$(this).next().text(reviewLabel);
})