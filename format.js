function formatDate(event) {
	function isThisYear(date) { return date.getFullYear() == new Date().getFullYear(); }

	if (event['date']) {
		var date = event['date'];
		if (typeof(date) == 'string') {
			return date;
		} else {
			return date.toString(isThisYear(date) ? 'dd MMM' : 'dd MMM yyyy');
		}
	} else {
		var from = event['date-from'];
		var to = event['date-to'];
		
		if (from.getFullYear() != to.getFullYear()) {
			// Hope this never happens
			return from.toString(isThisYear(from) ? 'dd MMM' : 'dd MMM yyyy') + 
				' — ' + to.toString(isThisYear(from) ? 'dd MMM' : 'dd MMM yyyy');
		} else {
			var format = isThisYear(from) ? 'dd MMM' : 'dd MMM yyyy';
		
			if (from.getMonth() != to.getMonth()) {
				return from.toString('dd MMM') + ' — ' + to.toString(format);
			} else {
				return from.toString('dd') + '-' + to.toString(format);
			}
		}
	}
}
