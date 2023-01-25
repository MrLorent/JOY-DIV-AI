// COMPONENTS
import Loader from "../Loader"


const Illustration = ({ data }) => {

    /*======== RENDERER ========*/
    return (
        <div className="w-1/2 h-full flex flex-col items-center relative">
            {data 
            ?
            data.map((curve, index) => <div key={index} className="curve" dangerouslySetInnerHTML={{__html: curve}}></div>)
            :
            <Loader />}
        </div>
    );
};

export default Illustration;