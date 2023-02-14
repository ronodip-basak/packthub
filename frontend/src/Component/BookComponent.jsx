import "instantsearch.css/themes/algolia-min.css";

export default function BookComponent({
    book
}) {
    return (



        <li className="ais-Hits-item">
            <div>
                <img src={book.image} style={{ maxWidth: '100%' }} alt={book.title} align="left" />
                <div className="hit-name">
                    <span className="ais-Highlight">
                        <span className="ais-Highlight-nonHighlighted">{book.title}
                        </span>
                    </span>
                </div>
                <div className="hit-description">
                    <span className="ais-Snippet">
                        <span className="ais-Snippet-nonHighlighted">{book.description.substring(0, 50)}...</span>
                    </span>
                </div>
                <div className="hit-info">ISBN: {book.isbn}
                </div>
                <div className="hit-info">Publish Date: {book.published_on}
                </div>
                <div className="hit-info">Author:
                    {book.authors.map((author, index) => <small key={index}>{author} {index != 0 ? '|' : ''}</small>)}
                </div>
                <div className="hit-info">Genre:
                    {book.genres.map((genre, index) => <small key={index}>{genre} {index != 0 ? '|' : ''}</small>)}
                </div>
            </div>
        </li>
    )
}