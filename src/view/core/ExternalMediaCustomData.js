export default function ExternalMediaCustomData({ customData }) {
  const style = { display: 'none' };
  return (
    <div className="external-media-custom-data" style={style}>
      {JSON.stringify(customData)}
    </div>
  );
}
