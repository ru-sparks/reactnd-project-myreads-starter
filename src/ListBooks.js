import React from "react";
import "./App.css";
import BookShelf from "./BookShelf";
import bookShelfCategories from "./bookShelfCategories";
import { Link } from "react-router-dom";

class ListBooks extends React.Component {
  render() {
    let page = [];
    bookShelfCategories.forEach((category, index) => {
      if (category !== 'none') {
        page.push(
          <BookShelf
            key={index}
            category={category}
            books={this.props.books}
            onChange={this.props.onChange}
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
