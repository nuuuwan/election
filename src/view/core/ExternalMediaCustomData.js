export default function ExternalMediaCustomData({ customData }) {
  return (
    <div className="external-media-custom-data">
      {JSON.stringify(customData)}
    </div>
  );
}
