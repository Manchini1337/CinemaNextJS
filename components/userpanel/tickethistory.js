import classes from './TicketHistory.module.css';
import { useState, useEffect } from 'react';
import api from '../../utils/api/axios.interceptor';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { capitalizeFirstLetter } from '../../utils/helpers/helpers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TicketHistory = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h2 className={classes.title}>Bilety</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Klient</StyledTableCell>
              <StyledTableCell align='center'>Data</StyledTableCell>
              <StyledTableCell align='center'>Film</StyledTableCell>
              <StyledTableCell align='center'>Miejsca</StyledTableCell>
              <StyledTableCell align='center'>Czy zapłacono?</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders

              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => {
                return (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      <p>{`${order.firstName} ${order.lastName}`}</p>
                      <p>{order.email}</p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 200 }}>
                      <p>
                        {format(new Date(order.event.startDate), 'yyyy.dd.MM ')}
                      </p>
                      <p>
                        {capitalizeFirstLetter(
                          format(
                            new Date(order.event.startDate),
                            'eeee HH:mm',
                            {
                              locale: pl,
                            }
                          )
                        )}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 250 }}>
                      <p>{order.event.movie.name}</p>
                    </StyledTableCell>

                    <StyledTableCell align='center' style={{ width: 150 }}>
                      {JSON.parse(order.seatId).map((seat) => (
                        <p key={seat.id}> Miejsce {seat.name}</p>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 150 }}>
                      <p>{order.isPaid ? 'Tak' : 'Nie'}</p>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'Ilość wyników na stronę:'}
        />
      </TableContainer>
    </>
  );
};

export default TicketHistory;
