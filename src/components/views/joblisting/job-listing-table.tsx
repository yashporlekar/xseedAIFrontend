import React, { useState, useEffect, useRef } from "react";
import { Badge, Row, Space, Typography, Avatar, Card, Layout } from "antd";
import {
  AntDesignOutlined,
  FileTextOutlined,
  MoreOutlined,
  PlusCircleTwoTone,
  RightOutlined,
  UpOutlined,
} from "@ant-design/icons";
import CommonTable from "../../common/table";
import "../../../themes/default/css/global.css";
import "../../../themes/default/css/jobListing.css";
import TableTopActionBar from "./table-top-action-bar";
import { ColumnsType } from "antd/lib/table";
import NavigationBar from "../navbar/navbar";
import SubNavbar from "./sub-nav-bar";

interface DataType {
  key: React.Key;
  Requirements: string;
  job_Id: string;
  date: string;
  openDate: string;
  closeDate: string;
  status: string;
  vms: string;
  client: string;
  country: string;
  state: string;
  assigned: string;
  bill_rate: string;
  company:string;
  city:string;
  jobType:string;

}

const JobListingTable = () => {
  const [clickedRecord, setClickedRecord] = useState<DataType | null>(null);
  const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(
    null
  );
  const cardRef = useRef<HTMLDivElement>(null);

  // const [selectedColumns, setSelectedColumns] = useState<string[]>([
  //   "Job Title",
  //   "Job Code",
  //   "Date",
  //   "Status",
  //   "MSP/VMS",
  //   "Assigned",
  //   "Country",
  //   "State",
  //   "Bill Rate",
  //   "Client",
  //   "Company",
  //   "City",
  //   "Job Type",
  //   "Actions",
 // ]);

 ///By Default this columns Displayed on Table.
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "Job Title",
    "Job Code",
    "Date",
    "Status",
    "MSP/VMS",
    "Client",
    "Country",
    "Assigned",
    " ",//this empty string is assigned column name
  ]);
  

  const [columnOrder, setColumnOrder] = useState<string[]>(selectedColumns);

  const handleSelectColumns = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  const handleColumnOrderChange = (newOrder: string[]) => {
    setColumnOrder(newOrder);
  };

  useEffect(() => {
    // Update the columns variable to reorder based on columnOrder
    const reorderedColumns = columnOrder.map((columnTitle) => {
      return initialColumns.find((col) => col.title === columnTitle);
    });

    // Filter out undefined values from reorderedColumns
    const filteredColumns = reorderedColumns
      .filter(
        (col) => col !== undefined && selectedColumns.includes(col!.title)
      )
      .map((col) => ({
        ...col,
        render: col?.render as (
          text: any,
          record: DataType
        ) => JSX.Element | string,
      }));

    // Update the table columns
    setTableColumns(filteredColumns);
    setSelectedColumns(columnOrder);
  }, [columnOrder, selectedColumns]);

  const statusColors = {
    Open: "white",
    Closed: "white",
    Hold: "white",
    Pending: "white",
  };

  function handleMoreClick(record: DataType) {
    setClickedRecord(record);
    setRenderedContent(
      <div ref={cardRef} className="outside-click-listener">
        <Card className="small-card">
          <Typography className="card-text">Edit Job</Typography>
          <Typography className="card-text">Assign</Typography>
          <Typography className="card-text">Attract Candidates</Typography>
          <Typography className="card-text">Delete Job</Typography>
        </Card>
      </div>
    );
  }

  function handleFileTextClick(record: DataType) {
    console.log("Hello");
  }

  function handleOutsideClick(event: MouseEvent) {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setClickedRecord(null);
      setRenderedContent(null); // Close the card
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [renderedContent]);

  const expandIcon = ({ expanded, onExpand, record }: any) => (
    <a onClick={() => onExpand(record)}>
      {expanded ? <UpOutlined /> : <RightOutlined />}
    </a>
  );

  const data: DataType[] = [];
  for (let i = 1; i <= 10; i++) {
    data.push(
      {
        key: `Java-${i}`,
        Requirements: `Java Developer [Technical expert IHRDS of gty ions] ${i}`,
        job_Id: `#${12434 + i}`,
        date: "",
        openDate: "10-01-2024",
        closeDate: "10-02-2024",
        status: "Open",
        vms: "Covendis",
        client: "IHRDC",
        country: "Canada",
        state: "Boston",
        assigned: "",
        bill_rate: "85$",
        
        company:"Morgen Stanley",
        city:"Hidsty",
        jobType:"Remote",
      },
      {
        key: `PHP-${i}`,
        Requirements: `PHP Developer [Technical expert IHRDS of gty ions] ${i}`,
        job_Id: `#${12434 + i}`,
        date: "",
        openDate: "10-01-2024",
        closeDate: "10-02-2024",
        status: "Closed",
        vms: "Covendis",
        client: "Covendis Technical",
        country: "USA",
        state: "Texas",
        assigned: "",
        bill_rate: "60$",
 
        company:"Morgen Stanley",
        city:"Hidsty",
        jobType:"Remote",
      },
      {
        key: `Python-${i}`,
        Requirements: `Python Developer [Technical expert IHRDS of gty ions] ${i}`,
        job_Id: `#${12434 + i}`,
        date: "",
        openDate: "10-01-2024",
        closeDate: "10-02-2024",
        status: "Pending",
        vms: "Covendis",
        client: "IHRDC",
        country: "Brazil",
        state: "Florida",
        assigned: "",
        bill_rate: "25$",
       
        company:"Morgen Stanley",
        city:"Hidsty",
        jobType:"Remote",
      }
    );
  }

  const expandedRowRender = (record: DataType) => {
    const subColumns = [
      { title: "Applicants", dataIndex: "applicants", key: "applicants" },
      { title: "Location", dataIndex: "location", key: "location" },
      {
        title: "Years of Experience",
        dataIndex: "yrs_of_exp",
        key: "yrs_of_exp",
      },
      { title: "Source", dataIndex: "source", key: "source" },
      {
        title: "Application Status",
        dataIndex: "applicationStatus",
        key: "applicationStatus",
      },
      {
        title: " ",//this empty string is assigned column name
        dataIndex: "action",
        key: "action",
        render: (_: any) => <MoreOutlined />,
      },
    ];

    const subData = [
      {
        key: record.key,
        applicants: "John Doe",
        location: "New York",
        yrs_of_exp: "5 Years",
        source: "LinkedIn",
        applicationStatus: "In Progress",
        action: "",
      },
      {
        key: record.key,
        applicants: "John Doe",
        location: "New York",
        yrs_of_exp: "5 Years",
        source: "LinkedIn",
        applicationStatus: "In Progress",
        action: "",
      },
    ];

    return (
      <CommonTable columns={subColumns} data={subData} pagination={false} />
    );
  };

  // Initial table columns
  const initialColumns = [
    { title: "Job Title", dataIndex: "Requirements", key: "Requirements" },
    { title: "Job Code", dataIndex: "job_Id", key: "job_Id" },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: DataType) => {
        if (record.openDate && record.closeDate) {
          return (
            <Layout>
              <Layout>Open Date: {record.openDate}</Layout>
              <Layout>Close Date: {record.closeDate}</Layout>
            </Layout>
          );
        } else if (record.date) {
          return record.date;
        } else {
          return "N/A";
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: DataType) => (
        <Space>
          <Badge
            color={statusColors[record.status as keyof typeof statusColors]}
            className="site-badge-count-109"
            count={record.status}
            style={{
              width: "65px",
              height: "20px",
              borderRadius: "15px",
              color: "black",
            }}
          />
        </Space>
      ),
    },
    { title: "MSP/VMS", dataIndex: "vms", key: "vms" },
    {
      title: "Assigned",
      dataIndex: "assigned",
      key: "assigned",
      render: (_: any, record: DataType) => (
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Avatar.Group
            maxCount={2}
            maxPopoverTrigger="click"
            size="small"
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            <Avatar
              style={{ backgroundColor: "#1677ff" }}
              icon={<AntDesignOutlined />}
            />
          </Avatar.Group>
          <PlusCircleTwoTone
            style={{ fontSize: "20px" }}
            onClick={() => handleFileTextClick(record)}
          />
        </Row>
      ),
    },
    { title: "Company", dataIndex: "vms", key: "vms" },
    { title: "City", dataIndex: "vms", key: "vms" },
    { title: "Job Type", dataIndex: "vms", key: "vms" },

    { title: "Country", dataIndex: "country", key: "country" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "Bill Rate", dataIndex: "bill_rate", key: "bill_rate" },
    { title: "Client", dataIndex: "client", key: "client" },
    {
      title: " ",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <FileTextOutlined onClick={() => handleFileTextClick(record)} />
          <MoreOutlined onClick={() => handleMoreClick(record)} />
        </Space>
      ),
    },
  ];

  const [tableColumns, setTableColumns] =
    useState<ColumnsType<DataType>>(initialColumns);

  return (
 
    <Row>
        <div className="contentWrapper">
        <NavigationBar/>
        <SubNavbar/>
      <TableTopActionBar
        onSelectColumns={handleSelectColumns}
        columnOrder={columnOrder}
        onColumnOrderChange={handleColumnOrderChange}
      />
      <CommonTable
        columns={tableColumns}
        data={data}
        expandedRowRender={expandedRowRender}
        expandIcon={expandIcon}
        className="mainTable"
      />
      {renderedContent && renderedContent}
      </div>
    </Row>
  );
};

export default JobListingTable;
