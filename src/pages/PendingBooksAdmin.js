import React, { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { getExpiredBooks, getPendingBooks } from '../utils/api';

export default function PendingBooksAdmin() {
  const context = React.useContext(AuthContext);

  const [books, setBooks] = useState([])
  const [confirmed, setConfirmed] = useState(false)
  
  const confirmReserve = async (id) => {
    var comingConfirm = await context.confirmReserve(id);
    if (comingConfirm){
      context.updateState('show', true)
      context.updateState('modalBody', 'Вы подтвердили успешно ')
    }
    setConfirmed(!confirmed)
  }

  useEffect(() => {

    async function fetchMyAPI() {
      const comingbooks = await getPendingBooks()
      setBooks(comingbooks);
    }

    fetchMyAPI()
  }, [confirmed])

  console.log(books);
  return (
    <div>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Книги </h2>
                </div>
                <div className="col-sm-6 text-right">
                  <a href="/editBook" className="btn btn-success" ><i className="fa fa-plus"></i> Добавить</a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Название</th>
                  <th>Описание</th>
                  <th>Категория</th>
                  <th>Пользователь</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr>
                  <td><img src={book.book.imageUrl} width="100px"/></td>
                  <td>{book.book.title}</td>
                  <td>{book.book.description?.substring(0, 200)}...</td>
                  <td>{book.book.category}</td>
                    <td><a href={`/profile/${book.user.id}`}>{book.user.username}</a></td>
                    <td><a onClick={() => confirmReserve(book.id)} className="btn btn-success" href="#!">Подтвердить</a></td>
                </tr>
                ))}
              </tbody>
            </table>
            <div className="clearfix">
              {/* <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div> */}
              {/* <ul className="pagination">
                <li className="page-item "><a href="#" className="page-link">Previous</a></li>
                <li className="page-item"><a href="#" className="page-link">1</a></li>
                <li className="page-item"><a href="#" className="page-link">2</a></li>
                <li className="page-item active"><a href="#" className="page-link">3</a></li>
                <li className="page-item"><a href="#" className="page-link">4</a></li>
                <li className="page-item"><a href="#" className="page-link">5</a></li>
                <li className="page-item"><a href="#" className="page-link">Next</a></li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      
    </div>

  )
}
