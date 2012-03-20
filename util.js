var NOP = function() {}

function indexOfMin(array) {
	var iMin = 0;

	for(var i = 0; i < array.length; ++i) {
		if(array[i] < array[iMin]) {
			iMin = i;
		}
	}

	return iMin;
}