export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      {/* <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-accent border-secondary"></div> */}
      {/* <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-solid rounded-full border-t-transparent"></div> */}
      <img
        className="w-20 h-20 animate-spin"
        src="https://www.svgrepo.com/show/70469/loading.svg"
        alt="Loading icon"
      />
    </div>
  );
}
