import React from "react";

const CustomizeForm = () => {
  return (
    <>
      <div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          Customize Your Leads
        </h2>
        <form className="cbp-mc-form">
          <div className="cbp-mc-column" />
          <div className="cbp-mc-column">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Jonathan"
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Doe"
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="jon@doe.com"
            />
            <label htmlFor="country">Country</label>
            <select id="country" name="country">
              <option>Choose a country</option>
              <option>France</option>
              <option>Italy</option>
              <option>Portugal</option>
            </select>
            <label htmlFor="bio">Additional Requirement</label>
            <input
              type="text"
              id="additional"
              name="additional"
              // placeholder="jon@doe.com"
            />
            <button
              className="button"
              type="submit"
              value="Send your data"
              onClick={() => {
                alert(
                  " our team will process your request and will get back to you within 48 hours"
                );
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>{" "}
    </>
  );
};
export default CustomizeForm;
