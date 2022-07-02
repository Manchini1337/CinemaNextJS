import classes from './PersonelTable.module.css';
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

const PersonelTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [toggle]);

  if (users.length === 0) {
    return <p>Loading...</p>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const grantPermission = async (id) => {
    try {
      const response = await api.put('/users/permission', {
        id,
        type: 'PERSONEL',
      });
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  const revokePermission = async (id) => {
    try {
      const response = await api.put('/users/permission', {
        id,
        type: 'USER',
      });
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Użytkownicy</h2>
      <input
        className={classes.input}
        type='text'
        placeholder='Znajdź użytkownika...'
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Użytkownik</StyledTableCell>
              <StyledTableCell align='center'>Login</StyledTableCell>
              <StyledTableCell align='center'>Kontakt</StyledTableCell>
              <StyledTableCell align='center'>Typ konta</StyledTableCell>
              <StyledTableCell align='center'>Akcje</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) => {
                if (search === '') {
                  return user;
                } else if (
                  `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
                    search.toLowerCase()
                  )
                ) {
                  return user;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component='th' scope='row' align='center'>
                      <p>{user.firstName}</p>
                      <p>{user.lastName}</p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 200 }}>
                      <p>{user.username}</p>
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 250 }}>
                      <p>{user.email}</p>
                      <p>{user.phoneNumber}</p>
                    </StyledTableCell>

                    <StyledTableCell align='center' style={{ width: 150 }}>
                      {user.type}
                    </StyledTableCell>
                    <StyledTableCell align='center' style={{ width: 150 }}>
                      {user.type === 'USER' && (
                        <button
                          className={classes.authorisation__button}
                          onClick={() => grantPermission(user.id)}
                        >
                          Nadaj uprawnienia
                        </button>
                      )}
                      {user.type === 'PERSONEL' && (
                        <button
                          className={classes.authorisation__button}
                          onClick={() => revokePermission(user.id)}
                        >
                          Odbierz uprawnienia
                        </button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={users.length}
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

export default PersonelTable;
