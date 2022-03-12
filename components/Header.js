import { FireIcon, SpeakerphoneIcon, PlayIcon } from "@heroicons/react/solid";

import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
  const { data: session } = useSession();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        as="header"
        position="fixed"
        w="100%"
        zIndex="50"
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          ml="20vw"
          mr="20vw"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link href="/">
                <a>
                  <span className="sr-only">Mywlt</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  />
                </a>
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    cursor={"pointer"}
                    backgroundColor={"transparent"}
                    minW={0}
                  >
                    Movies
                  </MenuButton>
                  <MenuList>
                    <Link href="/movies/popular-movies">
                      <MenuItem>
                        <a className="flex flex-row items-center">
                          <FireIcon className="h-6 w-6" />
                          <span className="ml-3">Popular</span>
                        </a>
                      </MenuItem>
                    </Link>
                    <Link href="/movies/upcoming-movies">
                      <MenuItem>
                        <a className="flex flex-row items-center">
                          <SpeakerphoneIcon className="h-6 w-6" />
                          <span className="ml-3">Upcoming</span>
                        </a>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    cursor={"pointer"}
                    backgroundColor={"transparent"}
                    minW={0}
                  >
                    TV Shows
                  </MenuButton>
                  <MenuList>
                    <Link href="/tv/tv">
                      <MenuItem>
                        <a className="flex flex-row items-center">
                          <FireIcon className="h-6 w-6" />
                          <span className="ml-3">Popular</span>
                        </a>
                      </MenuItem>
                    </Link>
                    <Link href="/tv/tv-on-air">
                      <MenuItem>
                        <a className="flex flex-row items-center">
                          <PlayIcon className="h-6 w-6" />
                          <span className="ml-3">Airing</span>
                        </a>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
                <Menu>
                  <Link href="/people/people">
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      cursor={"pointer"}
                      backgroundColor={"transparent"}
                      minW={0}
                    >
                      <a className="text-base font-medium">People</a>
                    </MenuButton>
                  </Link>
                </Menu>
                <Menu>
                  <Link href="/search">
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      cursor={"pointer"}
                      backgroundColor={"transparent"}
                      minW={0}
                    >
                      <a className="text-base font-medium">Search</a>
                    </MenuButton>
                  </Link>
                </Menu>
              </Box>
            </HStack>
          </HStack>
          {session ? (
            <>
              <Flex alignItems={"center"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Flex alignItems={"center"}>
                      <Avatar size={"sm"} src={session?.user?.image} />
                      <ChevronDownIcon w={5} h={5} />
                    </Flex>
                  </MenuButton>

                  <MenuList>
                    <MenuItem>My WatchList</MenuItem>
                    <MenuItem>Favourite</MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <span className="mr-5">Toggle Dark Theme</span>{" "}
                      <Switch
                        color="green"
                        isChecked={isDark}
                        onChange={toggleColorMode}
                      />
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </>
          ) : (
            <a
              href="/api/auth/signin"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign in
            </a>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link href="/movies/popular-movies">
                <a className="flex flex-row items-center">
                  <span className="ml-3">Popular Movies</span>
                </a>
              </Link>
              <Link href="/movies/upcoming-movies">
                <a className="flex flex-row items-center">
                  <span className="ml-3">Upcoming Movies</span>
                </a>
              </Link>
              <Link href="/tv/tv">
                <a className="flex flex-row items-center">
                  <span className="ml-3">Popular TV Shows</span>
                </a>
              </Link>
              <Link href="/tv/tv-on-air">
                <a className="flex flex-row items-center">
                  <span className="ml-3">Airing TV Shows</span>
                </a>
              </Link>
              <Link href="/people/people">
                <a className="text-base font-medium">
                  <span className="ml-3">People</span>
                </a>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
