import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Greeting from "./Greeting"

describe('Greeting component', () => {

    // FIRST TEST TO SEE IF HELLOW WORLD IN DOC
    test('renders hello world as a text', () => {
        // Arrange
        render(<Greeting />)
    
        // Act
        // ... nothing
    
        // Assert
        const helloWorldElement = screen.getByText(/Hello World/, { exact: false })
        expect(helloWorldElement).toBeInTheDocument()
    })

    // SECOND TEST TO SEE IF INITIAL TEXT IS IN DOC BEFORE BUTTON PRESSED
    test("test for text if button isn't pressed.", () => {
        render(<Greeting />)

        const goodToSeeYouElement = screen.getByText(/good to see you!/, { exact: false })
        expect(goodToSeeYouElement).toBeInTheDocument()
    })

    // THIRD TEST TO SEE IF THE TEXT CHANGES ON BUTTON PRESS
    test("Renders 'Changed!' if the button was clicked", () => {
        // ARRANGE
        render(<Greeting />)

        // ACT
        const buttonElement = screen.getByRole('button')
        userEvent.click(buttonElement)

        // ASSERT
        const changedTextElement = screen.getByText('Changed!')
        expect(changedTextElement).toBeInTheDocument()
    })

    // FOURTH TEST TO MAKE SURE INITIAL TEXT IS NOT PRESENT AFTER BUTTON PRESS
    test("test for initial 'good to see you' text is not in doc after button click", () => {
        // ARRANGE
        render(<Greeting />)

        // ACT
        const buttonElement = screen.getByRole('button')
        userEvent.click(buttonElement)

        // ASSERT
        const initialText = screen.queryByText(/good to see you/, { exact: false })
        expect(initialText).toBeNull()
    })
})
