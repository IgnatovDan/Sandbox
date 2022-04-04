import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
//import { InboxIcon } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Fragment } from "react";


export default function TouchList() {
    return (
        <Fragment>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText>Inbox item</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText>Drafts item</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemText>Bottom item</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Fragment>
    );
}
