import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

let featureTitle = new Map([[1, "Silver"], [2, "Gold"], [3, "Platinum"]]);

export default function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h4" color="textPrimary" gutterBottom>
                    Tier
                </Typography>
                <Typography variant="h6" component="h2">
                    <ul>
                        <li>Feature1</li>
                        <li>Feature1</li>
                        <li>Feature1</li>
                        <li>Feature1</li>
                        <li>Feature1</li>
                    </ul>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Subscribe</Button>
            </CardActions>
        </Card>

    );
}
