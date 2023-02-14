import { useState } from "react"
import Book from "./Book"
import BookComponent from "./BookComponent"

export default function FeaturedGenres({ genres }) {
    const [activeGenre, setActiveGenre] = useState(genres[0] ?? {})

    return (
        <div className="mt-4">
            <p className="text-center fs-4">Featured Genres</p>
            <ul className="nav nav-tabs nav-fill">
                {genres.map((genre, index) => {
                    return (
                        <li key={index} onClick={() => setActiveGenre(genres[index])} className="nav-item" >
                            <a className={`nav-link ${activeGenre.id == genre.id ? 'active' : ''}`} aria-current="page" href="#!">{genre.title}</a>
                        </li>
                    )
                })}

            </ul>


            {activeGenre &&
                <div className="container ais-Hits-list mt-4">
                    {activeGenre.books.map((book, index) => {
                        return (
                            <BookComponent
                                book={book}
                                key={index}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}