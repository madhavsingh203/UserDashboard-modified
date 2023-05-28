
import { Checkbox, TableCell, TableRow, Button } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const UserTableRow = ({
  user,
  userData,
  setUserData,
  selectedUsers,
  handleSelectedUsers,
}) => {
  const [isEdit, setIsEdit] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const handleEdit = (id) => {
    setIsEdit(id);
    setEditedUser(userData.find((row) => row.id === id));
  };

  const handleSave = () => {
    setUserData(userData.map((row) => (row.id === isEdit ? editedUser : row)));
    setIsEdit(null);
  };
  const handleCancel = () => {
    setIsEdit(null);
  };

  const handleDelete = (id) => {
    setUserData(userData.filter((user) => user.id !== id));
  };
  const handleCheckbox = (e) => {
    setIsSelected(e.target.checked);
  };

  return (
    <>
      <TableRow key={user.id} className={isSelected ? "selected-row" : ""}>
        <TableCell spacing={{ xs: 1, sm: 2 }}>
          <Checkbox
            onChange={() => handleSelectedUsers(user.id)}
            checked={selectedUsers.includes(user.id)}
            onClick={(e) => handleCheckbox(e)}
          />
        </TableCell>
        {isEdit === user.id ? (
          <TableCell>
            <input
              className="input-box"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />
          </TableCell>
        ) : (
          <TableCell>{user.name}</TableCell>
        )}

        {isEdit === user.id ? (
          <TableCell>
            <input
              className="input-box"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />
          </TableCell>
        ) : (
          <TableCell>{user.email}</TableCell>
        )}

        {isEdit === user.id ? (
          <TableCell>
            <input
              className="input-box"
              value={editedUser.role}
              onChange={(e) =>
                setEditedUser({ ...editedUser, role: e.target.value })
              }
            />
          </TableCell>
        ) : (
          <TableCell>{user.role}</TableCell>
        )}

        <TableCell>
          {/* <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <SaveIcon />
          </IconButton> */}

          {isEdit === user.id ? (
            <>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <button
                className="action-button"
                onClick={() => handleEdit(user.id)}
              >
                <EditIcon />
              </button>
              <button
                className="action-button"
                onClick={() => handleDelete(user.id)}
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default UserTableRow;
