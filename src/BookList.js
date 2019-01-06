import React, { Component } from "react";

//Component
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredBooks: this.props.books
    };
    this.filterBooks = this.filterBooks.bind(this);
  }

  filterBooks(query) {
    query = query.toLowerCase();
    let filteredBooks = this.props.books.filter(book => {
      return `${book.title}`.toLowerCase().includes(query);
    });
    this.setState({ filteredBooks: filteredBooks });
  }
  componentDidUpdate(prevProps) {
    const colours = this.props.match.params.color;
    if (prevProps.match.params.color !== colours) {
      if (!colours) {
        this.setState({ filteredBooks: this.props.books });
      }
      this.filterColor(colours);
    }
  }
  filterColor(fetchedColor) {
    if (fetchedColor) {
      let filteredColor = this.props.books.filter(
        book => book.color === fetchedColor
      );
      this.setState({ filteredBooks: filteredColor });
    }
  }

  render() {
    console.log(this.props.match.params.color);
    return (
      <div className="books">
        <h3>Books</h3>
        <SearchBar changeHandler={this.filterBooks} />
        <div className="row" />
        <BookTable books={this.state.filteredBooks} />
        <Link to={"/books/"}>
          <button className="btn">All Books</button>
        </Link>
      </div>
    );
  }
}
export default BookList;
