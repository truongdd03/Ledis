/**
 * Display the prompt to the window
 */
export function display(prompt, color) {
	var p = document.createElement('p');
	p.textContent = `> ${prompt}`;
	p.className = "output";
	p.style.color = color;
	document.getElementById('window').appendChild(p);
	// Auto scroll to the bottom
	document.getElementById('window').scrollTop = document.getElementById('window').scrollHeight;
}

/**
 * Display the prompt when the number of parameters is invalid
 */
function displayInvalidParams(given, expected) {
	display(`ERROR: wrong number of arguments (given ${given}, expected ${expected})`, "red");
}

/**
 * Display in green color
 */
export function displayOk(prompt = "OK") {
	display(prompt, "green");
}

/**
 * Display in red color
 */
export function displayError(prompt = "ERROR: Command not found") {
	display(prompt, "red");
}

/**
 * Display the prompt of invalid type
 */
export function displayInvalidType(expected) {
	display(`ERROR: Invalid type (Cannot perform this command since the current key is assigned to a ${expected})`, "red");
}

/**
 * Check if the inputs is valid for set queries
 */
export function validateSetQuery(inputArr, expect, canBeGreater, dict) {
	if (!validateParams(inputArr, expect, canBeGreater)) {
		return false;
	}

	const key = inputArr[1];
	if (typeof (dict[key]) === 'string') {
		displayInvalidType("string");
		return false;
	}
	return true;
}

/**
 * Check if the number of parameters is valid
 */
export function validateParams(inputArr, expect, canBeGreater) {
	if ((canBeGreater && inputArr.length - 1 < expect) || (!canBeGreater && inputArr.length != expect)) {
		var paramStr = expect - 1;
		if (canBeGreater) {
			paramStr = `>= ${expect}`;
		}
		displayInvalidParams(inputArr.length - 1, paramStr);
		return false;
	}
	return true;
}