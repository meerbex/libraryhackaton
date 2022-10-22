import React from "react";
import { useLocation } from "react-router-dom";


export const Search = () => {
  const search = useLocation().search;
  const searching = new URLSearchParams(search).get('search');

  return (

    <div className="col-xxl-6 col-lg-5 my-5">
      <form action="/search">
        <div className="input-group ">
          <input
            className="form-control rounded-3"
            type="search"
            name="search"
            placeholder="Поиск по названию или по автору"
            defaultValue={searching}
            id="searchInput"
          />
          <span className="input-group-append">
            <button
              className="btn bg-white border border-start-0 ms-n10"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx={11} cy={11} r={8} />
                <line x1={21} y1={21} x2="16.65" y2="16.65" />
              </svg>
            </button>
          </span>
        </div>
      </form>
    </div>

  )
}


export default Search;