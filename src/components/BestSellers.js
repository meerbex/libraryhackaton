import React from 'react'
import { useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import BookCard from '../components/BookCard';
import { useEffect } from 'react';

function BestSellers() {
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
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-6">
            <h3 className="mb-0">Бестселлеры</h3>
          </div>
        </div>
        <div className="row row-cols-lg-4 row-cols-1 row-cols-md-2 g-4">
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

export default BestSellers
