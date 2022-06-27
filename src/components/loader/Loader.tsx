import "./loader.scss";
import loader from "../../img/icons/loading.svg";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader fade-in">
        <img src={loader} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
