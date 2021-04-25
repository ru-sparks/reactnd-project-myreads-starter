import React from "react";
import cloneDeep from "lodash/cloneDeep";
import "./App.css";
import BookShelf from "./BookShelf";
import bookShelfCategories from "./bookShelfCategories";
import { Link } from "react-router-dom";
import { getAll, update } from "./BooksAPI";

class ListBooks extends React.Component {
  handleChange = (event) => {
    let updateBooks = cloneDeep(this.state.books);

    let book = updateBooks.find((book) => book.id === event.target.id);
    if (book !== undefined) {
      book.shelf = event.target.value;
      update(book, book.shelf);
      this.setState({
        books: updateBooks,
      });
    }
  };

  state = {
    books: [],
  };

  componentDidMount() {
    getAll().then((bookList) => {
      if (Array.isArray(bookList)) {
        this.setState({
          books: bookList,
        });
      }
    });
  }
  render() {
    let page = [];
    bookShelfCategories.forEach((category, index) => {
      if (category !== 'none') {
        page.push(
          <BookShelf
            key={index}
            category={category}
            books={this.props.books !== undefined ? this.props.books : this.state.books}
            onChange={this.handleChange}
            showShelfChanger = {this.props.showSearchLink}
          />
        );
      }
    });

    let link = <></>;
    if (this.props.showSearchLink) {
      link = (
        <div className="open-search">
          <Link to="/search">
            <button title="Add a book" />
          </Link>
        </div>
      );
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">{page}</div>
        {link}
      </div>
    );
  }
}

export default ListBooks;
