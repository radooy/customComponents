import { Link } from "react-router-dom";
import style from "./Selector.module.css";

const Selector = () => {
  return (
    <div className={style.wrapper}>
        <div className="flex column">
            <Link className={style.link} to="/maps">GoogleMaps</Link>
            <Link className={style.link} to="/iban">Iban</Link>
            <Link className={style.link} to="/card">Card</Link>
            <Link className={style.link} to="/flipper">Flipper</Link>
            <Link className={style.link} to="/date">Date picker BG</Link>
            <Link className={style.link} to="/scroll-to">ScrollTo</Link>
        </div>
    </div>
  )
}

export default Selector;
