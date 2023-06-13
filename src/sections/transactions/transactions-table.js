import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

const parseTimestamp = (timestamp) => {
  const milliseconds = parseInt(timestamp, 10);
  return new Date(milliseconds);
};

export const TransactionsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

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
                <TableCell>Transaction ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Paid By</TableCell>
                <TableCell>Paid To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Updated On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((transaction) => {
                const isSelected = transaction._id && selected.includes(transaction._id.$oid);
                const createdAt = transaction.createdOn
                  ? format(parseTimestamp(transaction.createdOn.$date.$numberLong), "dd/MM/yyyy")
                  : undefined;

                const updatedAt = transaction.updatedOn
                  ? format(parseTimestamp(transaction.updatedOn.$date.$numberLong), "dd/MM/yyyy")
                  : undefined;

                return (
                  <TableRow hover key={transaction._id.$oid} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(transaction._id.$oid);
                          } else {
                            onDeselectOne?.(transaction._id.$oid);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{transaction._id.$oid}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                    <TableCell>{transaction.paidBy.$oid}</TableCell>
                    <TableCell>{transaction.paidTo.$oid}</TableCell>
                    <TableCell>{transaction.amount.$numberDouble}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{updatedAt}</TableCell>
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

TransactionsTable.propTypes = {
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
