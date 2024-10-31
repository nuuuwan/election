import CustomStack from './CustomStack';

export default function ExternalMedia({ id, children }) {
  return (
    <div id={id} className="watermark" style={{ width: '100%' }}>
      <CustomStack>{children}</CustomStack>
    </div>
  );
}
