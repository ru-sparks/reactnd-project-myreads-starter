import React from "react";
import cloneDeep from "lodash/cloneDeep";
import "./App.css";
import BookShelf from "./BookShelf";
import initialBooks from "./initialBooks";
import bookShelfCategories from "./bookShelfCategories";
import { Link } from "react-router-dom";

class ListBooks extends React.Component {
  handleChange = (event) => {
    let updateBooks = cloneDeep(this.state.books);

    let book = updateBooks.find((book) => book.url === event.target.id);

    if (book !== undefined) {
      book.category = event.target.value;
      this.setState({
        showSearchPage: false,
        books: updateBooks,
      });
    }
  };

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: initialBooks,
  };

  render() {
    let page = [];
    bookShelfCategories.forEach((category, index) =>
      page.push(
        <BookShelf
          key={index}
          category={category}
          books={this.state.books}
          onChange={this.handleChange}
        />
      )
    );

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">{page}</div>
          <div className="open-search">
            <Link to="/search">
              <button>
                Add a book
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;
