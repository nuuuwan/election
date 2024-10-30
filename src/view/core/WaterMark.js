import ElectionSmallTitle from './ElectionSmallTitle';

export default function WaterMark({ id, children }) {
  return (
    <div id={id} className="watermark-container">
      {children}
      <ElectionSmallTitle />
    </div>
  );
}
