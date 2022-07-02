import classes from './OrderTable.module.css';
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

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
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
  }, [toggle]);

  if (orders.length === 0) {
    return <p>Loading...</p>;
  }

  const cancelOrder = async (id) => {
    try {
      const response = await api.put('/orders', {
        id,
        isCancelled: true,
      });
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (id) => {
    try {
      const response = await api.put('/orders', {
        id,
        isPaid: true,
      });
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h2>Zamówienia</h2>
      <input
        className={classes.input}
        type='text'
        placeholder='Znajdź klienta...'
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Klient</StyledTableCell>
              <StyledTableCell align='center'>Kontakt</StyledTableCell>
              <StyledTableCell align='center'>Seans</StyledTableCell>
              <StyledTableCell align='center'>Czy opłacono?</StyledTableCell>
              <StyledTableCell align='center'>Czy anulowano?</StyledTableCell>
              <StyledTableCell align='center'>Akcje</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter((order) => {
                if (search === '') {
                  return order;
                } else if (
                  order.lastName.toLowerCase().includes(search.toLowerCase()) ||
                  order.firstName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return order;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => {
                return (
                  <StyledTableRow key={order.id}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      <p>{order.firstName}</p>
                      <p>{order.lastName}</p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 200 }}>
                      <p>{order.email}</p>
                      <p>{order.phoneNumber}</p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 300 }}>
                      <p>{order.event.movie.name}</p>
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
                    <StyledTableCell align='center' style={{ width: 100 }}>
                      <p>{order.isPaid ? 'TAK' : 'NIE'}</p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 100 }}>
                      <p>{order.isCancelled ? 'TAK' : 'NIE'} </p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 100 }}>
                      <button
                        className={classes.order__button}
                        onClick={() => acceptOrder(order.id)}
                      >
                        Opłać
                      </button>
                      <button
                        className={classes.order__button}
                        onClick={() => cancelOrder(order.id)}
                      >
                        Anuluj
                      </button>
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

export default OrderTable;
