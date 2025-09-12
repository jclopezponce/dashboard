import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { CountingNumber } from '@/components/ui/shadcn-io/counting-number';



export function Cards( {orders, amount, customers}: {orders: number, amount?: number, customers?: number} ) {
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
                $
                <CountingNumber
      number={amount || 0}
      decimalPlaces={2}
      decimalSeparator=","
      className="text-4xl"
      inViewOnce
      transition={{ stiffness: 800, damping: 10 }}
    />
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
                          <CountingNumber
      number={orders}
      decimalSeparator=","
      className="text-4xl"
      inViewOnce
      transition={{ stiffness: 800, damping: 10 }}
    />
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
                                    <CountingNumber
      number={customers || 0}
      decimalSeparator=","
      className="text-4xl"
      inViewOnce
      transition={{ stiffness: 800, damping: 10 }}
    />
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                Customers
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      
    </Box>
  );
}


