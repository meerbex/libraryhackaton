import React from 'react'
import { useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import BookCard from './BookCard';
import { useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';


const RelatedBooks = () => {
  const context = React.useContext(AuthContext);
  const [books, setBooks] = useState([])
  useEffect(() => {
    async function fetchMyAPI() {
      const comingbooks = await context.getBooks({ 'search': '' })
      setBooks(comingbooks.slice(0, 5));
    }
    fetchMyAPI()

  }, [])
  return (

    <section className="my-lg-14 my-14">
      <div className="container">

        <div className="row">
          <div className="col-12">

            <h3>Related Items</h3>
          </div>
        </div>
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-2 mt-2">

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


export default RelatedBooks;