import {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box, CircularProgress} from '@mui/material';
import axios from 'axios';
import ModalFullInfo from '../ModalFullInfo/ModalFullInfo.jsx';
import {API_URL, image} from '../../CONSTANTS.js';
import {NameCell, OverviewCell, ReleaseDateCell, VoteAverageCell} from '../../components/NameCell.jsx';

export default function DataTable() {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayField, setDisplayField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tableState, setTableState] = useState({
    sorting: [],
    filters: { items: [] },
    pagination: { page: 0, pageSize: 5 }
  });

  useEffect(() => {
    const savedState = localStorage.getItem('tableState');
    if (savedState) {
      setTableState(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleRowClick = (params, event) => {
    if (!event.target.closest('img')) {
      setSelectedRow(params.row);
      setDisplayField(null);
      setOpen(true);
    }
  };

  const handleImageClick = (event, row) => {
    event.stopPropagation();
    setSelectedRow(row);
    setDisplayField('poster_path');
    setOpen(true);
  };

  const handleFieldClick = (event, row, field) => {
    event.stopPropagation();
    setSelectedRow(row);
    setDisplayField(field);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleStateChange = (newState) => {
    setTableState(newState);
    localStorage.setItem('tableState', JSON.stringify(newState));
  };
  const columns = [
    {
      field: 'poster_path',
      headerName: 'Poster',
      renderCell: (params) => (
        <img
          src={`${image + params.value}`}
          alt="image"
          style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          onClick={(event) => handleImageClick(event, params.row)}
        />
      ),
      sortable: false,
    },
    {
      field: 'original_title',
      headerName: 'Name',
      width: 250,
      renderCell: (params) => (
        <NameCell
          value={params.value}
          onClick={(event) => handleFieldClick(event, params.row, 'original_title')}
        />
      ),
      sortable: true,
      filterable: true,
    },
    {
      field: 'overview',
      headerName: 'Overview',
      width: 250,
      renderCell: (params) => (
        <OverviewCell
          value={params.value}
          onClick={(event) => handleFieldClick(event, params.row, 'overview')}
        />
      ),
      sortable: true,
      filterable: true,
    },
    {
      field: 'release_date',
      headerName: 'Release Year',
      width: 200,
      renderCell: (params) => (
        <ReleaseDateCell
          value={params.value}
          onClick={(event) => handleFieldClick(event, params.row, 'release_date')}
        />
      ),
      sortable: true,
      filterable: true,
    },
    {
      field: 'vote_average',
      headerName: 'Vote Average',
      renderCell: (params) => (
        <VoteAverageCell
          value={params.value}
          onClick={(event) => handleFieldClick(event, params.row, 'vote_average')}
        />
      ),
      sortable: true,
      filterable: true,
    },
  ];


  return (
    <Box sx={{ height: 650, width: '100%' }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DataGrid
            rows={movies}
            columns={columns}
            sortingModel={tableState.sorting}
            filterModel={{ items: tableState.filters.items }}
            paginationModel={tableState.pagination}
            onSortingModelChange={(model) => handleStateChange({ ...tableState, sorting: model })}
            onFilterModelChange={(model) => handleStateChange({ ...tableState, filters: model })}
            onPaginationModelChange={(model) => handleStateChange({ ...tableState, pagination: model })}
            getRowHeight={(params) => Math.min(Math.max(100, params.densityFactor * 50), 300)}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            sx={{
              '& .MuiDataGrid-row': {
                minHeight: '100px !important',
                maxHeight: '300px !important',
              },
              '& .MuiDataGrid-cell': {
                paddingLeft: 0,
                marginBottom: 1
              },
              maxWidth: 1000,
              margin: '0 auto',
            }}
          />
          {selectedRow && (
            <ModalFullInfo
              open={open}
              handleClose={handleClose}
              selectedRow={selectedRow}
              displayField={displayField}
              name={selectedRow.original_title}
              releaseYear={selectedRow.release_date}
              overview={selectedRow.overview}
              img={selectedRow.poster_path}
              voteAverage={selectedRow.vote_average}
            />
          )}
        </>
      )}
    </Box>
  );
}
