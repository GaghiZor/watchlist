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
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = () => {
  const { data: session } = useSession();

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
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
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  cursor={"pointer"}
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
                    minW={0}
                  >
                    <a className="text-base font-medium">People</a>
                  </MenuButton>
                </Link>
              </Menu>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>My WatchList</MenuItem>
                <MenuItem>Favourite</MenuItem>
                <MenuDivider />
                <MenuItem><span className="mr-5">Toggle Dark Theme</span> <Switch color="green" isChecked={isDark} onChange={toggleColorMode} /></MenuItem>
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <span>Link 1</span>
              <span>Link 2</span>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
