import React from "react";
import "./Item.scss";

export default function Item(){
    return (
        <article className="article p-4 bg-body">
            <header className="row">
                <div className="col-8">
                    <div className="article__title d-inline-flex justify-content-start align-items-center flex-grow-1">
                        <h2 className="m-0"><a href="#" className="article__link">{"{article.title}"}</a></h2>
                        <button type="button" className="btn article__favorite favorite">
                            <svg className="favorite__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2.56911C7.26154 1.33835 6.03077 0.476807 4.55385 0.476807C2.46154 0.476807 0.861542 2.07681 0.861542 4.16911C0.861542 8.23065 3.07693 8.84604 8 13.523C12.9231 8.84604 15.1385 8.23065 15.1385 4.16911C15.1385 2.07681 13.5385 0.476807 11.4462 0.476807C9.96923 0.476807 8.73846 1.33835 8 2.56911Z"/>
                            </svg>
                            {"{favoritesCount}"}
                        </button>
                    </div>
                    <div className="article__tags tags">
                        <span className="tags__item rounded-1">{"{tagList[0]}"}</span>
                    </div>
                </div>
                <div className="col-4 author d-inline-flex justify-content-start align-items-center">
                    <div>
                        <div className="author__name">{"{article.author.username}"}</div>
                        <div className="author__date">{"{article.createdAt}"}</div>
                    </div>
                    <img src="{article.author.image}" className="author__pic" />
                </div>
            </header>
            <div>
                <p>{"{article.body}"}</p>
            </div>
        </article>
    )
}