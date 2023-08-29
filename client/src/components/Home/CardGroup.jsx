/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import RenderCard from "./RenderCard";
function CardGroup() {
  return (
    <div className="CardGroup">
      <RenderCard title="Figure" />
      <hr />
      <RenderCard title="T-Shirt" />
    </div>
  );
}

export default CardGroup;
