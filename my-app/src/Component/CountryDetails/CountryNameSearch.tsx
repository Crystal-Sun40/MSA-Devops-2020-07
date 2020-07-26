import {Button as Butt, Grid} from "@material-ui/core";
import React, {useState} from "react";
import SearchBar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import {Country} from "../CountryList/CountryList";

interface Props {
    handleCountryNameSearch:(countries:Country[])=>void
}

export function CountryNameSearch(props:Props) {
    const [userInput, setUserInput] = useState<string>("");
    const handleOnClick = ()=>{
        console.log("search for " + userInput);
        //api call basied on userInput
        fetch("https://restcountries.eu/rest/v2/name/"+userInput)
            .then(res => res.json())
            .then(
                (result: any) => {
                    if(result.status===404){}
                    else {
                        // @ts-ignore
                        const countryResult = result.map(r => ({
                            name: r.name,
                            flag: r.flag,
                            region: r.region,
                            population: r.population,
                            capital: r.capital
                        }));
                        props.handleCountryNameSearch(countryResult);}
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    const handleOnChange= (value:string)=>{setUserInput(value)};
    return (
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <SearchBar handleOnChange={handleOnChange}/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Button handleOnClick={handleOnClick} lable="Search By Country Name"/>
                </Grid>
                <p> search country by calling https://restcountries.eu/rest/v2/name/ </p>
            </Grid>
    )
}
