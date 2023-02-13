const Loader = () => {
    return (
      <div className="bg-background w-full h-full flex justify-center items-center absolute top-0 right-0 z-1000">
        <div className="flex">
            <span>Loading</span>
            <div className="w-12 h-fit flex">
                <span className="one-dot text-base">.</span>
                <span className="two-dots text-base">.</span>
                <span className="three-dots text-base">.</span>
            </div>
        </div>
      </div>
    );
  };
  
  export default Loader;