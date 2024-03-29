import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useCharMarvelService from "../../services/CharMarvelService";
// import setContent from "../../utils/setContent";
import "./charList.scss";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      // грузятся новые элементы?
      return newItemLoading ? <Component /> : <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "confirmed":
      return <Component />;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useCharMarvelService();

  useEffect(() => {
    return () => onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const itemRefs = useRef([]);
  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          ref={(el) => (itemRefs.current[i] = el)}
          className="char__item"
          // key={item.id}
          key={i}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
          // onKeyPress={(e) => {
          //     if (e.key === " " || e.key === "Enter") {
          //         props.onCharSelected(item.id);
          //         focusOnItem(i);
          //     }
          // }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {setContent(process, () => renderItems(charList), newItemLoading)}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
