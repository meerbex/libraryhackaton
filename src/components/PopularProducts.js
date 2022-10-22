import React from 'react'
import { useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import BookCard from '../components/BookCard';
import { useEffect } from 'react';

const PopularProducts = () => {
  const context = React.useContext(AuthContext);
  const [books, setBooks] = useState([])
  useEffect(() => {
    async function fetchMyAPI() {
      const comingbooks = await context.getBooks({ 'search': '' })
      setBooks(comingbooks);
    }
    fetchMyAPI()

  }, [])
  return (
    <section className="my-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0">Популярные</h3>
          </div>
        </div>
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {books.map((book, i) => {
            return (
              <BookCard key={i} book={book} />
            )
          })}
        </div>
      </div>
    </section>
  )
}


export default PopularProducts;