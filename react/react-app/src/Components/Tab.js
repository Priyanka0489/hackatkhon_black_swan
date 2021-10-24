import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useHistory } from "react-router-dom";
import CustomizeForm from "./CustomizeForm";
import React, { useState } from "react";
const CustomTabs = () => {
  const [carInput, setCarInput] = useState();
  const history = useHistory();

  const handleDiagnosticLeads = async (e, type) => {
    console.log("In handleYoungCheckup");
    e.preventDefault();
    let reqJson = {
      type: type,
      url: "/search",
    };
    history.push({
      pathname: "/search_diagnostic",
      state: reqJson,
    });
  };

  const handleCarSubmit = async (e) => {
    // e.preventDefault();
    console.log("In handleCarSubmit..", carInput);
    if (!carInput) {
      alert("Enter Location");
      return;
    }
    let reqJson = {
      type: carInput,
      url: "/search_car",
    };
    history.push({
      pathname: "/result_car",
      state: reqJson,
    });
    // await fetchApiData(carInput, url);
  };

  const handleCarInputChange = (e, text) => {
    e.preventDefault();
    console.log("In handleCarInputChange..", text);
    setCarInput(text);
  };

  const handlePanSubmit = async (e) => {
    e.preventDefault();
    console.log("In handleCarSubmit..");
    let reqJson = {
      type: "null",
      url: "/search_non_pan",
    };
    history.push({
      pathname: "/result_pan",
      state: reqJson,
    });
  };
  return (
    <>
      <header className="clearfix">
        <div>
          <h1>The Black Swan </h1>
          <h3>One Stop solution for online Brand Development</h3>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          <img
            src="img/Black%20Swan-n.png"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              marginTop: "-120px",
            }}
          />
        </div>
      </header>

      <Tabs>
        <TabList>
          <Tab>
            {" "}
            <span className="tabs nav ul li">
              <a className="tabs nav li.tab-current a">Diagnostic Data</a>
            </span>
          </Tab>
          <Tab>
            {" "}
            <span className="tabs nav ul li">
              <a className="tabs nav li.tab-current a">Automobile Dealers</a>
            </span>
          </Tab>
          <Tab>
            <span className="tabs nav ul li">
              <a className="tabs a">PAN Card Requirements </a>
            </span>
          </Tab>
          <Tab>
            <span className="tabs nav ul li">
              <a className="tabs a">Coming soon</a>
            </span>
          </Tab>
          <Tab>
            <span className="tabs nav ul li">
              <a className="tabs a">Customize Requirements</a>
            </span>
          </Tab>
        </TabList>

        <TabPanel className="mediabox" style={{ display: "contents" }}>
          <section id="section-1">
            <div className="mediabox">
              <a href="#">
                <img
                  src="img/young-indian.jpg"
                  alt="img01"
                  onClick={(e) => handleDiagnosticLeads(e, "YoungIndian21_40")}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                  }}
                />{" "}
              </a>
              <h3>Young Indian Health Checkup</h3>
              <p>21-40 years Male & Female</p>
            </div>
            <div className="mediabox">
              <a href="#">
                <img
                  src="img/male cancer marker.jpg"
                  alt="img02"
                  onClick={(e) => handleDiagnosticLeads(e, "MensCancer21_80")}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                  }}
                />
              </a>
              <h3>Men's Cancer Marker Checkup</h3>
              <p>21-80 years Male</p>
            </div>
            <div className="mediabox">
              <a href="#">
                <img
                  src="img/wemen-cancer.jpg"
                  alt="img03"
                  onClick={(e) => handleDiagnosticLeads(e, "WomanCancer21_80")}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                  }}
                />
              </a>
              <h3>Women's Cancer Marker Checkup</h3>
              <p>21-80 years Female</p>
            </div>

            <div
              className="mediabox"
              style={{ marginLeft: "14px", float: "inherit" }}
            >
              <a href="#">
                <img
                  src="img/working woman hck.png"
                  alt="img01"
                  onClick={(e) => handleDiagnosticLeads(e, "WorkingWoman21_40")}
                  style={{
                    marginLeft: "-14px",
                    height: "216px",
                  }}
                />
              </a>
              <h3>Working Women Health Checkup</h3>
              <p>21-40 years Female</p>
            </div>
            <div
              className="mediabox"
              style={{
                marginTop: "-110px",
                float: "right",
                marginLeft: "-455px",
              }}
            >
              <a href="#">
                <img
                  src="img/senior citizen.jpg"
                  alt="img01"
                  onClick={(e) => handleDiagnosticLeads(e, "Senior60_100")}
                  style={{
                    width: "100%",
                    marginLeft: "-455px",
                    marginTop: "-191px",
                    height: "221px",
                  }}
                />
              </a>
              <h3 style={{ marginLeft: "-455px" }}>
                Senior Citizen Health Checkup
              </h3>
              <p style={{ marginLeft: "-455px" }}>
                60- 100 years Male & Female
              </p>
            </div>
          </section>
        </TabPanel>
        <TabPanel className="mediabox" style={{ display: "contents" }}>
          <br /> <br /> <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <label htmlFor="location" style={{ fontSize: "30px" }}>
              Enter Location : &nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="location"
              name="location"
              style={{ fontSize: "30px" }}
              onChange={(e) => {
                handleCarInputChange(e, e.target.value);
              }}
            />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="button"
              onClick={(e) => {
                handleCarSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </TabPanel>
        <TabPanel className="mediabox" style={{ display: "contents" }}>
          <br /> <br /> <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <button
              className="button"
              onClick={(e) => {
                handlePanSubmit(e);
              }}
            >
              Get Pan Data
            </button>
          </div>
        </TabPanel>
        <TabPanel className="mediabox" style={{ display: "contents" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <ul>
              <li>
                <h2>Finance</h2>
              </li>
              <li>
                <h2>Horticulture Industry</h2>
              </li>
              <li>
                <h2>Foreign Travel</h2>
              </li>
              <li>
                <h2>Educational Services</h2>
              </li>
              <li>
                <h2>Personalized Gift Industry </h2>
              </li>
            </ul>
          </div>
        </TabPanel>

        <TabPanel
          className="mediabox"
          style={{ display: "contents", align: "center" }}
        >
          <div style={{ align: "" }}>
            <CustomizeForm />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default CustomTabs;
