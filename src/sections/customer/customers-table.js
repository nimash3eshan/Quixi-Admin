import PropTypes from "prop-types";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

const avatarPaths = [
  "/assets/avatars/avatar-carson-darrin.png",
  "/assets/avatars/avatar-fran-perez.png",
  "/assets/avatars/avatar-jie-yan-song.png",
  "/assets/avatars/avatar-anika-visser.png",
  "/assets/avatars/avatar-miron-vitold.png",
  "/assets/avatars/avatar-penjani-inyene.png",
  "/assets/avatars/avatar-omar-darboe.png",
  "/assets/avatars/avatar-siegbert-gottfried.png",
  "/assets/avatars/avatar-iulia-albu.png",
  "/assets/avatars/avatar-nasimiyu-danai.png",
];

const getRandomProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * avatarPaths.length);
  return avatarPaths[randomIndex];
};

const parseTimestamp = (timestamp) => {
  const milliseconds = parseInt(timestamp, 10);
  return new Date(milliseconds);
};

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const newAvatars = {};
    items.forEach((item) => {
      newAvatars[item._id.$oid] =
        item.profileImgUrl === null ? getRandomProfileImage() : item.profileImgUrl;
    });
    setAvatars(newAvatars);
  }, [items]);

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = customer._id && selected.includes(customer._id.$oid);
                const createdAt = customer.createdOn
                  ? format(parseTimestamp(customer.createdOn.$date.$numberLong), "dd/MM/yyyy")
                  : undefined;

                const updatedAt = customer.updatedOn
                  ? format(parseTimestamp(customer.updatedOn.$date.$numberLong), "dd/MM/yyyy")
                  : undefined;

                return (
                  <TableRow hover key={customer._id?.$oid ?? "N/A"} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer._id.$oid);
                          } else {
                            onDeselectOne?.(customer._id.$oid);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={customer._id ? avatars[customer._id.$oid] : getRandomProfileImage()}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">{customer.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email ?? "N/A"}</TableCell>
                    <TableCell>{customer.address ?? "N/A"}</TableCell>
                    <TableCell>{customer.phoneNumber ?? "N/A"}</TableCell>
                    <TableCell>{customer.age?.$numberInt ?? "N/A"}</TableCell>
                    <TableCell>{customer.verified?.toString() ?? "N/A"}</TableCell>
                    <TableCell>{updatedAt ?? "N/A"}</TableCell>
                    <TableCell>{createdAt ?? "N/A"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
