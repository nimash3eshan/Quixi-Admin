import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { applyPagination } from "src/utils/apply-pagination";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TransactionsTable } from "src/sections/transactions/transactions-table";
import { TransactionsSearch } from "src/sections/transactions/transactions-search";

// Dummy data for testing
const data = [
  {
    _id: { $oid: "60d21e973b7d1ad63efc5820" },
    status: "Pending",
    paidBy: { $oid: "60d21e973b7d1ad63efc5814" },
    paidTo: { $oid: "60d21e973b7d1ad63efc5818" },
    amount: { $numberDouble: "100.00" },
    createdOn: { $date: { $numberLong: "1679998451199" } },
    updatedOn: { $date: { $numberLong: "1684835190479" } },
  },
  {
    _id: { $oid: "6483662ee523930fb13be36e" },
    amount: { $numberDouble: "196.33000000000004" },
    createdOn: { $date: { $numberLong: "1686332964287" } },
    updatedOn: { $date: { $numberLong: "1686332964287" } },
    paidBy: { $oid: "6411c532a14e5cdda9e9a272" },
    paidTo: { $oid: "641f16481459a0e0fffce903" },
    status: "completed",
    __v: { $numberInt: "0" },
  },
];

const useTransactions = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useTransactionIds = (transactions) => {
  return useMemo(() => {
    return transactions.map((transaction) => transaction._id.$oid);
  }, [transactions]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const transactions = useTransactions(page, rowsPerPage);
  const transactionsIds = useTransactionIds(transactions);
  const transactionsSelection = useSelection(transactionsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Transactions | Quixi</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <TransactionsSearch />
            <TransactionsTable
              count={data.length}
              items={transactions}
              onDeselectAll={transactionsSelection.handleDeselectAll}
              onDeselectOne={transactionsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={transactionsSelection.handleSelectAll}
              onSelectOne={transactionsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={transactionsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
