import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';

import Output from './components/Output';

const App = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [recentUrl, setRecentUrl] = useState([]);
  const [error, setError] = useState(false);

  const onChangeHandler = evt => {
    const textVal = evt.target.value;
    setInputUrl(textVal);
  };

  useEffect(() => {
    const opts = {
      url: 'http://localhost:8080/recent',
      method: 'GET'
    };

    axios(opts)
      .then(res => {
        const { data } = res.data;

        if (res.status === 200) {
          setRecentUrl(data.urls);
        }
      })
      .catch(e => console.log(e));
  }, []);

  const onSubmitHandler = evt => {
    setError(false);
    evt.preventDefault();

    const opts = {
      url: 'http://localhost:8080/generate',
      method: 'POST',
      'content-type': 'application/json',
      data: {
        url: inputUrl
      }
    };

    axios(opts)
      .then(res => {
        const { data } = res.data;
        if (res.status === 200) {
          setRecentUrl([...recentUrl, data]);
          setInputUrl('');
        }
      })
      .catch(e => {
        setError(true);
      });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmitHandler} className="form">
        <div className="form-control">
          <input
            className={error && 'error'}
            type="text"
            name="inputUrl"
            id="inputUrl"
            placeholder="Input Url"
            onChange={onChangeHandler}
            value={inputUrl}
          />
        </div>

        <button type="submit" className="btnSubmit">
          Shorten
        </button>
      </form>

      <div className="interceptor">
        <span>
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
        <span>
          <FontAwesomeIcon icon={faArrowDown} />
        </span>
      </div>

      <Output recentUrl={recentUrl} />

      <div className="footer">
        <p>
          Made With
          <span>
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
