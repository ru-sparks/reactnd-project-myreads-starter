import React from "react";
import BookShelfChanger from "./BookShelfChanger";
import { getTitle } from "./getTitle";

const BookShelf = (props) => {
  let page = [];

  props.books.filter(book => book.category === props.category).forEach((book, index) =>
    page.push(
      <li key = {index}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  `url(${book.url})`,
              }}
            />
            <BookShelfChanger key={book.url} bookId={book.url} category={props.category} onChange={props.onChange}></BookShelfChanger>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  );

  if (page.length === 0) {
      return (
          <></>
      )
  }
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{getTitle(props.category)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {page}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
