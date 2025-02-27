/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionHeader,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div>
      <Accordion open={open === 1}>
        <NavLink
          to={address}
          className={({ isActive }) =>
            `flex items-center justify-center my-2 ${
              isActive ? "bg-primary rounded-md " : ""
            }`
          }
        >
          <ListItem
            className="p-0  hover:bg-primary hover:text-[#ECF0F1] transition-colors duration-300"
            selected={open === 1}
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <Icon className="h-6 w-6 text-[#F5F5F5] mr-2" />
              </ListItemPrefix>
              <Typography className="mr-auto text-[#ECF0F1] text-lg font-medium">
                {label}
              </Typography>
            </AccordionHeader>
          </ListItem>
        </NavLink>
      </Accordion>
    </div>
  );
};

export default MenuItem;
