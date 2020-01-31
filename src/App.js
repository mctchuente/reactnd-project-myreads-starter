import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyLibrary from "./MyLibrary";
import BookSearch from "./BookSearch";

const shelfLabels = {
  "currentlyReading": "Currently Reading",
  "wantToRead": "Want to Read",
  "read": "Read",
  "none": "None",
};

const optionsShelves = [
	{
	  "value" : "currentlyReading",
	  "label" : "Currently Reading",
	},
	{
	  "value" : "wantToRead",
	  "label" : "Want to Read",
	},
	{
	  "value" : "read",
	  "label" : "Read",
	},
	{
	  "value" : "none",
	  "label" : "None",
	}
];

class BooksApp extends React.Component {
  state = {
    myBooks: [],
	booksByShelves : {},
	booksDatas : {}
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const booksByShelves = {}
	  const booksDatas = {}
	  books && (books.forEach(myBook => {
		  const shelfKey = myBook.shelf;
		  if (booksByShelves[shelfKey]) {
			booksByShelves[shelfKey].push(myBook.id);
		  } else {
			booksByShelves[shelfKey] = [myBook.id];
		  }
		  booksDatas[myBook.id] = myBook;
	  }))
	  this.setState({ myBooks : books, booksByShelves : booksByShelves, booksDatas : booksDatas })
    })
  }
  
  bookExists = BookId => {
    const meBooks = this.state.myBooks;
    for (let book of meBooks) {
      if (book.id === BookId) {
        return true;
      }
    }
    return false;
  }
  
  getIndex = (value, arr, prop) => {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i][prop] === value) {
			return i;
		}
	}
	return -1;
  }
  
  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(res => {
      this.setState({ booksByShelves : res })
	  BooksAPI.get(book.id).then(resBook => {
		  this.setState({ booksByShelves : res })
		  if (!this.bookExists(resBook.id)){
			this.setState(currentState => ({
			  myBooks: [...currentState.myBooks, resBook],
			}))
		  } else {
			  const index = this.getIndex(resBook.id, this.state.myBooks, 'id')
			  if (index > -1) {
				  const newMyBooks = this.state.myBooks
				  newMyBooks[index] = resBook
				  this.setState({ myBooks : newMyBooks })
			  }
		  }
		  const newBooksDatas = this.state.booksDatas
		  newBooksDatas[resBook.id] = resBook
		  this.setState({ booksDatas : newBooksDatas })
	  })	
    })
  }

  render() {
    return (
      <div className="app">
		<Route exact path='/' render={() => (
          <MyLibrary 
			myBooks={this.state.myBooks} 
			shelfLabels={shelfLabels} 
			optionsShelves={optionsShelves} 
			booksByShelves={this.state.booksByShelves} 
			booksDatas={this.state.booksDatas} 
            onUpdateBookShelf={(book, shelf) => {
              this.updateBookShelf(book, shelf)
            }}
            onBookExists={(bookId) => {
              this.bookExists(bookId)
            }}
		  />
        )}/>
        <Route path='/search' render={({ history }) => (
          <BookSearch
			myBooks={this.state.myBooks}
			shelfLabels={shelfLabels}
			optionsShelves={optionsShelves}
            onSearchBook={(book, shelf) => {
              this.updateBookShelf(book, shelf)
			  //history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
