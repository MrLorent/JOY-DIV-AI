// COMPONENTS
import Loader from "../Loader"


const Illustration = ({ curves }) => {
    /*======== RENDERER ========*/
    return (
        <div className="w-1/2 h-full flex pl-2 justify-center items-center overflow-x-hidden overflow-y-auto relative">
            {
                curves === null ?
                    <div className="w-fit h-fit flex flex-col items-center">
                        <span>No poem to illustrate yet...</span>
                        <span className="m-3">［(－－)］zzzz</span>
                    </div>
                : curves === "loading" ?
                    <Loader />
                :
                    curves.map((curve, index) => <div key={index} className={"w-full h-fit flex justify-center absolute"} style={{"top": index * 15 }} dangerouslySetInnerHTML={{__html: curve}}></div>)
            }
        </div>
    );
};

export default Illustration;