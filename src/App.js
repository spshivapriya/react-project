import { Fragment, useState } from "react";
import "./App.css";
import axios from "axios";
import Button from "./components/Button";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const [error, setError] = useState(null);

  
  const onClickHandler = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.get("https://randomuser.me/api/");
      setUserData(response.data.results);
      setActiveUser(true);
    } catch (error) {
      setError("Error fetching users. Please try again later.");
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const icons = [
    // "fas fa-user fa-3x",
    "fas fa-envelope fa-3x",
    "fas fa-calendar-alt fa-3x",
    "fas fa-map-marker fa-3x",
    "fas fa-phone fa-3x",
    "fas fa-lock fa-3x",
  ];
  const PhraseGenerator = ({ user }) => {
    const phrases = [
      `My Email address is ${user.email}`,
      `I was born on ${user.dob.date.slice(0, 10)}`,
      `My Country is ${user.location.country}`,
      `My Phone number is ${user.phone}`,
      `My Password is ${user.login.password}`,
    ];
    return <h2>{phrases[activeLink]}</h2>;
  };
  const activeLinkHandler = (index) => {
    setActiveLink(index);
  };
  const style = {
    color: "green",
  };
 
  return (
    <div className="App">
      <h1>Random User Generator</h1>
      <Button isActive={activeUser} clicked={onClickHandler} />
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="app_user">
          {userData.map((user, index) => {
            return (
              <Fragment key={user.cell}>
                <img src={user.picture.large} alt="#" />
                <div>
                  <h1>
                    {user.name.title}. {user.name.first} {user.name.last}
                  </h1>                
                  <h1>
                    {user.gender}|{user.dob.age}
                  </h1>
                </div>
                <PhraseGenerator user={user} />
                <div className="app_icons">
                  {icons.map((icon, index) => {
                    return (
                      <i
                        className={icon}
                        key={index}
                        onMouseEnter={() => activeLinkHandler(index)}
                        style={activeLink === index ? style : null}
                      ></i>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
