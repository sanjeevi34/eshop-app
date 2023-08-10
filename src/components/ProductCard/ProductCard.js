import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
            component="img"
            alt={product.name}
            height="200"
            image={product.imageUrl}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {'₹' + product.price}
                </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ pt:1 }}>
                {product.description}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Button variant="contained" size="small" color="primary">
                Buy
            </Button>
            <Box sx={{ marginLeft: 'auto' }}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </CardActions>
    </Card>
  );
};

export default ProductCard;
