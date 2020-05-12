import React from 'react';
import Row from './Row.jsx';
import PropTypes from 'prop-types';

const dataTable = (props) => {
  const { list } = props;
  const rowsToRender = list.map((row) => <Row key={row.per_id} row={row} />);
  if (list.length === 0) return <div>The list is empty</div>;
  return (
    <table>
      <tbody>{rowsToRender}</tbody>
    </table>
  );
};

dataTable.propTypes = {
  list: PropTypes.array.isRequired,
};
export default dataTable;
