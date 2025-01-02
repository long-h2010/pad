import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack, Typography } from '@mui/material';

import Iconify from '../../components/admin/iconify/iconify';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import { renderAvatar } from '../../components/cell-render/render-avatar';
import {
    renderEditStatus,
    renderStatus,
    STATUS_OPTIONS,
} from '../../components/cell-render/render-status';
import { fDate } from '../../utils/format-time';

const columns: GridColDef<any>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'avatar',
        headerName: 'Avatar',
        display: 'flex',
        renderCell: renderAvatar,
        valueGetter: (_value, row) => ({ avatar: row.avatar }),
        sortable: false,
        filterable: false,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'nickname',
        headerName: 'Nickname',
        width: 150,
        editable: true,
    },
    {
        field: 'birthday',
        headerName: 'Birthday',
        valueFormatter: (params: any) => fDate(params, 'dd/MM/yyyy'),
        width: 120,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        width: 200,
    },
    {
        field: 'status',
        headerName: 'Status',
        renderCell: renderStatus,
        renderEditCell: renderEditStatus,
        type: 'singleSelect',
        valueOptions: STATUS_OPTIONS,
        width: 150,
        editable: true,
    },
];
    
export default function UserPage() {
    const { user_url } = useGlobalContext();
    const [users, setUsers] = useState<any[]>([]);
    const [openTable, setOpenTable] = useState(false);

    useEffect(() => {
        axios
            .get(`${user_url}/get-all`)
            .then((res) => {
                setUsers(
                    res.data.map((user: any) => {
                        return {
                            id: user._id,
                            avatar: user.avatar || '',
                            name: user.name,
                            nickname: user.nickname,
                            birthday: user.birthday,
                            email: user.email,
                            status: user.isDeleted ? 'Banned' : 'Active',
                        };
                    })
                );
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const path = window.location.pathname;
        if (path === '/admin/user') {
            setOpenTable(true);
        } else if (path === '/admin/document') {
            setOpenTable(false);
        }
    }, [window.location.pathname]);

    return (
        <DataGrid
        sx={{marginTop: '10%'}}
            columns={columns}
            rows={users}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    );
}
