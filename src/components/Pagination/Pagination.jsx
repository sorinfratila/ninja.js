import React from 'react';

import Page from './Page.jsx';

const pagination = ({ currentPageNumber, totalNumberOfPages, onChange }) => {
  const pages = Array.from(
    Array(totalNumberOfPages).keys()
  ).map((pageNumber) => (
    <Page
      key={pageNumber}
      currentPageNumber={currentPageNumber}
      pageNumber={pageNumber + 1}
      clicked={() => onChange(pageNumber + 1)}
    />
  ));

  if (pages.length <= 1) {
    return null;
  }

  return <ul className='pagination'>{pages}</ul>;
};

export default pagination;
