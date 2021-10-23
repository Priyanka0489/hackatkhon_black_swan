import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FacebookSharePost from "./FacebookSharePost";

const ResultPage = (props) => {
  const [myLeads, setMyLeads] = useState();
  const apiServer = `${process.env.REACT_APP_CONFIG_API_SERVER}`;
  const [loader, setLoader] = useState(true);
  useEffect(async () => {
    console.log("props: ", props);
    if (props?.location?.pathname.includes("/search_diagnostic")) {
      console.log("In If ", props?.location?.state);
      await fetchApiData(
        props?.location?.state.type,
        props?.location?.state.url
      );
    }
    if (props?.location?.pathname.includes("/result_car")) {
      console.log("In If ", props?.location?.state);
      await fetchApiData(
        props?.location?.state.type,
        props?.location?.state.url
      );
    }
    if (props?.location?.pathname.includes("/result_pan")) {
      console.log("In If ", props?.location?.state);
      await fetchApiData(
        props?.location?.state.type,
        props?.location?.state.url
      );
    }
  }, []);
  async function handleSuccess(response) {
    console.log("In handleSuccess..", response);

    if (response) {
      const result = await response.json();
      console.log("result ", result);
      setMyLeads(result);
    }
  }
  function handleError(response, searchText) {
    console.log("In error..", searchText);
    return null;
  }

  function handleNotFound(response, searchText) {
    console.log("Not Found ");
    return null;
  }

  const fetchApiData = async (reqJson, url) => {
    try {
      const response = await fetch(apiServer + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          text: reqJson,
        }),
      });

      console.log("Result status..", response.status);
      setLoader(false);
      switch (response.status) {
        case 200:
          return handleSuccess(response);
        case 500:
          return handleError(response);
        case 404:
          return handleNotFound(response);
        default:
          return handleError(response);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <>
      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div
              className="primary-btn text-center"
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "flex-end",
              }}
            >
              <button className="button">Download Excel</button> &nbsp;&nbsp;
              <FacebookSharePost />
            </div>
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <div className="table-responsive" style={{ display: "grid" }}>
                    <table className="table">
                      <tbody>
                        {loader ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "stretch",
                            }}
                          >
                            <div className="loader" />{" "}
                          </div>
                        ) : !myLeads ? (
                          <div
                            className="event-date"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <h3>Record Not Found</h3>
                          </div>
                        ) : (
                          myLeads?.map((data, index) => (
                            <tr className="inner-box" key={index}>
                              <th scope="row">
                                <div className="event-date">
                                  <input
                                    className="ms-3 me-3"
                                    type="checkbox"
                                    id="select"
                                    name="select"
                                  />
                                </div>
                              </th>
                              <td />
                              <td>
                                <div className="event-wrap">
                                  <h3>
                                    <a href="#">
                                      {data?.full_name || data?.PersonName}
                                    </a>
                                  </h3>
                                  <div className="meta">
                                    <div className="time">
                                      <span>
                                        <a>Age: </a>
                                        {data?.birth_year
                                          ? new Date().getFullYear() -
                                            data?.birth_year
                                          : "-"}
                                      </span>
                                    </div>
                                    <div className="time">
                                      <a>Gender: </a>
                                      <span>
                                        {data.gender ? data.gender : "-"}
                                      </span>
                                    </div>

                                    <div className="time">
                                      <a>Country: </a>
                                      <span>{data?.location_country}</span>
                                    </div>
                                    <div className="time">
                                      <a>Location: </a>

                                      <span>
                                        {data.location_name ||
                                          data?.Addresses ||
                                          "-"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="event-img">
                                  {data.mobile_phone ||
                                    data?.PhoneNumbers ||
                                    "-"}
                                </div>
                              </td>
                              <td>
                                <div className="r-no">
                                  {data?.facebook_url && (
                                    <a
                                      href={"https://" + data?.facebook_url}
                                      target={"_blank"}
                                      rel="noopener noreferrer external"
                                    >
                                      <img
                                        src="img/icon-fb.png"
                                        style={{
                                          maxWidth: "30px",
                                          maxHeight: "30px",
                                        }}
                                      />
                                    </a>
                                  )}

                                  {data?.linkedin_url && (
                                    <a
                                      href={"https://" + data?.linkedin_url}
                                      target={"_blank"}
                                      rel="noopener noreferrer external"
                                    >
                                      <img
                                        src="img/icon-linkedin-in.png"
                                        style={{
                                          maxWidth: "35px",
                                          maxHeight: "35px",
                                        }}
                                      />
                                    </a>
                                  )}
                                  {/*{data?.emails[0]}*/}
                                  {data?.emails &&
                                    data?.emails.map((email, index) =>
                                      index === 0 ? (
                                        <a
                                          href={email.address}
                                          target={"_blank"}
                                          rel="noopener noreferrer external"
                                        >
                                          <img
                                            src="img/icon-email.png"
                                            style={
                                              {
                                                maxWidth: "40px",
                                                maxHeight: "40px",
                                              } || data?.Email
                                            }
                                          />
                                        </a>
                                      ) : null
                                    )}
                                </div>
                              </td>
                              {/*<td>*/}
                              {/*  <div className="primary-btn">*/}
                              {/*    <a className="btn btn-primary" href="#">*/}
                              {/*      Read More*/}
                              {/*    </a>*/}
                              {/*  </div>*/}
                              {/*</td>*/}
                              <td />
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
