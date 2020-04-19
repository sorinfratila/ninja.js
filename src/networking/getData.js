import myData from '../data/mockData.json';

const getData = ({ offset = 0, limit = 5 } = {}) => {
  if (offset >= 0) {
    return {
      data: myData.data.slice(offset, offset + limit),
      total: myData.total,
    };
  }

  return {
    data: [],
    total: 0,
  };
};

const search = (value) => {
  return myData.data.filter((row) => {
    return (
      row.name1.toLowerCase().search(value.toLowerCase()) > -1 ||
      (row.email && row.email.toLowerCase().search(value.toLowerCase()) > -1)
    );
  });
};

export { getData as default, search };
