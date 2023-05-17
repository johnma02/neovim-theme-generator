import React, { useState } from "react";
import { Card, CardBody, Flex, Box, 
    Heading, Text, Spacer, Button} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { DroppedPreset, ThemeFile } from "./Common";
import { ArrowUpIcon, EditIcon } from "@chakra-ui/icons";
import { ObjectId } from "bson";
import upvote_theme from "../functions/upvote_theme";
import EditPreset from "./EditPreset";

/**
  * Draggable component which holds a preset payload.
   *
   * @remarks
   * See ./PresetLoader.tsx for drop target analog.
   *
   * @param ThemeFile - the actual theme payload of the component.
   * @param name - name of the held theme.
   * @param description - desc. of held theme.
   * @param upvotes - modifyable number of upvotes of held theme.
   * @param _id - uuid generated by MongoDB for held theme.
   * @param userId - userId associated with theme.
   * @param isUserTheme - when passed to handleClick, will affect how DB is queried.
   * @param editable - a preset is editable if it is rendered on the edit page or if it is a user preset
   */


interface DragPresetProps{
    ThemeFile: ThemeFile;
    name: string;
    description: string;
    upvotes: number;
    _id: ObjectId;
    isUserTheme: boolean;
    userId: string;
    editable: boolean;
    setThemeFile: (x: ThemeFile) => void;
}

export default function DragPreset({
    ThemeFile,
    name,
    description,
    upvotes,
    _id,
    userId,
    isUserTheme,
    editable,
    setThemeFile,
}: DragPresetProps){
    const [upvoted, setUpvoted] = useState<boolean>(false);
    const [localUpvotes, setLocalUpvotes] = useState<number>(upvotes);
    const [{isDragging}, drag] = useDrag(() => ({
        type: "PRESET",
        item: {ThemeFile, _id, name, description, upvotes} as DroppedPreset,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.stopPropagation();
        setUpvoted(true);
        setLocalUpvotes(localUpvotes+1);
        // ../functions/upvote_theme.ts
        isUserTheme ? upvote_theme(userId, _id.toString()) : upvote_theme("", _id.toString()); 
    }
    return (
        <Card 
            role="Drag Preset" 
            ref={drag} 
            width="100%"
            height="10vh"
            border="2px" // Note for future devs: border must be defined first
            borderColor={ThemeFile.bg}
            _hover={{
                boxShadow: `0 0 2px ${ThemeFile.bg}`,
                transform: "scale(1.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
                zIndex: 1000
            }}
            overflowY="hidden"
            onClick={()=>setThemeFile(ThemeFile)}
            zIndex={99}
        >
            <CardBody>
                <Flex>
                    <Box
                        width="50%"
                        maxHeight="50px"
                        textOverflow="ellipsis"
                        overflowY="hidden"
                    >
                        <Heading size="xs">{name}</Heading>
                        <Text fontSize="10">{description}</Text>
                    </Box>
                    <Spacer/>
                    <Flex alignItems="center" justifyItems="center" textAlign="center">
                        <Box>
                            <Text fontWeight="extrabold" fontSize="10">
                                {localUpvotes}
                            </Text>
                        </Box>
                        <Button 
                            h="0"
                            w="0"
                            bg="transparent"
                            isDisabled={upvoted}
                            onClick={(e)=>handleClick(e)}
                        >
                            <ArrowUpIcon
                                color={upvoted ? "lime" : "green"}
                            />
                        </Button>
                    </Flex>
                    {editable && 
                            <Flex direction="column">
                                <Box h="20%"></Box>
                                <Button h="100%" w="0" colorScheme="transparent">
                                    <EditPreset/>
                                </Button>
                            </Flex>
                    }
                </Flex>
            </CardBody>
        </Card> 
    );
}
