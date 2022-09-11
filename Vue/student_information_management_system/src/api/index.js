import Axios from "axios";
import urls from "./urls";

const appkey = {
  appkey: "13926806277_1558879000128"
};
const api = Axios.create({
  baseURL: urls.baseURL,
  params: {
    ...appkey
  }
});
export default {
  findByPage(page, size) {
    return api.get(urls.findByPage, { params: { page, size } });
  },
  addStu(date) {
    return api.get(urls.addStu, { params: { ...date } });
  },
  updateStu(date) {
    return api.get(urls.updateStu, { params: { ...date } });
  },
  delBySno(sNo) {
    return api.get(urls.delBySno, {
      params: {
        sNo
      }
    });
  },
  searchStu({ page, size, search }) {
    return api.get(urls.searchStu, {
      params: {
        sex: -1,
        page,
        size,
        search
      }
    });
  }
};
