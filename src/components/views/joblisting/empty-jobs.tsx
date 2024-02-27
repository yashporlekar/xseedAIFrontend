import React, { useState } from "react";
import { Layout, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../themes/default/css/jobListing.css";
import CustomButton from "../../common/button";
import TableTopActionBar from "./table-top-action-bar";
import addFilesPNG from "../../../assets/add_files_svg.png";
import SubNavbar from "./sub-nav-bar";
import NavigationBar from "../navbar/navbar";


const Jobs: React.FC = () => {
 
 
  return (
    <Layout>
      <div className="contentWrapper">
        <NavigationBar/>
        <SubNavbar/>
        <Layout className="tableee">
        <TableTopActionBar 
          onSelectColumns={selectedColumns => {}}
          columnOrder={[]} 
          onColumnOrderChange={newOrder => {}}
        />
        <div className="addFilesCenterPNG">
          <img className="addFileIcon" src={addFilesPNG} alt="Add Files" />
          <Typography>You currently have no jobs.</Typography>
          <div className="newDuplicateButtons">
            <CustomButton
              className="newJobButton1"
              label=" New Job"
              icon={<PlusOutlined />}

            />
            <Typography className="duplicateJob">Duplicate Job</Typography>
          </div>
        </div>
        </Layout>
      </div>
    </Layout>
  );
};

export default Jobs;



