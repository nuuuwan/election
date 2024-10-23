import { Format, ProjectionModelInfo, Translate } from '../../../nonview';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { CustomAlert, CustomLoadingProgress } from '../..';
import { Typography } from '@mui/material';
import { useDataContext } from '../../../nonview/core/DataProvider';

function ProjectModelInfoViewTitle({ text }) {
  return <Typography variant="h4">{text}</Typography>;
}

function ProjectModelInfoViewIsTooEarly() {
  const data = useDataContext();
  const { nResultsDisplay } = data;
  return (
    <>
      <ProjectModelInfoViewTitle text="Too Early to Call" />
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate(
            'Our model needs at least %1 results to make a projection.',
            [ProjectionModelInfo.MIN_N_RESULTS_DISPLAY],
          )}
          {Translate(' Currently we have %1 only results.', [nResultsDisplay])}
        </Typography>
      </CustomAlert>
    </>
  );
}

function ProjectModelInfoViewIsTooMuchError({ projectionModelInfo }) {
  return (
    <>
      <ProjectModelInfoViewTitle text="Too Much Error" />
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate('Model Error is currently %1 of projected votes.', [
            Format.percent(projectionModelInfo.error),
          ])}
          {Translate(
            ' We will show our Model Projection once the Error is below %1.',
            [Format.percent(ProjectionModelInfo.MIN_P_ERROR)],
          )}
        </Typography>
      </CustomAlert>
    </>
  );
}

export default function ProjectModelInfoView({ children }) {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay, nResultsDisplay } = data;

  const projectionModelInfo = new ProjectionModelInfo(
    electionProjected || electionDisplay,
    nResultsDisplay,
  );

  if (projectionModelInfo.isTooEarly) {
    return <ProjectModelInfoViewIsTooEarly />;
  }

  if (projectionModelInfo.isTooMuchError) {
    return (
      <ProjectModelInfoViewIsTooMuchError
        projectionModelInfo={projectionModelInfo}
      />
    );
  }

  return <>{children}</>;
}
