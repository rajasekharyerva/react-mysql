import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TablePagination from '@material-ui/core/TablePagination';
import EnhancedTableHead from './EnhancedTableHead';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import FormDialog from './FormDialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
};

class App extends Component {
  state = {
    students: [],
    student: {
      Name: '',
      Batch: '',
      CreatedDate: ''
    },
    rowsPerPage: 5,
    page: 0,
    selected: [],
    order: 'asc',
    orderBy: 'RollNO'
  }

  deleteIconClicked (){
    fetch(`http://localhost:4000/students/deleteMultiple?rollno=${this.state.selected}`)
      .then(response => this.getStudents())
      .catch(err => console.error(err));

    this.setState({ selected: [] });
  }

  componentDidMount() {
    this.getStudents();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getStudents = () => {
    //axios.get('http://localhost:4000/students')
    fetch('http://localhost:4000/students')
      .then(response => response.json())
      .then(response => {
        this.setState({ students: response.data, student: { Name: '', Batch: '', CreatedDate: '' } });
      }).catch(err => console.error(err));
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  addStudent = () => {
    const { student } = this.state;
    fetch(`http://localhost:4000/students/add?name=${student.Name}&batch=${student.Batch}&date=${student.CreatedDate}`)
      .then(response => this.getStudents())
      .catch(err => console.error(err));
    // window.location.reload();
  }

  updateStudent = (e) => {
    //const { student } = this.state;
    fetch(`http://localhost:4000/students/update?name=${e.Name}&batch=${e.Batch}&date=${e.CreatedDate}&rollno=${e.RollNo}`)
      .then(response => this.getStudents())
      .catch(err => console.error(err));
    // window.location.reload();
  }

  deleteStudent = (rollno) => {
    fetch(`http://localhost:4000/students/delete?rollno=${rollno}`)
      .then(response => this.getStudents())
      .catch(err => console.error(err))

    this.setState({ selected: [] });
  }

  handleChange = (event) => {
    const { student } = this.state;
    this.setState({ student: { ...student, Batch: event.target.value } });
  };

  handleDate = (event) => {
    const { student } = this.state;
    this.setState({ student: { ...student, CreatedDate: `${event.target.value}` } });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      
      this.setState(state => ({ selected: state.students.map(n =>
        n.RollNo) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };


  isFormInvalid = () => {
    const { student } = this.state;
    return student.Name.length === 0 || student.Batch.length === 0 || student.CreatedDate.length === 0;
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { students, student, rowsPerPage, page, selected, order, orderBy } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, students.length - page * rowsPerPage);

    return (
      <div>
        <div>
          <TextField
            label="Name"
            id="margin-none"
            required
            //helperText="Ex: Maruti Suzuki"
            onChange={e => this.setState({ student: { ...student, Name: e.target.value.trim() } })}
            value={this.state.student.Name}></TextField>

          <FormControl>
            <InputLabel htmlFor="batch-simple">Batch</InputLabel>
            <Select
              value={this.state.student.Batch}
              onChange={(event) => this.handleChange(event)}
              inputProps={{
                name: 'Batch',
                id: 'batch-simple',
              }}>
              <MenuItem value={2007}>2007</MenuItem>
              <MenuItem value={2006}>2006</MenuItem>
              <MenuItem value={2005}>2005</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="date"
            label="Created Date"
            type="date"
            value={this.state.student.CreatedDate}
            onChange={(event) => this.handleDate(event)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button disabled={this.isFormInvalid()} variant="contained" color="primary" onClick={() => this.addStudent()}>Add Student</Button>
        </div>
        <Paper>
          <EnhancedTableToolbar deleteIconClicked = {() => this.deleteIconClicked()} numSelected={selected.length} selected={selected} />
          <div>
            <Table>
              <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={students.length}
                />
              <TableBody>
                { students.length !== 0 ? students.sort(getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                  const isSelected = this.isSelected(n.RollNo);
                  return (
                    <TableRow 
                    hover
                    //onClick={event => this.handleClick(event, n.RollNo)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                    key={n.RollNo}
                    >
                      <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} 
                            onClick={event => this.handleClick(event, n.RollNo)}/>
                      </TableCell>
                      <TableCell numeric>{n.RollNo}</TableCell>
                      <TableCell>{n.Name}</TableCell>
                      <TableCell numeric>{n.Batch}</TableCell>
                      <TableCell>{n.CreatedDate}</TableCell>
                      <TableCell component="th" scope="row">
                        <FormDialog  update = {(e) => this.updateStudent(e)} rowData = {n}/>
                      </TableCell>
                      <TableCell component="th" scope="row">
                      <IconButton aria-label="Delete">
                      <DeleteIcon disabled={false} variant="contained" color="secondary" onClick={() => this.deleteStudent(n.RollNo)}/>
                      </IconButton>
                        {/*<Button disabled={false} variant="contained" color="secondary" onClick={() => this.deleteStudent(n.RollNo)}>Delete</Button>*/}
                      </TableCell>
                    </TableRow>
                  );
                }) : <TableRow>
                    <TableCell colSpan="5">No records to display</TableCell></TableRow>}
                    {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        </div>
        );
      }
    }
    export default App;