export function calculateDateAgo(date: Date) {
	const today = new Date();
	let differenceString = '';

	// Date is future
	if (today < date) {
		const yearsInBetween = date.getFullYear() - today.getFullYear();
		const monthsInBetween = date.getMonth() - today.getMonth();
		const daysInBetween = date.getDate() - today.getDate();

		if (yearsInBetween === 0 && monthsInBetween === 0) {
			if (daysInBetween === 0) {
				differenceString = `Today`;
			} else if (daysInBetween === 1) {
				differenceString = `in 1 day`;
			} else {
				differenceString = `in ${daysInBetween} days`;
			}
		} else if (yearsInBetween === 0 && monthsInBetween < 2 && monthsInBetween >= 1) {
			differenceString = `in 1 mth`;
		} else if (yearsInBetween === 0 && monthsInBetween >= 2) {
			differenceString = `in ${monthsInBetween} mths`;
		} else if (yearsInBetween >= 1 && yearsInBetween < 2) {
			differenceString = `in 1 yr`;
		} else if (yearsInBetween >= 2) {
			// Several years
			//Check number of months
			if (monthsInBetween >= 11) {
				differenceString = `in ${yearsInBetween + 1} yrs`;
			} else {
				differenceString = `in ${yearsInBetween} yrs`;
			}
		}
	}

	// Date is in the past
	if (today > date) {
		const yearsInBetween = today.getFullYear() - date.getFullYear();
		const monthsInBetween = today.getMonth() - date.getMonth();
		const daysInBetween = today.getDate() - date.getDate();

		if (yearsInBetween === 0 && monthsInBetween === 0) {
			if (daysInBetween === 0) {
				differenceString = `Today`;
			} else if (daysInBetween === 1) {
				differenceString = `1 day ago`;
			} else {
				differenceString = `${daysInBetween} days ago`;
			}
		} else if (yearsInBetween === 0 && monthsInBetween < 2 && monthsInBetween >= 1) {
			differenceString = `1 mth ago`;
		} else if (yearsInBetween === 0 && monthsInBetween >= 2) {
			differenceString = `${monthsInBetween} mths ago`;
		} else if (yearsInBetween >= 1 && yearsInBetween < 2) {
			differenceString = `1 yr ago`;
		} else if (yearsInBetween >= 2) {
			// Several years
			//Check number of months
			if (monthsInBetween >= 11) {
				differenceString = `${yearsInBetween + 1} yrs ago`;
			} else {
				differenceString = `${yearsInBetween} yrs ago`;
			}
		}
	}

	return differenceString;
}
