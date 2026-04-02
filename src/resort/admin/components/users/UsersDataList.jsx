import {
  Delete,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useUser } from "../../../providers/UserProvider";
import { useEffect, useState } from "react";
import CreateUserAdmin from "./CreateUserAdmin";
import EditUserAdmin from "./EditUserAdmin";

function UsersDataList() {
  const { getUsersFromServer, users, handleDeleteUser } = useUser();
  useEffect(() => {
    getUsersFromServer();
    console.log(users);
  }, []);
  const [userSelected, setUserSelected] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (users.length === 0) {
    <Typography>NO Users to show!</Typography>;
  }
  return (
    <>
      <TableContainer
        sx={{ width: "80vw", maxHeight: "90vh ", margin: "0 auto" }}
      >
        <Table
          size="small"
          sx={{
            width: "100%",

            "& .MuiTableCell-root": { textAlign: "center" },
          }}
        >
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                position: "sticky",
                backgroundColor: "#fff",
                zIndex: 10,
                fontWeight: 600,
                fontSize: 18,
              },
            }}
          >
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  bgcolor: "secondary.light",
                  fontSize: "1.2rem",
                },
              }}
            >
              <TableCell sx={{ top: 0 }}>First name</TableCell>
              <TableCell sx={{ top: 0 }}>Last name</TableCell>
              <TableCell sx={{ top: 0 }}>Email</TableCell>
              <TableCell sx={{ top: 0 }}>Birth date</TableCell>
              <TableCell sx={{ top: 0 }}>Role</TableCell>

              <TableCell sx={{ top: 0 }}></TableCell>
              <TableCell sx={{ top: 0 }}></TableCell>
              <TableCell sx={{ top: 0 }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              " & .MuiTableCell-root": {
                borderColor: "secondary.light",
                fontFamily: "verdana",
                fontSize: "0.8rem",
              },
              bgcolor: "white",
            }}
          >
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.LastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setIsDialogOpen(true);
                      setUserSelected(user._id);
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleDeleteUser(user._id);
                    }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setUserSelected(null);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent dividers>
          {userSelected && (
            <EditUserAdmin
              userSelected={userSelected}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UsersDataList;
