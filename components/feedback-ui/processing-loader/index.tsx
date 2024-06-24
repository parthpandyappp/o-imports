const ProcessingLoader = () => {
  return (
    <div className="gap-2 absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-600 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
      </span>
      <p className="text-gray-400 spin-in-3">Processing...</p>
    </div>
  );
};

export default ProcessingLoader;
