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

    <div className="my-8">
      <section>
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-8">
                {/* heading */}
                <h1 className="mb-1">Избранные</h1>
              </div>
              <div>
                {/* table */}
                <div className="table-responsive">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>

  )
}

export default SearchPage;