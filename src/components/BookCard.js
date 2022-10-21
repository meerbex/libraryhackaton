import React from 'react'
import { AuthContext } from "../contexts/AuthContext";

export default function BookCard({ book }) {
  const context = React.useContext(AuthContext);
  const Book = async (id) => {
    const date = new Date();
    const days = context.MaxDays;
    date.setDate(date.getDate() + days);
    date.setMinutes(date.getMinutes() - 10);
    try {
      const reserved = await context.reserveBook(
        {
          "bookId": id,
          "endTime": date
        }
      )
      context.updateState('show', true)
      context.updateState('modalBody', 'Вы Успешно забронировали книку " ' + book.title + '"')


      // return (<Redirect to={{ pathname: '/' }} />)
    } catch (err) {
      if (err?.json?.error?.message == "allowed borrowing books exceeded") {
        context.updateState('show', true)
        context.updateState('modalBody', 'Вы повысили количество бронируемых книг. Вы не сможете бронировать больше ')
      }
      else {
        context.updateState('show', true)
        context.updateState('modalBody', 'Что-то пошло нетак. Повторите ещё раз')

      }
    }

  }
  return (
    <div className="col">
      <div className="card card-product">
        <div className="card-body">
          <div className="text-center  position-relative ">
            {" "}
            <a href={"details/" + book?.id}>
              <img
                src={book.imageUrl ? book.imageUrl : "https://i.postimg.cc/Wz2qvZtz/Whats-App-Image-2022-10-21-at-10-52-33-PM.jpg"}
                alt={book.title ? book.title : ""}
                className="mb-3 img-fluid"
              />
            </a>

          </div>
          <div>
            <span className="tag">
              {book?.category}
            </span>
          </div>
          <br />
          <h2 className="fs-6">
            <a
              href={"details/" + book?.id}
              className="text-inherit text-decoration-none"
            >
              {book?.title}
            </a>
          </h2>
          <div className="text-small mb-1">
            <a href="#!" className="text-decoration-none text-muted">
              <small>{book?.author}</small>
            </a>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="stars">
              <i className="fa fa-fw fa-star mr-1"></i>
              <i className="fa fa-fw fa-star mr-1"></i>
              <i className="fa fa-fw fa-star mr-1"></i>
              <i className="fa fa-fw fa-star mr-1"></i>
              <i className="fa fa-fw fa-star mr-1"></i>

              <span style={{ color: '#5C6C75', marginLeft: 10 }}>
                5.0
                (149)
              </span>
            </div>

          </div>
          <div className="d-grid mt-2">
            {book?.quantity ?
              <a href="#!" onClick={() => Book(book?.id)}  className="btn btn-primary ">
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
                  className="feather feather-plus"
                >
                  <line x1={12} y1={5} x2={12} y2={19} />
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>{" "}
                Забронировать{" "}
              </a>
              :


              <a href="#!" disabled className="btn disabled btn-secondart ">
                Нет в наличии
              </a>
            }

          </div>
          <div className="d-flex justify-content-start text-center mt-3">
            <div
              className="deals-countdown w-100"
              data-countdown="2022/10/10 00:00:00"
            />
          </div>
        </div>
      </div>
    </div>)
}