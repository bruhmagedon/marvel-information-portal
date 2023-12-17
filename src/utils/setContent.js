import Skeleton from "../components/skeleton/Skeleton";
import ErrorMessage from "../components//errorMessage/errorMessage";
import Spinner from "../components/spinner/Spinner";

// FSM
const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "confirmed":
      return <Component data={data} />;
    default:
      throw new Error("Unexpected process state");
  }
};
// вместо
// const skeleton = char || loading || error ? null : <Skeleton />;
// const errorMessage = error ? <ErrorMessage /> : null;
// const spinner = loading ? <Spinner /> : null;
// const content = !(loading || error || !char) ? <View char={char} /> : null;

export default setContent;
