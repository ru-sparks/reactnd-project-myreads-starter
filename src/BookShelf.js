import React from "react";

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
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
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
        <h2 className="bookshelf-title">{props.category}</h2>
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
