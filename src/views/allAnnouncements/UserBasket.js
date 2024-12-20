import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CImage,
  CButton
} from "@coreui/react";

const UserBasket = ({ visible, closeModal, basket, onDeleteItem }) => {
  console.log(basket)
  return (
    <CModal visible={visible} onClose={closeModal} size="lg">
      <CModalHeader onClose={closeModal}>
        <CModalTitle>Your Basket</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {basket && basket.length > 0 ? (
          <CTable bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {basket.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <CImage
                      fluid
                      src={item.announcement.file}
                      alt={item.announcement.title}
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  </CTableDataCell>
                  <CTableDataCell>{item.announcement.title}</CTableDataCell>
                  <CTableDataCell>{item.announcement.price} €</CTableDataCell>
                  <CTableDataCell>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => onDeleteItem(item.announcementId)}
                  >
                    Delete
                  </CButton>
                </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        ) : (
          <p>Your basket is empty.</p>
        )}
      </CModalBody>
    </CModal>
  );
};

export default UserBasket;
