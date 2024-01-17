import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './components/Collection';
import { is } from 'immutable';
// import data from './data/data.json';



function App() {
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const categories = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  const category = categoryId ? `category=${categoryId}` : '';

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://65a84af2219bfa371866ff7c.mockapi.io/photos?page=${page}&limit=3&${category}`)
    .then(res => res.json())
    .then(data => {
      setCollection(data)
    })
    .catch(error => console.log(error))
    .finally(() => setIsLoading(false))
  }, [categoryId, page, category])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, idx) => {
            return <li
              className={categoryId === idx ? 'active' : ''}
              key={obj.name}
              onClick={() => setCategoryId(idx)}
            >
              {obj.name}
            </li>
          })}

        </ul>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
          value={searchValue} />
      </div>
      <div className="content">
        {isLoading ? <h1>Идёт загрузка...</h1> : (
        collection.filter(obj => {
          return obj.name.toLowerCase().includes(searchValue);
        }).map((obj, idx) => {
          return <Collection key={obj.name} name={obj.name} images={obj.photos} />
        }))}

      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, idx) => {
         return <li key={idx} onClick={() => setPage(idx + 1)} className={page === (idx + 1) ? 'active' : ''}>{idx + 1}

          </li>
        })}
        
      </ul>
    </div>
  );
}

export default App;
