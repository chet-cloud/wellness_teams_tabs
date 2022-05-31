// Import Components and Plugins
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  // Spinner
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "./lib/Footer.js";

// Import scss
import "../scss/App.scss";

// Import images
import demoAva from "../img/wellness-logo.png";
import { addPref, getCat, getPref, info } from "./lib/api";
import Header from "./lib/Header";

function MainScreen(props) {
  const userId = info.username;
  const userName = userId.substring(0, userId.indexOf("@"));
  const avatar = demoAva;
  const [cats, setCats] = useState([]);

  const updateCat = (catId, userId, valueToSet) => {
    addPref(userId, catId, valueToSet).then(() => {
      setCats(
        cats.map((v) => {
          if (v.id === catId) {
            v["selected"] = valueToSet;
          }
          return v;
        })
      );
    });
  };

  const getCatData = () => {
    return getCat().then((category) => {
      const allCategories = category.data;
      return getPref(userId).then((preferences) => {
        const allPreferences = preferences.data;
        return allCategories.data.map((cat) => {
          if (
            allPreferences.data.find((pre) => {
              return (
                pre.attributes.category.data.id === cat.id &&
                pre.attributes.liked === true
              );
            }) != null
          ) {
            cat["selected"] = true;
          }
          return cat;
        });
      });
    });
  };

  useEffect(() => {
    getCatData().then((result) => {
      setCats(result);
    });
  }, [userId]);

  return (
    <div>
      <Container className="box mx-0 mx-md-auto">
        <Row>
          <Header userId={userId} userName={userName} avatar={avatar} />
          <Col className="col-12">
            <h4 className="mb-3">Categories</h4>
            <p>
              Pick a category of your interest and receive your daily video dose
              based off your choices. Watch your today video in the "Watch Today
              Video" tab and enjoy a wonderfull day.
            </p>
            <Row>
              {cats.map((cat) => {
                return (
                  <Col className="col-12" key={cat.id}>
                    <div className="cat-box">
                      <div
                        className="sticker-box"
                        style={{
                          backgroundColor: `${cat.attributes.background}`,
                        }}
                      >
                        <img
                          src={cat.attributes.icon.data.attributes.url}
                          alt="Category icon"
                        />
                      </div>
                      <h4>
                        {cat.attributes.name}
                        <br />
                        <p>{cat.attributes.des}</p>
                      </h4>
                      <div>
                        <div className="heart-container" key={"sup" + cat.id}>
                          <FontAwesomeIcon
                            icon={faHeart}
                            color={
                              cat["selected"] === true ? "#F06595" : "#B9C0CA"
                            }
                            size="2x"
                            onClick={() =>
                              updateCat(
                                cat.id,
                                userId,
                                !(cat["selected"] === true)
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MainScreen;
