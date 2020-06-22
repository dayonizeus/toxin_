import $ from 'jquery';
import {drawCalendar, months} from '../../blocks/calendar/calendar';

// Имитация нажатий на кнопки
$('.text-field-focus').find('.text-field__input-form').focus();
$('.checkbox-buttonsUI').find('.checkbox-button__label').odd().click();
$('.checkbox-buttonsUI').find('.checkbox-button__label').last().click();
$('.radio-buttonsUI').find('label').first().click();
$('.toggle-shmugl').find('label').click();
$('.button-likeUI--selected').click();
$('.reviewUI').find('.button-like').click();
$('.button-darkUI-clicked').css('opacity', '0.5');
$('.button-lightUI-clicked').css('opacity', '0.5');
$('.dropdown-interiorUI-expanded').removeClass('dropdown-interior')
.addClass('dropdown-interior-selected')
$('.dropdown-interiorUI-expanded').find('.dropdown-interior__option-increase').first().click().click();
$('.dropdown-interiorUI-expanded').find('.dropdown-interior__option-increase').odd().click().click();
$('.dropdown--selected2UI').removeClass('dropdown').addClass('dropdown--selected')
.find('.dropdown__option-increase').first().click().click();
$('.dropdown--selected2UI').find('.dropdown__option-increase').odd().click();
$('.dropdown--selected2UI').find('.dropdown__options-apply').click();
$('.expandable-checkbox-list--selectedUI').find('.expandable-checkbox-list__button:nth-child(2)')
.find('.checkbox-button__label').click();
$('.expandable-checkbox-list--selectedUI').find('.expandable-checkbox-list__button:nth-child(3)')
.find('.checkbox-button__label').click();
$('.expandable-checkbox-list--selectedUI').find('.expandable-checkbox-list__button:nth-child(4)')
.find('.checkbox-button__label').click();
// Разворачивание выпадающих меню
$('.dropdown--selectedUI').removeClass('dropdown').addClass('dropdown--selected');
$('.dropdown--selected2UI').removeClass('dropdown').addClass('dropdown--selected');
$('.dropdown-interiorUI-expanded').removeClass('dropdown-interior')
.addClass('dropdown-interior-selected');
$('.expandable-checkbox-list--selectedUI').removeClass('expandable-checkbox-list').
addClass('expandable-checkbox-list--selected');
// Отрисовка календаря
drawCalendar(2019, 7);