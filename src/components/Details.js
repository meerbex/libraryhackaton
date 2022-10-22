
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import RelatedBooks from './RelatedBooks';
function Details() {
  const params = useParams();
  const context = React.useContext(AuthContext);
  const [book, setBook] = useState({})
  const [just, setJust] = useState(false)
  const Book = async (id) => {
    const days = parseInt(context.maxDays);

    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
    
    var date = new Date();
    var dates = date.addDays(days-1 )

    
    try {
      const reserved = await context.reserveBook(
        {
          "bookId": id,
          "endTime": dates
        }
      )
      
      context.updateState('show', true)
      context.updateState('modalBody', 'Вы Успешно забронировали книку " '+ book.title+'"')
      setJust(!just)

      // return (<Redirect to={{ pathname: '/' }} />)
    } catch (err) {
      if (err?.json?.error?.message == "allowed borrowing books exceeded") {
        context.updateState('show', true)
        context.updateState('modalBody', 'Вы повысили количество бронируемых книг. Вы не сможете бронировать больше ')
      }
      else if (err?.json?.error?.message == "you already borrowed the book") {
        context.updateState('show', true)
        context.updateState('modalBody', 'Вы уже бронировали эту книгу ')
      }
      else{
        context.updateState('show', true)
        context.updateState('modalBody', 'Что-то пошло нетак. Повторите ещё раз')

      }
    }
    
  }
  useEffect(() => {
    async function fetchMyAPI() {
      const comingbooks = await context.getBook({ bookId: params.id })
      setBook(comingbooks);
      console.log("comingbook", comingbooks)
    }
    fetchMyAPI()

  }, [just])
  return (
    <div>
      <section className="mt-8">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <img src={book?.imageUrl} alt="" className="w-100" />
            </div>
            <div className="col-md-7">
              <div className="ps-lg-10 mt-6 mt-md-0">

                <a href="#!" className="mb-4 d-block"><span className="tag">
                  {book?.category}
                </span></a>

                <h1 className="mb-3">{book?.title} </h1>

                <div className="mb-4">
                  {book?.author}
                </div>
                <div className="mb-4">


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

                {/* hr */}
                <hr className="my-6" />
                <div className="mb-5">
                  Срок возврата:  &nbsp;
                  <span className="btn btn-outline-secondary btn-sm ml-1">7 дней</span>

                </div>
                <div>
                  {/* input */}
                  {/* <div className="input-group input-spinner  ">
                      <input type="button" defaultValue="-" className="button-minus  btn  btn-sm " data-field="quantity" />
                      <input type="number" step={1} max={10} defaultValue={1} name="quantity" className="quantity-field form-control-sm form-input   " />
                      <input type="button" defaultValue="+" className="button-plus btn btn-sm " data-field="quantity" />
                    </div> */}
                </div>
                <div className="mt-3 row justify-content-start g-2 align-items-center">
                  <div className="col-xxl-4 col-lg-4 col-md-5 col-5 ">



                    {book?.quantity ?
                      <button onClick={() => Book(book?.id)} type="button" disabled={book?.userReservedBook ? true : false} className="btn btn-primary d-flex justify-content-around align-items-center">
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
                        </svg>
                        {book?.userReservedBook ? "Уже забронирован вами" :"Забронировать"}
                        
                      </button>
                      :
                      <button onClick={() => Book(book?.id)} type="button" disabled className="btn btn-secondary d-flex justify-content-around align-items-center">

                        Нет в наличии
                      </button>
                    }
                  </div>

                </div>
                <br />
                <div className="name">
                  Доступно: {book.quantity} копий
                </div>
                {/* hr */}
                <hr className="my-6" />

                <div className="mt-8 d-none">
                  {/* dropdown */}
                  <div className="dropdown">
                    <a className="btn btn-outline-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Поделиться </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-facebook me-2" />Facebook </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-twitter me-2" />Twitter </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-instagram me-2" />Instagram </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-lg-14 mt-8 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="my-8">
                <div className="mb-5">
                  {/* text */}
                  <h4 className="mb-1">Описание</h4>
                  <br />
                  <p className="mb-0">
                    {book?.description}
                  </p>
                </div>
              </div>

              <div>
                <div className="col-md-8 d-none">
                  <div className="mb-10">
                    <div className="d-flex justify-content-between align-items-center mb-8">
                      <div>
                        <h4>Отзывы</h4>
                      </div>

                    </div>
                    <div className="d-flex border-bottom pb-6 mb-6 pt-4">
                      <img src="../assets/images/avatar/avatar-8.jpg" alt="" className="rounded-circle avatar-lg" />
                      <div className="ms-5 flex-grow-1">
                        <h6 className="mb-1">
                          Sandra Langevin
                        </h6>

                        <p className="small"> <span className="text-muted">8 December 2022</span>
                          <span className="text-danger ms-3 fw-bold">Unverified Purchase</span></p>

                        <div className=" mb-2">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star text-warning" />
                          <span className="ms-3 text-dark fw-bold">Great product</span>
                        </div>
                        <p>Great product &amp; package. Delivery can be expedited. </p>

                        <div className="d-flex justify-content-end mt-4">
                          <a href="#" className="text-muted"><i className="feather-icon icon-thumbs-up me-1" />Helpful</a>
                          <a href="#" className="text-muted ms-4"><i className="feather-icon icon-flag me-2" />Report
                            abuse</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-none'>

                    <h3 className="mb-5">Create Review</h3>

                    <div className="border-bottom py-4 mb-4">
                      <h4 className="mb-0">Rate Features</h4>
                    </div>

                    <div className="border-bottom py-4 mb-4">
                      <h5>Add a headline</h5>
                      <input type="text" className="form-control" placeholder="What’s most important to know" />
                    </div>


                    <div className=" py-4 mb-4">

                      <h5>Add a written review</h5>
                      <textarea className="form-control" rows={3} placeholder="What did you like or dislike? What did you use this product for?" defaultValue={""} />
                    </div>

                    <div className="d-flex justify-content-end">
                      <a href="#" className="btn btn-primary">Submit Review</a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
      <RelatedBooks />
    </div>
  );
}

export default Details;
