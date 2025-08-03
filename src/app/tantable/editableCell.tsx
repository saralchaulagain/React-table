import { Input } from "@mui/material";
import { useEffect, useState } from "react";

type EditableCellProps = {
  getValue: () => string;
};

const EditableCell = ({ getValue }: EditableCellProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(initialValue);
    console.log("slkfadfj ", initialValue);
  }, [initialValue]);
  return (
    <Input
      type="text"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export default EditableCell;
