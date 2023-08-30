import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const cardData = [
  { title: 'Card 1', content: 'Content for Card 1' },
  { title: 'Card 2', content: 'Content for Card 2' },
  { title: 'Card 3', content: 'Content for Card 3' },
  { title: 'Card 3', content: 'Content for Card 3' },
  { title: 'Card 3', content: 'Content for Card 3' },
  { title: 'Card 3', content: 'Content for Card 3' },
  { title: 'Card 3', content: 'Content for Card 3' },
  { title: 'Card 3', content: 'Content for Card 3' }
];

const VerticalCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
      {cardData.map((card, index) => (
        <Card
          key={index}
          sx={{
            minWidth: isMobile ? 320 : 1200,
            minHeight:300,
            margin: '10px 0',
          }}
        >
          <CardContent>
            <Typography variant="h6">{card.title}</Typography>
            <Typography variant="body2">{card.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default VerticalCards;
