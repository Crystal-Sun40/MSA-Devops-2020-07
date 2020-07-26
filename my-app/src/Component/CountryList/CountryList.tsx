import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {CountryNameSearch} from "../CountryDetails/CountryNameSearch";

export interface Country {
    name: string,
    flag: string,
    region: string,
    population: number,
    capital: string,
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export function CountryList() {
    const classes = useStyles();
    const [countries, setCountries] = useState<Country[]>();
    const handleCountryNameSearch = (countries: Country[]) => {
        setCountries(countries);
    };
    useEffect(() => {
        {
            fetch("https://restcountries.eu/rest/v2/all")
                .then(res => res.json())
                .then(
                    (result: any) => {
                        // @ts-ignore
                        const countryResult = result.map(r => ({
                            name: r.name,
                            flag: r.flag,
                            region: r.region,
                            population: r.population,
                            capital: r.capital
                        }));
                        setCountries(countryResult);

                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }, []);
    return (
        <>
            <h1>get all countries by calling https://restcountries.eu/rest/v2/all</h1>
            <Container className={classes.cardGrid} maxWidth="xl">
                <CountryNameSearch handleCountryNameSearch={handleCountryNameSearch}/>
                <Grid container spacing={4}>
                    {countries && countries.map(c => (
                        <Grid item xs={2} sm={2} md={2}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={c.flag}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {c.name}
                                    </Typography>
                                    <Typography>
                                        region: {c.region} <br/>
                                        population: {c.population} <br/>
                                        capital: {c.capital} <br/>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>

    )
}
