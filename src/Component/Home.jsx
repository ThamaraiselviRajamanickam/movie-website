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
      <Flex
        direction={{ base: "column", sm: "row" }}  // Stack vertically on smaller screens
        align="center"
        justify="center"
        my={10}
        wrap="wrap"  // Allow elements to wrap on smaller screens
      >
        <Input
          type="text"
          placeholder="Search Movie Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={{ base: 4, sm: 0 }}  // Margin bottom for smaller screens, remove margin on larger screens
          width={{ base: "90%", sm: "70%", md: "50%" }}  // Responsive width
        />
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={handleSearch}
          ml={{ base: 0, sm: 2 }}  // Margin left on larger screens
          width={{ base: "90%", sm: "auto" }}  // Responsive width
        >
          Search
        </Button>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        justify="center"
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            direction="row"
            overflow="hidden"
            variant="outline"
            m={5}
            width={{ base: "90%", sm: "45%", md: "30%" }}
          >
            <Flex direction="column" align="center" p={5}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                boxSize="200px"
                objectFit="cover"
                height="300px"
                width="300px"
                mb={4}
              />
              <CardBody>
                <Stack spacing="3">
                  <Heading size="md">{movie.title}</Heading>
                  <Text>Release Date: {movie.release_date}</Text>
                  <Text>Rating: {movie.vote_average}</Text>
                  <Text>{movie.overview}</Text>
                </Stack>
              </CardBody>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  );
}
