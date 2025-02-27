import { Card, List } from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import MenuItem from "./Menu/MenuItem";
import { FiClipboard, FiSettings } from "react-icons/fi";

export default function SideMenu() {
  return (
    <div className="w-full ">
      <Card className="h-[calc(100vh-4rem)] rounded-none w-9/12 md:w-3/12 bg-gradient-to-b from-backgroundDark to-backgroundLight p-4 fixed zCard">
        <List>
          <MenuItem
            label={"Dashboard"}
            address={"/"}
            icon={HomeIcon}
          ></MenuItem>

          <MenuItem
            label={"Task"}
            address={"task"}
            icon={FiClipboard}
          ></MenuItem>
          <MenuItem
            label={"Settings"}
            address={"settings"}
            icon={FiSettings}
          ></MenuItem>
        </List>
      </Card>
    </div>
  );
}
