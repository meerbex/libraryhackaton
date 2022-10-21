import React, { useState, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";

export const CategorySection = () => {
  const [categories, setCategories] = useState([])
  const context = React.useContext(AuthContext);
  useEffect(() => {
    async function fetchMyAPI() {
      const comingcategores = await context.getCategories();
      console.log("comingcategores", comingcategores)
      setCategories(comingcategores)
    }
    fetchMyAPI()
  }, [])

  return (
    <section className="mb-lg-10 mt-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0">Жанры</h3>
          </div>
        </div>
        <div className="category-slider " style={{display:'flex'}}>
          {
            categories.map(element => {
              return (
                <div className="item mx-1">
                  {" "}
                  <a
                    href={ "/search?category="+element.category }
                    className="text-decoration-none text-inherit"
                  >
                    <div className="card card-product mb-lg-4">
                      <div className="card-body text-center py-1">
                        <div className="text-truncate">{element.category} ({element.count})</div>
                      </div>
                    </div>
                  </a>
                </div>
              )
              
            })
          }
        </div>
      </div>
    </section>
    )
}


export default CategorySection;
