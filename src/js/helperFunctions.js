// Функция для вывода правильного окончания существительного в зависимости от количества
export default function caseEnding(number, singular, singularGenitive, pluralGenitive) {
	let caseEnding = ''
	if (number < 2) {
		caseEnding = singular;
	} else if (number < 5) {
		caseEnding = singularGenitive;
	} else if (number < 21) {
		caseEnding = pluralGenitive;
	} else if (
		String(number)[String(number).length - 1] === '1' && 
		String(number)[String(number).length - 2] + 
		String(number)[String(number).length - 1] != '11'
		) {
		caseEnding = singular;
	} else if (
		String(number)[String(number).length - 1] === '2' && 
		String(number)[String(number).length - 2] + 
		String(number)[String(number).length - 1] != '12' || 
		String(number)[String(number).length - 1] === '3' && 
		String(number)[String(number).length - 2] + 
		String(number)[String(number).length - 1] != '13' || 
		String(number)[String(number).length - 1] === '4' && 
		String(number)[String(number).length - 2] + 
		String(number)[String(number).length - 1] != '14' 
		) {
		caseEnding = singularGenitive;
	} else {
		caseEnding = pluralGenitive;
	}

	return caseEnding;
}