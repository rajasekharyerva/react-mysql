import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default class FormDialog extends React.Component {
  state = {
    open: false,
    student: {
        RollNo: '',
        Name: '',
        Batch: '',
        CreatedDate: ''
      }
  };

  handleClickOpen = () => {
    this.setState({ open: true, 
                    student: {RollNo: this.props.rowData.RollNo, Name: this.props.rowData.Name, Batch: this.props.rowData.Batch, CreatedDate: this.props.rowData.CreatedDate} });
  };

  handleClose = () => {
    this.setState({ open: false});
  };

  handleChange = (event) => {
    const { student } = this.state;
    this.setState({ student: { ...student, Batch: event.target.value } });
  };

  handleDate = (event) => {
    const { student } = this.state;
    this.setState({ student: { ...student, CreatedDate: `${event.target.value}` } });
  };

  render() {
    const { student } = this.state;
    return (
      <div>
        <IconButton aria-label="Delete">
        <EditIcon onClick={this.handleClickOpen} />
        </IconButton>
        {/*<Button onClick={this.handleClickOpen}>Edit</Button>*/}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
            DialogContentText
            </DialogContentText>
            <TextField
            label="Student Name"
            id="margin-none"
            autoFocus
            required
            //helperText=""
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.handleClose(); this.props.update(this.state.student)}} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}