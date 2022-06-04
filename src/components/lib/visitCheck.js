import { getCat, getPref, info } from "./api";

const oneDay = 24 * 60 * 60 * 1000;

export const needGo = ()=>{
    return getCategoryData().then((categories)=>{
        return categories.find(cat=>cat["selected"]===true)!==undefined
    }).then((hasSelectedSomeCategory)=>{
        return check_need_show_category_page(hasSelectedSomeCategory)
    })
}

// user ---> stream page --> check_need_show_category_page() -> category page

const check_need_show_category_page = (hasSelectedSomeCategory) => {
  const lastime = localStorage.getItem("visitedTime");
  if (lastime === null) {
    //it is the first time to visit stream page
    localStorage.setItem("visitedTime", new Date().getTime());
    if (hasSelectedSomeCategory) {
      return false; // stay stream page
    } else {
      return true;  // go category page
    }
  } else {
    const nowDay = new Date().toLocaleDateString().split("/")[1];
    const recordDay = new Date(parseInt(lastime))
      .toLocaleDateString()
      .split("/")[1];
    if (recordDay === nowDay) { //it is not the first time to visit stream page in one day
        return false; // stay stream page
    } else {
      //it is the first time to visit stream page in one day
      localStorage.setItem("visitedTime", new Date().getTime()); // refresh the visit time with the current time
      if (hasSelectedSomeCategory) {
        return false; // stay stream page
      } else {
        return true;  // go category page
      }
    }
  }
};

export const getCategoryData = () => {
  const lastime = localStorage.getItem("CatData_time");
  if (lastime && (parseInt(lastime) - new Date().getTime() < oneDay)) {
    const data = localStorage.getItem("CatData");
    return Promise.resolve(JSON.parse(data));
  }else{
    return getCat().then((category) => {
      const allCategories = category.data;
      return getPref(info.username).then((preferences) => {
        const allPreferences = preferences.data;
        const result = allCategories.data.map((cat) => {
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
        return result;
      });
    })
    .then((categories) => {
      localStorage.setItem("CatData", JSON.stringify(categories));
      localStorage.setItem(
        "CatData_time",
        JSON.stringify(new Date().getTime())
      );
      return categories;
    });
  }
};


export const removeCategoryData = () =>{
    localStorage.removeItem("CatData_time");
}