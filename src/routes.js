import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard"

//history
import { history } from './helpers/history';


import Header from './components/Header';
import Footer from './components/Footer';
//pages
import HomeTest from "./pages/HomeTest"
import LoginPage from "./pages/Login"
import Register from "./pages/Register"
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import MyLikes from './pages/MyLikes';
import MyBooks from './pages/MyBooks';
import EditBook from './pages/EditBook';
import Appointments from './pages/Appointments';
import Map from './pages/Map';
import Details from './components/Details';
import SearchPage from './pages/SearchPage';
import BorrowedBooks from "./pages/BorrowedBooks";
import ExpiredBooks from "./pages/ExpiredBooks";
import PendingBooks from "./pages/PendingBooks";
import ExpiredBooksAdmin from "./pages/ExpiredBooksAdmin";
import ProfilePageAnother from "./pages/ProfilePageAnother";
import PendingBooksAdmin from "./pages/PendingBooksAdmin";
import SettingsPage from "./pages/Settings";
import Wishlist from "./pages/Wishlist";
import BorrowedBooksAdmin from "./pages/BorrowedBooksAdmin";

function Routes() {
    return (
        <Router history={history}>
            <Header />
                <Switch>
                    ProfilePage
                    <Route
                        exact
                        path="/"
                        component={HomeTest}
                    />

                    <Route
                        exact
                        path="/details/:id"
                        component={Details}
                    />

                    <Route
                        exact
                        path="/search"
                        component={SearchPage}
                    />
                    
                    <Route
                        path="/login"
                        component={LoginPage}
                    />
                    <Route
                        path="/register"
                        component={Register}
                    />

                    <RouteGuard
                        exact
                        path="/profile"
                        component={ProfilePage}
                    />

                    <RouteGuard
                        exact
                        path="/profile/:id"
                        component={ProfilePageAnother}
                    />
                    
                    <RouteGuard
                        exact
                        path="/chat"
                        component={ChatPage}
                    
                    />
                    
                    <RouteGuard
                        path="/wishlist"
                        component={Wishlist}
                    />
                    <RouteGuard
                        exact
                        path="/my_books"
                        component={MyBooks}
                    
                    />
                
                    <RouteGuard	
                        exact	
                        path="/settings"	
                        component={SettingsPage}	
                    />
                    <RouteGuard
                        exact
                        path="/my_borrowed_books"
                        component={BorrowedBooks}
                    
                    />

                    <RouteGuard
                        exact
                        path="/my_expired_books"
                        component={ExpiredBooks}
                    
                    />

                    <RouteGuard
                        exact
                        path="/my_pending_books"
                        component={PendingBooks}
                    
                    />

                    <RouteGuard
                        exact
                        path="/expired_books_admin"
                        component={ExpiredBooksAdmin}
                    
                    />

                    <RouteGuard
                        exact
                        path="/borrowed_books_admin"
                        component={BorrowedBooksAdmin}
                    
                    />

                    
                    <RouteGuard
                        exact
                        path="/pending_books_admin"
                        component={PendingBooksAdmin}
                    />

                    <RouteGuard
                        exact
                        path="/settings"
                        component={SettingsPage}
                    />

                    <RouteGuard
                        exact
                        path="/my_likes"
                        component={MyLikes}
                    
                    />

                    <RouteGuard
                        exact
                        path="/editBook"
                        component={EditBook}
                    
                    />
                    <RouteGuard
                        exact
                        path="/editBook/:id"
                        component={EditBook}
                    
                    />
                    <RouteGuard
                        exact
                        path="/appointment"
                        component={Appointments}

                    />
                    <RouteGuard
                        exact
                        path="/map"
                        component={Map}

                    />

                

                    
                    <Redirect to="/ErrorPage" />
                </Switch>

            <Footer/>
        </Router>
    );
}

export default Routes
