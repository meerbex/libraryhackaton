function _getDefaultFetchOptions () {
  return {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'same-origin' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }
}

async function _fetch (path, options, withCredentials) {
  if (withCredentials){
    options.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  const url = `https://hackaton-round2.herokuapp.com${path}`
  const response = await fetch(url, options);
  if (!response.ok){
    // return { 'error':'Internal server error'}
    throw new Error("Internal server error");
  }
  
  response.headers.forEach(console.log);
  const response_json = await response.json()
  return response_json.data
}

async function _postData (path = '', data = {}, withCredentials = true) {
  const options = _getDefaultFetchOptions();
  options.method = "POST";
  options.body = JSON.stringify(data);
  const response_data = await _fetch (path, options, withCredentials)
  
  return response_data
}

async function _getData (path = '', withCredentials = true) {
  const options = _getDefaultFetchOptions();
  options.method = "GET";
  const response_data = await _fetch (path, options, withCredentials)
  return response_data
}

async function _deleteData (path = '', withCredentials = true) {
  const options = _getDefaultFetchOptions();
  options.method = "DELETE";
  const response_data = await _fetch (path, options, withCredentials)
  return response_data
}

async function _putData (path = '', data = {}, withCredentials = true) {
  const options = _getDefaultFetchOptions();
  options.method = "PUT";
  options.body = JSON.stringify(data);
  const response_data = await _fetch (path, options, withCredentials)
  return response_data
}

async function _patchData(path = '', data = {}, withCredentials = true) {
  const options = _getDefaultFetchOptions();
  options.method = "PATCH";
  options.body = JSON.stringify(data);
  const response_data = await _fetch(path, options, withCredentials)
  return response_data
}

async function _receiveToken (token) {
  localStorage.setItem('token', token);
}

export async function postUser ({email, code}) {
  const path = '/users';
  const withCredentials = false;
  console.log('code',code)
  const body = {email, code};
  const {userId, token} = await _postData(path, body, withCredentials);
  _receiveToken(token)
  return userId;
}

export async function sendCode({ username, email, password }) {
  const path = '/users/email-management/code';
  const withCredentials = false;
  const body = { email, password, username };
  const { data } = await _postData(path, body, withCredentials);
  _receiveToken(data)
  return data;
}

export async function loginUser ({email, password}) {
  const path = '/users/login';
  const withCredentials = false;
  const body = {email, password};
  const {userId, token} = await _postData(path, body, withCredentials);
  _receiveToken(token)
  return userId;
}

export async function identifyUser () {
  const path = '/users/identify';
  const withCredentials = true;
  const userId = await _getData(path, withCredentials);
  return userId;
}


export async function postBook(data) {
  const path = '/books';
  const withCredentials = true;
  const bookId = await _postData(path, data, withCredentials);
  return bookId;
}

export async function patchBook(id, data) {
  const path = `/books/${id}`;
  const withCredentials = true;
  const bookId = await _patchData(path, data, withCredentials);
  return bookId;
}

export async function getBook({ bookId }) {
  const path = `/books/${bookId}`;
  const withCredentials = true;
  const book = await _getData(path, withCredentials);
  return book;
}


export async function getBooks(params={"search":'ewrw'}) {
  let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  const path = `/books?${queryString}`;
  const withCredentials = true;
  const book = await _getData(path, withCredentials);
  return book;
}


export async function postQuestion ({ title, body }) {
  const path = '/questions';
  const withCredentials = true;
  const questionId = await _postData(path, {title, body}, withCredentials);
  return questionId;
}

export async function getQuestion ({ questionId }) {
  const path = `/questions/${questionId}`;
  const withCredentials = true;
  const question = await _getData(path, withCredentials);
  return question;
}

export async function postAnswer ({ body, questionId }) {
  const path = '/answers';
  const withCredentials = true;
  const answerId = await _postData(path, {body, questionId}, withCredentials);
  return answerId;
}

export async function getQuestionAnswers ({ questionId }) {
  const path = `/questions/${questionId}/answers`;
  const withCredentials = true;
  const answers = await _getData(path, withCredentials);
  return answers;
}

export async function getAllQuestions () {
  const path = `/questions`;
  const withCredentials = true;
  const questions = await _getData(path, withCredentials);
  return questions;
}

export async function deleteQuestion ({questionId}) {
  console.log("receiver", questionId)
  const path = `/questions/${questionId}`;
  const withCredentials = true;
  const deletedQuestionsCount = await _deleteData(path, withCredentials);
  return deletedQuestionsCount;
}

export async function putQuestion ({questionId, body, title}) {
  const path = `/questions/${questionId}`;
  const withCredentials = true;
  const updatedQuestionsCount = await _putData(path, {body, title}, withCredentials);
  return updatedQuestionsCount;
}

export async function deleteAnswer ({answerId}) {
  const path = `/answers/${answerId}`;
  const withCredentials = true;
  const deletedAnswersCount = await _deleteData(path, withCredentials);
  return deletedAnswersCount;
}

export async function putAnswer ({answerId, body}) {
  const path = `/answers/${answerId}`;
  const withCredentials = true;
  const updatedAnswersCount = await _putData(path, {body}, withCredentials);
  return updatedAnswersCount;
}

export async function postAnswerComment ({ body, answerId }) {
  const path = '/comments';
  const withCredentials = true;
  const commentId = await _postData(
    path, 
    {body, answerId, isParentQuestion: false}, 
    withCredentials
  );
  return commentId;
}

export async function postQuestionComment ({ body, questionId }) {
  const path = '/comments';
  const withCredentials = true;
  const commentId = await _postData(
    path, 
    {body, questionId, isParentQuestion: true}, 
    withCredentials
  );
  return commentId;
}

export async function putAnswerComment ({commentId, body}) {
  const path = `/comments/${commentId}`;
  const withCredentials = true;
  const updatedCommentsCount = await _putData(path, {body}, withCredentials);
  return updatedCommentsCount;
}

export async function deleteAnswerComment ({commentId}) {
  const path = `/comments/${commentId}`;
  const withCredentials = true;
  const deletedAnswersCount = await _deleteData(path, withCredentials);
  return deletedAnswersCount;
}

export async function logout () {
  const path = `/users/logout`;
  const withCredentials = true;
  await _getData(path, withCredentials);
}

export async function refreshToken () {
  const path = '/users/token'
  const withCredentials = true;
  const {token} = await _putData(path, {'lol': 'ahahh'}, withCredentials);
  _receiveToken(token)
}

export async function getUser ({userId}) {
  const path = `/users/${userId}`
  const withCredentials = true
  const user = await _getData(path, withCredentials)
  return user
}

// export async function updateUser({ userId }) {
//   const path = `/users/${userId}`
//   const withCredentials = true
//   const user = await _putData(path, withCredentials)
//   return user
// }

export async function getUsers () {
  const path = `/users`
  const withCredentials = true
  const users = await _getData(path, withCredentials)
  return users
}

export async function changePassword ({password}) {
  const path = `/users/password`
  const withCredentials = true
  await _putData(path, {password}, withCredentials)
}

export async function getUserNotifications ({ userId }) {
  const path = `/users/${userId}/notifications`
  const withCredentials = true
  const notifications = await _getData(path, withCredentials)
  return notifications
}

export async function getSomeQuestionsAfterQuestionId ({ questionId, limit }) {
  const path = `/questions?questionId=${questionId}&limit=${limit}`
  const withCredentials = true
  const notifications = await _getData(path, withCredentials)
  return notifications
}

export async function sendConfirmationCodeToEmail ({ confirmationCode, email }) {
  const path = `/users/email-management/code`
  const withCredentials = false
  await _postData(path, {confirmationCode, email}, withCredentials)
}

export async function recoverPassword ({ email }) {
  const path = `/users/passwords/recover`
  const withCredentials = false
  await _postData(path, {email}, withCredentials)
}

export async function addOrChangePhoneNumber ({ phoneNumber }) {
  const path = `/users/phone-numbers`
  const withCredentials = true
  await _putData(path, {phoneNumber}, withCredentials)
}