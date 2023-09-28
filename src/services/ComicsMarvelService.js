import { useHttp } from "../hooks/http.hook";

const useComicsMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=82aa5f5425233f262293fe9b164c6c52";
    const _baseOffset = 0;

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    };

    const getComics = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformComics = (comics) => {
        let price =
            comics.prices.length > 1 && comics.prices[0].price === 0
                ? comics.prices[1].price
                : comics.prices[0].price;

        return {
            id: comics.id,
            title: comics.title,
            language: comics.textObjects[0]?.language,
            text: comics.textObjects[0]?.text,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price,
            pageCount: comics.pageCount,
        };
    };

    return { loading, error, getComics, getAllComics, clearError };
};
export default useComicsMarvelService;
