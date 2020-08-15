import React, { useEffect } from 'react';
import { Pagination } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { TEXT } from '../../constants/ix-pagination-variant-type';
import { SMALL } from '../../constants/ix-pagination-size';

const useStyles = makeStyles(theme => ({
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    backgroundColor: grey[200],
    padding: theme.spacing(1)
  },
  paginationItemsStatement: {
    paddingTop: '3px'
  }
}));

/**
 * use to render pagination for table
 * return the current selected pagination number to the parent table
 * @param {number} boundaryCount number of always visible pages at the beginning and end.
 * @param {number} rowsPerPage number of rows/items displayed in each table page
 * @param {number} totalRows total number of items/rows
 * @param {number} defaultPage page selected by default when the component is uncontrolled
 * @param {bool} hideNextButton hide the next-page button
 * @param {bool} hidePrevButton hide the previous-page button
 * @param {bool} showFirstButton show the first-page button
 * @param {bool} showLastButton show the last-page button
 * @param {number} siblingCount Number of always visible pages before and after the current page
 * @param {string} size size of the pagination component
 * @param {string} variant list of variant can be found in `src/constants`
 * @param {object} displayRowsRange contains the startIndex and endIndex of the displayed rows
 * @param {func} onChangeCurrentSelectedPage on change page, this will pass the event to the parent table
 */
const IxPagination = ({
  boundaryCount = 2,
  rowsPerPage = 10,
  totalRows = 0,
  defaultPage = 1,
  hideNextButton = false,
  hidePrevButton = false,
  showFirstButton = true,
  showLastButton = true,
  siblingCount = 1,
  size = SMALL,
  variant = TEXT,
  displayRowsRange,
  onChangeCurrentSelectedPage
}) => {
  const classes = useStyles();
  const count = Math.ceil(totalRows / rowsPerPage);
  const { startIndex, endIndex } = displayRowsRange;
  const [currentSelectedPage, setCurrentSelectedPage] = React.useState(1);

  useEffect(() => {
    onChangeCurrentSelectedPage(currentSelectedPage);
  }, [onChangeCurrentSelectedPage, currentSelectedPage]);

  const onChangePageNumber = (event, selectedNewPageNumber) => {
    setCurrentSelectedPage(selectedNewPageNumber);
  };

  return (
    <div className={classes.paginationContainer}>
      <Typography
        variant="body1"
        color="textSecondary"
        className={classes.paginationItemsStatement}
      >
        {/* startIndex and endIndex are indexing from 0. But we are rendering, assume that, indexing is started from 1 */}
        Shows items {startIndex + 1} to {endIndex + 1} of {totalRows}
      </Typography>
      <Pagination
        count={count}
        page={currentSelectedPage}
        onChange={onChangePageNumber}
        defaultPage={defaultPage}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        hideNextButton={hideNextButton}
        hidePrevButton={hidePrevButton}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        size={size}
        variant={variant}
      />
    </div>
  );
};

export default IxPagination;
