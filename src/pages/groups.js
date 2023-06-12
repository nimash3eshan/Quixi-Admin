import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { GroupCard } from "src/sections/groups/group-card";
import { GroupsSearch } from "src/sections/groups/groups-search";

//l   mock data
const groups = [
  {
    _id: { $oid: "6412976fc0e71b3219e9fcf5" },
    name: "group1",
    description: "description 1",
    img: null,
    budget: { $numberInt: "20000" },
    members: [{ $oid: "6411f1b4da11e4a4275b815e" }, { $oid: "641291880780dde4f6ae3b99" }],
    createdBy: { $oid: "641291880780dde4f6ae3b99" },
    expenses: [],
    createdOn: { $date: { $numberLong: "1678940015492" } },
    updatedOn: { $date: { $numberLong: "1678940015492" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "641f80db8aededff52b446c7" },
    name: "Generic Frozen Tuna",
    description: "International",
    img: null,
    budget: { $numberInt: "449" },
    category: "general",
    members: [
      { $oid: "6411c532a14e5cdda9e9a272" },
      { $oid: "6411f1b4da11e4a4275b815e" },
      { $oid: "641291880780dde4f6ae3b99" },
      { $oid: "641eea9b89c945dfde421797" },
      { $oid: "641f16481459a0e0fffce903" },
    ],
    createdBy: { $oid: "641f16481459a0e0fffce903" },
    expenses: [
      { $oid: "64836881d99b2ef2ac77b13a" },
      { $oid: "64836dc9d40b3275f25904cd" },
      { $oid: "64836f8a6a4ed29858c22234" },
      { $oid: "6483819ff831edd138a8181d" },
      { $oid: "64850ecceb99d38443829e9b" },
      { $oid: "648634e4201f410523fcdba9" },
      { $oid: "6486353f201f410523fcdbc1" },
      { $oid: "648635b4201f410523fcdbd6" },
      { $oid: "648635e2201f410523fcdbe6" },
      { $oid: "64863a293077c717fb493176" },
      { $oid: "64863acd3077c717fb49318e" },
    ],
    createdOn: { $date: { $numberLong: "1679786203606" } },
    updatedOn: { $date: { $numberLong: "1686486797909" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "641fe0528aededff52b4a49c" },
    name: "Fantastic Cotton Pizza",
    description: "Internal",
    img: null,
    budget: { $numberInt: "690" },
    category: "general",
    members: [
      { $oid: "6411f1b4da11e4a4275b815e" },
      { $oid: "641291880780dde4f6ae3b99" },
      { $oid: "6411c532a14e5cdda9e9a272" },
      { $oid: "641f16481459a0e0fffce903" },
    ],
    createdBy: { $oid: "641f16481459a0e0fffce903" },
    expenses: [{ $oid: "64872a4c1a1346a37bdc769e" }],
    createdOn: { $date: { $numberLong: "1679810642499" } },
    updatedOn: { $date: { $numberLong: "1679810642499" } },
    __v: { $numberInt: "0" },
  },
];

const Page = () => (
  <>
    <Head>
      <title>Groups | Quixi</title>
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
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Groups</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <GroupsSearch />
          <Grid container spacing={3}>
            {groups.map((group) => (
              <Grid xs={12} md={6} lg={4} item key={group._id.$oid}>
                <GroupCard group={group} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Pagination count={3} />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
