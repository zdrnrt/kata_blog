import React from "react";
import "./Header.scss";

export default function Header() {
    return (
        <header className="header">
            <div className="container pt-3 pb-3">
                <div className="row justify-content-between align-items-center">
                    <h1 className="h5 col-md-6">Realworld Blog</h1>

                    <div className="col-md-6 text-end">
                        <button type="button" className="btn header__sign">Sign In</button>
                        <button type="button" className="btn btn-outline-success">Sign Up</button>
                    </div>

                    <div className="col-md-6 text-end">
                        <button type="button" className="btn btn-sm btn-outline-success">Create article</button>
                        <button type="button" className="btn user">
                            {"{user name}"}
                            <img src="" width="46" height="46" className="user__pic"/>
                        </button>
                        <button type="button" className="btn btn-outline-secondary">Log Out</button>
                    </div>
                    
                </div>
            </div>
        </header>
    )
}
