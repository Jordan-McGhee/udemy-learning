import { useParams, Route, Link, useRouteMatch } from "react-router-dom"
import { Fragment } from "react"

import Comments from "../components/comments/Comments"
import HighlightedQuote from "../components/quotes/HighlightedQuote"

const DUMMY_QUOTES = [
    { id: "q1", author: "Jordan", text: "Learning React is fun!"},
    { id: "q2", author: "Tori", text: "Learning React is ass!"}
]

const QuoteDetail = () => {

    const match = useRouteMatch()

    const params = useParams()

    const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteID)

    if (!quote) {
        return (
            <p>No quote found!</p>
        )
    }

    return (
        <Fragment>

            <HighlightedQuote text = { quote.text} author = { quote.author} />

            <Route path={match.path} exact>

                <div className="centered">
                    <Link to={`${match.url}/comments`} className="btn--flat">Load Comments</Link>
                </div>
                
            </Route>

            <Route path = {`${match.path}/comments`} >

                <div className="centered">
                    <Link to={`${match.url}`} className="btn--flat">Hide Comments</Link>
                </div>

                <Comments />
            </Route>

        </Fragment>
    )
}

export default QuoteDetail