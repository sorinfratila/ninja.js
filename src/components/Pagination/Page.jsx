import React from 'react';

const page = (props) => {
  const { pageNumber, currentPageNumber, clicked } = props;

  const classes = ['page-link'];
  if (currentPageNumber === pageNumber) {
    classes.push('button-outline');
  }

  return (
    <li className='page-item mr-1'>
      <button className={classes.join(' ')} onClick={clicked}>
        {pageNumber}
      </button>
    </li>
  );
};

export default page;
