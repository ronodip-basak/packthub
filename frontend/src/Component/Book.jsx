import { Highlight, Snippet } from "react-instantsearch-dom";

export default function Book({
    hit
}) {
    return (
        <div >
            
            <img src={hit.image} style={{maxWidth: '100%'}} align="left" alt={hit.title} />
            <div className="hit-name">
                <Highlight attribute="title" hit={hit} />
            </div>
            <div className="hit-description">
                <Snippet attribute="description" hit={hit} />
            </div>
            <div className="hit-info">ISBN: {hit.isbn}</div>
            <div className="hit-info">Publish Date: {hit.published_on}</div>
            <div className="hit-info">Author: {hit.authors.map((author, index) => <small key={index}>{author} {index != 0 ? '|' : ''}</small>)}</div>
            <div className="hit-info">Genre: {hit.genres.map((genre, index) => <small key={index}>{genre} {index != 0 ? '|' : ''}</small>)}</div>
        </div>
    )
}