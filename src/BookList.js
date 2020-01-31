import React, { Component } from 'react';
import BookShelfItem from "./BookShelfItem";

class BookList extends Component {
	render(){
		const { booksByShelves, booksDatas, shelfLabels, optionsShelves, onUpdateBookShelf, onBookExists } = this.props
		const BookShelfList = Object.keys(booksByShelves).map(id => (
		  <BookShelfItem
			key={id}
			booksDatas={booksDatas}
			shelfLabels={shelfLabels}
			booksSelfLabel={shelfLabels[id]}
			booksOfShelf={booksByShelves[id]}
			optionsShelves={optionsShelves}
			onUpdateBookShelf={onUpdateBookShelf}
			onBookExists={onBookExists}
		  />
		));
		return (
			<div className="list-books-content">
			  <div>
				{BookShelfList}
			  </div>
			</div>
		)
	}
}

export default BookList