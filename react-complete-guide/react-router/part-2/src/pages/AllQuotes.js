import QuoteList from "../components/quotes/QuoteList"

const DUMMY_QUOTES = [
    { id: "q1", author: "Jordan", text: "Learning React is fun!"},
    { id: "q2", author: "Tori", text: "Learning React is ass!"}
]

const AllQuotes = () => {
    return (
        <QuoteList quotes = { DUMMY_QUOTES } />
    )
}

export default AllQuotes