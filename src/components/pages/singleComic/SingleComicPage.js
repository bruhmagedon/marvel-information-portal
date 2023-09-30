import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useComicsMarvelService from "../../../services/ComicsMarvelService";
import ErrorMessage from "../../errorMessage/errorMessage";
import Spinner from "../../spinner/Spinner";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const { comicId } = useParams(); //id из ссылки на страницу (path="/comics/:comicId")
    const [comic, setComic] = useState(null);
    const { loading, error, getComics, clearError } = useComicsMarvelService();

    useEffect(() => {
        return () => updateComic();
        // eslint-disable-next-line
    }, [comicId]);

    const updateComic = () => {
        if (!comicId) return;
        clearError();
        getComics(comicId).then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? (
        <View comic={comic} />
    ) : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ comic }) => {
    console.log(comic);
    const { title, language, thumbnail, text, price, pageCount } = comic;

    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">
                    {text == null ? "Text not found" : text}
                </p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">
                    Language: {language == null ? "not found" : language}
                </p>
                <div className="single-comic__price">
                    {price === 0 ? "No data about price" : `${price}$`}
                </div>
            </div>
            <Link to={"/comics"} className="single-comic__back">
                Back to all
            </Link>
        </>
    );
};

export default SingleComicPage;
