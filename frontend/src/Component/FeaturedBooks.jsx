import BookComponent from "./BookComponent"

export default function FeaturedBooks({ books }) {
    return (
        <div className="mt-4">
            <p className="text-center fs-4">Featured Books</p>
            <div className="container ais-Hits-list mt-4">
                {books.map((book, index) => {
                    return (
                        <BookComponent
                            key={index}
                            book={book}
                        />
                    )
                })}
            </div>
        </div>

    )
}