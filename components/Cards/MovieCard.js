import { StarIcon } from "@heroicons/react/solid";
import react from "react";
import { Constant } from "../../Constant";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

const MovieCard = react.forwardRef(({ media }, ref) => {
  return (
    <Link href={`/movies/${media.id}`}>
      <a>
        <div ref={ref}>
          <Center py={6}>
            <Box
              maxW={"400px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              rounded={"md"}
              p={6}
              overflow={"hidden"}
            >
              <Box
                h={"250px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={6}
                pos={"relative"}
              >
                <Image
                  src={
                    media.poster_path
                      ? `${Constant.IMG_500}${media.poster_path}`
                      : `${Constant.UNAVAILABLE}`
                  }
                  layout={"fill"}
                />
              </Box>
              <Stack>
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  Movie
                </Text>
                <Heading
                  color={useColorModeValue("gray.700", "white")}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {media.title}
                </Heading>
              </Stack>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                <Badge ml="1" fontSize="0.8em" colorScheme="green">
                  {media.vote_average ? media.vote_average : "N/A"}
                </Badge>
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text color={"gray.500"}>
                    {media.release_date ? media.release_date : "N/A"}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        </div>
      </a>
    </Link>
  );
});

export default MovieCard;
