import React, { Component } from 'react';

class BookItem extends Component {
	state = {
		selectedSelf: null,
	};
	handleChange = (selectedSelf, book) => {
		this.setState({ selectedSelf });
		if (this.props.onUpdateBookShelf)
			this.props.onUpdateBookShelf(book, selectedSelf.target.value)
	};
	
	render(){
		const { shelfLabels, bookData, optionsShelves } = this.props
		const optionList = optionsShelves.map((data, index) => <option key={index} value={data.value}>{shelfLabels[data.value]}</option>);
		
		return (
			<div className="book">
			  <div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookData !== undefined && bookData.imageLinks !== undefined && (bookData.imageLinks.thumbnail)})` }}></div>
				<div className="book-shelf-changer">
				  <select 
					defaultValue={bookData !== undefined ? ((bookData.shelf !== undefined && bookData.shelf.length > 0 && !this.props.isSearch) ? bookData.shelf : (this.props.isSearch && this.props.isBookShelfExists !== '' ? this.props.isBookShelfExists : 'none')) : 'none'} 
					onChange={(event) => {this.handleChange(event, bookData)}}
				  >
					<option value="move" disabled>Move to...</option>
					{optionList}
				  </select>
				</div>
			  </div>
			  <div className="book-title">{bookData !== undefined && (bookData.title)}</div>
			  <div className="book-authors">{bookData !== undefined && bookData.authors && (bookData.authors.join(" ; "))}</div>
			</div>
		)
	}
}

export default BookItem