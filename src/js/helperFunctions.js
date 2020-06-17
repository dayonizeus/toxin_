// Функция для вывода правильного окончания существительного в зависимости от количества
export function caseEnding(number_num, singular_str, singularGenitive_str, pluralGenitive_str) {
	let caseEnding = ''
	if (number_num < 2) {
		caseEnding = singular_str;
	} else if (number_num < 5) {
		caseEnding = singularGenitive_str;
	} else if (number_num < 21) {
		caseEnding = pluralGenitive_str;
	} else if (
		String(number_num)[String(number_num).length - 1] === '1' && 
		String(number_num)[String(number_num).length - 2] + 
		String(number_num)[String(number_num).length - 1] != '11'
		) {
		caseEnding = singular_str;
	} else if (
		String(number_num)[String(number_num).length - 1] === '2' && 
		String(number_num)[String(number_num).length - 2] + 
		String(number_num)[String(number_num).length - 1] != '12' || 
		String(number_num)[String(number_num).length - 1] === '3' && 
		String(number_num)[String(number_num).length - 2] + 
		String(number_num)[String(number_num).length - 1] != '13' || 
		String(number_num)[String(number_num).length - 1] === '4' && 
		String(number_num)[String(number_num).length - 2] + 
		String(number_num)[String(number_num).length - 1] != '14' 
		) {
		caseEnding = singularGenitive_str;
	} else {
		caseEnding = pluralGenitive_str;
	}

	return caseEnding;
}
// Функция для добавления пробела разделяющего длинные цифры
export function spaceInsert(value_str){
	if (value_str.length > 3) {
		value_str = value_str.slice(0, -3) + ' ' + value_str.slice(-3);
	}
	return value_str;
}