import ElectionSmallTitle from './ElectionSmallTitle';
import CustomStack from './CustomStack';

export default function WaterMark({ id, children }) {
  return (
    <div id={id} className="watermark" style={{ width: '100%' }}>
      <CustomStack>
        {children}
        <ElectionSmallTitle />
      </CustomStack>
    </div>
  );
}
