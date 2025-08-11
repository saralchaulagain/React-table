import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DATA, { STATUSES } from "@/data";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";

interface ColorIconProps extends React.ComponentProps<typeof Box> {
  color: string;
}

const ColorIcon: React.FC<ColorIconProps> = ({ color, ...props }) => (
  <Box
    width={"12px"}
    height={"12px"}
    bgcolor={color}
    borderRadius={"3px"}
    {...props}
  />
);

export default function StatusCell({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => { name?: string; color?: string } | undefined;
  row: { index: number }; // Replace with your row type if available
  column: { id: string }; // Replace with a more specific type if available
  table: {
    options: {
      meta: {
        updateData: (
          rowIndex: number,
          columnId: string,
          status: { id: string; name: string }
        ) => void;
      };
    };
  }; // Replace with your table type if available
}) {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  console.log("data:", DATA);
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {name && (
            <Button
              style={{ backgroundColor: color, color: red[900] }}
              className="w-full h-full"
              variant="contained"
              {...bindTrigger(popupState)}
            >
              {name}
            </Button>
          )}
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => (
                updateData(row.index, column.id, { id: "red", name: "Red" }),
                popupState.close()
              )}
            >
              <ColorIcon color={red[400]} marginRight={4} /> None
            </MenuItem>
            {STATUSES.map((status) => (
              <MenuItem
                onClick={() => (
                  updateData(row.index, column.id, {
                    id: String(status.id),
                    name: status.name,
                  }),
                  popupState.close()
                )}
                key={status.id}
              >
                <ColorIcon color={status.color} marginRight={4} />
                {status.name}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
