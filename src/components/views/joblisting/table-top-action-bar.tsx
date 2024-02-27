import React, { useState, useEffect } from "react";
import { Layout, Typography, Divider, Button, Modal, Checkbox } from "antd";
import {
  FilterOutlined,
  HolderOutlined,
  LayoutOutlined,
  LockOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import CustomButton from "../../common/button";
import Search from "antd/es/input/Search";

interface TableTopActionBarProps {
  onSelectColumns: (selectedColumns: string[]) => void;
  columnOrder: string[];
  onColumnOrderChange: (newOrder: string[]) => void;
}

const TableTopActionBar: React.FC<TableTopActionBarProps> = ({
  onSelectColumns,
  columnOrder,
  onColumnOrderChange,
}) => {
  const checkboxAndButtonsLabels = [
    "Job Title",
    "Job Code",
    "Date",
    "Status",
    "MSP/VMS",
    "Client",
    "Country",
    "Assigned",
    "State",
    "Bill Rate",
    "Company",
    "City",
    "Job Type",
    " ", //Action Column
  ];

  const defaultCheckedColumns = [
    "Job Title",
    "Job Code",
    "Date",
    "Status",
    "MSP/VMS",
    "Client",
    "Country",
    "Assigned",
    " ",
  ];

  const defaultCheckedIndexes = defaultCheckedColumns.map((label) =>
    checkboxAndButtonsLabels.indexOf(label)
  );

  const [checkboxStates, setCheckboxStates] = useState(() =>
    checkboxAndButtonsLabels.map((_, index) =>
      defaultCheckedIndexes.includes(index)
    )
  );

  const [buttonOrder, setButtonOrder] = useState(() => defaultCheckedIndexes);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedColumnsCount = checkboxStates.filter(
    (checked) => checked
  ).length;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSaveModal = () => {
    setIsModalVisible(false);
    const newOrder = buttonOrder.map(
      (index) => checkboxAndButtonsLabels[index]
    );
    onSelectColumns(newOrder);
    onColumnOrderChange(newOrder);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  const handleCustomCheckboxChange =
    (index: number) => (e: CheckboxChangeEvent) => {
      if (index === 0 || index === 1) {
        return;
      }
      const newCheckboxStates = [...checkboxStates];
      newCheckboxStates[index] = e.target.checked;
      setCheckboxStates(newCheckboxStates);
    };

  const moveButton = (dragIndex: number, hoverIndex: number) => {
    if (
      buttonOrder[dragIndex] === 0 ||
      buttonOrder[dragIndex] === 1 ||
      buttonOrder[hoverIndex] === 0 ||
      buttonOrder[hoverIndex] === 1
    ) {
      return;
    }

    const newOrder = [...buttonOrder];
    const draggedButton = newOrder[dragIndex];

    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedButton);

    setButtonOrder(newOrder); 

    localStorage.setItem("buttonOrder", JSON.stringify(newOrder)); 
    const stringOrder = newOrder.map(
      (index) => checkboxAndButtonsLabels[index]
    );
    onColumnOrderChange(stringOrder); // Update column order
  };

  useEffect(() => {
    const newButtonOrder = checkboxAndButtonsLabels
      .map((label, index) => ({ label, index }))
      .filter(({ label, index }) => checkboxStates[index])
      .map(({ label, index }) => index);

    setButtonOrder(newButtonOrder);
  }, [checkboxStates]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <div className="tableTopActionBar">
          <div className="filterSearchButtons">
            <CustomButton
              className="filterButton"
              icon={
                <b>
                  <FilterOutlined /> Filters
                </b>
              }
            />
            <Search className="search" size="large" placeholder="Search" />
            <div className="manageColumnDiv" onClick={showModal}>
              <LayoutOutlined className="manageColumnIcon"/>
              <Typography>Manage Column</Typography>
            </div>
          </div>
        </div>
        <Modal
          maskClosable={false}
          visible={isModalVisible}
          title={
            <Typography>Manage Column</Typography>
          }
          onCancel={handleCancelModal}
          footer={[
            <Typography className="maxColumnsTypography">
              Max 8 columns can be selected
            </Typography>,

            <CustomButton
              label="Save"
              onClick={handleSaveModal}
              icon={<SaveOutlined />}
            type="primary"
              className="saveButtonManageColumn"
            />,
          ]}
        >








          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <Divider style={{ marginTop: "7px" }} />
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "#7B7B7B",
                  marginTop: "-10px",
                  marginBottom: "10px",
                }}
              >
                Columns
              </Typography>

              {checkboxAndButtonsLabels.map((label, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "17px",
                    display: label === " " ? "none" : "block",
                  }}
                >
                  <Checkbox
                    checked={checkboxStates[index]}
                    onChange={handleCustomCheckboxChange(index)}
                    // disabled={index === 0 || index === 1}
                    disabled={
                      index === 0 ||
                      index === 1 ||
                      (checkboxStates.filter((checked) => checked).length > 8 &&
                        !checkboxStates[index]) // Disable additional checkboxes once 8 are selected
                    }
                  >
                    {label}
                  </Checkbox>
                </div>
              ))}
              <Divider style={{ minWidth: "8px" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div>
                <Divider style={{ marginTop: "7px" }} />
                <Typography
                  style={{
                    fontWeight: "bold",
                    color: "#7B7B7B",
                    marginTop: "-10px",
                    marginBottom: "10px",
                  }}
                >
                  Selected Columns ({selectedColumnsCount - 1})
                  {/* ///Here -1 is added for count reduce of action column */}
                </Typography>
              </div>

              {buttonOrder.map(
                (buttonIndex, index) =>
                  checkboxAndButtonsLabels[buttonIndex] !== " " && (
                    <DraggableButton
                      key={index}
                      label={checkboxAndButtonsLabels[buttonIndex]}
                      index={index}
                      moveButton={moveButton}
                    />
                  )
              )}
              {/* <Divider style={{ minWidth: "8px" }} /> */}
            </div>
          </div>
        </Modal>
      </Layout>
    </DndProvider>
  );
};

const DraggableButton: React.FC<{
  label: string;
  index: number;
  moveButton: (dragIndex: number, hoverIndex: number) => void;
}> = ({ label, index, moveButton }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "BUTTON",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "BUTTON",
    hover(item: { index: number }, monitor) {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveButton(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const icon =
    label === "Job Title" || label === "Job Code" ? (
      <LockOutlined />
    ) : (
      <HolderOutlined />
    );

  const buttonStyle =
    label === "Job Title" || label === "Job Code"
      ? { backgroundColor: "#CCCCCC", color: "grey  " }
      : {};

  return (
    <div
      ref={(node: any) => drag(drop(node))}
      style={{ marginBottom: "6px", cursor: "move", opacity }}
    >
      <Button style={{ width: "100%", display: "flex", ...buttonStyle }}>
        {icon}
        {label}
      </Button>
    </div>
  );
};

export default TableTopActionBar;
