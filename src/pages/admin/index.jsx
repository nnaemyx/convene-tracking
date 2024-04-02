import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "@/components/Modal";
import { Table } from "@/components/Table";
import Productlist from "./ProductList";

const Admin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://tracking-convene.onrender.com/api/v1/meetups",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (response.status >= 200 && response.status < 300) {
  //         setRows(response.data); // Assuming data is an array of rows
  //       } else {
  //         throw new Error("Failed to fetch data");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleDeleteRow = async (targetIndex) => {
    try {
      await axios.delete(
        `https://tracking-convene.onrender.com/api/v1/meetups/${rows[targetIndex].id}`
      );
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleAddRow = () => {
    setRowToEdit(null);
    setModalOpen(true);
  };

  return (
    <>
      <div className="admin">
        {/* <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        /> */}
        <Productlist/>
        <div className="btnWrapper">
          <button onClick={handleAddRow} className="btn">
            Add
          </button>
        </div>

        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}
      </div>
    </>
  );
};

export default Admin;
