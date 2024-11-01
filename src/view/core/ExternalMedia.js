import CustomStack from './CustomStack';
import ElectionSmallTitle from './ElectionSmallTitle';

export default function ExternalMedia({ id, children, textLines = [] }) {
  return (
    <div id={id} className="external-media" style={{ width: '100%' }}>
      <ElectionSmallTitle />
      <CustomStack>{children}</CustomStack>
      <div
        className="external-media-text-lines-json"
        // style={{ display: 'none' }}
      >
        {JSON.stringify(textLines)}
      </div>
    </div>
  );
}
