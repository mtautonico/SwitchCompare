import './components-styles/footer.css';
import {ImGithub} from "react-icons/im";

export default function Footer() {
    return (
        <div className="footer">
            <footer className="footer_content">
                <br/>
                {/*Copyright text on bottom left*/}
                <a href="https://github.com/mtautonico/SwitchCompare/blob/main/LICENSE.md" target="_blank"
                   rel="noreferrer">
                    <span className="copyright footerlink">&copy; {new Date().getFullYear()} Michael Tautonico</span>
                </a>

                {/* GitHub Repo Link */}
                <a className="footerLink" href="https://github.com/mtautonico/SwitchCompare" target="_blank"
                   rel="noreferrer">
                    <div className="github">
                        <ImGithub size={25}/>
                    </div>
                </a>
            </footer>
        </div>
    )
}
