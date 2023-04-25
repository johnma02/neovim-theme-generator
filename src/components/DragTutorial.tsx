import React from "react";
import { Box, HStack, Popover, PopoverBody, Text,
    PopoverCloseButton, PopoverContent, PopoverTrigger, Image } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import Tutorial1 from "../images/tutorial_1.png";
import Tutorial2 from "../images/tutorial_2.png";
import Tutorial3 from "../images/tutorial_3.png";

export default function DragTutorial(){
    return(
        <HStack>
            <Box>
                <Popover>
                    <PopoverTrigger>
                        <InfoIcon/>
                    </PopoverTrigger>
                    <PopoverContent bgColor="red.400" width="100vh">
                        <PopoverCloseButton />
                        <PopoverBody>
                            <HStack p="4">
                                <Box bgColor="blue.700" borderRadius="10" borderColor="red.200" borderWidth="1px" p="2">
                                    <Text fontSize="18" fontWeight="semibold">1. Hover over a color</Text>
                                    <Image alt="Drag Tutorial Slide 1" src={Tutorial1}  />
                                </Box>
                                <Box bgColor="blue.700" borderRadius="10" borderColor="red.200" borderWidth="1px" p="2">
                                    <Text fontSize="18" fontWeight="semibold">2. Drag the color</Text>
                                    <Image alt="Drag Tutorial Slide 2" src={Tutorial2}/>
                                </Box>
                                <Box bgColor="blue.700" borderRadius="10" borderColor="red.200" borderWidth="1px" p="2">
                                    <Text fontSize="18" fontWeight="semibold">3. Drop the color</Text>
                                    <Image alt="Drag Tutorial Slide 3" src={Tutorial3}/>
                                </Box>
                            </HStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
            <Text>Drag and drop colors to get started!</Text>
        </HStack>
    );
}