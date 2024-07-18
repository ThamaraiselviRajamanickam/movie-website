import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Text,
  Button,
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";

export default function Home() {
  const apiKey = "3fe90cecfcc38ef67d50ec03aad99141";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = (q) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${q}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData("a");
  }, []);
  
  const handleSearch = () => {
    fetchData(searchTerm);
  };
  return (
    <>
     <Input
        type="text"
        placeholder="Search Movie Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginTop: "50px", marginBottom: "20px" ,marginLeft:"150px", marginRight:"35px"}}
        width={700}
      />
      <Button variant="solid" colorScheme="blue" onClick={handleSearch}>
        Search
      </Button>

      {movies.map((movie) => (
        <Card key={movie.id} direction="row" overflow="hidden" variant="outline" m={5}>
          <Flex>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              boxSize="200px"
              objectFit="cover"
              height={300}
              width={300}
            />
            <Box p={5}>
              <CardBody>
                <Stack spacing="3">
                  <Heading size="md">{movie.title}</Heading>
                  <Text>Release Date: {movie.release_date}</Text>
                  <Text>Rating: {movie.vote_average}</Text>

                  <Text>{movie.overview}</Text>
                  
                </Stack>
              </CardBody>
            </Box>
          </Flex>
        </Card>
      ))}
    </>
  );
}
