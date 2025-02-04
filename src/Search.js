import React from "react";
import { Link } from "react-router-dom";
import { search, update, getAll } from "./BooksAPI";
import bookShelfCategories from "./bookShelfCategories";
import BookShelf from "./BookShelf";
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";

class Search extends React.Component {
  state = {
    term: "",
    serverBooks: [],
    books: [],
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

  handleAssignmentToMyReads = (event) => {
    let updateBooks = cloneDeep(this.state.books);

    let book = updateBooks.find((book) => book.id === event.target.id);
    if (book !== undefined) {
      book.shelf = event.target.value;
      update(book, event.target.value).then((books) => {
        getAll().then((serverBooks) => {
          this.setState({
            books: updateBooks,
            serverBooks: serverBooks,
          });
        });
      });
    }
  };
  
  updateQuery = debounce((newTerm) => {
    if (newTerm) {
      search(newTerm)
        .then((books) => {
          if (Array.isArray(books)) {
          
            for (let book of books) {
              let shelvedBook;
              shelvedBook = this.state.serverBooks.find(b => b.id === book.id);
              if (shelvedBook !== undefined) {
                book.shelf = shelvedBook.shelf;
              }
            }

            this.setState({
              term: newTerm,
              books: books,
            });
          } else {
            this.setState({
              term: newTerm,
              books: [],
            });
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      this.setState({
        term: newTerm,
        books: [],
      });
    }
  }, 500);

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <BookShelf
            key={0}
            category={bookShelfCategories[3]}
            books={this.state.books}
            onChange={this.handleAssignmentToMyReads}
            showShelfChanger={false}
          />
        </div>
      </div>
    );
  }
}

export default Search;
