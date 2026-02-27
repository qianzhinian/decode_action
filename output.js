//Fri Feb 27 2026 02:54:51 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const axios = require("axios");
const querystring = require("querystring");
const crypto = require("crypto");
const {
  SocksProxyAgent
} = require("socks-proxy-agent");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "114.114.114.114", "223.5.5.5"]);
const KS_SIGN_API_ENV = process.env.kssign_api || "http://160.202.238.161:5201/proxy/kuaishou";
const KS_NEBULA_SIGN_API_ENV = process.env.nebulasign_api || "http://160.202.238.161:5201/proxy/nebula";
const SIGN_API_URLS = KS_SIGN_API_ENV.split(",").map(_0x14c532 => _0x14c532.trim()).filter(_0x11d599 => _0x11d599 && _0x11d599.startsWith("http"));
const NEBULA_SIGN_API_URLS = KS_NEBULA_SIGN_API_ENV.split(",").map(_0x1277db => _0x1277db.trim()).filter(_0x276de9 => _0x276de9 && _0x276de9.startsWith("http"));
const ideal_0x24fba5 = {
  name: "KS",
  accountInfoUrl: "https://encourage.kuaishou.com/rest/wd/encourage/account/basicInfo",
  host: "encourage.kuaishou.com",
  appId: "kuaishou",
  packageName: "com.smile.gifmaker",
  appName: "快手",
  displayName: "快手",
  kpn: "KUAISHOU",
  adClientKey: "3c2cd3f3",
  reportClientKey: "3c2cd3f3"
};
const ideal_0x234573 = {
  name: "JSB",
  accountInfoUrl: "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo",
  host: "nebula.kuaishou.com",
  appId: "kuaishou_nebula",
  packageName: "com.kuaishou.nebula",
  appName: "快手极速版",
  displayName: "快手极速版",
  kpn: "NEBULA",
  adClientKey: "2ac2a76d",
  reportClientKey: "2ac2a76d"
};
const ideal_0x2bf5fa = {
  KUAISHOU: ideal_0x24fba5,
  NEBULA: ideal_0x234573
};
const ideal_0x35c78b = {
  name: "宝箱广告",
  businessId: 604,
  posId: 20345,
  subPageId: 100024063,
  requestSceneType: 1,
  taskType: 1,
  pageId: 100011251
};
const ideal_0x3e262c = {
  name: "看广告得金币",
  businessId: 671,
  posId: 24068,
  subPageId: 100026368,
  requestSceneType: 1,
  taskType: 1,
  pageId: 100011251
};
const ideal_0xc50c0d = {
  name: "饭补广告",
  businessId: 921,
  posId: 29742,
  subPageId: 100029908,
  requestSceneType: 7,
  taskType: 2,
  pageId: 100011251
};
const ideal_0x4322c8 = {
  name: "搜索广告",
  businessId: 7077,
  posId: 216267,
  subPageId: 100161535,
  pageId: 10014,
  requestSceneType: 1,
  taskType: 2,
  linkUrl: "eyJwYWdlSWQiOjEwMDE0LCJzdWJQYWdlSWQiOjEwMDE2MTUzNSwicG9zSWQiOjIxNjI2NywiYnVzaW5lc3NJZCI6NzA3NywiZXh0UGFyYW1zIjoiYzc4OWI1ZTAzMjMxOTUwZjcyM2ZjMWE1ZGJjYzgwNmYzMDE1OTcyZWE0Mzc2NmNlNDYwNTk2ZDgzMGVjNTE5MDM0OGEwNTlkOTA2NWYwZGY1ZjkwY2YwMjEwMGVhMmQzYzU0YjUyZDBlNGUxY2Q0NmMxN2ExZDU3YmRhY2EyMzVlM2U1NjYzN2JmZGQzMThiZWMzNTgzOWU1YzIxNWUyNzMzY2IyMzQ2ZGQ1NDYyODc1NDdlMjc4OWYxMjZjZWU5NWZhYzg4N2IxMzM2MzBlZTEzYTVmYTlhODYzNDYxODQ5MjM0NDk3ZGY3ZTRmOWYyYzk2ZjQ5YzViMGExNzQ2NGE2MGM0MDg1MzU2NTY2ZDc4NGIxYjY3NzY3MzYzYjg3IiwiY3VzdG9tRGF0YSI6eyJleGl0SW5mbyI6eyJ0b2FzdERlc2MiOm51bGwsInRvYXN0SW1nVXJsIjpudWxsfX0sInBlbmRhbnRUeXBlIjoxLCJkaXNwbGF5VHlwZSI6Miwic2luZ2xlUGFnZUlkIjowLCJzaW5nbGVTdWJQYWdlSWQiOjAsImNoYW5uZWwiOjAsImNvdW50ZG93blJlcG9ydCI6ZmFsc2UsInRoZW1lVHlwZSI6MCwibWl4ZWRBZCI6dHJ1ZSwiZnVsbE1peGVkIjp0cnVlLCJhdXRvUmVwb3J0Ijp0cnVlLCJmcm9tVGFza0NlbnRlciI6dHJ1ZSwic2VhcmNoSW5zcGlyZVNjaGVtZUluZm8iOm51bGwsImFtb3VudCI6MH0="
};
const ideal_0x41af93 = {
  box: ideal_0x35c78b,
  look: ideal_0x3e262c,
  food: ideal_0xc50c0d,
  search: ideal_0x4322c8
};
const ideal_0x51f68c = {
  name: "宝箱广告",
  pageId: 11101,
  subPageId: 100024064,
  businessId: 606,
  posId: 20346,
  requestSceneType: 1,
  taskType: 1
};
const ideal_0x4299f0 = {
  name: "看广告得金币",
  pageId: 11101,
  subPageId: 100026367,
  businessId: 672,
  posId: 24067,
  requestSceneType: 1,
  taskType: 1
};
const ideal_0x4b6e56 = {
  name: "饭补广告",
  pageId: 11101,
  subPageId: 100026367,
  businessId: 9362,
  posId: 24067,
  requestSceneType: 7,
  taskType: 2
};
const ideal_0x3a06ef = {
  name: "搜索广告",
  pageId: 11014,
  subPageId: 100161537,
  businessId: 7076,
  posId: 216268,
  requestSceneType: 1,
  taskType: 1,
  linkUrl: "eyJwYWdlSWQiOjExMDE0LCJzdWJQYWdlSWQiOjEwMDE2MTUzNywicG9zSWQiOjIxNjI2OCwiYnVzaW5lc3NJZCI6NzA3NiwiZXh0UGFyYW1zIjoiYjc4OWI1ZTAzMjMxOTUwZjcyM2ZjMWE1ZGJjYzgwNmYzMDE1OTcyZWE0Mzc2NmNlNDYwNTk2ZDgzMGVjNTE5MDM0OGEwNTlkOTA2NWYwZGY1ZjkwY2YwMjEwMGVhMmQzYzU0YjUyZDBlNGUxY2Q0NmMxN2ExZDU3YmRhY2EyMzVlM2U1NjYzN2JmZGQzMThiZWMzNTgzOWU1YzIxNWUyNzMzY2IyMzQ2ZGQ1NDYyODc1NDdlMjc4OWYxMjZjZWU5NWZhYzg4N2IxMzM2MzBlZTEzYTVmYTlhODYzNDYxODQ5MjM0NDk3ZGY3ZTRmOWYyYzk2ZjQ5YzViMGExNzQ2NGE2MGM0MDg1MzU2NTY2ZDc4NGIxYjY3NzY3MzYzYjg3IiwiY3VzdG9tRGF0YSI6eyJleGl0SW5mbyI6eyJ0b2FzdERlc2MiOm51bGwsInRvYXN0SW1nVXJsIjpudWxsfX0sInBlbmRhbnRUeXBlIjoxLCJkaXNwbGF5VHlwZSI6Miwic2luZ2xlUGFnZklkIjowLCJzaW5nbGVTdWJQYWdlSWQiOjAsImNoYW5uZWwiOjAsImNvdW50ZG93blJlcG9ydCI6ZmFsc2UsInRoZW1lVHlwZSI6MCwibWl4ZWRBZCI6dHJ1ZSwiZnVsbE1peGVkIjp0cnVlLCJhdXRvUmVwb3J0Ijp0cnVlLCJmcm9tVGFza0NlbnRlciI6dHJ1ZSwic2VhcmNoSW5zcGlyZVNjaGVtZUluZm8iOm51bGwsImFtb3VudCI6MH0="
};
const ideal_0x14eed1 = {
  name: "搜索关注广告",
  pageId: 11014,
  subPageId: 100161537,
  businessId: 7076,
  posId: 11014,
  requestSceneType: 7,
  taskType: 2
};
const ideal_0x29a171 = {
  name: "关注广告",
  pageId: 11101,
  subPageId: 100026367,
  businessId: 672,
  posId: 24067,
  requestSceneType: 2,
  taskType: 1
};
const ideal_0xe380 = {
  name: "内容广告",
  pageId: 11101,
  subPageId: 100141480,
  businessId: 7054,
  posId: 186550,
  requestSceneType: 1,
  taskType: 1
};
const ideal_0x19b1a7 = {
  box: ideal_0x51f68c,
  look: ideal_0x4299f0,
  food: ideal_0x4b6e56,
  search: ideal_0x3a06ef,
  search_follow: ideal_0x14eed1,
  follow: ideal_0x29a171,
  content: ideal_0xe380
};
const ideal_0x2524c7 = {
  KUAISHOU: ideal_0x41af93,
  NEBULA: ideal_0x19b1a7
};
const ENV_CONFIG = {
  AUTH_KEY: process.env.KS_AUTH_KEY || process.env.ks_auth || "",
  SEARCH_KEYWORDS: process.env.KS_SEARCH_KEYWORDS?.["split"](",") || ["短剧小说", "热门视频", "美食教程"],
  DEFAULT_TASKS: process.env.KS_DEFAULT_TASKS?.["split"](",") || ["box", "look", "food", "search"],
  CYCLE_ROUNDS: parseInt(process.env.KS_CYCLE_ROUNDS || 0),
  WATCH_MIN: parseInt(process.env.KS_WATCH_MIN || 30),
  WATCH_MAX: parseInt(process.env.KS_WATCH_MAX || 40),
  AD_FAIL_LIMIT: parseInt(process.env.KS_AD_FAIL_LIMIT || 10),
  STOP_THRESHOLD: parseInt(process.env.KS_STOP_THRESHOLD || 5),
  LOW_REWARD_THRESHOLD: parseInt(process.env.KS_LOW_REWARD_THRESHOLD || 10),
  LOW_REWARD_LIMIT: parseInt(process.env.KS_LOW_REWARD_LIMIT || 3),
  APPEND_REST_INTERVAL: parseInt(process.env.KS_APPEND_INTERVAL || 5),
  APPEND_REST_MIN: parseInt(process.env.KS_APPEND_MIN || 5000),
  APPEND_REST_MAX: parseInt(process.env.KS_APPEND_MAX || 10000),
  PLATFORM_CONFIG: ideal_0x2bf5fa,
  TASK_CONFIGS: ideal_0x2524c7,
  SIGN_API_URLS: SIGN_API_URLS,
  NEBULA_SIGN_API_URLS: NEBULA_SIGN_API_URLS,
  TIMESTAMP_API_URL: "http://vv.video.qq.com/checktime?otype=json",
  MAX_UNAUTHORIZED_RETRY: 2,
  LOG_TARGET: process.env.KS_LOG_TARGET || "USER",
  LOG_LEVEL: process.env.KS_LOG_LEVEL || "normal",
  CONTINUOUS_1COIN_LIMIT: parseInt(process.env.KS_CONTINUOUS_1COIN_LIMIT || 3)
};
let unauthorizedErrorCount = 0;
let localPublicIP = null;
function getCurrentTime() {
  const _0x3af31e = new Date();
  return _0x3af31e.toLocaleTimeString("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function getProxyTag(_0x2bbdc2) {
  return _0x2bbdc2 ? "[代理]" : "[直连]";
}
function getMaskedProxyUrl(_0x4e9642) {
  if (!_0x4e9642) {
    return null;
  }
  try {
    {
      const _0x514200 = _0x4e9642.match(/^(socks5:\/\/)([^:@]+)(?::([^@]+))?@(.+)$/);
      if (_0x514200) {
        {
          const [, _0xdffedc, _0x542e08, _0x570935, _0x31e78e] = _0x514200;
          if (_0x542e08) {
            {
              return "" + _0xdffedc + _0x542e08 + ":***@" + _0x31e78e;
            }
          }
        }
      }
    }
  } catch (_0x214eff) {}
  return _0x4e9642;
}
function logSimple(_0x4c9c8d, _0x1e60c8, _0x55349f) {
  const _0x5d3ea3 = getCurrentTime();
  const _0x160617 = getProxyTag(_0x4c9c8d);
  const _0xc0ea6e = _0x1e60c8 === "快手极速版" ? "快手极速版" : "快手";
  console.log(_0x160617 + "<" + _0xc0ea6e + ">(" + _0x5d3ea3 + "): " + _0x55349f);
}
function logGlobal(_0x1ebffb) {
  console.log(_0x1ebffb);
}
function logError(_0x4bda13, _0x52bb84, _0x2d70e1, _0x13c1c7, _0x260dd2 = "") {
  const _0x4fcb9c = getCurrentTime();
  const _0x3bbdc8 = getProxyTag(_0x4bda13);
  const _0xb4503a = _0x52bb84 === "快手极速版" ? "快手极速版" : "快手";
  console.log(_0x3bbdc8 + "<" + _0xb4503a + ">(" + _0x4fcb9c + "): ❌ " + _0x2d70e1);
  if (ENV_CONFIG.LOG_TARGET === "DEV") {
    {
      console.log("   错误详情: " + (_0x260dd2 || "未知上下文"));
      console.log("   错误信息: " + (_0x13c1c7.message || "无"));
    }
  }
}
async function getPublicIP() {
  logGlobal("正在检测本地直连公网IP...");
  const _0x439780 = ["http://icanhazip.com", "http://ipinfo.io/ip", "http://httpbin.org/ip"];
  for (const _0x1a25bc of _0x439780) {
    {
      try {
        {
          const _0xc212ec = {
            timeout: 5000,
            responseType: "text",
            proxy: false
          };
          const _0x2e1583 = await axios.get(_0x1a25bc, _0xc212ec);
          const _0x38a6ba = _0x2e1583.data.trim().match(/\d+\.\d+\.\d+\.\d+/)[0];
          if (_0x38a6ba) {
            localPublicIP = _0x38a6ba;
            logGlobal("本地直连公网IP检测成功: " + _0x38a6ba);
            return _0x38a6ba;
          }
        }
      } catch (_0x1117b4) {
        {
          continue;
        }
      }
    }
  }
  logGlobal("本地直连公网IP检测失败，网络异常");
  process.exit(1);
}
async function getProxyExitIP(_0x1871fd) {
  const _0x3517ae = ["http://icanhazip.com", "http://ipinfo.io/ip", "http://httpbin.org/ip"];
  for (const _0x3a254f of _0x3517ae) {
    {
      try {
        {
          const {
            body: _0x17f803
          } = await request({
            method: "GET",
            url: _0x3a254f,
            timeout: 8000
          }, _0x1871fd, "代理IP检测");
          if (!_0x17f803) {
            continue;
          }
          const _0x3ada07 = _0x17f803.toString().trim().match(/\d+\.\d+\.\d+\.\d+/);
          if (_0x3ada07 && _0x3ada07[0]) {
            {
              const _0xdff5d0 = _0x3ada07[0];
              return _0xdff5d0;
            }
          }
        }
      } catch (_0x4deb70) {
        {
          continue;
        }
      }
    }
  }
  return null;
}
function cleanHeaderValue(_0xeb43c1) {
  if (typeof _0xeb43c1 !== "string") {
    {
      _0xeb43c1 = String(_0xeb43c1 || "");
    }
  }
  const _0xd33391 = _0xeb43c1.replace(/[\x00-\x1F\x7F\u2000-\u200F\u3000]/g, "").trim();
  return _0xd33391.replace(/[^\x20-\x7E]/g, "");
}
async function request(_0x5674ee, _0x1ae7b2 = null, _0x47d089 = "请求") {
  try {
    {
      const _0xb2a81c = {
        method: _0x5674ee.method || "GET",
        url: _0x5674ee.url,
        headers: _0x5674ee.headers || {},
        data: _0x5674ee.body || _0x5674ee.form,
        timeout: _0x5674ee.timeout || 12000,
        validateStatus: () => true
      };
      if (_0x1ae7b2) {
        {
          const _0x3c5fd2 = {
            timeout: 10000,
            keepAlive: false
          };
          const _0x4d9076 = new SocksProxyAgent(_0x1ae7b2, _0x3c5fd2);
          _0xb2a81c.httpAgent = _0x4d9076;
          _0xb2a81c.httpsAgent = _0x4d9076;
        }
      } else {
        {
          _0xb2a81c.proxy = false;
        }
      }
      _0x5674ee.form && _0x5674ee.method === "POST" && !_0xb2a81c.headers["Content-Type"] && (_0xb2a81c.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8", _0xb2a81c.data = querystring.stringify(_0x5674ee.form));
      const _0x722274 = await axios(_0xb2a81c);
      const _0x4daef9 = {
        body: _0x722274.data,
        status: _0x722274.status
      };
      return _0x4daef9;
    }
  } catch (_0x2bb5d2) {
    {
      logError(null, "SYSTEM", _0x47d089 + " 执行失败: " + _0x2bb5d2.message, _0x2bb5d2, _0x47d089);
      const _0x354ca4 = {
        body: null,
        status: 0
      };
      return _0x354ca4;
    }
  }
}
async function getTencentTimestamp() {
  try {
    {
      const _0x304a7b = {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      };
      const _0x5974e7 = {
        headers: _0x304a7b,
        timeout: 10000,
        proxy: false
      };
      const _0x48d635 = await axios.get(ENV_CONFIG.TIMESTAMP_API_URL, _0x5974e7);
      if (_0x48d635.data) {
        {
          const _0x2fc176 = _0x48d635.data;
          const _0x2f086d = _0x2fc176.match(/QZOutputJson=({.*?});/);
          if (_0x2f086d && _0x2f086d[1]) {
            {
              const _0x507034 = JSON.parse(_0x2f086d[1]);
              if (_0x507034 && _0x507034.t) {
                {
                  return parseInt(_0x507034.t);
                }
              }
            }
          }
        }
      }
    }
  } catch (_0x1d0b63) {
    {
      logError(null, "SYSTEM", "获取腾讯时间戳失败: " + _0x1d0b63.message, _0x1d0b63, "时间戳获取");
    }
  }
  return Math.floor(Date.now() / 1000);
}
async function generateDynamicApiKey() {
  const _0x539220 = await getTencentTimestamp();
  const _0x3627b8 = _0x539220 + "12345";
  return {
    key: crypto.createHash("md5").update(_0x3627b8).digest("hex"),
    timestamp: _0x539220
  };
}
function buildUrlWithAuth(_0x3f84db, _0x2711a2) {
  let _0x51ffd3 = _0x3f84db.endsWith("/") ? _0x3f84db + _0x2711a2 : _0x3f84db + "/" + _0x2711a2;
  if (ENV_CONFIG.AUTH_KEY) {
    {
      const _0x614d73 = _0x51ffd3.includes("?") ? "&" : "?";
      _0x51ffd3 = "" + _0x51ffd3 + _0x614d73 + "auth=" + ENV_CONFIG.AUTH_KEY;
    }
  }
  return _0x51ffd3;
}
async function getSign(_0x4c5078, _0x1ebcbf, _0x5917c2, _0x3d8e2d = "未知账号", _0x1bf3da = ENV_CONFIG.SIGN_API_URLS) {
  let _0x1eabc1 = null;
  for (let _0x3fa074 = 0; _0x3fa074 < _0x1bf3da.length; _0x3fa074++) {
    {
      const _0x334a11 = _0x1bf3da[_0x3fa074];
      try {
        {
          const _0x2f622c = await generateDynamicApiKey();
          const _0x5a2575 = buildUrlWithAuth(_0x334a11, "encsign");
          const _0x1fe268 = {
            data: _0x4c5078,
            timestamp: _0x2f622c.timestamp
          };
          const {
            body: _0x37cb49
          } = await request({
            method: "POST",
            url: _0x5a2575,
            body: JSON.stringify(_0x1fe268),
            headers: {
              "Content-Type": "application/json",
              Authorization: _0x2f622c.key,
              "User-Agent": "Mozilla/5.0"
            },
            timeout: 15000
          }, null, "获取签名(接口" + (_0x3fa074 + 1) + ")");
          if (_0x37cb49 && _0x37cb49.status) {
            logSimple(_0x1ebcbf, _0x5917c2, _0x3d8e2d + " 使用签名接口" + (_0x3fa074 + 1) + "成功");
            return _0x37cb49.data;
          } else {
            {
              const _0x152221 = _0x37cb49?.["error"] || "未知错误";
              logSimple(_0x1ebcbf, _0x5917c2, "❌ " + _0x3d8e2d + " 签名接口" + (_0x3fa074 + 1) + "失败: " + _0x152221);
              _0x1eabc1 = _0x152221;
              if (_0x152221.includes("未授权") || _0x152221.includes("认证") || _0x152221.includes("auth")) {
                {
                  unauthorizedErrorCount++;
                  logSimple(_0x1ebcbf, _0x5917c2, "🚨 认证错误计数: " + unauthorizedErrorCount + "/" + ENV_CONFIG.MAX_UNAUTHORIZED_RETRY);
                  if (unauthorizedErrorCount >= ENV_CONFIG.MAX_UNAUTHORIZED_RETRY) {
                    {
                      logSimple(_0x1ebcbf, _0x5917c2, "❌ 认证错误达到上限，请检查AUTH_KEY配置");
                      process.exit(1);
                    }
                  }
                }
              }
              continue;
            }
          }
        }
      } catch (_0x3a4ec8) {
        {
          logSimple(_0x1ebcbf, _0x5917c2, "❌ " + _0x3d8e2d + " 签名接口" + (_0x3fa074 + 1) + "异常: " + _0x3a4ec8.message);
          _0x1eabc1 = _0x3a4ec8.message;
          continue;
        }
      }
    }
  }
  logSimple(_0x1ebcbf, _0x5917c2, "❌ " + _0x3d8e2d + " 所有签名接口尝试失败");
  return null;
}
async function requestSignService(_0x476545, _0x543683, _0x448bfa, _0x2e499b, _0x394308 = "未知账号", _0x5de3bc = ENV_CONFIG.SIGN_API_URLS) {
  let _0x5492aa = {};
  let _0x21e81f = null;
  const _0x570709 = {
    path: _0x476545.urlpath,
    data: _0x476545.reqdata,
    salt: _0x476545.salt
  };
  const _0xae3f8e = await generateDynamicApiKey();
  for (let _0x4ad766 = 0; _0x4ad766 < _0x5de3bc.length; _0x4ad766++) {
    {
      const _0x52e789 = _0x5de3bc[_0x4ad766];
      try {
        {
          const _0x4a3e6a = buildUrlWithAuth(_0x52e789, "nssig");
          const {
            body: _0x192bd2
          } = await request({
            method: "POST",
            url: _0x4a3e6a,
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mozilla/5.0",
              Authorization: _0xae3f8e.key
            },
            body: JSON.stringify({
              ..._0x570709,
              timestamp: _0xae3f8e.timestamp
            }),
            timeout: 15000
          }, null, _0x2e499b + "(接口" + (_0x4ad766 + 1) + ")");
          if (_0x192bd2 && _0x192bd2.status) {
            {
              const _0xdd09f = {
                sig: _0x192bd2.data.sig,
                __NStokensig: _0x192bd2.data.nstokensig,
                __NS_sig3: _0x192bd2.data.nssig3,
                __NS_xfalcon: _0x192bd2.data.xfalcon || ""
              };
              _0x5492aa = _0xdd09f;
              return _0x5492aa;
            }
          } else {
            {
              const _0x3aa804 = _0x192bd2?.["error"] || "未知错误";
              logSimple(_0x543683, _0x448bfa, "❌ " + _0x2e499b + " 签名接口" + (_0x4ad766 + 1) + "失败: " + _0x3aa804);
              _0x21e81f = _0x3aa804;
              (_0x3aa804.includes("未授权") || _0x3aa804.includes("认证") || _0x3aa804.includes("auth")) && (unauthorizedErrorCount++, logSimple(_0x543683, _0x448bfa, "🚨 认证错误计数: " + unauthorizedErrorCount + "/" + ENV_CONFIG.MAX_UNAUTHORIZED_RETRY), unauthorizedErrorCount >= ENV_CONFIG.MAX_UNAUTHORIZED_RETRY && (logSimple(_0x543683, _0x448bfa, "❌ 认证错误达到上限，请检查AUTH_KEY配置"), process.exit(1)));
              continue;
            }
          }
        }
      } catch (_0x4fdfd4) {
        {
          logSimple(_0x543683, _0x448bfa, "❌ " + _0x2e499b + " 签名接口" + (_0x4ad766 + 1) + "异常: " + _0x4fdfd4.message);
          _0x21e81f = _0x4fdfd4.message;
          continue;
        }
      }
    }
  }
  logSimple(_0x543683, _0x448bfa, "❌ " + _0x2e499b + " 所有签名接口尝试失败");
  return null;
}
async function getAccountBasicInfo(_0xe1a9e3, _0x1e426a, _0x4eada0) {
  try {
    {
      const {
        body: _0x2f183f
      } = await request({
        method: "GET",
        url: _0x1e426a.accountInfoUrl,
        headers: {
          Host: _0x1e426a.host,
          "User-Agent": "kwai-android aegon/3.56.0",
          Cookie: _0xe1a9e3,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 12000
      }, _0x4eada0, "账户信息请求");
      if (_0x2f183f && _0x2f183f.result === 1 && _0x2f183f.data) {
        {
          let _0x2b2b6d = 0;
          let _0x7ba916 = 0;
          if (_0x1e426a.name === "KS") {
            _0x2b2b6d = Number(_0x2f183f.data.coinAmount) || 0;
            _0x7ba916 = Number(_0x2f183f.data.cashAmountDisplay) || 0;
          } else {
            if (_0x1e426a.name === "JSB") {
              {
                _0x2b2b6d = Number(_0x2f183f.data.totalCoin) || 0;
                _0x7ba916 = Number(_0x2f183f.data.allCash) || 0;
              }
            }
          }
          const _0x3c56e6 = {
            nickname: _0x2f183f.data.userData?.["nickname"] || null,
            totalCoin: _0x2b2b6d,
            allCash: _0x7ba916,
            success: true,
            ckExpired: false
          };
          return _0x3c56e6;
        }
      }
      const _0x1cb854 = {
        nickname: null,
        totalCoin: 0,
        allCash: 0,
        success: false,
        ckExpired: true
      };
      return _0x1cb854;
    }
  } catch (_0x15c1cf) {
    {
      const _0x4df884 = {
        nickname: null,
        totalCoin: 0,
        allCash: 0,
        success: false,
        ckExpired: true
      };
      return _0x4df884;
    }
  }
}
class KuaishouAccount {
  constructor({
    index = 1,
    salt: _0x45ac63,
    cookie: _0x1fe46b,
    remark = "未命名",
    proxyUrl = null,
    tasksToExecute = ENV_CONFIG.DEFAULT_TASKS
  }) {
    this.index = index || 1;
    this.salt = _0x45ac63;
    this.cookie = _0x1fe46b;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.platform = this.getPlatformFromCookie(_0x1fe46b);
    this.tasksToExecute = tasksToExecute.filter(_0x4a0201 => !!_0x4a0201);
    this.taskConfigs = ENV_CONFIG.TASK_CONFIGS[this.platform.kpn === "NEBULA" ? "NEBULA" : "KUAISHOU"];
    this.signApiUrls = this.platform.kpn === "NEBULA" ? ENV_CONFIG.NEBULA_SIGN_API_URLS : ENV_CONFIG.SIGN_API_URLS;
    this.lowRewardCount = 0;
    this.adInfoFailCount = 0;
    this.maxAdInfoFailCount = ENV_CONFIG.AD_FAIL_LIMIT;
    this.continuous1CoinCount = 0;
    this.continuous1CoinLimit = ENV_CONFIG.CONTINUOUS_1COIN_LIMIT;
    this.taskLowRewardCount = {};
    this.tasksToExecute.forEach(_0x504dca => {
      this.taskLowRewardCount[_0x504dca] = 0;
    });
    this.taskStats = {};
    this.taskLimitReached = {};
    this.taskDisabled = {};
    this.tasksToExecute.forEach(_0x425b76 => {
      {
        const _0x402546 = {
          success: 0,
          failed: 0,
          totalReward: 0
        };
        this.taskStats[_0x425b76] = _0x402546;
        this.taskLimitReached[_0x425b76] = false;
        this.taskDisabled[_0x425b76] = false;
      }
    });
    this.stopAllTasks = false;
    this.lowRewardStreak = 0;
    this.immediateStopThreshold = ENV_CONFIG.STOP_THRESHOLD;
    this.lowRewardThreshold = ENV_CONFIG.LOW_REWARD_THRESHOLD;
    this.lowRewardLimit = ENV_CONFIG.LOW_REWARD_LIMIT;
    this.isSingleTaskMode = this.tasksToExecute.length === 1;
    this.isCycleMode = ENV_CONFIG.CYCLE_ROUNDS > 0;
    this.cycleRounds = ENV_CONFIG.CYCLE_ROUNDS;
    this.currentCycleRound = 0;
    this.currentTaskIndex = 0;
    this.taskExecutionOrder = this.tasksToExecute;
    this.extractCookieInfo();
    this.clientIP = null;
    this.initExitIP();
  }
  async initExitIP() {
    try {
      {
        if (this.proxyUrl) {
          {
            const _0x48458a = getMaskedProxyUrl(this.proxyUrl);
            logSimple(null, this.platform.displayName, "账号 [" + this.remark + "] 已配置代理: " + _0x48458a);
            const _0x534340 = await getProxyExitIP(this.proxyUrl);
            if (!_0x534340) {
              {
                this.stopAllTasks = true;
                logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 初始化失败：代理IP检测无有效结果");
                return;
              }
            }
            this.clientIP = _0x534340;
          }
        } else {
          {
            if (!localPublicIP) {
              await getPublicIP();
            }
            this.clientIP = localPublicIP;
          }
        }
      }
    } catch (_0x51f21f) {
      {
        this.stopAllTasks = true;
        logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 初始化失败：" + _0x51f21f.message);
      }
    }
  }
  getPlatformFromCookie(_0x57f8df) {
    const _0x82fc23 = _0x57f8df.match(/kpn=([^;]+)/);
    let _0x33b299 = _0x82fc23 ? _0x82fc23[1].toUpperCase() : "KUAISHOU";
    if (_0x33b299 === "NEBULA") {
      {
        return ENV_CONFIG.PLATFORM_CONFIG.NEBULA;
      }
    } else {
      {
        if (_0x33b299 !== "KUAISHOU") {
          {
            logSimple(this.proxyUrl, ENV_CONFIG.PLATFORM_CONFIG.KUAISHOU.displayName, this.remark + " 检测到平台类型 \"" + _0x33b299 + "\"，已自动调整为快手普通版运行");
            _0x33b299 = "KUAISHOU";
          }
        }
        return ENV_CONFIG.PLATFORM_CONFIG.KUAISHOU;
      }
    }
  }
  extractCookieInfo() {
    try {
      {
        const _0x48d8b0 = this.cookie.match(/mod=([^;]+)/);
        const _0x8d9894 = this.cookie.match(/egid=([^;]+)/);
        const _0x1eea73 = this.cookie.match(/did=([^;]+)/);
        const _0x4ae204 = this.cookie.match(/userId=([^;]+)/);
        const _0x1e25e0 = this.cookie.match(/kuaishou\.api_st=([^;]+)/);
        const _0x4cc3c1 = this.cookie.match(/appver=([^;]+)/);
        this.mod = _0x48d8b0 ? _0x48d8b0[1] : "Xiaomi(23116PN5BC)";
        this.egid = _0x8d9894 ? _0x8d9894[1] : "";
        this.did = _0x1eea73 ? _0x1eea73[1] : "";
        this.userId = _0x4ae204 ? _0x4ae204[1] : "";
        this.kuaishouApiSt = _0x1e25e0 ? _0x1e25e0[1] : "";
        this.appver = _0x4cc3c1 ? _0x4cc3c1[1] : "13.7.20.10468";
        this.queryParams = "mod=" + this.mod + "&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
      }
    } catch (_0xbc929a) {
      {
        logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 解析cookie失败: " + _0xbc929a.message);
      }
    }
  }
  async retryOperation(_0x4aa5f3, _0x433615, _0x28d3cd = 3, _0x94c1c4 = 2000) {
    let _0x1561ae = 0;
    while (_0x1561ae < _0x28d3cd && !this.stopAllTasks) {
      {
        try {
          {
            const _0x2e4e97 = await _0x4aa5f3();
            if (_0x2e4e97) {
              {
                return _0x2e4e97;
              }
            }
          }
        } catch (_0x36b41f) {}
        _0x1561ae++;
        if (_0x1561ae < _0x28d3cd && !this.stopAllTasks) {
          {
            await new Promise(_0x34d0a1 => setTimeout(_0x34d0a1, _0x94c1c4));
          }
        }
      }
    }
    return null;
  }
  async getAdInfo(_0x3e1efc) {
    try {
      {
        const _0x4806ee = this.taskConfigs[_0x3e1efc];
        if (!_0x4806ee) {
          {
            return null;
          }
        }
        const _0x4e383e = "/rest/e/reward/mixed/ad";
        const _0x4d97fd = {
          encData: "|encData|",
          sign: "|sign|",
          cs: "false",
          client_key: this.platform.adClientKey,
          videoModelCrowdTag: "1_23",
          os: "android",
          "kuaishou.api_st": this.kuaishouApiSt,
          uQaTag: "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
        };
        const _0x41c294 = {
          earphoneMode: "1",
          mod: this.mod,
          appver: this.appver,
          isp: "CUCC",
          language: "zh-cn",
          ud: this.userId,
          did_tag: "0",
          net: "WIFI",
          kcv: "1599",
          app: "0",
          kpf: "ANDROID_PHONE",
          ver: "11.6",
          android_os: "0",
          boardPlatform: "pineapple",
          kpn: this.platform.kpn,
          androidApiLevel: "35",
          country_code: "cn",
          sys: "ANDROID_15",
          sw: "1080",
          sh: "2400",
          abi: "arm64",
          userRecoBit: "0"
        };
        const _0x46b1f6 = {
          appId: this.platform.appId,
          name: this.platform.appName,
          packageName: this.platform.packageName,
          version: this.appver,
          versionCode: -1
        };
        const _0xf16b46 = {
          width: 1080,
          height: 2249
        };
        const _0x2c0bc1 = {
          osType: 1,
          osVersion: "15",
          deviceId: this.did,
          screenSize: _0xf16b46,
          ftt: ""
        };
        const _0x2d197d = {
          userId: this.userId,
          age: 0,
          gender: ""
        };
        const _0x1a8040 = {
          appInfo: _0x46b1f6,
          deviceInfo: _0x2c0bc1,
          userInfo: _0x2d197d,
          impInfo: [{
            pageId: _0x4806ee.pageId || 100011251,
            subPageId: _0x4806ee.subPageId,
            action: 0,
            browseType: _0x4806ee.name.includes("搜索") ? 4 : 3,
            impExtData: this._getImpExtData(_0x4806ee),
            mediaExtData: "{}"
          }]
        };
        const _0x2918ba = Buffer.from(JSON.stringify(_0x1a8040)).toString("base64");
        const _0x3caa7c = await this.retryOperation(() => getSign(_0x2918ba, this.proxyUrl, this.platform.displayName, this.remark, this.signApiUrls), "获取广告签名", 3);
        if (!_0x3caa7c) {
          {
            return null;
          }
        }
        _0x4d97fd.encData = _0x3caa7c.encdata;
        _0x4d97fd.sign = _0x3caa7c.sign;
        const _0x419efc = await this.retryOperation(() => requestSignService({
          urlpath: _0x4e383e,
          reqdata: querystring.stringify(_0x4d97fd) + "&" + querystring.stringify(_0x41c294),
          salt: this.salt
        }, this.proxyUrl, this.platform.displayName, "获取广告请求签名", this.remark, this.signApiUrls), "获取广告请求签名", 3);
        if (!_0x419efc) {
          {
            return null;
          }
        }
        const _0x230358 = {
          ..._0x41c294,
          sig: _0x419efc.sig || "",
          __NS_sig3: _0x419efc.__NS_sig3 || "",
          __NS_xfalcon: _0x419efc.__NS_xfalcon || "",
          __NStokensig: _0x419efc.__NStokensig || ""
        };
        const _0x4fd3f0 = "https://api.e.kuaishou.com" + _0x4e383e + "?" + querystring.stringify(_0x230358);
        const {
          body: _0x34ef98
        } = await request({
          method: "POST",
          url: _0x4fd3f0,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Host: "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/3.56.0",
            Cookie: this.cookie
          },
          form: _0x4d97fd,
          timeout: 12000
        }, this.proxyUrl, "获取广告");
        if (!_0x34ef98) {
          {
            this.adInfoFailCount++;
            if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
              {
                this.stopAllTasks = true;
              }
            }
            return null;
          }
        }
        if (_0x34ef98.errorMsg === "OK" && _0x34ef98.feeds && _0x34ef98.feeds[0] && _0x34ef98.feeds[0].ad) {
          {
            const _0x1cc631 = _0x34ef98.feeds[0].caption || _0x34ef98.feeds[0].ad?.["caption"] || "";
            const _0x122706 = _0x1cc631.length > 30 ? _0x1cc631.substring(0, 30) + "..." : _0x1cc631;
            const _0x4fd8e7 = _0x34ef98.feeds[0].exp_tag || "";
            const _0x2d9788 = _0x4fd8e7.split("/")[1]?.["split"]("_")?.[0] || "";
            let _0x59c78b = 0;
            try {
              {
                if (_0x34ef98.feeds[0].ad.extData) {
                  {
                    const _0xc30c88 = JSON.parse(_0x34ef98.feeds[0].ad.extData);
                    _0x59c78b = Number(_0xc30c88.awardCoin) || 0;
                  }
                }
                if (_0x59c78b === 0) {
                  {
                    if (_0x34ef98.feeds[0].ad.adDataV2?.["inspirePersonalize"]?.["awardValue"]) {
                      {
                        _0x59c78b = parseInt(_0x34ef98.feeds[0].ad.adDataV2.inspirePersonalize.awardValue) || 0;
                      }
                    } else {
                      if (_0x34ef98.feeds[0].ad.adDataV2?.["inspireAdInfo"]?.["inspirePersonalize"]?.["neoValue"]) {
                        {
                          _0x59c78b = parseInt(_0x34ef98.feeds[0].ad.adDataV2.inspireAdInfo.inspirePersonalize.neoValue) || 0;
                        }
                      }
                    }
                  }
                }
              }
            } catch (_0x54d36c) {}
            if (_0x59c78b === 5) {
              {
                return null;
              }
            }
            logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 成功获取广告：" + _0x122706);
            logSimple(null, this.platform.displayName, this.remark + " 本次广告预计获得:" + _0x59c78b + "金币");
            const _0x74de80 = {
              cid: _0x34ef98.feeds[0].ad.creativeId,
              llsid: _0x2d9788,
              hasRewardEnd: _0x34ef98.feeds[0].ad.adDataV2?.["onceAgainRewardInfo"]?.["hasMore"] || false,
              expectedCoins: _0x59c78b,
              taskConfig: _0x4806ee
            };
            return _0x74de80;
          }
        }
        this.adInfoFailCount++;
        if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
          {
            this.stopAllTasks = true;
          }
        }
        return null;
      }
    } catch (_0x4ec292) {
      {
        this.adInfoFailCount++;
        return null;
      }
    }
  }
  _getImpExtData(_0x5a1b28) {
    if (_0x5a1b28.name.includes("搜索")) {
      {
        const _0x574fa4 = ENV_CONFIG.SEARCH_KEYWORDS[Math.floor(Math.random() * ENV_CONFIG.SEARCH_KEYWORDS.length)];
        const _0xa271c0 = {
          openH5AdCount: 2,
          sessionLookedCompletedCount: "1",
          sessionType: "1",
          searchKey: _0x574fa4,
          triggerType: "2",
          disableReportToast: "true",
          businessEnterAction: "7",
          neoParams: _0x5a1b28.linkUrl || ""
        };
        return JSON.stringify(_0xa271c0);
      }
    } else {
      {
        return "{}";
      }
    }
  }
  async generateSignature(_0x343dda, _0x31e587, _0x2fd5a4, _0x19248a) {
    try {
      {
        const _0x7d30f4 = JSON.stringify({
          businessId: _0x19248a.businessId,
          endTime: Date.now(),
          extParams: "",
          mediaScene: "video",
          neoInfos: [{
            creativeId: _0x343dda,
            extInfo: "",
            llsid: _0x31e587,
            requestSceneType: _0x19248a.requestSceneType,
            taskType: _0x19248a.taskType,
            watchExpId: "",
            watchStage: 0
          }],
          pageId: _0x19248a.pageId || 100011251,
          posId: _0x19248a.posId,
          reportType: 0,
          sessionId: "",
          startTime: Date.now() - 30000,
          subPageId: _0x19248a.subPageId
        });
        const _0x114099 = "bizStr=" + encodeURIComponent(_0x7d30f4) + "&cs=false&client_key=" + this.platform.reportClientKey;
        const _0x3c2944 = this.queryParams + "&" + _0x114099;
        const _0x4ee3fe = await this.retryOperation(() => requestSignService({
          urlpath: "/rest/r/ad/task/report",
          reqdata: _0x3c2944,
          salt: this.salt
        }, this.proxyUrl, this.platform.displayName, "生成报告签名", this.remark, this.signApiUrls), "生成报告签名", 3);
        if (!_0x4ee3fe) {
          {
            return null;
          }
        }
        const _0x5110dd = {
          sig: _0x4ee3fe.sig,
          sig3: _0x4ee3fe.__NS_sig3,
          xfalcon: _0x4ee3fe.__NS_xfalcon,
          sigtoken: _0x4ee3fe.__NStokensig,
          post: _0x114099
        };
        return _0x5110dd;
      }
    } catch (_0x5d27e5) {
      {
        return null;
      }
    }
  }
  async submitReport(_0x2b8bd8, _0x3e9226, _0x30a689, _0x101f8b) {
    try {
      {
        const _0x1791a4 = await this.retryOperation(() => this.generateSignature(_0x2b8bd8, _0x3e9226, _0x30a689, _0x101f8b), "生成" + _0x101f8b.name + "报告签名", 3);
        if (!_0x1791a4) {
          {
            const _0x16e511 = {
              success: false,
              reward: 0
            };
            return _0x16e511;
          }
        }
        const _0x25a412 = "https://api.e.kuaishou.com/rest/r/ad/task/report?" + (this.queryParams + "&sig=" + _0x1791a4.sig + "&__NS_sig3=" + _0x1791a4.sig3 + "&__NS_xfalcon=" + _0x1791a4.xfalcon + "&__NStokensig=" + _0x1791a4.sigtoken);
        const {
          body: _0x6390b0
        } = await request({
          method: "POST",
          url: _0x25a412,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Host: "api.e.kuaishou.com",
            Cookie: this.cookie,
            "User-Agent": "kwai-android aegon/3.56.0"
          },
          form: querystring.parse(_0x1791a4.post),
          timeout: 12000
        }, this.proxyUrl, "提交任务报告");
        if (!_0x6390b0) {
          {
            const _0x1fd0b3 = {
              success: false,
              reward: 0
            };
            return _0x1fd0b3;
          }
        }
        if (_0x6390b0.result === 1) {
          {
            const _0x4761cf = Number(_0x6390b0.data?.["neoAmount"]) || 0;
            this.taskStats[_0x30a689].totalReward += _0x4761cf;
            this.checkContinuous1Coin(_0x4761cf);
            const _0x5d486b = {
              success: true,
              reward: _0x4761cf
            };
            return _0x5d486b;
          }
        }
        const _0x3566ba = [20107, 20108, 1003, 415];
        if (_0x3566ba.includes(_0x6390b0.result)) {
          {
            const _0x370c2f = {
              success: false,
              reward: 0,
              limitReached: true
            };
            return _0x370c2f;
          }
        }
        const _0x11975e = {
          success: false,
          reward: 0
        };
        return _0x11975e;
      }
    } catch (_0x12b37d) {
      {
        const _0x30ed6f = {
          success: false,
          reward: 0
        };
        return _0x30ed6f;
      }
    }
  }
  checkContinuous1Coin(_0xd2325a) {
    if (_0xd2325a === 1) {
      {
        this.continuous1CoinCount++;
        if (this.continuous1CoinCount >= this.continuous1CoinLimit) {
          {
            this.stopAllTasks = true;
          }
        }
      }
    } else {
      if (this.continuous1CoinCount > 0) {
        {
          this.continuous1CoinCount = 0;
        }
      }
    }
  }
  async executeTask(_0x1f79cd, _0x51f914 = false, _0x5f06d5 = 0) {
    if (this.taskDisabled[_0x1f79cd] || this.taskLimitReached[_0x1f79cd] || this.stopAllTasks) {
      {
        const _0x4b1e1b = {
          success: false,
          reward: 0,
          hasRewardEnd: false
        };
        return _0x4b1e1b;
      }
    }
    try {
      {
        let _0xe78540 = null;
        while (!_0xe78540 && !this.stopAllTasks) {
          {
            _0xe78540 = await this.getAdInfo(_0x1f79cd);
            if (!_0xe78540 && !this.stopAllTasks) {
              {
                await new Promise(_0x3ccdd6 => setTimeout(_0x3ccdd6, 3000));
              }
            }
          }
        }
        if (!_0xe78540) {
          {
            this.taskStats[_0x1f79cd].failed++;
            const _0x928926 = {
              success: false,
              reward: 0,
              hasRewardEnd: false
            };
            return _0x928926;
          }
        }
        const _0x9847ce = Math.floor(Math.random() * (ENV_CONFIG.WATCH_MAX - ENV_CONFIG.WATCH_MIN) + ENV_CONFIG.WATCH_MIN) * 1000;
        const _0x2ba11d = Math.round(_0x9847ce / 1000);
        logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 观看广告中，请等待" + _0x2ba11d + "秒...");
        await new Promise(_0xa99200 => setTimeout(_0xa99200, _0x9847ce));
        this.endTime = Date.now();
        this.startTime = this.endTime - _0x9847ce;
        logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 观看完成，开始提交任务报告");
        const _0x4af427 = await this.submitReport(_0xe78540.cid, _0xe78540.llsid, _0x1f79cd, _0xe78540.taskConfig);
        if (_0x4af427?.["success"]) {
          {
            this.taskStats[_0x1f79cd].success++;
            const _0x49a6ec = _0x4af427.reward || 0;
            logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 任务提交成功！获得" + _0x49a6ec + "金币");
            const _0x5f4d11 = {
              success: true,
              reward: _0x49a6ec,
              hasRewardEnd: _0xe78540.hasRewardEnd || false,
              limitReached: _0x4af427.limitReached || false
            };
            return _0x5f4d11;
          }
        }
        _0x4af427?.["limitReached"] && (this.taskLimitReached[_0x1f79cd] = true);
        this.taskStats[_0x1f79cd].failed++;
        const _0x4f6a2d = {
          success: false,
          reward: 0,
          hasRewardEnd: false,
          limitReached: _0x4af427?.["limitReached"] || false
        };
        return _0x4f6a2d;
      }
    } catch (_0xb81d34) {
      {
        this.taskStats[_0x1f79cd].failed++;
        const _0x5debc6 = {
          success: false,
          reward: 0,
          hasRewardEnd: false
        };
        return _0x5debc6;
      }
    }
  }
  getNextAvailableTask() {
    const _0x410ca0 = this.taskExecutionOrder.length;
    if (_0x410ca0 === 0 || this.stopAllTasks) {
      {
        return null;
      }
    }
    const _0x1bf08e = this.taskExecutionOrder.filter(_0x54e954 => this.tasksToExecute.includes(_0x54e954) && !this.taskLimitReached[_0x54e954] && !this.taskDisabled[_0x54e954]);
    if (_0x1bf08e.length === 0) {
      {
        return null;
      }
    }
    if (_0x1bf08e.length === 1) {
      {
        return _0x1bf08e[0];
      }
    }
    this.currentTaskIndex = (this.currentTaskIndex + 1) % _0x1bf08e.length;
    return _0x1bf08e[this.currentTaskIndex];
  }
  async appendAdRest(_0x1dde6c) {
    if (_0x1dde6c > 0 && _0x1dde6c % ENV_CONFIG.APPEND_REST_INTERVAL === 0) {
      {
        const _0x4e36c5 = Math.floor(Math.random() * (ENV_CONFIG.APPEND_REST_MAX - ENV_CONFIG.APPEND_REST_MIN)) + ENV_CONFIG.APPEND_REST_MIN;
        await new Promise(_0x26e580 => setTimeout(_0x26e580, _0x4e36c5));
      }
    }
  }
  async executeTaskLoop() {
    if (this.stopAllTasks) {
      {
        const _0x55bcba = {
          success: false,
          remark: this.remark,
          platform: this.platform.name,
          taskCount: 0,
          totalReward: 0,
          exitIP: this.clientIP,
          stopReason: "初始化失败"
        };
        return _0x55bcba;
      }
    }
    const _0x538145 = await getAccountBasicInfo(this.cookie, this.platform, this.proxyUrl);
    if (!_0x538145.success || _0x538145.ckExpired) {
      {
        logSimple(this.proxyUrl, this.platform.displayName, this.remark + " Cookie已过期或无效，停止当前账号任务");
        const _0x3bdae3 = {
          success: false,
          remark: this.remark,
          platform: this.platform.name,
          taskCount: 0,
          totalReward: 0,
          exitIP: this.clientIP,
          stopReason: "Cookie过期"
        };
        return _0x3bdae3;
      }
    }
    logSimple(this.proxyUrl, this.platform.displayName, this.remark + " 登录成功，金币: " + _0x538145.totalCoin + "，余额: " + _0x538145.allCash.toFixed(2));
    let _0x5f35ef = 0;
    let _0x581132 = 0;
    let _0x3f1ffc = "正常结束";
    while (!this.stopAllTasks) {
      {
        if (this.isCycleMode && this.currentCycleRound >= this.cycleRounds) {
          {
            _0x3f1ffc = "已完成" + this.cycleRounds + "轮任务";
            break;
          }
        }
        const _0x42732f = this.getNextAvailableTask();
        if (!_0x42732f) {
          {
            _0x3f1ffc = "无可用任务";
            this.stopAllTasks = true;
            break;
          }
        }
        const _0x29a5c0 = await this.executeTask(_0x42732f);
        _0x5f35ef++;
        if (_0x29a5c0.hasRewardEnd) {
          {
            _0x581132++;
            await this.appendAdRest(_0x581132);
            const _0x258444 = await this.executeTask(_0x42732f, true, _0x581132);
          }
        }
        if (this.continuous1CoinCount >= this.continuous1CoinLimit) {
          {
            _0x3f1ffc = "连续" + this.continuous1CoinLimit + "次1金币";
            this.stopAllTasks = true;
          }
        }
        if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
          {
            _0x3f1ffc = "广告获取失败达上限";
            this.stopAllTasks = true;
          }
        }
        const _0x3417bc = this.getNextAvailableTask();
        if (_0x3417bc && !this.stopAllTasks) {
          {
            const _0xc5d13b = Math.floor(Math.random() * 5 + 5) * 1000;
            await new Promise(_0x1aa6f1 => setTimeout(_0x1aa6f1, _0xc5d13b));
          }
        }
        if (this.isCycleMode && this.currentTaskIndex === this.taskExecutionOrder.length - 1) {
          {
            this.currentCycleRound++;
          }
        }
      }
    }
    const _0x202dc7 = Object.values(this.taskStats).reduce((_0x5bfebf, _0x19dc4c) => _0x5bfebf + _0x19dc4c.totalReward, 0);
    const _0x1d5a7c = {
      success: true,
      remark: this.remark,
      platform: this.platform.name,
      taskCount: _0x5f35ef,
      appendCount: _0x581132,
      totalReward: _0x202dc7,
      exitIP: this.clientIP,
      stopReason: _0x3f1ffc,
      ckExpired: false
    };
    return _0x1d5a7c;
  }
}
async function runSerialTasks(_0x2603fe) {
  const _0x27ff6a = [];
  for (let _0x4650ea = 0; _0x4650ea < _0x2603fe.length; _0x4650ea++) {
    {
      const _0x296ebd = _0x2603fe[_0x4650ea];
      const _0x20b075 = {
        ..._0x296ebd,
        index: _0x4650ea + 1
      };
      logGlobal("\n开始执行账号 " + (_0x4650ea + 1) + "/" + _0x2603fe.length + ": " + _0x296ebd.remark);
      const _0x1fcdbb = new KuaishouAccount(_0x20b075);
      const _0x7fcef3 = await _0x1fcdbb.executeTaskLoop();
      _0x27ff6a.push(_0x7fcef3);
    }
  }
  return _0x27ff6a;
}
function parseAccountConfig(_0x34fec7, _0x5da1f5) {
  if (!_0x34fec7 || typeof _0x34fec7 !== "string") {
    {
      return null;
    }
  }
  const _0x3fc302 = _0x34fec7.split("#");
  if (_0x3fc302.length < 3) {
    return null;
  }
  const _0x4926eb = _0x3fc302[0].trim() || "未命名";
  let _0x219f64 = _0x3fc302[1].trim();
  const _0x5a8d71 = _0x3fc302[2].trim();
  const _0x46a95b = _0x3fc302[3] ? _0x3fc302[3].trim() : null;
  if (!_0x219f64 || !_0x5a8d71) {
    return null;
  }
  let _0x3b9d20 = null;
  _0x46a95b && _0x46a95b.startsWith("socks5://") && (_0x3b9d20 = _0x46a95b);
  if (_0x3b9d20) {
    const _0x6e8707 = getMaskedProxyUrl(_0x3b9d20);
    logGlobal("✅ 账号 [" + _0x4926eb + "] 已配置代理: " + _0x6e8707);
  }
  const _0x476503 = {
    cookie: _0x219f64,
    salt: _0x5a8d71,
    remark: _0x4926eb,
    proxyUrl: _0x3b9d20
  };
  return _0x476503;
}
function loadAccountsFromEnv() {
  const _0x4cc68d = [];
  const _0x51df32 = new Set();
  let _0x2b5724 = 1;
  let _0x40aa0a = 0;
  const _0x1f7ae = process.env.ksck || ENV_CONFIG.KS_COOKIE;
  if (_0x1f7ae) {
    const _0x48ea56 = _0x1f7ae.split("&");
    _0x48ea56.forEach(_0x2980aa => {
      _0x2980aa = _0x2980aa.trim();
      if (_0x2980aa && !_0x51df32.has(_0x2980aa)) {
        const _0x7a50bc = parseAccountConfig(_0x2980aa, _0x2b5724);
        if (_0x7a50bc) {
          _0x4cc68d.push(_0x7a50bc);
          _0x51df32.add(_0x2980aa);
          _0x2b5724++;
          if (_0x7a50bc.proxyUrl) {
            _0x40aa0a++;
          }
        }
      }
    });
  }
  for (let _0x5c1ac1 = 1; _0x5c1ac1 <= 666; _0x5c1ac1++) {
    const _0x269e3c = "ksck" + _0x5c1ac1;
    if (process.env[_0x269e3c]) {
      const _0x43fad8 = process.env[_0x269e3c].trim();
      if (_0x43fad8 && !_0x51df32.has(_0x43fad8)) {
        const _0x26fa33 = parseAccountConfig(_0x43fad8, _0x2b5724);
        if (_0x26fa33) {
          _0x4cc68d.push(_0x26fa33);
          _0x51df32.add(_0x43fad8);
          _0x2b5724++;
          if (_0x26fa33.proxyUrl) {
            _0x40aa0a++;
          }
        }
      }
    }
  }
  _0x40aa0a > 0 && logGlobal("📡 共有 " + _0x40aa0a + "/" + _0x4cc68d.length + " 个账号配置了独立代理");
  logGlobal("成功加载 " + _0x4cc68d.length + " 个账号");
  return _0x4cc68d;
}
async function main() {
  try {
    logGlobal("=== ⚠️免费限量AUTH_KEY：'QQ群:1078935572' ===");
    logGlobal("");
    logGlobal("=== 💡QQ交流群:1078935572 ===");
    logGlobal("");
    logGlobal("=== 💡购买付费独享AUTH_KEY前往：kw.ideal001.top ===");
    logGlobal("");
    logGlobal("=== 💡在线运行脚本无需青龙面板网址：http://160.202.238.161:3000 ===");
    logGlobal("");
    logGlobal("🚀 快手自动化任务脚本启动");
    logGlobal("");
    if (!ENV_CONFIG.AUTH_KEY) {
      logGlobal("⚠️  警告：未配置AUTH_KEY，签名接口可能无法正常工作");
      logGlobal("");
      logGlobal("💡 请设置环境变量 KS_AUTH_KEY 或 ks_auth");
      logGlobal("💡 请设置环境变量 KS_AUTH_KEY 或 ks_auth");
      logGlobal("💡 请设置环境变量 KS_AUTH_KEY 或 ks_auth");
      logGlobal("");
    } else {
      logGlobal("🔑 成功使用AUTH_KEY（发送截图请打码）: " + ENV_CONFIG.AUTH_KEY.substring(0, 50));
      logGlobal("");
    }
    await getPublicIP();
    const _0x1f0908 = loadAccountsFromEnv();
    if (_0x1f0908.length === 0) {
      logGlobal("");
      logGlobal("⚠️ 未检测到任何账号配置，停止脚本（账号添加格式为ksck、ksck1-ksck66）");
      logGlobal("⚠️ 未检测到任何账号配置，停止脚本（账号添加格式为ksck、ksck1-ksck66）");
      logGlobal("⚠️ 未检测到任何账号配置，停止脚本（账号添加格式为ksck、ksck1-ksck66）");
      logGlobal("");
      process.exit(1);
    }
    const _0x4478fd = await runSerialTasks(_0x1f0908);
    const _0x61ab65 = _0x4478fd.filter(_0x17b0f0 => _0x17b0f0.success);
    const _0x31eabc = _0x4478fd.filter(_0x10b861 => !_0x10b861.success && _0x10b861.stopReason === "Cookie过期").length;
    const _0x145cc4 = _0x61ab65.reduce((_0x51bd69, _0x514bdc) => _0x51bd69 + _0x514bdc.taskCount, 0);
    const _0x21a1a5 = _0x61ab65.reduce((_0x3d342d, _0xc0de1f) => _0x3d342d + _0xc0de1f.totalReward, 0);
    logGlobal("\n" + "=".repeat(50));
    logGlobal("执行统计报告");
    logGlobal("有效账号: " + _0x61ab65.length + "/" + _0x1f0908.length);
    _0x31eabc > 0 && logGlobal("过期账号: " + _0x31eabc);
    logGlobal("总执行任务: " + _0x145cc4 + " 次");
    logGlobal("总获得奖励: " + _0x21a1a5 + " 金币");
    _0x61ab65.length > 0 && (logGlobal("\n各账号详情:"), _0x61ab65.forEach((_0x2324ee, _0x397b6c) => {
      const _0x307de0 = _0x2324ee.platform === "KS" ? "快手" : _0x2324ee.platform === "JSB" ? "快手极速版" : _0x2324ee.platform;
      logGlobal("  " + (_0x397b6c + 1) + ". [" + _0x307de0 + "---" + _0x2324ee.remark + "]: 执行" + _0x2324ee.taskCount + "次 | 获" + _0x2324ee.totalReward + "金币 | IP: " + _0x2324ee.exitIP + " | 原因: " + _0x2324ee.stopReason);
    }));
    logGlobal("=".repeat(50));
    logGlobal("脚本执行完毕！");
    process.exit(0);
  } catch (_0x5f50b5) {
    logGlobal("❌ 脚本执行异常: " + _0x5f50b5.message);
    process.exit(1);
  }
}
main().catch(_0x50aa60 => {
  logGlobal("❌ 脚本异常退出: " + _0x50aa60.message);
  process.exit(1);
});