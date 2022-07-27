import { Link } from "react-router-dom";
import style from "./Selector.module.css";

const Selector = () => {
  return (
    <div className={style.wrapper}>
        <div className="flex column">
            <Link className={style.link} to="/maps">GoogleMaps</Link>
        </div>
    </div>
  )
}

export default Selector;
