import { describe, test, expect } from "vitest"
import { render } from "@testing-library/react"
import CalcDisplay from ".";

describe("Calculator display test suite", () => {
	test("9 Max display chars", () => {
		const text = "HELLLOOOOOOOOOOOOOO"
		const { getAllByText } = render(<CalcDisplay text={text} />)

		const elems = getAllByText('O')
		expect(elems).toBeDefined()
		expect(elems.length).toBeDefined()
		expect(elems.length).toEqual(4)
	})

	test("Display 0 when input is empty", () => {
		const text = ""
		const { getAllByText } = render(<CalcDisplay text={text} />)

		const elems = getAllByText('0')
		expect(elems).toBeDefined()
		expect(elems.length).toBeDefined()
		expect(elems.length).toEqual(1)
	})
})

