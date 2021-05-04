const rootApiUrl = "https://api.spacexdata.com/v3";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  // order: asc / desc
  // sort: field name to sort
  async getLaunches(sort = "launch_date_local", order = "asc") {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${rootApiUrl}/launches?sort=${sort}&order=${order}`,
        requestOptions
      );
      return response.json();
    } catch (error) {
      console.log("error", error);
    }
  },
};
