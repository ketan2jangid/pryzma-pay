import { useNavigate } from "react-router-dom";
import { StorageKeys } from "../config";
import Button, { ButtonType } from "./Button"
import HeaderText, { HeaderSize } from "./HeaderText";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserProvider";


function Appbar() {
    const user = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(StorageKeys.userToken);
        navigate("/signin");
    };


    return (
        <div className="w-full flex items-center justify-center">
            <div className="m-4 px-8 py-4 w-[60vw] bg-black border border-gray-800 flex items-center justify-between rounded-full">
                <HeaderText size={HeaderSize.Small}/>
                {/* TODO: ADD SETTINGS ICON AND FLOATING MENU */}
                
                <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MdOutlineAccountCircle className="text-gray-500 text-3xl hover:text-neon"/>
                    </button>

                    { isMenuOpen ? ( <div className="absolute top-16 right-0 p-2 bg-[#0E0E0E] border border-gray-800 rounded-xl text-gray-400">
                        <p className="p-2 border-b border-b-gray-700">{user?.email}</p>
                        <ul className="p-2">
                            <li><Button classes="text-red-500/70" type={ButtonType.Text} onClick={handleLogout}>Logout</Button></li>
                        </ul>
                    </div> ) : null}
                </div>
            </div>  
        </div>
    )
}

export default Appbar;