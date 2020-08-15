import React from 'react';
import MaterialTable, { MTableBodyRow } from 'material-table';
import ActionMenu from './action-manu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination'
import i18n from '../../../i18n';

const useStyles = makeStyles(theme => ({
    hideRow: { display: 'none' },
    root: {
        border: '1px solid rgba(224, 224, 224, 1)',
        "& .MuiPaper-root": {
            "& .MuiToolbar-root": {
                "&.MuiToolbar-gutters": {
                    paddingLeft: '12px'
                },
                "& .MuiFormControl-root": {
                    "padding-left": 0,
                    "& .MuiInput-underline:before": {
                        'border-bottom': '0 !important'
                    },
                    "& .MuiInputBase-root": {
                        "& .MuiInputAdornment-root": {
                            '& .material-icons': {
                                color: 'rgba(224, 224, 224, 1)'
                            }
                        }
                    }
                }
            },
            '& .MuiTable-root > tbody >.MuiTableRow-root': {
                height: '1px !important'
            },
            '& .MuiTable-root > tbody > tr:first-child > td:first-child': {
                width: '1% !important'
            },
            '& .MuiTable-root > thead > tr:last-child > th:last-child': {
                width: '1% !important'
            }
        }
    }
}));

const IxTable = ({ columns, showActionMenu, menuOptions, data, handleActionClick, isTree, pageName }) => {
    const classes = useStyles();

    const actionColumn = [{
        title: '', field: '',
        cellStyle: { 'text-align': 'right', 'width': '30px' },
        sorting: false,
        headerStyle: {

        },
        render: (rowData) => {
            switch (pageName) {
                case 'serving-hours':
                    const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
                    return (
                        (appContext.isCompany || rowData.branchId) &&
                        <ActionMenu
                            rowdata={rowData}
                            handleActionClick={handleActionClick}
                            options={menuOptions}>
                        </ActionMenu>
                    )
                case 'menus':
                    const appContextMenu = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
                    if (!appContextMenu.isCompany && !rowData.branchId) {
                        const branchMenuOptions = [
                            // { displayName: 'Edit', isOwn: true, disabled: true },
                            { displayName: i18n.t('MenuActionLabel.Copy_Company_menu'), isOwn: true },
                            { displayName: i18n.t('MenuActionLabel.Override'), isOwn: true },
                            // { displayName: 'Make InActive', isOwn: true }
                        ]
                        return <ActionMenu
                            rowdata={rowData}
                            handleActionClick={handleActionClick}
                            options={branchMenuOptions}>
                        </ActionMenu>
                    } else {
                        const companyMenuOptions = [
                            { displayName: i18n.t('MenuActionLabel.Edit'), isOwn: false },
                            { displayName: i18n.t('MenuActionLabel.Copy_Edit'), isOwn: false },
                            { displayName: i18n.t('MenuActionLabel.Copy_All'), isOwn: false },
                            { displayName: rowData.isActive ? i18n.t('MenuActionLabel.MakeInactive') : i18n.t('MenuActionLabel.MakeActive'), isOwn: false },
                            { displayName: i18n.t('MenuActionLabel.Delete'), isOwn: false },
                        ];
                        return <ActionMenu
                            rowdata={rowData}
                            handleActionClick={handleActionClick}
                            options={companyMenuOptions}>
                        </ActionMenu>
                    }
                    break;
                case 'food-items':
                    const appContextFoodItem = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }

                    if (!appContextFoodItem.isCompany && rowData.isDailyOpeningEnabled) {
                        const fooditemBranchOptions = [
                            { displayName: 'Update Stock' },
                        ];
                        return <ActionMenu
                            rowdata={rowData}
                            handleActionClick={handleActionClick}
                            options={fooditemBranchOptions}>
                        </ActionMenu>

                    } else if (appContextFoodItem.isCompany) {
                        return <ActionMenu
                            rowdata={rowData}
                            handleActionClick={handleActionClick}
                            options={menuOptions}>
                        </ActionMenu>
                    }


                    break;
                default:
                    return (
                        <ActionMenu
                            rowdata={rowData}
                            handleActionClick={handleActionClick}
                            options={menuOptions} >
                        </ActionMenu >

                    )
            }

        }
    }]
    let dataColumns = showActionMenu ? [...columns, ...actionColumn] : columns
    let parentChildDataFunc = (row, rows) => rows.find(a => a.id === row.parentId)

    const eventHandler = (event) => {
        // event.target.parentElement.classList.add(classes.hideRow)
    }

    return (
        <div className={classes.root}>
            <MaterialTable
                title=""
                columns={dataColumns}
                data={data}
                {...(isTree && { parentChildData: parentChildDataFunc })}
                options={{
                    pageSize: 50,
                    pageSizeOptions: [50, 100, 150],
                    paging: true,
                    search: true,
                    // actionsColumnIndex: -1,
                    padding: 'dense',
                    searchFieldAlignment: 'left',
                    searchFieldStyle: {
                        'background-color': '#ffffff',
                        'padding': '4px 8px',
                        'border': '1px solid #cbccce',
                        'font-size': '14px',
                        'font-weight': '400',
                        'color': 'rgba(0,0,0,0.87)',
                        'border-radius': '4px',
                        'text-decoration': 'none',
                    },
                    // paginationType:'stepped',
                    headerStyle: {
                        'font-size': '14px',
                        'color': 'rgba(0,0,0,0.87)',
                        'font-weight': '500',
                        'border-top': '1px solid rgba(224, 224, 224, 1)',
                        'padding': '16px'
                    },
                    cellStyle: {
                        'font-size': '14px',
                        'font-weight': '400',
                        'color': 'rgba(0,0,0,0.87)',
                        'padding': '16px'
                    },
                    rowStyle: {
                        // backgroundColor: '#EEE',
                        // height:'1px !important'
                    },

                }}
                components={{
                    Row: rowProps => <MTableBodyRow {...rowProps} onMouseEnter={eventHandler} />
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: <div style={{ padding: '100px' }}>{i18n.t('common.nodata')}</div>
                    },
                    toolbar: {
                        searchPlaceholder: i18n.t('common.search')
                    },
                    pagination: {
                        labelRowsSelect: i18n.t('common.rows')
                    }
                }}
                onRowMouseEnter={(event, rowData, togglePanel) => {

                }}
            />

        </div>
    )
}

export default IxTable