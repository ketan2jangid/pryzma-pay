import { useNavigate } from "react-router-dom";
import { MdArrowForward } from 'react-icons/md';
import HeaderText from "../components/HeaderText";
import Button, { ButtonType } from "../components/Button";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen">
            {/* Hero Section */}
            <div className="h-screen w-full p-3">
                <div className="h-[95vh] bg-black bg-radial-[at_50%_95%] from-neon/35 to-black rounded-3xl flex flex-col items-center justify-start">
                    <div className="mt-32 mb-40">
                        <HeaderText />
                    </div>

                    <div className="h-max flex flex-col justify-center items-center">
                        <p className="mb-4 text-5xl font-bold text-gray-300">Payments made</p>
                        <p className="text-5xl font-bold text-white underline decoration-neon"><em>Easy, Fast, Reliable</em></p>
                        <p className="mt-4 text-lg text-gray-400">PryzmaPay allows you to pay to your friends and family in an instant</p>

                        <Button 
                            type={ButtonType.Icon}
                            onClick={() => navigate("/signin")}
                            icon={<MdArrowForward
                                color="black"
                            />}
                            >
                            Get started
                        </Button>
                    </div>


                </div>
            </div>

            <div>
                
            </div>
        </div>
    )
}

export default LandingPage;