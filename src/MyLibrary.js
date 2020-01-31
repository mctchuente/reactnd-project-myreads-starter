import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookList from "./BookList";

class MyLibrary extends Component {
  
  render() {
    const { shelfLabels, optionsShelves, booksByShelves, booksDatas, onUpdateBookShelf, onBookExists } = this.props

    return (
      <div className="list-books">
		<div className="list-books-title">
		  <h1>MyReads</h1>
		</div>
		<BookList 
			booksByShelves={booksByShelves} 
			booksDatas={booksDatas} 
			shelfLabels={shelfLabels} 
			optionsShelves={optionsShelves} 
			onUpdateBookShelf={onUpdateBookShelf} 
			onBookExists={onBookExists} 
		/>
		<div className="open-search">
		  <Link className='search-book' to='/search'>Search book</Link>
		</div>
	  </div>
    )
  }
}

export default MyLibrary