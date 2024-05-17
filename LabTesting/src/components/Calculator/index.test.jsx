import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, vi, expect } from "vitest"
import Calculator from '.'

describe('Calculator tests', () => {
	test("Number buttons work", () => {
		const dom = render(<Calculator />)

		let calculatorsElems = dom.getAllByText("1")
		expect(calculatorsElems.length).toEqual(1);

		const oneBtnElem = dom.getByText("1")
		fireEvent.click(oneBtnElem)

		calculatorsElems = dom.getAllByText("1")
		expect(calculatorsElems.length).toEqual(2);
	})

	test("Can add numbers", () => {
		const dom = render(<Calculator />)

		const oneBtnElem = dom.getByText("1")
		const addBtnElem = dom.getByText("+")
		const equalsBtnElem = dom.getByText("=")

		fireEvent.click(oneBtnElem)
		fireEvent.click(addBtnElem)
		fireEvent.click(oneBtnElem)
		fireEvent.click(equalsBtnElem)

		const resultElems = dom.getAllByText("2");
		expect(resultElems.length).toEqual(2);
	})

	test("Operation can be computed without pressing =", () => {
		const dom = render(<Calculator />)

		const oneBtnElem = dom.getByText("1")
		const addBtnElem = dom.getByText("+")

		fireEvent.click(oneBtnElem)
		fireEvent.click(addBtnElem)
		fireEvent.click(oneBtnElem)
		fireEvent.click(addBtnElem)

		const resultElems = dom.getAllByText("2");
		expect(resultElems.length).toEqual(2);
	})
})
