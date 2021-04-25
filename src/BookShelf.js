import React from "react";
import BookShelfChanger from "./BookShelfChanger";
import { getTitle } from "./getTitle";

const BookShelf = (props) => {
  let page = [];
  props.books
    .filter(
      (book, arrayIndex) =>
        book.shelf === props.category ||
        (book.shelf === undefined && props.category === "none")
    )
    .forEach((book, index) => {
      page.push(
        <li key={index}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                }}
              />
              <BookShelfChanger
                key={book.id}
                bookId={book.id}
                category={props.category}
                onChange={props.onChange}
              />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
              {Array.isArray(book.authors)
                ? book.authors.join(", ")
                : "Editors"}
            </div>
          </div>
        </li>
      );
    });

  if (page.length === 0 && props.category !== "none") {
    return <></>;
  }
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {props.category === "none"
            ? "Search Results"
            : getTitle(props.category)}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">{page}</ol>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
