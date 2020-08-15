import React, { useEffect, Suspense, useRef } from 'react';
import ReactDOM from 'react-dom'
import { Field, reduxForm } from 'redux-form'
import IxSelectField from '../../../basic/ix-selectfield';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next'
import QrReader from 'react-qr-reader'
import IxModal from '../../../composite/ix-modal'
import QRCode from "react-qr-code";
import htmlToImage from 'html-to-image';
import { fetchBranchSections } from '../../../../actions/company/table-actions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
  rounded: {
    color: '#fff',
    backgroundColor: grey[500],
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

let TableForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting,
    branches, initialValues, loading } = props

  const classes = useStyles();
  const { t, i18n } = useTranslation()
  const [QRModalOpen, setQRModalOpen] = React.useState(false);
  const [qrResult, setQrResult] = React.useState({ result: "no result" });
  const [tableName, setTableName] = React.useState();
  const [sections, setSections] = React.useState([]);
  const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }

  const handleQRCode = (e) => {
    e.preventDefault();
    setQRModalOpen(true)
  }

  const handleScan = (data) => {
    if (data) {
      setQrResult({ result: data })
    }
  }

  const handleError = err => {
    console.error(err)
  }

  const handleQRModalClose = () => {
    setQRModalOpen(false)
  }

  const printQRCode = () => {
    var node = document.getElementById('QRCodeDiv').getElementsByTagName('svg')[0];
    htmlToImage.toJpeg(node)
      .then(function (dataUrl) {
        // var img = new Image();
        // img.src = dataUrl;
        // node.appendChild(img);
        const linkSource = dataUrl;
        const downloadLink = document.createElement("a");
        const fileName = "QRCode.jpeg";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  const tableNameChange = (e) => {
    setTableName(e.target.value)
  }

  const handleBranchChange = (e) => {
    getSectionData(initialValues.company ? initialValues.company.id : initialValues.companyId, Number(e.target.value))
  }

  const getSectionData = async (companyId, branchId) => {
    const sectionData = await fetchBranchSections(companyId, branchId);
    setSections(sectionData.data.data)
    props.change("sectionId", initialValues.section ? initialValues.section.id : sectionData.data.data[0].id)
  }

  const svgRef = useRef(null);

  useEffect(() => {
    if (!sections || sections.length <= 0) {
      initialValues.id ? getSectionData(initialValues.company.id, initialValues.branch.id)
        : getSectionData(initialValues.companyId, initialValues.branchId)
    }
    props.change("branchId", initialValues.branch ? initialValues.branch.id : initialValues.branchId)
  }, [])

  return (
    <form onSubmit={handleSubmit} >
      <Box>
        <Field
          name="name"
          component={IxTextFieldForm}
          onChange={(e) => tableNameChange(e)}
          label={t('TableForm.table_name')}
        />
      </Box>
      {branches && <Box>
        <Field
          name="branchId"
          component={IxSelectField}
          onChange={(e) => handleBranchChange(e)}
          label={t('common.branch')}
          disabled={!appContext.isCompany}
        >
          {branches.map((branch, index) => {
            return <option value={branch.id}>{branch.name}</option>
          })}
        </Field>
      </Box>}
      {sections.length > 0 && <Box>
        <Field
          name="sectionId"
          component={IxSelectField}
          label={t('BranchForm.floor')}
        >
          {sections.length && sections.map((section, index) => {
            return <option value={section.id}>{section.name}</option>
          })}
        </Field>
      </Box>}
      <Box>
        <Field name="tableNo" component={IxTextFieldForm} label={t('TableForm.table_number')} />
      </Box>
      <Box>
        <Field name="noOfSeats" component={IxTextFieldForm} label={t('TableForm.noOfSeats')} />
      </Box>
      <Box>
        <Typography variant="body2" gutterBottom>
          {t('TableForm.labels_1')}
        </Typography>
      </Box>
      {initialValues && initialValues.id &&
        <Box>
          <Link href="#" onClick={handleQRCode} color="secondary">
            {t('TableForm.link_text')}
          </Link>
        </Box>
      }


      <DialogActions>
        <Box width="70%">
          {/* <Field name="isActive" component={IxSwitch} label={t('common.active')}></Field> */}
        </Box>
        <Button variant="contained" onClick={handleClose}>
          {t('common.cancel_button')}
        </Button>
        <Button type="submit" variant="contained" disabled={loading} color="secondary">
          {t('common.submit_button')}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </DialogActions>

      <IxModal modaltitle={"Preview QR and Table code"}
        open={QRModalOpen}
        handleClose={handleQRModalClose}>
        <Box textAlign="center">
          <Typography component="h1" variant="h6" style={{ fontSize: '30px', fontWeight: 400 }} >
            {"Scan to Order"}
          </Typography>
          <Typography component="h1" variant="h6" style={{ fontSize: '20px', fontWeight: 500 }} >
            {initialValues.tableCode}
          </Typography>
        </Box>
        <Box textAlign="center" id="QRCodeDiv">
          {/* <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '400px', marginLeft: '90px' }}
          />
          <p style={{ marginLeft: '90px' }}>{qrResult.result}</p> */}

          <QRCode ref={svgRef} value={initialValues.tableCode} />

        </Box>
        <Box textAlign="center">
          <Typography component="h1" variant="h6" style={{ fontSize: '20px', fontWeight: 400 }} >
            {"Or use the table code"}
          </Typography>
          <Typography component="h1" variant="h6" style={{ fontSize: '30px', fontWeight: 400 }} >
            {"Table Code -"}
          </Typography>
        </Box>
        <DialogActions>
          <Button variant="contained" onClick={handleQRModalClose}>
            {t('common.cancel_button')}
          </Button>
          <Button variant="contained" onClick={printQRCode} color="secondary">
            {t('common.print')}
          </Button>
        </DialogActions>
      </IxModal>

    </form >

  )
}

// const mapStateToProps = ({ company }) => {
//   return {
//     company: company
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     handleFetchBranchSections: (branchId) => {
//       dispatch(fetchBranchSections(branchId));
//     }
//   }
// };

TableForm = reduxForm({
  form: 'TableForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(TableForm)

export default TableForm
// export default TableForm