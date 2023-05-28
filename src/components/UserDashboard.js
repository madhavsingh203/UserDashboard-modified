import {
  TableContainer,
  Table,
  TableBody,
  Pagination,
  TextField,
} from "@mui/material";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import axios from "axios";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const fetchAPICall = async () => {
    try {
      const URL =
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
      const res = await axios.get(URL);
      let data = res.data;

      setUserData(data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPICall();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setIsSelected(false)
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filteredUserData = userData.filter((row) =>
    `${row.name}${row.email}${row.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUserData.slice(indexOfFirstRow, indexOfLastRow);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const selectedRowIds = filteredUserData
        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
        .map((row) => row.id);
      setSelectedUsers(selectedRowIds);
      setIsSelected(true);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectedUsers = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((item) => item !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleDeleteSelected = () => {
    setUserData(userData.filter((row) => !selectedUsers.includes(row.id)));
    setSelectedUsers([]);
    setIsSelected(false);
  };

  return (
    <>
      <TextField
        value={search}
        label="Search by name,email or role"
        onChange={handleSearch}
        className="search-bar"
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      />
      <TableContainer className="table-container">
        <Table>
          <UserTableHeader
            handleSelectAll={handleSelectAll}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
          <TableBody>
            {currentRows.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                userData={userData}
                setUserData={setUserData}
                selectedUsers={selectedUsers}
                handleSelectAll={handleSelectAll}
                handleSelectedUsers={handleSelectedUsers}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer">
        <button
          className="delete-selected-button"
          onClick={handleDeleteSelected}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected
        </button>

        <Pagination
          className="pagination"
          count={Math.ceil(filteredUserData.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          rowsperpage={rowsPerPage}
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
};

export default UserDashboard;
