import React, { useState, Fragment } from 'react';

const Output = ({ recentUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const urlPerPage = 3;

  const onClickHandler = evt => {
    const id = evt.target.id;
    setCurrentPage(id);
  };

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * urlPerPage;
  const indexOfFirstTodo = indexOfLastTodo - urlPerPage;
  const currentUrls = recentUrl.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderUrls = currentUrls.map((el, index) => {
    let trimmedUrl = el.originalUrl.substring(0, 36).padEnd(39, '.');

    return (
      <li className="link" key={el.shortUrl}>
        <span className="longLink">
          <a href={el.originalUrl}>{trimmedUrl}</a>
        </span>
        <span className="right">
          <span className="shortLink">
            <a href={el.shortUrl} target="_blank" rel="noopener noreferrer">
              {el.shortUrl}
            </a>
          </span>
          <span className="copyLink">
            <button type="button" className="btnCopy">
              Copy
            </button>
          </span>
        </span>
      </li>
    );
  });

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recentUrl.length / urlPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} id={number} onClick={onClickHandler}>
        {number}
      </li>
    );
  });

  return (
    <Fragment>
      <div className="output">
        <ul className="url-list">{renderUrls}</ul>

        <ul className="page-numbers">{renderPageNumbers}</ul>
      </div>
    </Fragment>
  );
};

export default Output;
