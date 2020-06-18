import $ from 'jquery';

// Смена виджета регистрации на виджет входа по клику на "Войти"
$('.card-registration__footer-button').click(function() {
	$(this).closest('.access__main--registration')
	.css('display', 'none').next().css('display', 'block');
})

// Смена виджета входа на виджет регистрации по клику на "Создать"
$('.card-login__footer-button').click(function() {
	$(this).closest('.access__main--login')
	.css('display', 'none').prev().css('display', 'block');
})