const Spinner = () => (
  <div className="flex justify-center items-center">
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 mt-10 border-4 rounded-full"
      role="status"
    >
      <span className="visually-hidden"></span>
    </div>
  </div>
);

export default Spinner;
