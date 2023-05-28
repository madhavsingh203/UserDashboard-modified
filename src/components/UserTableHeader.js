import { Checkbox } from "@mui/material";
import {  TableCell, TableHead, TableRow } from "@mui/material";

const UserTableHeader = ({ handleSelectAll, isSelected, setIsSelected }) => {
  const handleChecked = (e) =>{
console.log("checked::", e.target.checked)
setIsSelected(e.target.checked)
  }
  return (
    <>
      <TableHead className="table-header">
        <TableRow>
          <TableCell>
            <Checkbox onChange={handleSelectAll} onClick={handleChecked} checked={isSelected}/>
          </TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default UserTableHeader;
