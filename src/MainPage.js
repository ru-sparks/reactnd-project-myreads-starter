import React from "react";
import cloneDeep from "lodash/cloneDeep";
import "./App.css";
import { getAll, update } from "./BooksAPI";
import ListBooks from "./ListBooks";

class MainPage extends React.Component {
  handleShelfChange = (event) => {
    let updateBooks = cloneDeep(this.state.serverBooks);

    let book = updateBooks.find((book) => book.id === event.target.id);
    if (book !== undefined) {
      book.shelf = event.target.value;
      update(book, book.shelf);
      this.setState({
        serverBooks: updateBooks,
      });
    }
  };

  state = {
    serverBooks: [],
  };


  componentDidMount() {
    getAll().then((bookList) => {
      if (Array.isArray(bookList)) {
        this.setState({
          serverBooks: bookList,
        });
      }
    });
  }
  render() {
    return (
      <ListBooks
        showSearchLink={true}
        books={this.state.serverBooks}
        onChange={this.handleShelfChange}
      />
    );
  }
}

export default MainPage;
