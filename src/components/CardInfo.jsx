import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


export const CardInfo = ({image, title, description, button}) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 6, backgroundColor: '#E9F6FF'}}>
            <CardMedia
                sx={{ height: 140, margin: 1, borderRadius: 6 }}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign='justify'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: "center"}}>
                    <Link to={button}>
                        <Button variant="contained" size="small" sx={{marginBottom: 1}}>
                            {title}
                        </Button>
                    </Link>
            </CardActions>
        </Card>
    );
};

CardInfo.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
};