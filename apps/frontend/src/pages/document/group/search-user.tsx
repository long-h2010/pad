import { Autocomplete, TextField } from '@mui/material';
import { User } from '../../../components/user-item';
import UserChip from '../../../components/user-chip';
import GroupStyles from './style';

const SearchUser: React.FC<any> = (props) => {
    const { classes } = GroupStyles();
    const { listSearch, handleClickSearchItem, setSearchValue, listUser, handleDeleteSearchItem } = props;

    return (
        <Autocomplete
            multiple
            limitTags={1}
            id='tags-outlined'
            filterSelectedOptions
            options={listSearch}
            getOptionLabel={(option: any) => option.nickname}
            renderOption={(props, option) => {
                const { key } = props;
                return (
                    <User
                        key={key}
                        onClick={handleClickSearchItem}
                        {...{
                            avatar: option.avatar,
                            name: option.name,
                            nickname: option.nickname,
                        }}
                    />
                )
            }}
            value={listUser}
            isOptionEqualToValue={(option, value) => option.nickname === value.nickname}
            renderTags={(value: any, getTagProps) =>
                value.map((option: any, index: number) => {
                    const { key } = getTagProps({ index });
                    return (
                        <UserChip key={key} user={option} onDelete={handleDeleteSearchItem}/>
                    );
                })
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    className={classes.inputSearch}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            )}
        />
    )
}

export default SearchUser