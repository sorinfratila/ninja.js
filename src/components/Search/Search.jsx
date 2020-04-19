import React from 'react';

const Search = (props) => {
  const { onSearch } = props;

  return (
    <input
      type='search'
      className='form-control'
      placeholder='Søg brugere'
      onChange={onSearch}
    />
  );
};

export default Search;
