import { useState } from "react";
import CalcDisplay from "../CalcDisplay";
import CalcButton from "../CalcButton";

export default function Calculator() {
	const [overridableDisplayText, setOverridableDisplayText] = useState("0")
	const [realDisplayText, setRealDisplayText] = useState("");
	const displayText = realDisplayText.length === 0 ? overridableDisplayText : realDisplayText;
	const [operation, setOperation] = useState("");
	const [ans, setAns] = useState("")

	/**
		* Generates the on click handler for a number button.
		* @param {string} appendValue - The value to append in the display.
		*/
	const genNumberClick = (appendValue) => {
		return () => {
			setRealDisplayText(realDisplayText + appendValue)
		}
	}

	/**
		* Clears the calculator state.
		*/
	const onClearPressed = () => {
		setAns("");
		setRealDisplayText("");
		setOverridableDisplayText("0");
		setOperation("")
	}

	/**
		* @returns {string}
		*/
	const computeResult = (a, b, operation) => {
		try {
			let result;
			if (operation === "+") {
				result = a + b;
			} else if (operation === "-") {
				result = a - b;
			} else if (operation === "/") {
				result = a / b;
			} else if (operation === "*") {
				result = a * b;
			} else {
				return "OpErr"
			}

			if (isNaN(result)) {
				return "MathErr"
			} else {
				return result.toString()
			}
		} catch (err) {
			console.error(err)
			return "MathErr"
		}
	}

	/**
		* Computes the result of the operation.
		*/
	const onComputeClick = () => {
		const a = parseFloat(ans);
		const b = parseFloat(realDisplayText);
		const result = computeResult(a, b, operation)
		if (!result.includes("Err")) {
			onClearPressed()
		}
		setOverridableDisplayText(result);
	}

	/**
		* Generates the onClick handler for an operand.
		* @param {string} operand - One of (+ - * /). Depending on the operation
		*/
	const operandClick = (operand) => {
		return () => {
			if (ans.length !== 0) {
				const result = computeResult(parseFloat(ans), parseFloat(realDisplayText), operation)
				setAns(result)
				setOverridableDisplayText(result)
			} else {
				setAns(realDisplayText)
				setOverridableDisplayText("")
			}

			setRealDisplayText("")
			setOperation(operand)
		}
	}

	const calcRowStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "stretch"
	};
	const calcStyle = {
		display: "flex",
		flexDirection: "column"
	}
	return <div>
		<CalcDisplay text={displayText} />
		<div style={calcStyle}>
			<CalcButton text="Clear" onClick={onClearPressed} />
			<div style={calcRowStyle}>
				<CalcButton text="7" onClick={genNumberClick("7")} />
				<CalcButton text="8" onClick={genNumberClick("8")} />
				<CalcButton text="9" onClick={genNumberClick("9")} />
				<CalcButton text="/" onClick={operandClick("/")} />
			</div>

			<div style={calcRowStyle}>
				<CalcButton text="4" onClick={genNumberClick("4")} />
				<CalcButton text="5" onClick={genNumberClick("5")} />
				<CalcButton text="6" onClick={genNumberClick("6")} />
				<CalcButton text="*" onClick={operandClick("*")} />
			</div>

			<div style={calcRowStyle}>
				<CalcButton text="1" onClick={genNumberClick("1")} />
				<CalcButton text="2" onClick={genNumberClick("2")} />
				<CalcButton text="3" onClick={genNumberClick("3")} />
				<CalcButton text="-" onClick={operandClick("-")} />
			</div>

			<div style={calcRowStyle}>
				<CalcButton text="." onClick={genNumberClick(".")} />
				<CalcButton text="0" onClick={genNumberClick("0")} />
				<CalcButton text="=" onClick={onComputeClick} />
				<CalcButton text="+" onClick={operandClick("+")} />
			</div>
		</div>
	</div>
}
