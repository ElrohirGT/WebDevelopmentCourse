/**
	* @typedef {Object} CalculatorButtonProps
	* @property {Function} onClick - Function that get's called when the button is clicked.
	* @property {string} text - The text to display
	*/

/**
	* A calculator button.
	* @param {CalculatorButtonProps} props 
	*/
export default function CalcButton({ onClick, text }) {
	const isNotANumber = isNaN(parseInt(text));
	const baseStyles = {
		padding: "1rem",
		borderWidth: 0,
		fontWeight: "bold",
		fontFamily: "monospace",
		fontSize: "2rem",
		flexGrow: 1
	};

	const conditionalStyles = isNotANumber ? {
		backgroundColor: "red",
		color: "white"
	} : {}

	const styles = { ...baseStyles, ...conditionalStyles }
	return <button onClick={onClick} style={styles}>
		{text}
	</button>
}
