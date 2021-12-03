import "./App.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  input: {
    width: "100px",
    height: "30px",
    border: "1px solid black",
    marginRight: "41px",
    marginLeft: "96px"
  },
  table: {
    width: "30%"
  },
  form: {
    width: "50%"
  },
  alignInput: {},
  alignSelector1: {
    marginLeft: "102px",
    marginRight: "180px"
  },
  alignSelector2: {
    marginLeft: "10px",
    marginRight: "160px",
    width: "110px"
  }
});

function App() {
  const dataType = {
    Integer: [
      "VAR_INT1",
      "VAR_INT2",
      "VAR_INT3",
      "VAR_INT4",
      "VAR_INT5",
      "VAR_INT6",
      "VAR_INT7",
      "VAR_INT8"
    ],
    Long: [
      "VAR_LONG1",
      "VAR_LONG2",
      "VAR_LONG3",
      "VAR_LONG4",
      "VAR_LONG5",
      "VAR_LONG6"
    ],
    Float: ["VAR_FLOAT1", "VAR_FLOAT2"],
    Date: [
      "VAR_DATE1",
      "VAR_DATE2",
      "VAR_DATE3",
      "VAR_DATE4",
      "VAR_DATE5",
      "VAR_DATE6"
    ],
    Text: ["VAR_STR1", "VAR_STR2", "VAR_STR3", "VAR_STR4", "VAR_STR5"]
  };
  const type = ["Integer", "Long", "Float", "Date", "Text"];

  const [selectedType, setSelectedType] = useState("Integer");
  const [dataOption, setDataOption] = useState(dataType["Integer"]);
  const [name, setName] = useState("");
  const [selectedDataType, setSelectedDataType] = useState(
    dataType["Integer"][0]
  );
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState("VAR_INT1");

  const handleChange = (evt) => {
    setSelectedType(evt.target.value);
    setDataOption(dataType[evt.target.value]);
    setSelectedDataType(dataType[evt.target.value][0]);
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const changeSelectOptionHandler = (event) => {
    setSelectedDataType(event.target.value);
  };
  const handleAdd = (evt) => {
    setName(evt.target.value);
    console.log("Type and subtype selected", type, selectedType);
    // console.log("delete selected subType", subType[type]);
    console.log(
      "Modified Array"
      // subType[type].filter((item) => item !== selectedType)
    );
    // console.log(subType[type].splice(selectedType[selectedType.length-1]-1,1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, { name: name, type: selectedDataType }]);
    console.log("Dataoption", dataOption);
    const updateDataOption = dataOption.filter(
      (item) => item !== selectedDataType
    );
    setDataOption(updateDataOption);
    setSelectedDataType(updateDataOption[0]);

    // const modifiedSubType = subType[type].filter(
    //   (item) => item !== selectedType
    // );
    // setSubType({ ...subType, type: modifiedSubType });
  };

  const handleDelete = (id) => {
    console.log("Delete id", id);
  };

  const classes = useStyles();
  return (
    <div className="">
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <label>
              Name:
              <input
                className={classes.input}
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </label>
          </div>
          <div>
            <label for="type">
              Type:
              <select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={type}
                label="none"
                onChange={handleChange}
                className={classes.alignSelector1}
              >
                {type.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label for="mapvar">
              Mapped Variable:
              <select
                value={selected}
                onChange={changeSelectOptionHandler}
                className={classes.alignSelector2}
              >
                {dataOption &&
                  dataOption.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <button type="submit" variant="outlined">
            Add
          </button>
        </form>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    id={row.type}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={(id) => handleDelete(id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
