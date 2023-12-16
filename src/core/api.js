import _ from "lodash";
import { conf } from "./conf";
import { localStorageService } from "../services";
import axios from "axios";
import { toast } from "react-toastify";

export class Api {
  constructor() {
    this.conf = conf;
  }

  async send(method, url, data, headers, options) {
    // set default options
    options = _.assign({ error: true, getAll: false, ajax: {} }, options || {});
    data = data || {};
    headers = headers ? headers : {};
    headers = _.assign({}, this.conf.defaultHeaders, headers);

    if (localStorageService.isAuthenticated()) {
      headers.Authorization =
        "Bearer " + localStorageService.getUser().token;
    }

    try {
      const res = await axios({
        url: this.url(url),
        method,
        headers,
        data,
        ...options.ajax,
      });

      return _.get(options, "getAll") ? res : res.data;
    } catch (err) {

      if (_.get(options, "error")) {
        this.handleErrors(err);
      }
      return err;
    }
  }

  url(url) {
    return this.conf.server + url;
  }

  async postFormData(url, formData, headers, options) {
    const combinedHeaders = _.assign({}, this.conf.defaultHeaders, headers);
    delete combinedHeaders["Content-Type"];

    try {
      const res = await axios({
        url: this.url(url),
        method: "post",
        headers: combinedHeaders,
        data: formData,
      });

      return _.get(options, "getAll") ? res : res.data;
    } catch (err) {
      if (_.get(options, "error")) {
        this.handleErrors(err);
      }
      return err;
    }
  }

  async get(url, query, headers, options) {
    return await this.send("get", url, query, headers, options);
  }

  async post(url, data, headers, options) {
    var res = await this.send("post", url, data, headers, options);
    return res;
  }

  async put(url, data, headers, options) {
    return await this.send("put", url, data, headers, options);
  }

  async patch(url, data, headers, options) {
    return await this.send("patch", url, data, headers, options);
  }

  async delete(url, headers, options) {
    return await this.send("delete", url, {}, headers, options);
  }

  // Implement upload() and download() as needed

  // default error handler
  handleErrors(err) {
    console.log(err)
    const isDevelopment = process.env.NODE_ENV === "development";

    if (err.response.status !== 401) {
      if (isDevelopment) {
        const detailedMsg = `
                URL: ${err.config.url}
                Message: ${_.get(err, "response.message") || "Server error"}
                Status: ${err.response.status}
            `;

        console.log(detailedMsg);
        toast.error(detailedMsg);
      } else {
        console.log(_.get(err, "response.message") || "Server error");
      }
    } else {
      console.log("Your session has expired");
      toast.warning("Your session has expired");
    }
  }
}

export default new Api();
