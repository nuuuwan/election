import CustomStack from './CustomStack';
import ElectionSmallTitle from './ElectionSmallTitle';

export default function ExternalMedia({ id, children }) {
  return (
    <div id={id} className="watermark" style={{ width: '100%' }}>
      <ElectionSmallTitle />
      <CustomStack>{children}</CustomStack>
    </div>
  );
}
