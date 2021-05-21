import React from "react";
import s from './Footer.module.css'
const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={s.text} align={"right"}>
                По вопросам и предложениям обращаться на электронную почту yardeus@mail.ru
            </div>
        </div>
    )
}
export default Footer;