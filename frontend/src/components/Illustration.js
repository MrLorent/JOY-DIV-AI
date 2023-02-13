// COMPONENTS
import Loader from "./Loader"


const Illustration = ({ curves, loading }) => {
    /*======== RENDERER ========*/
    return (
        <div className="w-full h-full flex flex-col">
            <span className="mb-3">The Illustration :</span>
            <div id="illustration" className="w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto pt-28 p-5 border border-tertiary rounded-lg relative">
            {
                curves && curves !== "loading" ? (
                    <>
                    {
                        curves.map((curve, index) => <div key={index} className={"w-full h-5 flex justify-center items-end"} dangerouslySetInnerHTML={{__html: curve}}></div>)
                    }
                    {
                        loading ?
                            <div className="flex">
                                <span>Processing next line</span>
                                <div className="w-12 h-fit flex">
                                    <span className="one-dot text-base">.</span>
                                    <span className="two-dots text-base">.</span>
                                    <span className="three-dots text-base">.</span>
                                </div>
                            </div>
                        :
                            null
                    }
                    </>
                ) : (
                    loading ?
                        <Loader />
                    :
                        <div className="w-fit h-fit flex flex-col items-center pb-28 m-auto">
                            <span>No poem to illustrate yet...</span>
                            <span className="m-3">［(－－)］zzzz</span>
                        </div>
                )
            }
            </div>
        </div>
    );
};

export default Illustration;