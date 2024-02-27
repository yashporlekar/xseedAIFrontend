import { Layout, Row, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../themes/default/css/jobListing.css";
import Jobs from "./empty-jobs";

const SubNavbar: React.FC = () => {
  const [jobCount, setJobCount] = useState<number>(0);

  useEffect(() => {
    fetchJobCount();
  }, []);

  const fetchJobCount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/joblisting/api/jobcount", {
        
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WzZdLCJ1c2VySWQiOjEsInN1YiI6Inlhc2hwb3JsZWthcjg4ODhAZ21haWwuY29tIiwiaWF0IjoxNzA4OTQ5NjkyLCJleHAiOjE3MDg5NTE0OTJ9.nJ0rc8CPsUn8zBENk1Wjh5iVFcig2_URFdx_6FQ2cJQ"
        }
      });
      setJobCount(response.data.count);
    } catch (error) {
      console.error("Error fetching job count:", error);
    }
  };

  return (
    <Header className="subnav">
      <Layout className="subnav">
        <Row className="job">
          <Typography className="headingStyles">Jobs </Typography>
          <Typography className="headingCount">{jobCount}</Typography>
        </Row>
      </Layout>
      {jobCount === 0 && <Jobs />}
    </Header>
  );
};

export default SubNavbar;
