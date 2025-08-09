import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import DATA, { STATUSES } from "@/data";

export default function StatusCell({ getValue, row, column, table }) {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  console.log("data:", DATA);
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {name && (
            <Button
              className={`w-full h-4 bg-${color}-600`}
              variant="contained"
              {...bindTrigger(popupState)}
            >
              {name}
            </Button>
          )}
          <Menu {...bindMenu(popupState)}>
            {STATUSES.map((status) => (
              <MenuItem
                onClick={() => (
                  updateData(row.index, column.id, status), popupState.close
                )}
                key={status.id}
              >
                {status.name}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
