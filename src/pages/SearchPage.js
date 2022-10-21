import React from 'react'
import { useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import BookCard from '../components/BookCard';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

const SearchPage = (props) => {
  const context = React.useContext(AuthContext);
  const [books, setBooks] = useState([])
  const search = useLocation().search;
  const searching = new URLSearchParams(search).get('search');
  const category = new URLSearchParams(search).get('category');
  
  useEffect( () => {
    
    console.log("this.props", searching)
    async function fetchMyAPI() {
      const comingbooks = await context.getBooks({ search: searching})
      setBooks(comingbooks);
    }

    
    async function fetchByCategory() {
      const comingbooks = await context.getBooks({ category: category })
      setBooks(comingbooks);
    }
    if (category) {
      fetchByCategory()
    }else{
      fetchMyAPI()
    }

    
    
  }, [])
  
  
  // context.loginUser({ email, password })
  

  return (

    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-6">
              <h3 className="mb-0"> {searching ? 'Результаты поиска "' + searching + '"' : ""} {category ? 'Результаты по жанру "' + category + '"' : ""}</h3>
            </div>
          </div>
          <div className="row row-cols-lg-4 row-cols-1 row-cols-md-2 g-4">

            {books.map((book,i)=>{
              return(
                <BookCard key={i} book={book} />
              )
            })}
          </div>
        </div>
      </section>
    </div>

  )
}

export default SearchPage;