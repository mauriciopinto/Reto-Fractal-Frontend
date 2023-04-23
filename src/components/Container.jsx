import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';

const ResponsiveContainer = styled (Container) (({theme}) => ({
    background: theme.palette.secondary.light,
    
    [theme.breakpoints.up ('xs')]: {
        width: '85vw',
    },
    [theme.breakpoints.up ('sm')]: {
        width: '85vw',
    },
    [theme.breakpoints.up ('md')]: {
        width: '60vw',
    },
    [theme.breakpoints.up ('lg')]: {
        width: '60vw'
    }
}))

export {
    ResponsiveContainer
}