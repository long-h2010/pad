import { Avatar } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const renderAvatar = (params: GridRenderCellParams<{ avatar: string }, any, any>) => {
    return <Avatar src={params.value.avatar} />;
};
