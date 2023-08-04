import React from "react";
import style from "./Loading.module.css";
import loaderImage from './Load.gif';

export default function Loading() {
    return (
        <div >
            <img className={style.center} src={loaderImage} alt="Loading" />
        </div>
    );
};