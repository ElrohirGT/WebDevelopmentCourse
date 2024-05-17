import "./index.css"


/**
	* @typedef {Object} CalcDisplayProps
	* @property {string} text
	*/

/**
	* @param {CalcDisplayProps} props
	*/
export default function CalcDisplay({ text }) {
	const displayText = text.toUpperCase().substring(0, 9)
	const styles = {
		backgroundColor: "black",
		padding: ".5rem",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
	}
	return <div style={styles}>
		{
			displayText.split("").map(c => <CalcDisplayChar char={c} />)
		}
	</div>
}

function CalcDisplayChar({ char }) {
	const styles = {
		color: "red",
		fontWeight: "bold",
		fontFamily: "Calculator, monospace",
		fontSize: "10rem",
		margin: 0,
	};
	return <p style={styles}>{char}</p>
}
