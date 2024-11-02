import { useDataContext } from '../../nonview/core/DataProvider';
import CustomStack from './CustomStack';
import ElectionSmallTitle from './ElectionSmallTitle';

export default function ExternalMedia({ id, children, customData = {} }) {
  const data = useDataContext();
  const { electionDisplay } = data;
  const customDataDisplay = Object.assign(
    {
      electionType: electionDisplay.electionType,
      electionDate: electionDisplay.date,
    },
    customData,
  );

  return (
    <div id={id} className="external-media" style={{ width: '100%' }}>
      <ElectionSmallTitle />
      <CustomStack>{children}</CustomStack>
      <div
        className="external-media-text-lines-json"
        style={{ display: 'none' }}
      >
        {JSON.stringify(customDataDisplay)}
      </div>
    </div>
  );
}
