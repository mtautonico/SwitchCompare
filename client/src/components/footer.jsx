import './components-styles/footer.css';
import {ImGithub} from "react-icons/im";
import {SiReddit} from "react-icons/si";

export default function Footer() {
    return (
        <div className="footer">
            <footer className="footer_content">
                <br/>
                {/* GitHub Repo Link */}
                <div>
                    <a className="footerLink" href="https://github.com/mtautonico/SwitchCompare" target="_blank"
                       rel="noreferrer">
                        <div className="github">
                            <ImGithub size={25}/>
                        </div>
                    </a>
                </div>
                {/* Reddit Link */}
                <a className="footerLink" href="https://github.com/mtautonico/SwitchCompare" target="_blank"
                   rel="noreferrer">
                    <div className="reddit">
                        <SiReddit size={25}/>
                    </div>
                </a>


            </footer>
        </div>
    )
        ;
}
