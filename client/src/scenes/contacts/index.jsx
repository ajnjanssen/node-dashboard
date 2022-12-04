import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { mockDataContacts } from '../../data/mockData'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const Contacts = () => {
    const [backendData, setBackendData] = useState([{}])
    // console.log(backendData);
    useEffect(() => {
        fetch('/api')
            .then((response) => response.json())
            .then((data) => {
                setBackendData(data)
            })
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'registrarId', headerName: 'Registrar ID' },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1,
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 1,
        },
        {
            field: 'zipCode',
            headerName: 'Zip Code',
            flex: 1,
        },
    ]
    return (
        <div>
            <Box className="m-5">
                <div className="pb-5">
                    <h1 className="headTitle">CONTACTS</h1>
                    <h3 className="underTitle">
                        List of Contacts for Future Reference
                    </h3>
                </div>
                <Box
                    className=""
                    // m="40px 0 0 0"
                    height="75vh"
                >
                    {typeof backendData.mockDataContacts === 'undefined' ? (
                        <p>loading...</p>
                    ) : (
                        <DataGrid
                            rows={backendData.mockDataContacts}
                            columns={columns}
                            onRowClick={(row) => {
                                console.log(row)
                            }}
                        />
                    )}
                </Box>
            </Box>
        </div>
    )
}

export default Contacts
