import React, { Component } from "react";

// import history from "../helpers/history"

import {
  loginUser as loginUserApi, 
  identifyUser as identifyUserApi,
  postUser as postUserApi,
  sendCode as sendCodeApi,
  logout as logoutApi,
  changePassword as changePasswordApi,
  getUser as getUserApi,
  postBook as postBookApi,
  patchBook as patchBookApi,
  getBook as getBookApi,
  getCategories as getCategoriesApi,
  getSettings as getSettingsApi,
  getBooks as getBooksApi,
  reserveBook as reserveBookApi,
  confirmReserve as confirmReserveApi,
  getUserNotifications as getUserNotificationsApi,
  recoverPassword as recoverPassordApi,
  deleteBook as deleteBookApi
} from '../utils/api'

const Context = React.createContext();
const { Provider, Consumer } = Context

class AuthContexProvider extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      notifications: [],
      show: false,
      modalTitle: '',
      modalBody: '',
      maxBooks: 5,
      maxDays: 5,
    }
  }

  getCurrentUser = async () => {
    const userId = await this._getUserId()
    const user = await getUserApi ({ userId })
    return user
  }

  getCurrentUserNotifications = async () => {
    const user = await this.getCurrentUser ()
    const notifications = await getUserNotificationsApi({ userId: user.userId })
    this.setState({ notifications })
  }

  _getUserId = async () => {
    const userId = await identifyUserApi()
    return userId
  }
  
  identifyUser = async () => {
    const userId = await this._getUserId()
    this.setState({user: {userId}})
  }

  isUserIdentified = async () => {
    try {
      await this.identifyUser()
      return true
    } catch (err) {
      return false
    }
  }

  loginUser = async ({email, password}) => {
    const userId = await loginUserApi({email, password})
    this.setState({user: {userId}})
  }

  registerUser = async ({email, code}) => {
    console.log("coded", code)
    const userId = await postUserApi({email, code})
    this.setState({user: {userId}})
  }

  getCategories = async () => {
    return await getCategoriesApi()
  }

  getSettings = async () => {
    return await getSettingsApi()
  }

  sendCode = async ({ username, email, password }) => {
    return await sendCodeApi({ username, email, password })
    // this.setState({ user: { userId } })
  }

  reserveBook = async ({ bookId, endTime }) => {
    return await reserveBookApi({ bookId, endTime })
    // this.setState({ user: { userId } })
  }

  logout = async () => {
    await logoutApi()
    localStorage.removeItem("token");
    window.location.href="/login"
    // history.push('/users/login')
  }

  changePassword = async ({password}) => {
    await changePasswordApi ({ password })
    alert ("Password succesfully changed")
  }

  recoverPassword = async ({email}) => {
    await recoverPassordApi ({ email })
  }

  doesCurrentUserOwnQuestion = ({ parentUserId }) => {
    const userId = this.state.user.userId
    console.log("us", userId, parentUserId)
    if (parentUserId === userId){
      return true
    } else{
      return false
    }
  }

  doesCurrentUserOwnAnswer = ({ parentUserId }) => {
    const userId = this.state.user.userId
    console.log("us1", userId, parentUserId)
    if (parentUserId === userId){
      return true
    } else{
      return false
    }
  }

  doesCurrentUserOwnComment = ({ parentUserId }) => {
    const userId = this.state.user.userId
    console.log("us1", userId, parentUserId)
    if (parentUserId === userId){
      return true
    } else{
      return false
    }
  }

  

  
  postBook = async (data) => {
    const bookId = await postBookApi(data)
  }

  patchBook = async (id, data) => {
    const bookId = await patchBookApi(id, data)
  }

  getBook = async ({bookId}) => {
    console.log('dsa')
    return await getBookApi({bookId})
    // this.setState({ user: { userId } })
  }

  getBooks = async (params) => {
    return await getBooksApi(params)
  }

  confirmReserve = async (id) => {
    return await confirmReserveApi(id)
  }

  
  deleteBook = async (bookId) => {
    return await deleteBookApi(bookId)
  }


  updateState = (key, val) => {
    this.setState({[key]: val});
 }

  render() {
    const { user, notifications, show, modalBody, modalTitle, maxBooks, maxDays } = this.state;
    const {
      loginUser,
      updateState, 
      identifyUser, 
      registerUser, 
      sendCode,
      logout,
      isUserIdentified, 
      doesCurrentUserOwnQuestion,
      doesCurrentUserOwnComment,
      doesCurrentUserOwnAnswer,
      changePassword,
      getBooks,
      reserveBook,
      getCurrentUser,
      getCurrentUserNotifications,
      recoverPassword,
      postBook,
      patchBook,
      deleteBook,
      confirmReserve,
      getBook,
      getCategories,
      getSettings,
    } = this
    return (
      <Provider
        value={{ 
          user,
          notifications,
          show,
          modalTitle,
          modalBody,
          maxDays,
          maxBooks,
          loginUser,
          updateState,
          identifyUser,
          registerUser,
          sendCode,
          logout,
          getBooks,
          reserveBook,
          isUserIdentified,
          doesCurrentUserOwnQuestion,
          doesCurrentUserOwnComment,
          changePassword,
          doesCurrentUserOwnAnswer,
          getCurrentUser,
          getCurrentUserNotifications,
          recoverPassword,
          postBook,
          getBook,
          patchBook,
          deleteBook,
          confirmReserve,
          getCategories,
          getSettings
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AuthContexProvider, Consumer as AuthContexConsumer, Context as AuthContext };