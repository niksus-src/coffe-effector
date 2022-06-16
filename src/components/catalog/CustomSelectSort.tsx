import { useState } from "react";
import { serviceCatalog } from "../../services/catalog/catalogService";
import styles from "./customSelectsSort.module.scss";

const selectOptions = [
  { title: "По убыванию цены", value: "descPrice" },
  { title: "По возрастанию цены", value: "ascPrice" },
  { title: "По рейтингу", value: "rate" },
  { title: "По кислотности", value: "acidity" },
];

const CustomSelectSort = () => {

  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>(selectOptions[0].title);

  const classWrapper = `${styles.selectorWrapper} ${
    visible && styles.wrapper_active
  }`;
  const classOptions = `${styles.options} ${visible && styles.option_active}`;

  return (
    <div className={classWrapper}>
      <div onClick={() => setVisible(!visible)} className={styles.selector}>
        {current}
      </div>
      <div className={classOptions}>
        {visible &&
          selectOptions.map((item, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => {
                setCurrent(item.title);
                setVisible(false);
                serviceCatalog.setSort(item.value);
              }}
            >
              {item.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomSelectSort;
