import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'

import Header from "../Header/Header";
import ArticleList from "../Article/List";


function App() {
    return(
        <div className="app">
            <Header />
            <main className="app__main">
                <div className="container">
                    <ArticleList />
                </div>
            </main>
        </div>
    )
}

export default App;