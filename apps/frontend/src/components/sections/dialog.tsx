import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const DialogCustom: React.FC<any> = (props) => {
    const { open, handleClose, title, content, button, type, onOk } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            disableScrollLock={true}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                <Box>
                    <Typography
                        variant='body2'
                        sx={{
                            color: '#106b1f',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '19px',
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>{content}</DialogContent>
            {button == true && (
                <DialogActions>
                    <Button color={type == 'error' ? 'error' : 'success'} onClick={onOk}>
                        {type == 'error' ? 'XÓA' : 'CẬP NHẬT'}
                    </Button>
                    <Button color='success' onClick={handleClose} autoFocus>
                        HỦY
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default DialogCustom
