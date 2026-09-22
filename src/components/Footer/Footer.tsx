import {date} from "./date";
import "./Footer.module.css"

export function Footer(){
    return (
        <>
        <footer>
            <address>
                <p>&copy; <span>{date()}</span> Natalvides Neto - Todos os direitos reservados</p>
            </address>
        </footer>
        </>
    )
}