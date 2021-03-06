import React, { Component } from 'react';
import Books from '../components/Books.js';
import {fetchWatchList} from '../actions/watchList.js';
import {  connect } from 'react-redux';
import WatchList from './WatchList.js'

const api_url = 'https://www.googleapis.com/books/v1'
const api_key = process.env.REACT_APP_API_KEY;

class Search extends Component {

  constructor () {
    super ()
    this.state = {
      searchTerm: '',
      books: []
    }
  }
  handleSearchInput = event => {
    this.setState({searchTerm: event.target.value });
  }

  componentDidMount () {
    this.props.fetchWatchList()
  }

  searchBook = () => {
    const query = this.state.searchTerm;
    fetch (`${api_url}/volumes?q=${query}&key=${api_key}`)
    .then (res => res.json())
    .then(data => this.setState({books: data.items}))
  }

  render () {
    return (
      <div>
        <div>
          <input className="searchBar"
            type="text"
            onChange={this.handleSearchInput}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.searchBook()
              }
            }}
            value={this.state.searchTerm}
            placeholder="search books"
          />
          <button className="buttonSize" onClick={this.searchBook}>Search</button>
        </div>
        <div>
          <Books books={this.state.books}/>
        </div>
        <div className="watchlist">
          <h3 className="headertext">My WatchList</h3>
          <WatchList />
        </div>
      </div>
    )
  }
}
export default connect(null, { fetchWatchList })(Search);
