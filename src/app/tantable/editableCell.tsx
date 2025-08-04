import { Input } from "@mui/material";
import { useEffect, useState } from "react";

type EditableCellProps = {
  getValue: () => string | null;
};

const EditableCell = ({ getValue, row, column, table }: EditableCellProps) => {
  const [value, setValue] = useState("");
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  const initialValue = getValue() ?? "";
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <Input
      onBlur={onBlur}
      type="text"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export default EditableCell;
