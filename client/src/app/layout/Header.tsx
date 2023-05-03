import { AppBar, Toolbar, Box, Typography, List, ListItem } from "@mui/material"
import { NavLink } from "react-router-dom"

const midLinks = [
    { title: 'Ads', path: '/ads' },
    { title: 'about', path: '/about' },
]
const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: '#0D2035',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
       bgcolor: '#e5e5e5',
       opacity: 0.6,
       borderRadius: '20%',
    }
}

export default function Header() {


    return (
        <AppBar position="static" sx={{ mb: 4 ,bgcolor:'#ffc107'}}>
            <Toolbar sx={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to='/' sx={ navStyles }>
                        Home Ads
                    </Typography>
                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={ navStyles }
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display='flex' alignItems='center'>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={ navStyles }
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}