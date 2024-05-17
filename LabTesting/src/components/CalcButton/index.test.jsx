import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, vi, expect } from "vitest"
import CalcButton from '.'

describe('Calculator Button tests', () => {
	test("Click works", async () => {
		const btnText = "Click me!"
		const textBtnSpy = vi.fn()
		const numberBtnSpy = vi.fn()

		const { getByText } = render(
			<div>
				<CalcButton onClick={textBtnSpy} text={btnText} />
				<CalcButton onClick={numberBtnSpy} text={"1"} />
			</div>
		)
		const textBtnElem = getByText(btnText)
		const numberBtnElem = getByText("1")

		fireEvent.click(textBtnElem)
		fireEvent.click(numberBtnElem)

		expect(textBtnSpy).toHaveBeenCalled()
		expect(numberBtnSpy).toHaveBeenCalled()
	})
})
