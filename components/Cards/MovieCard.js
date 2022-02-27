import { StarIcon } from "@heroicons/react/solid";
import react from "react";
import { Constant } from "../../Constant";
import Image from "next/image";
import Link from "next/link";
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const MovieCard = react.forwardRef(({ media }, ref) => {
  return (
    <Link href={`/movies/${media.id}`}>
      <a>
        <div ref={ref}>
          <Center py={3}>
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: "100%", md: "90rem" }}
              height={{ sm: "476px", md: "20rem" }}
              direction={{ base: "column", md: "row" }}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              padding={4}
            >
              <Flex>
                <Image
                  src={`${Constant.IMG_500}${media.poster_path}`}
                  height={300}
                  width={260}
                />
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}
              >
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {media.title}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                  {media.release_date}
                </Text>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
                  {media.overview}
                  
                </Text>
              </Stack>
            </Stack>
          </Center>
        </div>
      </a>
    </Link>
  );
});

export default MovieCard;
