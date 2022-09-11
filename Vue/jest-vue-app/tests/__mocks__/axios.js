export default {
  get: url => {
    switch (url) {
      case "/name":
        return Promise.resolve({
          status: 200,
          data: {
            name: "cxj"
          }
        });
      case "/age":
        return Promise.resolve({
          status: 200,
          data: {
            age: 18
          }
        });
    }
  }
};
