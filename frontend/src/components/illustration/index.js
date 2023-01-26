// COMPONENTS
import Loader from "../Loader"


const Illustration = ({ curves }) => {
    /*======== RENDERER ========*/
    return (
        <div className="w-1/2 h-full overflow-auto relative">
            {curves ?
                curves.map((curve, index) => <div key={index} className={"w-full h-fit flex justify-center absolute"} style={{"top": index * 15 }} dangerouslySetInnerHTML={{__html: curve}}></div>)
            :
                <Loader />}
        </div>
    );
};

export default Illustration;