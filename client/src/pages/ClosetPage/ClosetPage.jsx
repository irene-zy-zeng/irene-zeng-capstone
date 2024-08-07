import Button from "../../components/Button/Button";
import AddIcon from "../../assets/icons/add.svg";
import SortIcon from "../../assets/icons/sort.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ClosetPage.scss";

const apiURL = import.meta.env.VITE_API_URL;

const ClosetPage = () => {
  const [itemsData, setItemsData] = useState([]);
  const navigate = useNavigate();

  const getAllItems = async () => {
    try {
      const res = await axios.get(`${apiURL}/item`);
      const itemsData = res.data;
      setItemsData(itemsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  //Function to group items -> give you an array of catogories including an array of items
  const groupedItems = Object.groupBy(itemsData,({category})=> category);

  return (
    <>
      <div className="button-container">
        <Button buttonVariant="primary" buttonLabel="Add New Item" buttonIcon={AddIcon} onClickAction={() => navigate("/upload")}/>
        <Button buttonVariant="secondary" buttonLabel="Sort By ..." buttonIcon={SortIcon} />
      </div>
    <section className="all-items">
      {itemsData == null ? (
        <p>Loading...</p>
        ) : (
          Object.keys(groupedItems).map((category)=>(
            <div key={category} className="catogory-group">
              <div className="catogory-group__title">
                <h2 className="sub-header">{category}</h2>
              </div>
              <div className="catogory-group__content">
                {groupedItems[category].map((item) => (
                  <Link to={`/closet/${item.id}`} key={item.id} className="catogory-group__image-card">
                    <img src={item.image} alt={item.name} className="catogory-group__image"/>
                  </Link>
                ))}
              </div>
            </div>
          ))
      )}
    </section>
    </>
  );
  };

  export default ClosetPage;
