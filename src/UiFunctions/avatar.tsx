    import * as React from 'react';
    import Avatar from '@mui/material/Avatar';
    import { useAppSelector } from '../TypeScript-types/redux-types/hookis';
    import Stack from '@mui/material/Stack';
import { userSelector } from '../redux/auth/authSelectors';

    export default function LetterAvatars() {
        const userName = useAppSelector(userSelector)
        return (
        <Stack direction="row" spacing={2}>
            <Avatar>{userName?.name?.[0]?.toUpperCase() }</Avatar>
                </Stack>

    );
    }