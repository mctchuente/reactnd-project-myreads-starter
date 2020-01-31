import React, { Component } from 'react';
import BookItem from "./BookItem";

class BookShelfItem extends Component {
	render(){
		const { booksDatas, shelfLabels, booksSelfLabel, booksOfShelf, optionsShelves, onUpdateBookShelf } = this.props
		const shelfBooksList = Object.values(booksOfShelf).map(bookId => (
		  <BookItem
			key={bookId}
			shelfLabels={shelfLabels}
			bookData={booksDatas[bookId]}
			optionsShelves={optionsShelves}
			onUpdateBookShelf={onUpdateBookShelf}
			isSearch={false}
		  />
		));
		return (
			<div className="bookshelf">
			  <h2 className="bookshelf-title">{booksSelfLabel}</h2>
			  <div className="bookshelf-books">
				<ol className="books-grid">
				  {shelfBooksList}
				</ol>
			  </div>
			</div>
		)
	}
}

export default BookShelfItem