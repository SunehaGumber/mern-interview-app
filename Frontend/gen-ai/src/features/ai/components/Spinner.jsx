const Spinner = ({ text = "Loading" }) => (
  <div className="spinner-wrap">
    <div className="spinner" />
    {text && <span className="spinner-text">{text}</span>}
  </div>
);

export default Spinner;