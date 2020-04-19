import React, { Component } from 'react';
import './App.css';
import getData, { search } from '../src/networking/getData';
import Search from './components/Search/Search.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import { ROWS_LIMIT } from './utils/constants';
import DataTable from './components/DataTable/DataTable.jsx';

class App extends Component {
  searchResults = []; // used to keep the search results for pagination when searching

  state = {
    list: [],
    currentPageNumber: 0,
    totalNumberOfPages: 0,
    search: '',
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { data, total } = getData();
    const nrOfPages = this.calculateTotalNumberOfPages(total, ROWS_LIMIT);

    this.setState({
      list: data,
      currentPageNumber: 1,
      totalNumberOfPages: nrOfPages,
    });

    this.searchResults = [];
  };

  calculateTotalNumberOfPages = (nrOfRows, rowsPerPage) => {
    if (rowsPerPage === 0) return 0;
    return Math.ceil(nrOfRows / rowsPerPage);
  };

  search = (event) => {
    const text = event.target.value;
    this.setState({ search: text });

    if (text === '') this.init();
    else {
      const result = search(text);
      this.searchResults = result;

      const nrOfPages = this.calculateTotalNumberOfPages(
        result.length,
        ROWS_LIMIT
      );

      this.setState({
        list: this.searchResults.slice(0, ROWS_LIMIT),
        currentPageNumber: 1,
        totalNumberOfPages: nrOfPages,
      });
    }
  };

  changeToPageNumber = (pageNumber) => {
    const { search } = this.state;
    const startIndex = (pageNumber - 1) * ROWS_LIMIT;

    if (search !== '') {
      this.setState({
        list: this.searchResults.slice(startIndex, startIndex + ROWS_LIMIT),
        currentPageNumber: pageNumber,
      });
    } else {
      const payload = {
        offset: startIndex,
        limit: ROWS_LIMIT,
      };

      const { data } = getData(payload);

      this.setState({
        currentPageNumber: pageNumber,
        list: data,
      });
    }
  };

  render() {
    const { list, currentPageNumber, totalNumberOfPages } = this.state;

    return (
      <div className='container mt-3'>
        <Search onSearch={this.search} />
        <DataTable list={list}></DataTable>
        <div className='pagination_container'>
          <Pagination
            currentPageNumber={currentPageNumber}
            totalNumberOfPages={totalNumberOfPages}
            onChange={this.changeToPageNumber}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default App;
