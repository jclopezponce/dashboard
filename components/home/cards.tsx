import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';



export function Cards() {
  return (
    <Box
      sx={{
        width: '100%',
        display: {sm:'flex', xs:'grid'},
        justifyContent: 'center',
        gap: 4,
      }}
    >
    
        <Card>
          <CardActionArea
           
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%', width: '250px' }}>
              <Typography variant="h4" component="div" textAlign={'center'}>
                $12,345
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                Total Sales
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',  
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%', width: '250px' }}>
              <Typography variant="h4" component="div" textAlign={'center'}>
                1,234
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                Total Orders
              </Typography>
            </CardContent>
          </CardActionArea> 
        </Card>
        <Card>
          <CardActionArea
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected', 
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '100%', width: '250px' }}>
              <Typography variant="h4" component="div" textAlign={'center'}>
                567
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                New Customers
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      
    </Box>
  );
}


