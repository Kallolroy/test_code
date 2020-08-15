import React from 'react';
import { Button, withStyles, makeStyles, InputAdornment, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { Field} from 'redux-form'
import { useTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IxTextFieldForm from '../../../basic/ix-text-field-form';



const StyledTableRow = withStyles((theme) => ({
    root: {
      backgroundColor: 'rgb(242,242,242)',
    },
  }))(TableRow);
  
  const StyledTableCell = withStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(.5),
        marginBottom: theme.spacing(.5),
        marginRight: theme.spacing(3)
      },
      padding: 0,
      '&:last-child':{
        paddingRight: 0
      },
      '&.table-header':{
        paddingLeft: '12px'
      }
    },
  }))(TableCell);

const useStyles = makeStyles((theme)=> ({
    tableContainer:{
      border: '1px solid rgb(232,232,232)',
      borderRadius: 0,
      borderBottom: 'none',
    },
    tableHead:{
      height: '60px'
    },
    removeChoiceItem:{
      color: 'rgb(111,111,111)',
      marginRight: theme.spacing(1),
      '& svg': {
        fontSize: '20px'
      }
    },
    adornment:{
      '& .MuiTypography-root': {
        fontSize: '16px'
      }
    }
  }));

const GenerateChoiceItems = ({ fields, meta: { error, submitFailed }, tabValue }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const addChoicesItem = (event) => {
      event.preventDefault();
      fields.push();
    }
  
    const deleteChoicesItem = (event, index) => {
      event.preventDefault();
      fields.remove(index)
    }
  
    return (
      <div>
        {fields && fields.length ? <TableContainer classes={{root: classes.tableContainer}} component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow classes={{root: classes.tableHead}}>
                <StyledTableCell className="table-header" width="70%" >{t('NxtChoicesGroupFormLabel.item')}</StyledTableCell>
                <StyledTableCell className="table-header" width="30%" >{t('NxtChoicesGroupFormLabel.item_price')}</StyledTableCell>
                <StyledTableCell ></StyledTableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
  
              {fields.map((choiceItem, index) => (
                <StyledTableRow key={ index}>
                  <StyledTableCell align="left">
                    {tabValue === 0 && 
                      <Field
                        name={`${choiceItem}.name_en`}
                        component={IxTextFieldForm}
                        props={{
                          margin:"dense"
                        }}
                      >
                      </Field>
                    }
                    {tabValue === 1 && 
                      <Field
                        name={`${choiceItem}.name_ja`}
                        component={IxTextFieldForm}
                        props={{
                          margin:"dense"
                        }}
                      >
                      </Field>
                    }
                    {tabValue === 2 && 
                      <Field
                        name={`${choiceItem}.name_ko`}
                        component={IxTextFieldForm}
                        props={{
                          margin:"dense"
                        }}
                      >
                      </Field>
                    }
                    {tabValue === 3 && 
                      <Field
                        name={`${choiceItem}.name_zh`}
                        component={IxTextFieldForm}
                        props={{
                          margin:"dense"
                        }}
                      >
                      </Field>
                    }
  
                  </StyledTableCell>
  
                  <StyledTableCell align="right">
                    <Field
                        name={`${choiceItem}.price`}
                        component={IxTextFieldForm}
                        props={{
                          margin:"dense",
                          InputProps: {
                            type: "number",
                            min: "0",
                            max: "999",
                            startAdornment: <InputAdornment position="start" classes={{root: classes.adornment}}>¥</InputAdornment>,
                          }
                        }}
                      >
                    </Field>
                  </StyledTableCell>
  
                  <StyledTableCell align="right">
                    <IconButton size="small" className={classes.removeChoiceItem} onClick={(event) => deleteChoicesItem(event, index)}>
                      <CloseIcon /> 
                    </IconButton>
                  </StyledTableCell>
  
                </StyledTableRow>
              ))}
  
            </TableBody>
          </Table>
          
        </TableContainer> : ''}
  
        <Button startIcon={ <AddIcon /> } color="secondary"  onClick={addChoicesItem}>
          {fields && fields.length ? t('NxtChoicesGroupFormBtnLabel.add_item') : t('NxtChoicesGroupFormBtnLabel.add_one_item')}
        </Button>
      </div>
    );
  }
  
  export default GenerateChoiceItems;