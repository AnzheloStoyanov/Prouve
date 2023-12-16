import styles from './FilterOverlay.module.css';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import { allergensService, categoriesService } from '../../services';

const FilterOverlay = ({ filters, onFilterUpdate }) => {
  const [submenuOpenState, setSubmenuOpenState] = useState([true, true]);

  const toggleMenu = (index) => {
    setSubmenuOpenState(prevState => {
      const updatedSubmenuOpenState = [...prevState];
      updatedSubmenuOpenState[index] = !updatedSubmenuOpenState[index];
      return updatedSubmenuOpenState;
    });
  }

  const [checkboxes, setCheckboxes] = useState({});

  const exportFilterData = (checkboxes) => {
    const filters = {
      special: checkboxes["static"]["special"].state,
      categories: Object.entries(checkboxes["categories"]).filter(x => x[1].state === true).map(x => x[0]),
      alergens: Object.entries(checkboxes["alergens"]).filter(x => x[1].state === true).map(x => x[0])
    }
    return filters;
  }

  const handleCheckboxChange = (category, checkboxName) => {
    const newCheckboxes = {
      ...checkboxes,
      [category]: {
        ...checkboxes[category],
        [checkboxName]: {
          ...checkboxes[category][checkboxName],
          state: !checkboxes[category][checkboxName].state
        }
      }
    };

    if (category === "static" && checkboxName === "all") {
      Object.keys(checkboxes["categories"]).forEach(category => newCheckboxes["categories"][category].state = false);
    } else if (category === "categories") {
      newCheckboxes["static"]["all"].state = false;
    }

    setCheckboxes(newCheckboxes);

    onFilterUpdate(exportFilterData(newCheckboxes));
  };

  const checkBoxTemplate = (category, checkboxName) => {
    if (!checkboxes[category] || !checkboxes[category][checkboxName]) {
      return;
    }

    return (
      <div key={checkboxName}>
        <Checkbox
          checked={checkboxes[category][checkboxName].state}
          onChange={() => handleCheckboxChange(category, checkboxName)}
          color="primary"
          inputProps={{ 'aria-label': checkboxes[category][checkboxName].text }}
        />
        <label>{checkboxes[category][checkboxName].text}</label>
      </div>
    )
  };

  const transformApiDataToCheckboxData = (category, input) => {
    const transformedData = {};
    input.forEach(item => {
      let state = false;
      if (category === "categories") {
        state = filters["categories"].includes(`${item.id}`);
      } else if (category === "alergens") {
        state = filters["alergens"].includes(`${item.id}`);
      } else if (category === "static") {
        if (item.id === "all") {
          state = filters["categories"].length === 0;
        } else {
          state = !!filters[item.id];
        }
      }

      transformedData[item.id] = {
        state: state,
        text: item.name
      };
    });

    return transformedData;
  }

  const loadStaticData = () => {
    const data = [
      {
        id: "special",
        name: "СПЕЦИАЛНИ ОФЕРТИ"
      },
      {
        id: "all",
        name: "Всички продукти",
      }
    ]

    return transformApiDataToCheckboxData("static", data);
  };

  const loadCategories = async () => {
    const categories = await categoriesService.getAllCategories();

    return transformApiDataToCheckboxData("categories", categories);
  };

  const loadAlergens = async () => {
    const alergens = await allergensService.getAllAllergens();

    return transformApiDataToCheckboxData("alergens", alergens);
  };

  const loadCheckboxes = async () => {
    const data = {
      static: loadStaticData(),
      categories: await loadCategories(),
      alergens: await loadAlergens(),
    };

    setCheckboxes(data);
  };

  useEffect(() => {
    loadCheckboxes();
  }, [filters]);

  return (
    <div className={styles.navStyle}>
      <ul>
        <li>{checkBoxTemplate("static", "special")}</li>
        <li className={`${styles.submenu} ${submenuOpenState[0] ? styles.submenuOpen : styles.submenuClosed}`}>
          <a onClick={() => toggleMenu(0)}>Продукти</a>
          <ul>
            <li>{checkBoxTemplate("static", "all")}</li>
            {checkboxes["categories"] && Object.keys(checkboxes["categories"]).map(category => {
              return <li key={category}>{checkBoxTemplate("categories", category)}</li>
            })}
          </ul>
        </li>
        <li className={`${styles.submenu} ${submenuOpenState[1] ? styles.submenuOpen : styles.submenuClosed}`}>
          <a onClick={() => toggleMenu(1)}>Продукти без</a>
          <ul>
            {checkboxes["alergens"] && Object.keys(checkboxes["alergens"]).map(alergen => {
              return <li key={alergen}>{checkBoxTemplate("alergens", alergen)}</li>
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default FilterOverlay;