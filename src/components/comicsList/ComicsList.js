import "./comicsList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useComicsMarvelService from "../../services/ComicsMarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useComicsMarvelService();

    useEffect(() => {
        return () => onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setComicsEnded(ended);
    };

    const comicsRender = () => {
        const items = comicsList.map((comics, i) => {
            let comicsPrice = !comics.price
                ? "No data about price"
                : comics.price + "$";

            return (
                <li className="comics__item" key={i}>
                    {/* переход на страницу комикса */}
                    {/* eslint-disable-next-line */}
                    <Link to={`/comics/${comics.id}`}>
                        <img
                            src={comics.thumbnail}
                            alt={comics.title}
                            className="comics__item-img"
                        />
                        <div className="comics__item-name">{comics.title}</div>
                        <div className="comics__item-price">{comicsPrice}</div>
                    </Link>
                </li>
            );
        });
        return (
            <>
                <ul className="comics__grid">{items}</ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
                    style={{ display: comicsEnded ? "none" : "block" }}
                >
                    <div className="inner">load more</div>
                </button>
            </>
        );
    };

    const comicsRenderItems = comicsRender();
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {comicsRenderItems}
        </div>
    );
};

export default ComicsList;
