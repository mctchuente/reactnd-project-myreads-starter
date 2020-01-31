import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import BookItem from "./BookItem";

class BookSearch extends Component {
	state = {
		books: [],
		booksDatas: {},
		query: '',
		shelfBooksList: null
	}

	updateQuery = (query) => {
		this.setState({ query: query })
		if (query && query.length) {
			BooksAPI.search(query).then((foundBooks) => {
			  this.setState({ books: foundBooks })
			  const booksDatas = {}
			  if (foundBooks && foundBooks.length) {
				  foundBooks.forEach(book => {
					booksDatas[book.id] = book;
				  });
			  } else {
				  this.setState({ books: [], shelfBooksList: null })
			  }
			  this.setState({ booksDatas: booksDatas })
			  if (this.state.query && this.state.booksDatas) {
					const shelfBooksList = Object.keys(booksDatas).map(bookId => (
					  <BookItem
						key={bookId}
						shelfLabels={this.props.shelfLabels}
						bookData={this.state.booksDatas[bookId]}
						optionsShelves={this.props.optionsShelves}
						onUpdateBookShelf={this.props.onSearchBook}
						isSearch={true}
						isBookShelfExists={this.bookExistsInShelf(bookId, this.props.myBooks)}
					  />
					));
					this.setState({ shelfBooksList: shelfBooksList })
			  } else {
				  this.setState({ shelfBooksList: null })
			  }
			})
		} else {
			this.setState({ books: [], booksDatas: {}, shelfBooksList: null })
		}	
	}

	clearQuery = () => {
		this.setState({ books: [], booksDatas: {}, query: '', shelfBooksList: null })
	}
	
	bookExistsInShelf = (BookId, meBooks) => {
		for (let book of meBooks) {
		  if (book.id === BookId) {
			return book.shelf;
		  }
		}
		return "";
	}
	
	render(){
		const { query, shelfBooksList } = this.state
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
				  <Link className='btn-close-search' to='/'>Close</Link>
				  <div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>

				  </div>
				</div>
				<div className="search-books-results">
				  <ol className="books-grid">{shelfBooksList}</ol>
				</div>
			</div>
		)
	}
}

export default BookSearch