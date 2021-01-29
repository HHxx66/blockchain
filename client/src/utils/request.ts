import axios from "axios";

// 读取环境配置获取接口地址
// axios.defaults.baseURL = "http://localhost:8888"; // 跨域时，使用代理

//post请求头
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;
//设置cookie
axios.defaults.withCredentials = true;
//补充请求
axios.interceptors.request.use(
    config => {
        // Add Authorization header to every request, you can add other custom headers here
        // 在此处添加请求头等，如添加 token
        // config.headers['Authorization'] = 'tokentokentokentokentokentokenhhh'
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//预处理结果
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误(400)'; break;
                case 401: error.message = '未授权,请登录(401)'; break;
                case 403: error.message = '拒绝访问(403)'; break;
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
                case 405: error.message = '请求方法未允许(405)'; break;
                case 408: error.message = '请求超时(408)'; break;
                case 500: error.message = '服务器内部错误(500)'; break;
                case 501: error.message = '服务未实现(501)'; break;
                case 502: error.message = '网络错误(502)'; break;
                case 503: error.message = '服务不可用(503)'; break;
                case 504: error.message = '网络超时(504)'; break;
                case 505: error.message = 'HTTP版本不受支持(505)'; break;
                default: error.message = `连接错误: ${error.message}`; 
            }
        } else {
            error.message = '连接到服务器失败，请联系管理员'
        }
        return Promise.reject(error)
    }
);

export function formateURLOnlyGet(link: string, json: object) {
  let url = link;
  var data = Object.entries(json);

  if (data.length) {
    url += url.indexOf("?") == -1 ? "?" : "";
    url += Object.entries(data)
      .map(item => {
        return item[1].join("=");
      })
      .join("&");
  }
  return url;
}

/**
 * GET请求方法
 * @param {String} url 请求地址
 * @param {json} json 请求参数
 */
export async function getData(url: string, json: object) {
  try {
    const res = await axios
      .get(formateURLOnlyGet(url, json));
    return res.data;
  } catch (error) {
    return error.response;
  }
}

export async function postData(url: string, json?: object) {
  try {
    const res = await axios
      .post(url, json);
    return res.data;
  } catch (error) {
    return error.response;
  }
}
export async function deleteData(url: string, json: object) {
  try {
    const res = await axios({
      url: formateURLOnlyGet(url, json),
      method: "delete"
      // data: json
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
}
export async function deleteJSON(url: string, json: object) {
  try {
    const res = await axios({
      url: url,
      method: "delete",
      data: json
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
}
export async function putData(url: string, json: object) {
  try {
    const res = await axios({
      url,
      method: "put",
      data: json
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
}

export async function downloadFile(url: string, json: object) {
  try {
    const res = await axios({
      url,
      method: "post",
      data: json,
      withCredentials: true,
      responseType: "blob"
    });
    return res;
  } catch (error) {
    return error.response;
  }
}
