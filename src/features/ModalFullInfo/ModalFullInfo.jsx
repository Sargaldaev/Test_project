import PropTypes from 'prop-types';
import {Box, Modal, Typography} from '@mui/material';
import {image} from '../../CONSTANTS.js';

const ModalFullInfo = (
  {
    open,
    handleClose,
    displayField,
    name,
    releaseYear,
    overview,
    voteAverage,
    img
  }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        {displayField === 'poster_path' ? (
          <img
            src={`${image + img}`}
            alt="large"
            style={{width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '10px'}}
          />
        ) : displayField === 'original_title' ? (
          <Typography fontSize={14} color={'#FFD700'}>
            <strong style={{color: 'brown', fontSize: 16, marginRight: 5}}>Name:</strong>{name}
          </Typography>
        ) : displayField === 'overview' ? (
          <Typography fontSize={'14px'} color={'#ADFF2F'}>
            <strong style={{color: 'brown', fontSize: 16, marginRight: 5}}>Overview:</strong><br/> {overview}
          </Typography>
        ) : displayField === 'release_date' ? (
          <Typography variant="body1" color={'skyblue'}>
            <strong style={{color: 'blue', marginRight: 5}}>Release Year:</strong> {releaseYear}
          </Typography>
        ) : displayField === 'vote_average' && (
          <Typography variant="body1">
            <strong style={{color: 'green'}}>Vote Average:</strong> {voteAverage}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

ModalFullInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  displayField: PropTypes.string,
  name: PropTypes.string.isRequired,
  releaseYear: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default ModalFullInfo;
