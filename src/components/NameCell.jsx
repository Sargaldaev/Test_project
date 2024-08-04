import {useTheme} from '@mui/material/styles';
import PropTypes from 'prop-types';

const NameCell = ({value, onClick}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        color: theme.palette.mode === 'dark' ? '#FFD700' : '#2F4F4F',
        fontWeight: 'bold',
        fontSize: '16px',
        fontFamily: 'Georgia',
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

NameCell.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const OverviewCell = ({value, onClick}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        color: theme.palette.mode === 'dark' ? '#ADFF2F' : '#8B0000',
        fontWeight: 'normal',
        fontSize: '14px',
        fontFamily: 'Verdana',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

OverviewCell.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ReleaseDateCell = ({value, onClick}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        color: theme.palette.mode === 'dark' ? '#00CED1' : '#8B4513',
        fontWeight: 'bold',
        fontSize: '15px',
        fontFamily: 'Arial',
        cursor: 'pointer',
        marginLeft: 20,
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

ReleaseDateCell.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const VoteAverageCell = ({value, onClick}) => {
  const theme = useTheme();
  return (
    <div
      style={{
        color: theme.palette.mode === 'dark' ? 'green' : undefined,
        fontWeight: '900',
        fontSize: '15px',
        fontFamily: 'Roboto',
        cursor: 'pointer',
        marginLeft: 20,
      }}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

VoteAverageCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export {NameCell, OverviewCell, ReleaseDateCell, VoteAverageCell};
