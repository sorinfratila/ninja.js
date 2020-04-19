import React, { Component } from 'react';
import DataTable from './components/DataTable/DataTable';
import './App.css';
import PropTypes from 'prop-types';
import getData, { search } from '../src/networking/getData';
import Search from './DataTable/Search';
import Pagination from './components/Pagination/Pagination';
import { ROWS_LIMIT } from './utils/constants';

class App extends Component {
  static propType = {
    list: PropTypes.array,
    currentPageNumber: PropTypes.number,
    totalNumberOfPages: PropTypes.number,
  };

  state = {
    list: [],
    currentPageNumber: 0,
    totalNumberOfPages: 0,
    totalEntries: 0,
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
      totalEntries: total,
      totalNumberOfPages: nrOfPages,
    });
  };

  calculateTotalNumberOfPages = (nrOfRows, rowsPerPage) => {
    if (rowsPerPage === 0) return 0;
    return Math.ceil(nrOfRows / rowsPerPage);
  };

  search = (event) => {
    const text = event.target.value;
    this.setState({ search: text });

    if (text === '') {
      this.init();
    } else {
      const result = search(text);
      const nrOfPages = this.calculateTotalNumberOfPages(
        result.length,
        ROWS_LIMIT
      );

      this.setState({
        list: result,
        currentPageNumber: 1,
        totalNumberOfPages: nrOfPages,
      });
    }
  };

  changeToPageNumber = (pageNumber) => {
    const payload = {
      offset: (pageNumber - 1) * ROWS_LIMIT,
      limit: ROWS_LIMIT,
    };

    const { data } = getData(payload);

    this.setState({
      currentPageNumber: pageNumber,
      list: data,
    });
  };

  render() {
    const { list, currentPageNumber, totalNumberOfPages } = this.state;

    return (
      <div className='container mt-3'>
        <Search onSearch={this.search} />
        <DataTable list={list}></DataTable>
        <Pagination
          currentPageNumber={currentPageNumber}
          totalNumberOfPages={totalNumberOfPages}
          onChange={this.changeToPageNumber}
        ></Pagination>
      </div>
    );
  }
}

export default App;
