import React from "react";
import bookShelfCategories from "./bookShelfCategories";
import { getTitle } from "./getTitle";

class BookShelfChanger extends React.Component {


  render() {
    let page = [];

    bookShelfCategories.forEach((category, index) => page.push(
      <option key={index} value={category}>{getTitle(category)}</option>
    ));
  
    return (
      <div className="book-shelf-changer">
        <select onChange={this.props.onChange} id={this.props.bookId} defaultValue={this.props.category}>
          <option value="move" disabled>
            Move to...
          </option>
          {page}
        </select>
      </div>
    );
  }
}

export default BookShelfChanger;
