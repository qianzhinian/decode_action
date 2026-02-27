//Fri Feb 27 2026 14:08:20 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const {
  log: _0x2a7266
} = require("console");
(function () {
  "use strict";
  const _0x2727cc = require("crypto");
  const _0x105e26 = require("fs");
  const _0x187a26 = require("path");
  const _0x51d863 = require("axios");
  const _0x2b88c5 = require("querystring");
  const _0x224442 = require("querystring");
  const {
    SocksProxyAgent: _0x4627cd
  } = require("socks-proxy-agent");
  const _0x152938 = require("https");
  const _0x2a87e6 = "http://vv.video.qq.com/checktime?otype=json";
  const _0x5475f2 = "https://api.e.kuaishou.com/rest/e/reward/mixed/ad";
  const _0x3d7720 = String(process.env.KS_MODE || "1").trim();
  const _0x33bd31 = _0x3d7720 === "2";
  const _0x22bc9e = "http://103.43.10.82/sign.php";
  const _0x40b810 = process.env.CARD_KEY || "你的卡密";
  const _0x493472 = "http://103.43.10.82/query.php";
  const _0x281b23 = process.env.CARD_CHECK_INTERVAL ? parseInt(process.env.CARD_CHECK_INTERVAL) : 60;
  let _0x266a20 = 0;
  let _0x34b4c1 = 0;
  let _0x52d328 = "";
  let _0x2fc4ef = 0;
  let _0x1899b8 = false;
  let _0x7844db = 0;
  const _0xc3ef4b = process.env.MAX_CONSECUTIVE_SIGN_FAIL ? parseInt(process.env.MAX_CONSECUTIVE_SIGN_FAIL) : 5;
  const _0x224fde = process.env.MAX_TOTAL_SIGN_FAIL ? parseInt(process.env.MAX_TOTAL_SIGN_FAIL) : 15;
  let _0x22cd71 = false;
  if (!_0x22bc9e || _0x22bc9e.includes("你的签名服务地址")) {
    {
      console.log("❌ 请设置签名服务地址！可通过环境变量 SIGN_API_URL 或修改脚本");
      process.exit(1);
    }
  }
  if (!_0x40b810 || _0x40b810 === "你的卡密") {
    {
      console.log("❌ 请设置卡密！可通过环境变量 CARD_KEY 或修改脚本");
      process.exit(1);
    }
  }
  function _0x20f76c() {
    {
      let _0x5adb03 = _0x22bc9e + (_0x22bc9e.includes("?") ? "&" : "?") + "card_key=" + encodeURIComponent(_0x40b810);
      if (_0x33bd31) {
        {
          _0x5adb03 += "&mode=jisu";
        }
      }
      return _0x5adb03;
    }
  }
  const _0x441448 = {
    appId: "kuaishou_nebula",
    name: "快手极速版",
    packageName: "com.kuaishou.nebula",
    kpn: "NEBULA",
    clientKey: "2ac2a76d",
    defaultPageId: 11101,
    modeName: "极速版",
    basicInfoUrl: "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    basicInfoHost: "nebula.kuaishou.com"
  };
  const _0x35aa07 = {
    appId: "kuaishou",
    name: "快手",
    packageName: "com.smile.gifmaker",
    kpn: "KUAISHOU",
    clientKey: "3c2cd3f3",
    defaultPageId: 100011251,
    modeName: "普通版",
    basicInfoUrl: "https://encourage.kuaishou.com/rest/wd/encourage/account/withdraw/info?source=normal&imei=&oaid=&idfa=",
    basicInfoHost: "encourage.kuaishou.com"
  };
  const _0x528b00 = _0x33bd31 ? _0x441448 : _0x35aa07;
  function _0x4b07f9(_0x107c3f) {
    {
      if (!_0x107c3f) {
        return _0x107c3f;
      }
      if (_0x33bd31) {
        {
          if (/kpn=KUAISHOU/i.test(_0x107c3f)) {
            {
              _0x107c3f = _0x107c3f.replace(/kpn=KUAISHOU/gi, "kpn=NEBULA");
              console.log("🔄 自动修正CK: kpn=KUAISHOU → kpn=NEBULA (适配极速版模式)");
            }
          }
        }
      } else {
        {
          /kpn=NEBULA/i.test(_0x107c3f) && (_0x107c3f = _0x107c3f.replace(/kpn=NEBULA/gi, "kpn=KUAISHOU"), console.log("🔄 自动修正CK: kpn=NEBULA → kpn=KUAISHOU (适配普通版模式)"));
        }
      }
      return _0x107c3f;
    }
  }
  const _0x7453ed = {
    name: "宝箱广告",
    businessId: 606,
    posId: 20346,
    subPageId: 100024064,
    requestSceneType: 1,
    taskType: 1
  };
  const _0x5c00 = {
    name: "看广告得金币",
    businessId: 672,
    posId: 24067,
    subPageId: 100026367,
    requestSceneType: 1,
    taskType: 1
  };
  const _0x143efc = {
    name: "饭补广告",
    businessId: 9362,
    posId: 24067,
    subPageId: 100026367,
    requestSceneType: 7,
    taskType: 2
  };
  const _0x29ca06 = {
    name: "搜索广告",
    businessId: 7038,
    posId: 96134,
    subPageId: 100161537,
    pageId: 11014,
    requestSceneType: 1,
    taskType: 2,
    linkUrl: "eyJwYWdlSWQiOjExMTAxLCJzdWJQYWdlSWQiOjEwMDA3NDU4NCwicG9zSWQiOjk2MTM0LCJidXNpbmVzc0lkIjo3MDM4LCJleHRQYXJhbXMiOiI0YmJiMWI1OTBiZDViMGEwNzZlNTMxNjg5MThjMGQ5NWNjM2I5NjY1NmViMGVmNmJiNGY5Yjg4MGQ3OTNjZThmOWMwMDUwOWFlYjcxZGUwZTdjZmQ2YWM2Y2MwMjE3MjU0N2U1ZTEzNGZmYWNjOGU0OWQ5M2JhYjM4ZTdiYzRiN2IyZTBmNjIwMDE5Yzc1ODdmMmQzYzM4YWVhYmQ2MzJkN2JjZjA3YzU2Y2I4MDU5NjQ0YmU5ZDIxNzkzN2YzN2MiLCJjdXN0b21EYXRhIjp7ImV4aXRJbmZvIjp7InRvYXN0RGVzYyI6bnVsbCwidG9hc3RJbWdVcmwiOm51bGx9fSwicGVuZGFudFR5cGUiOjEsImRpc3BsYXlUeXBlIjoyLCJzaW5nbGVQYWdlSWQiOjAsInNpbmdsZVN1YlBhZ2VJZCI6MCwiY2hhbm5lbCI6MCwiY291bnRkb3duUmVwb3J0Ijp0cnVlLCJ0aGVtZVR5cGUiOjAsIm1peGVkQWQiOnRydWUsImZ1bGxNaXhlZCI6dHJ1ZSwiYXV0b1JlcG9ydCI6dHJ1ZSwiZnJvbVRhc2tDZW50ZXIiOnRydWUsInNlYXJjaEluc3BpcmVTY2hlbWVJbmZvIjp7InNlYXJjaFF1ZXJ5Ijoi5aW96LSnIiwic2VhcmNoU2Vzc2lvbklkIjoiTVRjMU56TTFOVE0zT0RjeE5GOWpiRzkxWkMweU1qWTBNVGMxTFRFeU1qRTROall0TVRBNE5EYzVOeTB5TURBdFpHVndiRzk1TFRnMU9HSTVOelZtTkRZdGJEbHpZbXhmNWFXOTZMU25YekF1TURFME1ETTFNekF3TnpRM01EYzRNRE0iLCJlbnRlclNvdXJjZSI6IkFDVF9yZW53dV9hZF9ib3hfc2luZ2xlX2NvbCJ9LCJhbW91bnQiOjI1MDB9"
  };
  const _0x389e68 = {
    name: "短剧广告",
    pageId: 11101,
    businessId: 7036,
    posId: 24067,
    subPageId: 100026367,
    requestSceneType: 7,
    taskType: 2
  };
  const _0xdd33a1 = {
    name: "看广告得奖励",
    pageId: 11101,
    businessId: 7041,
    posId: 24067,
    subPageId: 100026367,
    requestSceneType: 7,
    taskType: 2
  };
  const _0x5c4d10 = {
    box: _0x7453ed,
    look: _0x5c00,
    food: _0x143efc,
    search: _0x29ca06,
    dj: _0x389e68,
    lookk: _0xdd33a1
  };
  const _0x3220f2 = {
    name: "宝箱广告",
    businessId: 604,
    posId: 20345,
    subPageId: 100024063,
    requestSceneType: 1,
    taskType: 1
  };
  const _0x1affc3 = {
    name: "看广告得金币",
    businessId: 671,
    posId: 24068,
    subPageId: 100026368,
    requestSceneType: 1,
    taskType: 1
  };
  const _0x18d3e2 = {
    name: "饭补广告",
    businessId: 921,
    posId: 29742,
    subPageId: 100029908,
    requestSceneType: 7,
    taskType: 2
  };
  const _0x1ed91b = {
    name: "搜索广告",
    businessId: 7077,
    posId: 216267,
    subPageId: 100161535,
    pageId: 10014,
    requestSceneType: 1,
    taskType: 2,
    linkUrl: "eyJwYWdlSWQiOjEwMDE0LCJzdWJQYWdlSWQiOjEwMDE2MTUzNSwicG9zSWQiOjIxNjI2NywiYnVzaW5lc3NJZCI6NzA3NywiZXh0UGFyYW1zIjoiYzc4OWI1ZTAzMjMxOTUwZjcyM2ZjMWE1ZGJjYzgwNmYzMDE1OTcyZWE0Mzc2NmNlNDYwNTk2ZDgzMGVjNTE5MDM0OGEwNTlkOTA2NWYwZGY1ZjkwY2YwMjEwMGVhMmQzYzU0YjUyZDBlNGUxY2Q0NmMxN2ExZDU3YmRhY2EyMzVlM2U1NjYzN2JmZGQzMThiZWMzNTgzOWU1YzIxNWUyNzMzY2IyMzQ2ZGQ1NDYyODc1NDdlMjc4OWYxMjZjZWU5NWZhYzg4N2IxMzM2MzBlZTEzYTVmYTlhODYzNDYxODQ5MjM0NDk3ZGY3ZTRmOWYyYzk2ZjQ5YzViMGExNzQ2NGE2MGM0MDg1MzU2NTY2ZDc4NGIxYjY3NzY3MzYzYjg3IiwiY3VzdG9tRGF0YSI6eyJleGl0SW5mbyI6eyJ0b2FzdERlc2MiOm51bGwsInRvYXN0SW1nVXJsIjpudWxsfX0sInBlbmRhbnRUeXBlIjoxLCJkaXNwbGF5VHlwZSI6Miwic2luZ2xlUGFnZUlkIjowLCJzaW5nbGVTdWJQYWdlSWQiOjAsImNoYW5uZWwiOjAsImNvdW50ZG93blJlcG9ydCI6ZmFsc2UsInRoZW1lVHlwZSI6MCwibWl4ZWRBZCI6dHJ1ZSwiZnVsbE1peGVkIjp0cnVlLCJhdXRvUmVwb3J0Ijp0cnVlLCJmcm9tVGFza0NlbnRlciI6dHJ1ZSwic2VhcmNoSW5zcGlyZVNjaGVtZUluZm8iOm51bGwsImFtb3VudCI6MH0"
  };
  const _0x15ffd2 = {
    box: _0x3220f2,
    look: _0x1affc3,
    food: _0x18d3e2,
    search: _0x1ed91b
  };
  const _0x2e7745 = _0x33bd31 ? _0x5c4d10 : _0x15ffd2;
  const _0x424cfb = _0x33bd31 ? ["look", "lookk", "dj", "food", "box", "search"] : ["look", "lookk", "dj", "food", "box", "search"];
  const _0x443ba5 = _0x33bd31 ? ["look", "lookk", "dj", "food", "box", "search"] : ["look", "food", "box", "search"];
  async function _0x3748bb() {
    {
      try {
        {
          const _0x457c62 = _0x493472 + "?card_key=" + encodeURIComponent(_0x40b810);
          const _0x1c5455 = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15"
          };
          const _0x513431 = {
            timeout: 10000,
            headers: _0x1c5455
          };
          const _0x54f2b9 = await _0x51d863.get(_0x457c62, _0x513431);
          const _0x5cb0c = _0x54f2b9.data;
          if (_0x5cb0c.code === 0) {
            {
              const _0x3290d4 = _0x5cb0c.data || {};
              _0x52d328 = _0x3290d4.type || "unknown";
              _0x266a20 = _0x3290d4.expire || 0;
              _0x34b4c1 = _0x3290d4.val || 0;
              const _0x940719 = {
                valid: true,
                msg: "卡密有效",
                data: _0x3290d4
              };
              return _0x940719;
            }
          } else {
            {
              const _0x567707 = {
                valid: false,
                msg: _0x5cb0c.msg || "卡密验证失败",
                data: _0x5cb0c.data || null
              };
              return _0x567707;
            }
          }
        }
      } catch (_0x331225) {
        {
          console.log("❌ 卡密查询请求失败: " + _0x331225.message);
          return {
            valid: false,
            msg: "查询请求失败: " + _0x331225.message,
            data: null
          };
        }
      }
    }
  }
  async function _0x34decb() {
    {
      console.log("🔐 正在验证卡密...");
      const _0x57d6a9 = await _0x3748bb();
      if (!_0x57d6a9.valid) {
        {
          console.log("❌ 卡密验证失败: " + _0x57d6a9.msg);
          if (_0x57d6a9.data) {
            {
              console.log("   卡密状态: " + (_0x57d6a9.data.status || "未知"));
            }
          }
          return false;
        }
      }
      const _0x2abebd = _0x57d6a9.data;
      console.log("✅ 卡密验证通过!");
      console.log("   卡密类型: " + _0x387288(_0x2abebd.type));
      if (_0x2abebd.type === "count") {
        {
          console.log("   剩余次数: " + _0x2abebd.val + " 次");
          if (_0x2abebd.val <= 0) {
            {
              console.log("❌ 卡密次数已用完，无法继续执行");
              return false;
            }
          }
        }
      } else {
        if (_0x2abebd.type === "permanent") {
          console.log("   有效期: 永久");
        } else {
          {
            console.log("   到期时间: " + _0x2abebd.expire_formatted);
            const _0x215c5b = Math.floor(Date.now() / 1000);
            if (_0x2abebd.expire > 0 && _0x215c5b > _0x2abebd.expire) {
              {
                console.log("❌ 卡密已过期，无法继续执行");
                return false;
              }
            }
            if (_0x2abebd.expire > 0) {
              {
                const _0x25f65f = _0x2abebd.expire - _0x215c5b;
                const _0x3500c8 = Math.floor(_0x25f65f / 3600);
                const _0x54715c = Math.floor(_0x25f65f % 3600 / 60);
                console.log("   剩余时间: " + _0x3500c8 + "小时" + _0x54715c + "分钟");
              }
            }
          }
        }
      }
      _0x2fc4ef = Date.now();
      return true;
    }
  }
  async function _0x2a03e7() {
    {
      if (_0x1899b8) {
        {
          return false;
        }
      }
      const _0x2c8b45 = Date.now();
      const _0xdd68e8 = (_0x2c8b45 - _0x2fc4ef) / 1000;
      if (_0xdd68e8 < _0x281b23) {
        {
          return true;
        }
      }
      let _0x34d527 = 0;
      const _0xced08 = 3;
      const _0x51424c = 3000;
      while (_0x34d527 <= _0xced08) {
        {
          const _0x3a2ea0 = await _0x3748bb();
          _0x2fc4ef = Date.now();
          if (_0x3a2ea0.valid) {
            const _0x375b40 = _0x3a2ea0.data;
            if (_0x375b40.type === "count" && _0x375b40.val <= 0) {
              {
                console.log("\n🚨 卡密次数已用完，停止执行任务!");
                _0x1899b8 = true;
                return false;
              }
            }
            if (_0x375b40.type !== "permanent" && _0x375b40.type !== "count") {
              {
                const _0x491a43 = Math.floor(Date.now() / 1000);
                if (_0x375b40.expire > 0 && _0x491a43 > _0x375b40.expire) {
                  console.log("\n🚨 卡密已过期，停止执行任务!");
                  _0x1899b8 = true;
                  return false;
                }
              }
            }
            return true;
          } else {
            {
              if (_0x3a2ea0.msg.includes("查询请求失败") || _0x3a2ea0.msg.includes("Error")) {
                {
                  _0x34d527++;
                  if (_0x34d527 <= _0xced08) {
                    console.log("\n🚨 卡密状态检查失败 (第" + _0x34d527 + "/" + _0xced08 + "次重试): " + _0x3a2ea0.msg);
                    console.log("   ⏱ 等待" + _0x51424c / 1000 + "秒后重试...");
                    await new Promise(_0x1661d9 => setTimeout(_0x1661d9, _0x51424c));
                  } else {
                    {
                      console.log("\n🚨 卡密状态检查失败，已重试" + _0xced08 + "次，停止执行任务!");
                      _0x1899b8 = true;
                      return false;
                    }
                  }
                }
              } else {
                console.log("\n🚨 卡密状态检查失败: " + _0x3a2ea0.msg);
                _0x1899b8 = true;
                return false;
              }
            }
          }
        }
      }
      return false;
    }
  }
  function _0x387288(_0x319e59) {
    {
      const _0x62c2b3 = {
        count: "次数卡",
        hour: "小时卡",
        day: "日卡",
        week: "周卡",
        month: "月卡",
        year: "年卡",
        permanent: "永久卡"
      };
      return _0x62c2b3[_0x319e59] || _0x319e59;
    }
  }
  async function _0x96a254() {
    {
      const _0x9f1a05 = "http://103.43.10.82/message.txt";
      try {
        {
          const _0x37e709 = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15"
          };
          const _0x3ef71f = {
            timeout: 10000,
            headers: _0x37e709
          };
          const _0x2a1320 = await _0x51d863.get(_0x9f1a05, _0x3ef71f);
          if (_0x2a1320.status === 200 && _0x2a1320.data) {
            {
              const _0x1420f1 = String(_0x2a1320.data).replace(/\\n/g, "\n").trim();
              if (!_0x1420f1) {
                {
                  return;
                }
              }
              console.log("\n" + "═".repeat(35));
              console.log("📢 公告");
              console.log("═".repeat(35));
              console.log(_0x1420f1);
              console.log("═".repeat(35) + "\n");
            }
          }
        }
      } catch (_0x12c5d1) {}
    }
  }
  console.log("⚠️ 免责声明 / DISCLAIMER", "═");
  console.log("1. 本脚本仅供学习研究，严禁商用或违法使用");
  console.log("2. 使用本脚本产生的任何后果由用户自行承担");
  console.log("3. 继续使用即表示您已同意以上条款");
  console.log("☷".repeat(30));
  console.log("🔑 卡密: " + _0x40b810);
  console.log("📌 运行模式: " + (_0x33bd31 ? "极速版(快手极速版)" : "普通版(快手)"));
  const _0x5dbda3 = process.env.TASK_CONFIG || (_0x33bd31 ? "look:50,lookk:50,dj:50,food:50,box:50,search:50" : "look:50,food:50,box:50,search:50");
  const _0x26ea79 = process.env.TASK_ORDER || "sequential";
  const _0x18a71f = process.env.TASK_CYCLE_ROUNDS ? parseInt(process.env.TASK_CYCLE_ROUNDS) : 0;
  const _0x94e023 = process.env.DEFAULT_TASKS ? process.env.DEFAULT_TASKS.split(",").map(_0x1bbf46 => _0x1bbf46.trim()) : _0x443ba5;
  const _0x51bfcb = process.env.KS_EXECUTION_TIMES ? parseInt(process.env.KS_EXECUTION_TIMES) : 50;
  const _0x1978d0 = process.env.TASK_EXECUTION_TIMES_PER_ROUND ? parseInt(process.env.TASK_EXECUTION_TIMES_PER_ROUND) : 1;
  const _0x316c59 = process.env.KSCOIN_LIMIT ? parseInt(process.env.KSCOIN_LIMIT) : 300000;
  const _0x5b77cb = process.env.IMMEDIATE_STOP_THRESHOLD ? parseInt(process.env.IMMEDIATE_STOP_THRESHOLD) : 0;
  const _0x2a0097 = process.env.LOW_REWARD_THRESHOLD ? parseInt(process.env.LOW_REWARD_THRESHOLD) : 10;
  const _0x40bedd = process.env.LOW_REWARD_LIMIT ? parseInt(process.env.LOW_REWARD_LIMIT) : 5;
  const _0xddad11 = process.env.AD_INFO_FAIL_LIMIT ? parseInt(process.env.AD_INFO_FAIL_LIMIT) : 30;
  const _0x4d1b78 = process.env.REQUEST_TIMEOUT ? parseInt(process.env.REQUEST_TIMEOUT) : 30000;
  const _0x176332 = process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY) : 666;
  let _0x4450da = process.env.WATCH_TIME_MIN ? parseInt(process.env.WATCH_TIME_MIN) : 40;
  let _0x5ca451 = process.env.WATCH_TIME_MAX ? parseInt(process.env.WATCH_TIME_MAX) : 65;
  _0x4450da < 0 && console.log("⚠️ 自定义最小观看时间 " + _0x4450da + " 秒，允许0秒设置");
  if (_0x5ca451 < 0) {
    {
      console.log("⚠️ 自定义最大观看时间" + _0x5ca451 + "秒，允许0秒设置");
    }
  }
  _0x4450da > _0x5ca451 && (console.log("⚠️ 最小观看时间" + _0x4450da + "秒大于最大观看时间" + _0x5ca451 + "秒，自动交换"), [_0x4450da, _0x5ca451] = [_0x5ca451, _0x4450da]);
  const _0x1e8229 = process.env.SEQUENTIAL_EXECUTION === "1";
  const _0x5b2d2f = "http://103.43.10.82/zdyupdate.json";
  const _0x1e4aa6 = "http://103.43.10.82/zdyupdate.js";
  const _0x4f3525 = 2;
  const _0x54e93d = process.env.AD_APPEND_ENABLED !== "0";
  const _0x42146c = process.env.SEARCH_AD_ENABLED !== "0";
  const _0x37d8dc = process.env.SEARCH_AD_APPEND_ENABLED !== "0";
  const _0x12cc06 = process.env.AD_APPEND_MAX_COUNT ? parseInt(process.env.AD_APPEND_MAX_COUNT) : 30;
  const _0x55c757 = process.env.AD_APPEND_REST_INTERVAL ? parseInt(process.env.AD_APPEND_REST_INTERVAL) : 2;
  const _0x8c9ddd = process.env.AD_APPEND_REST_MIN ? parseInt(process.env.AD_APPEND_REST_MIN) : 10000;
  const _0x212e0d = process.env.AD_APPEND_REST_MAX ? parseInt(process.env.AD_APPEND_REST_MAX) : 20000;
  const _0x47a7fa = process.env.SEARCH_KEYWORDS ? process.env.SEARCH_KEYWORDS.split(",").map(_0x39e46e => _0x39e46e.trim()).filter(_0x38ac40 => _0x38ac40) : process.env.SEARCH_KEYWORD ? [process.env.SEARCH_KEYWORD] : ["短剧小说"];
  const _0x9c55e0 = process.env.SEARCH_KEYWORDS_MODE || "sequential";
  async function _0x4d8f48() {
    {
      console.log("\n🔍 开始检测API接口连通性...");
      try {
        {
          console.log("🔍 正在检测签名服务");
          const _0x102327 = {
            test: true
          };
          const _0x1dd723 = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3 Mobile/15E148 Safari/605.1.15"
          };
          const _0xe585b9 = {
            timeout: 5000,
            headers: _0x1dd723
          };
          const _0x146c3b = await _0x51d863.post(_0x20f76c(), JSON.stringify(_0x102327), _0xe585b9);
          if (_0x146c3b.status === 200 || _0x146c3b.status === 400) {
            {
              console.log("✅ 签名服务状态正常!");
            }
          } else {
            {
              console.log("❌ 签名服务:连通异常，状态码: " + _0x146c3b.status);
            }
          }
        }
      } catch (_0x3e0d15) {
        if (_0x3e0d15.response && _0x3e0d15.response.status === 400) {
          console.log("✅ 签名服务状态正常!");
        } else {
          {
            console.log("❌ 签名服务:连通异常: " + _0x3e0d15.message);
          }
        }
      }
      try {
        {
          const _0x6154d9 = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3 Mobile/15E148 Safari/605.1.15"
          };
          const _0x3641b6 = {
            timeout: 3000,
            headers: _0x6154d9
          };
          const _0x3dc0ef = await _0x51d863.get(_0x2a87e6, _0x3641b6);
          if (_0x3dc0ef.status === 200) {
            {
              console.log("✅ 时间戳接口:连通正常！");
            }
          } else {
            {
              console.log("❌ 时间戳接口:连通异常，状态码: " + _0x3dc0ef.status);
            }
          }
        }
      } catch (_0xbddb05) {
        console.log("❌ 时间戳接口:连通异常: " + _0xbddb05.message);
      }
      try {
        {
          const _0x3573cb = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3 Mobile/15E148 Safari/605.1.15"
          };
          const _0x21cd4d = {
            timeout: 3000,
            headers: _0x3573cb
          };
          const _0xd810d5 = await _0x51d863.get(_0x5475f2, _0x21cd4d);
          if (_0xd810d5.status === 200) {
            {
              console.log("✅ KS广告接口:连通正常！");
            }
          } else {
            {
              console.log("❌ KS广告接口:连通异常，状态码: " + _0xd810d5.status);
            }
          }
        }
      } catch (_0x40b827) {
        console.log("❌ KS广告接口:连通异常: " + _0x40b827.message);
      }
      console.log("🔍 API接口连通性检测完成\n");
    }
  }
  async function _0x402a8d() {
    {
      try {
        {
          console.log("🔍 正在检查脚本更新...");
          console.log("📋 当前版本: v" + _0x4f3525);
          const _0x26a204 = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3 Mobile/15E148 Safari/605.1.15"
          };
          const _0x28f1b5 = {
            timeout: 10000,
            headers: _0x26a204
          };
          const _0x4cbf55 = await _0x51d863.get(_0x5b2d2f, _0x28f1b5);
          const _0x46fdf2 = parseInt(_0x4cbf55.data);
          if (isNaN(_0x46fdf2)) {
            {
              console.log("❌ 无法解析服务器版本号，跳过更新检查");
              return false;
            }
          }
          console.log("📋 最新版本: v" + _0x46fdf2);
          if (_0x46fdf2 <= _0x4f3525) {
            {
              console.log("✅ 当前已是最新版本！");
              return false;
            }
          }
          console.log("🔄 发现新版本，开始下载更新...");
          const _0x419946 = {
            timeout: 30000,
            responseType: "text",
            headers: {}
          };
          _0x419946.headers["User-Agent"] = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3 Mobile/15E148 Safari/605.1.15";
          const _0x5ecf1b = await _0x51d863.get(_0x1e4aa6, _0x419946);
          if (!_0x5ecf1b.data) {
            {
              console.log("❌ 下载更新脚本失败：内容为空");
              return false;
            }
          }
          const _0x37432f = __filename;
          const _0x34a78e = _0x187a26.dirname(_0x37432f);
          const _0x5ccee5 = _0x187a26.basename(_0x37432f);
          const _0x1d95f7 = _0x187a26.join(_0x34a78e, _0x5ccee5 + ".backup");
          _0x105e26.copyFileSync(_0x37432f, _0x1d95f7);
          console.log("📦 已创建备份: " + _0x1d95f7);
          _0x105e26.writeFileSync(_0x37432f, _0x5ecf1b.data, "utf8");
          console.log("✅ 脚本更新完成: " + _0x37432f);
          try {
            delete require.cache[require.resolve(_0x37432f)];
            console.log("✅ 更新验证成功");
          } catch (_0x28d48e) {
            console.log("❌ 更新验证失败，恢复备份...");
            _0x105e26.copyFileSync(_0x1d95f7, _0x37432f);
            console.log("✅ 备份恢复完成");
            return false;
          }
          console.log("\n" + "=".repeat(60));
          console.log("🎉 自动更新完成!");
          console.log("🔄 已从 v" + _0x4f3525 + " 更新到 v" + _0x46fdf2);
          console.log("🚀 请重新运行以使用新版本！");
          console.log("🚀 如果运行一直显示更新，请加🐧群:850618882");
          console.log("=".repeat(60));
          return true;
        }
      } catch (_0x253a30) {
        {
          console.log("❌ 更新检查失败: " + _0x253a30.message);
          return false;
        }
      }
    }
  }
  async function _0xb007c5() {
    {
      try {
        {
          const _0x36123c = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          };
          const _0x2f8744 = {
            headers: _0x36123c,
            timeout: 10000
          };
          const _0x349527 = await _0x51d863.get(_0x2a87e6, _0x2f8744);
          if (_0x349527.data) {
            {
              const _0x4a906b = _0x349527.data;
              const _0x4f675f = _0x4a906b.match(/QZOutputJson=({.*?});/);
              if (_0x4f675f && _0x4f675f[1]) {
                {
                  const _0x570eab = JSON.parse(_0x4f675f[1]);
                  if (_0x570eab && _0x570eab.t) {
                    {
                      return parseInt(_0x570eab.t);
                    }
                  }
                }
              }
            }
          }
        }
      } catch (_0x581b02) {
        {
          console.log("❌ 获取腾讯时间戳失败: " + _0x581b02.message);
        }
      }
      return Math.floor(Date.now() / 1000);
    }
  }
  async function _0x1ecc2e() {
    {
      const _0x5840a5 = await _0xb007c5();
      const _0xb1064d = _0x5840a5 + "12345";
      return {
        key: _0x2727cc.createHash("md5").update(_0xb1064d).digest("hex"),
        timestamp: _0x5840a5
      };
    }
  }
  let _0xcc85ee = 0;
  const _0x3bf9d4 = 5;
  function _0x36745d(_0x574bcf, _0x52bc4c) {
    {
      const _0x9496f6 = parseInt(process.env[_0x574bcf], 10);
      return isNaN(_0x9496f6) ? _0x52bc4c : _0x9496f6;
    }
  }
  const _0x2380fc = _0x36745d("KSCOIN_LIMIT", _0x316c59);
  const _0x1186be = _0x36745d("IMMEDIATE_STOP_THRESHOLD", _0x5b77cb);
  const _0x3f2b7e = _0x36745d("LOW_REWARD_THRESHOLD", _0x2a0097);
  const _0x66664e = _0x36745d("LOW_REWARD_LIMIT", _0x40bedd);
  const _0x301ddc = _0x36745d("AD_INFO_FAIL_LIMIT", _0xddad11);
  function _0xb8152b() {
    {
      const _0x3ed735 = {};
      const _0x324a75 = _0x5dbda3.split(",");
      _0x324a75.forEach(_0x3d6f1e => {
        {
          const [_0x54ca01, _0x3372dd] = _0x3d6f1e.split(":").map(_0x273e0f => _0x273e0f.trim());
          if (_0x54ca01 && _0x3372dd && !isNaN(parseInt(_0x3372dd))) {
            {
              _0x3ed735[_0x54ca01] = parseInt(_0x3372dd);
            }
          }
        }
      });
      const _0x5a1b13 = {
        food: 50,
        look: 50,
        box: 50,
        search: 50,
        dj: 50,
        lookk: 50
      };
      const _0x507e36 = {
        food: 50,
        look: 50,
        box: 50,
        search: 50
      };
      const _0x37c60a = _0x33bd31 ? _0x5a1b13 : _0x507e36;
      const _0x160634 = {
        ..._0x37c60a,
        ..._0x3ed735
      };
      return _0x160634;
    }
  }
  function _0x2de05f() {
    {
      const _0x132e7b = process.env.Task;
      if (!_0x132e7b) {
        return _0x94e023;
      }
      const _0x6067a9 = _0x132e7b.split(",").map(_0xfd00da => _0xfd00da.trim().toLowerCase()).filter(Boolean);
      const _0x5e256d = _0x6067a9.filter(_0x51271e => _0x424cfb.includes(_0x51271e));
      if (_0x5e256d.length === 0) {
        {
          return _0x94e023;
        }
      }
      return _0x5e256d;
    }
  }
  function _0x40cbac() {
    {
      const _0x5e1edd = [];
      const _0x38238e = new Set();
      if (process.env.ksck) {
        {
          const _0x101bb6 = process.env.ksck;
          const _0x50ed59 = _0x101bb6.split("&").map(_0x5d6bb5 => _0x5d6bb5.trim()).filter(Boolean);
          _0x5e1edd.push(..._0x50ed59);
        }
      }
      for (let _0x5faea = 1; _0x5faea <= 666; _0x5faea++) {
        {
          const _0x3e83ae = "ksck" + _0x5faea;
          if (process.env[_0x3e83ae]) {
            {
              const _0x1134bd = process.env[_0x3e83ae];
              const _0x478f0c = _0x1134bd.split("&").map(_0x33555b => _0x33555b.trim()).filter(Boolean);
              _0x5e1edd.push(..._0x478f0c);
            }
          }
        }
      }
      const _0x43459d = [];
      for (const _0x17b5df of _0x5e1edd) {
        {
          if (!_0x38238e.has(_0x17b5df)) {
            {
              _0x38238e.add(_0x17b5df);
              _0x43459d.push(_0x17b5df);
            }
          }
        }
      }
      return _0x43459d;
    }
  }
  const _0x21be88 = _0x40cbac();
  const _0x47ff97 = _0x21be88.length;
  const _0x4639c3 = _0x2de05f();
  const _0x200ca1 = _0xb8152b();
  async function _0x509427() {
    {
      const _0x43411e = await _0x34decb();
      !_0x43411e && (console.log("\n❌ 卡密验证未通过，程序退出"), console.log("   请检查卡密是否正确、是否过期、是否有剩余次数"), process.exit(1));
      await _0x96a254();
      await _0x4d8f48();
      const _0x1d5aa0 = await _0x402a8d();
      if (_0x1d5aa0) {
        {
          return;
        }
      }
      console.log("\n" + "-".repeat(35));
      if (_0x33bd31) {
        {
          console.log("🚀 ks极速版-启动成功！");
          console.log("♻️ 当前版本: v" + _0x4f3525 + " (合并版-极速模式)");
          console.log("👁️‍🗨️ look:看广告得金币任务");
          console.log("👁️‍🗨️ lookk:看广告得奖励任务");
          console.log("👁️‍🗨️ dj:看短剧广告任务");
          console.log("👁️‍🗨️ food:看饭补广告任务");
          console.log("👁️‍🗨️ box:看宝箱广告任务");
          console.log("👁️‍🗨️ search:看搜索广告任务");
        }
      } else {
        console.log("🚀 ks普通版-启动成功！");
        console.log("♻️ 当前版本: v" + _0x4f3525 + " (合并版-普通模式)");
        console.log("🍃 任务类型:look➠看广告  box➠宝箱广告  food➠饭补  search➠搜索");
      }
      console.log("🐧群: 850618882");
      console.log("-".repeat(35));
      console.log("📱 账号数量: " + _0x47ff97 + "个");
      console.log("🎯 执行任务: " + _0x4639c3.join(", "));
      _0x18a71f > 0 ? (console.log("⚙️ 执行模式: 循环执行 " + _0x18a71f + " 轮"), console.log("🔄 任务顺序: " + (_0x26ea79 === "sequential" ? "顺序执行" : "循环执行"))) : (console.log("⚙️ 执行模式: 独立次数执行"), _0x4639c3.forEach(_0x45f837 => {
        {
          if (_0x200ca1[_0x45f837]) {
            {
              console.log("   " + _0x45f837 + ": " + _0x200ca1[_0x45f837] + "次");
            }
          }
        }
      }));
      console.log("💰 金币上限: " + _0x2380fc);
      console.log("⚠️ 低金币阈值: " + _0x3f2b7e + "金币, 累计" + _0x66664e + "次自动切换");
      console.log("❌ 广告信息失败限制: " + _0x301ddc + "次");
      console.log("🔍 搜索广告: " + (_0x42146c ? "开启" : "关闭"));
      console.log("🔤 搜索关键词: " + _0x47a7fa.join(", ") + " (模式: " + _0x9c55e0 + ")");
      console.log("📺 广告追加: " + (_0x54e93d ? "开启" : "关闭") + ", 最大追加次数=" + _0x12cc06);
      console.log("⏱ 追加休息: 每" + _0x55c757 + "次休息" + _0x8c9ddd / 1000 + "-" + _0x212e0d / 1000 + "秒");
      console.log("⏱ 观看时间: " + _0x4450da + "-" + _0x5ca451 + "秒 (支持0秒设置)");
      console.log("🔢 多账号执行模式: " + (_0x1e8229 ? "顺序执行" : "并发执行"));
      console.log("📌 应用模式: " + _0x528b00.modeName + " (" + _0x528b00.kpn + ")");
      console.log("-".repeat(35) + "\n");
      _0x47ff97 > (process.env.MAX_CONCURRENCY || _0x176332) && (console.log("❌ 错误: 检测到 " + _0x47ff97 + " 个账号配置，最多只允许" + (process.env.MAX_CONCURRENCY || _0x176332) + "个"), process.exit(1));
      const _0x355c85 = _0x215e64();
      console.log("📊 共找到 " + _0x355c85.length + " 个有效账号");
      !_0x355c85.length && (console.log("❌ 没有找到有效账号，程序退出"), process.exit(1));
      const _0x52f4ec = _0x1e8229 ? 1 : _0x176332;
      console.log("🔢 执行模式: " + (_0x1e8229 ? "顺序执行" : "并发执行") + " (并发数: " + _0x52f4ec + ")");
      const _0x50ad8e = [];
      await _0x394aab(_0x355c85, _0x52f4ec, async _0x59900a => {
        {
          if (_0x1899b8) {
            {
              console.log("🛑 卡密已失效，跳过账号 " + _0x59900a.index);
              _0x50ad8e.push({
                index: _0x59900a.index,
                remark: _0x59900a.remark || "无备注",
                nickname: "账号" + _0x59900a.index,
                initialCoin: 0,
                finalCoin: 0,
                coinChange: 0,
                error: "卡密已失效"
              });
              return;
            }
          }
          console.log("\n── 🚀 开始处理 " + _0x59900a.index + "号账号" + (_0x59900a.remark ? "(" + _0x59900a.remark + ")" : "") + " ──");
          try {
            {
              const _0x2ab154 = await _0x4ea352(_0x59900a);
              _0x50ad8e.push({
                index: _0x59900a.index,
                remark: _0x59900a.remark || "无备注",
                nickname: _0x2ab154?.["nickname"] || "账号" + _0x59900a.index,
                initialCoin: _0x2ab154?.["initialCoin"] || 0,
                finalCoin: _0x2ab154?.["finalCoin"] || 0,
                coinChange: _0x2ab154?.["coinChange"] || 0,
                stats: _0x2ab154?.["stats"] || {},
                coinLimitExceeded: _0x2ab154?.["coinLimitExceeded"] || false,
                lowRewardStopped: _0x2ab154?.["lowRewardStopped"] || false,
                accumulatedCoins: _0x2ab154?.["accumulatedCoins"] || 0,
                adInfoFailCount: _0x2ab154?.["adInfoFailCount"] || 0
              });
            }
          } catch (_0x1ccdb8) {
            {
              console.log("❌ 账号[" + _0x59900a.index + "] 执行异常：" + _0x1ccdb8.message);
              _0x50ad8e.push({
                index: _0x59900a.index,
                remark: _0x59900a.remark || "无备注",
                nickname: "账号" + _0x59900a.index,
                initialCoin: 0,
                finalCoin: 0,
                coinChange: 0,
                error: _0x1ccdb8.message
              });
            }
          }
        }
      });
      _0x50ad8e.sort((_0x4ceea2, _0x136a05) => _0x4ceea2.index - _0x136a05.index);
      _0x218672(_0x50ad8e);
    }
  }
  async function _0x305590(_0x4811af, _0xe00f62 = null, _0x393449 = "Unknown Request") {
    {
      const _0x3f1506 = {
        ..._0x4811af
      };
      const _0x521e15 = _0x3f1506;
      let _0x3c2611 = null;
      if (_0xe00f62) {
        {
          try {
            {
              _0x3c2611 = new _0x4627cd(_0xe00f62);
            }
          } catch (_0x49b718) {
            console.log("❌ " + _0x393449 + " 代理URL无效，尝试直连模式");
          }
        }
      }
      try {
        {
          const _0x30104a = {
            method: _0x521e15.method || "GET",
            url: _0x521e15.url,
            headers: _0x521e15.headers || {},
            data: _0x521e15.body || _0x521e15.form,
            timeout: _0x521e15.timeout || _0x4d1b78
          };
          if (_0x3c2611) {
            _0x30104a.httpAgent = _0x3c2611;
            _0x30104a.httpsAgent = _0x3c2611;
          } else {
            {
              const _0x3062de = {
                rejectUnauthorized: false
              };
              _0x30104a.httpsAgent = new _0x152938.Agent(_0x3062de);
            }
          }
          const _0x59c3ea = await _0x51d863(_0x30104a);
          const _0x104eb2 = {
            response: _0x59c3ea,
            body: _0x59c3ea.data
          };
          return _0x104eb2;
        }
      } catch (_0x508755) {
        {
          const _0x2a7145 = {
            response: null,
            body: null
          };
          return _0x2a7145;
        }
      }
    }
  }
  async function _0xe6f3ff(_0x4bd5b4, _0x22c140 = "代理连通性检测") {
    {
      if (!_0x4bd5b4) {
        {
          const _0xa2c558 = {
            ok: true,
            msg: "✅ 未配置代理（直连模式）",
            ip: "localhost"
          };
          return _0xa2c558;
        }
      }
      let _0x393e5a = 0;
      const _0x13021a = 5;
      while (_0x393e5a < _0x13021a) {
        {
          try {
            {
              const _0x360736 = new _0x4627cd(_0x4bd5b4);
              const _0x53cf39 = await _0x51d863.get("https://ipv4.gdt.qq.com/get_client_ip", {
                httpAgent: _0x360736,
                httpsAgent: _0x360736,
                timeout: 10000,
                headers: {
                  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3  Mobile/15E148 Safari/605.1.15",
                  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                  "Sec-Fetch-Site": "none",
                  "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                  "Sec-Fetch-Mode": "navigate",
                  "Cache-Control": "no-cache",
                  Pragma: "no-cache",
                  "Sec-Fetch-Dest": "document",
                  Cookie: "pgv_pvid=2059158520; fqm_pvqid=28d9ba83-df83-4304-98c6-dbae8b6c200b"
                }
              });
              if (_0x53cf39.status === 200 && _0x53cf39.data && typeof _0x53cf39.data === "string") {
                {
                  const _0x212de8 = _0x53cf39.data.trim();
                  if (_0x212de8 && _0x212de8 !== "") {
                    {
                      return {
                        ok: true,
                        msg: "✅ SOCKS5代理正常，出口IP: " + _0x212de8,
                        ip: _0x212de8
                      };
                    }
                  }
                }
              }
            }
          } catch (_0x15c08a) {}
          _0x393e5a++;
          if (_0x393e5a < _0x13021a) {
            {
              console.log("   🔄 代理连接失败，第" + _0x393e5a + "次重试...");
              await new Promise(_0x766921 => setTimeout(_0x766921, 2000));
            }
          }
        }
      }
      return {
        ok: false,
        msg: "❌ 代理连接失败，已重试" + _0x13021a + "次",
        ip: null
      };
    }
  }
  const _0x120d91 = ["https://ipv4.gdt.qq.com/get_client_ip", "https://myip.ipip.net", "https://v4.ident.me", "https://ipv4.icanhazip.com"];
  async function _0x5ecbd0(_0x1368d3, _0x40ab77 = "代理连通性检测") {
    {
      if (!_0x1368d3) {
        {
          const _0x497f15 = {
            ok: true,
            msg: "✅ 未配置代理（直连模式）",
            ip: "localhost"
          };
          return _0x497f15;
        }
      }
      let _0x45a65b = null;
      try {
        const _0x47b870 = _0x1368d3.match(/(\d+\.\d+\.\d+\.\d+)/);
        if (_0x47b870) {
          {
            _0x45a65b = _0x47b870[1];
          }
        }
      } catch (_0x1afb4d) {
        console.log("❌ 无法解析代理IP: " + _0x1afb4d.message);
      }
      if (!_0x45a65b) {
        {
          const _0x4282b0 = {
            ok: false,
            msg: "❌ 无法解析代理IP地址",
            ip: null
          };
          return _0x4282b0;
        }
      }
      const _0x1a4e90 = _0x120d91.map(async (_0x321be7, _0x18fdf2) => {
        {
          try {
            {
              const _0x287eb0 = new _0x4627cd(_0x1368d3);
              const _0x3d03d9 = {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/125.3  Mobile/15E148 Safari/605.1.15",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Sec-Fetch-Site": "none",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Sec-Fetch-Mode": "navigate",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                "Sec-Fetch-Dest": "document"
              };
              const _0xc9d1de = {
                httpAgent: _0x287eb0,
                httpsAgent: _0x287eb0,
                timeout: 10000,
                headers: _0x3d03d9
              };
              const _0x2b4311 = await _0x51d863.get(_0x321be7, _0xc9d1de);
              if (_0x2b4311.status === 200 && _0x2b4311.data) {
                {
                  let _0x1b5fa3 = "";
                  if (_0x321be7.includes("myip.ipip.net")) {
                    {
                      const _0x51a34a = _0x2b4311.data.match(/当前 IP：(\d+\.\d+\.\d+\.\d+)/);
                      if (_0x51a34a) {
                        {
                          _0x1b5fa3 = _0x51a34a[1];
                        }
                      }
                    }
                  } else {
                    {
                      _0x1b5fa3 = _0x2b4311.data.toString().trim();
                    }
                  }
                  if (_0x1b5fa3 && _0x1b5fa3 !== "") {
                    {
                      if (_0x1b5fa3 === _0x45a65b) {
                        {
                          return {
                            success: true,
                            url: _0x321be7,
                            ip: _0x1b5fa3,
                            matched: true,
                            message: "✅ 接口" + (_0x18fdf2 + 1) + " IP匹配: " + _0x1b5fa3
                          };
                        }
                      } else {
                        {
                          return {
                            success: true,
                            url: _0x321be7,
                            ip: _0x1b5fa3,
                            matched: false,
                            message: "⚠️ 接口" + (_0x18fdf2 + 1) + " IP不匹配: 检测到" + _0x1b5fa3 + ", 期望" + _0x45a65b
                          };
                        }
                      }
                    }
                  }
                }
              }
            }
          } catch (_0x5ea618) {
            {
              return {
                success: false,
                url: _0x321be7,
                ip: null,
                matched: false,
                message: "❌ 接口" + (_0x18fdf2 + 1) + "错误: " + _0x5ea618.message
              };
            }
          }
        }
      });
      const _0x47643e = await Promise.all(_0x1a4e90);
      const _0x4b58fd = _0x47643e.filter(_0x5200bd => _0x5200bd.success);
      const _0x4c19c2 = _0x4b58fd.filter(_0x478fd1 => _0x478fd1.matched);
      const _0x145e12 = [...new Set(_0x4b58fd.map(_0x2e5720 => _0x2e5720.ip).filter(_0x3a8f1f => _0x3a8f1f))];
      _0x47643e.forEach(_0x5b6fa0 => {
        console.log("   " + _0x5b6fa0.message);
      });
      if (_0x4c19c2.length > 0) {
        return {
          ok: true,
          msg: "✅ 代理检测通过 (" + _0x4c19c2.length + "/" + _0x120d91.length + "个接口IP匹配)",
          ip: _0x45a65b,
          detectedIPs: _0x145e12,
          matchCount: _0x4c19c2.length
        };
      } else {
        if (_0x4b58fd.length > 0) {
          {
            return {
              ok: true,
              msg: "⚠️ 代理连通但IP不匹配 (检测到: " + _0x145e12.join(", ") + ", 期望: " + _0x45a65b + ")",
              ip: _0x45a65b,
              detectedIPs: _0x145e12,
              matchCount: 0
            };
          }
        } else {
          {
            const _0x359916 = _0x47643e.map(_0x5895e2 => _0x5895e2.message).join("; ");
            return {
              ok: false,
              msg: "❌ 代理连接失败: " + _0x359916,
              ip: null,
              detectedIPs: [],
              matchCount: 0
            };
          }
        }
      }
    }
  }
  async function _0x42f728(_0x2a05a1, _0x27fb21 = "代理连通性检测") {
    {
      const _0x1b70e2 = process.env.DL;
      if (_0x1b70e2 === "0") {
        {
          console.log("   🔧 DL=0，跳过代理检测");
          const _0x14ced4 = {
            ok: true,
            msg: "✅ 已跳过代理检测（直连模式）",
            ip: "localhost"
          };
          return _0x14ced4;
        }
      }
      if (_0x1b70e2 === "3") {
        {
          console.log("   🔧 DL=3，使用V3代理检测逻辑");
          return await _0xe6f3ff(_0x2a05a1, _0x27fb21);
        }
      }
      if (_0x1b70e2 === "4") {
        console.log("   🔧 DL=4，使用V4代理检测逻辑");
        return await _0x5ecbd0(_0x2a05a1, _0x27fb21);
      }
      if (_0x1b70e2 === undefined) {
        {
          console.log("   🔧 未设置DL环境变量，先尝试V3代理检测逻辑");
          const _0x5e070f = await _0xe6f3ff(_0x2a05a1, _0x27fb21);
          if (_0x5e070f.ok) {
            return _0x5e070f;
          }
          console.log("   🔧 V3代理检测失败，尝试V4代理检测逻辑");
          const _0xae55ac = await _0x5ecbd0(_0x2a05a1, _0x27fb21);
          if (_0xae55ac.ok) {
            {
              return _0xae55ac;
            }
          }
          const _0x2249b2 = {
            ok: false,
            msg: "❌ 代理检测不通过或存在问题，请创建DL环境变量设置值为0跳过检测，或使用直连模式！",
            ip: null
          };
          return _0x2249b2;
        }
      }
      console.log("   🔧 使用默认V3代理检测逻辑");
      return await _0xe6f3ff(_0x2a05a1, _0x27fb21);
    }
  }
  async function _0x531e69(_0x12f203, _0x8996e4, _0x2f65a5 = "?") {
    {
      const {
        body: _0x4eeda1
      } = await _0x305590({
        method: "GET",
        url: _0x528b00.basicInfoUrl,
        headers: {
          Host: _0x528b00.basicInfoHost,
          "User-Agent": "kwai-android aegon/3.56.0",
          Cookie: _0x12f203,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        timeout: 12000
      }, _0x8996e4, "获取账号基本信息");
      if (_0x4eeda1 && _0x4eeda1.result === 1 && _0x4eeda1.data) {
        {
          if (_0x33bd31) {
            {
              const _0x42cde7 = {
                nickname: _0x4eeda1.data.userData?.["nickname"] || null,
                totalCoin: _0x4eeda1.data.totalCoin ?? null,
                allCash: _0x4eeda1.data.allCash ?? null,
                accumulativeCash: null
              };
              return _0x42cde7;
            }
          } else {
            {
              const _0x1384e4 = {
                nickname: _0x4eeda1.data.nickname || null,
                totalCoin: _0x4eeda1.data.account?.["coinAmount"] ?? null,
                allCash: _0x4eeda1.data.account?.["cashAmountDisplay"] ?? null,
                accumulativeCash: _0x4eeda1.data.account?.["accumulativeAmountDisplay"] ?? null
              };
              return _0x1384e4;
            }
          }
        }
      }
      return null;
    }
  }
  class _0x13dccf {
    constructor({
      index: _0x3dbe6f,
      salt: _0x4cc187,
      cookie: _0x2d9944,
      nickname = "",
      proxyUrl = null,
      tasksToExecute = _0x94e023,
      remark = ""
    }) {
      {
        this.index = _0x3dbe6f;
        this.salt = _0x4cc187;
        this.cookie = _0x2d9944;
        this.nickname = nickname || remark || "账号" + _0x3dbe6f;
        this.remark = remark;
        this.proxyUrl = proxyUrl;
        this.coinLimit = _0x2380fc;
        this.coinExceeded = false;
        this.tasksToExecute = tasksToExecute;
        this.accumulatedCoins = 0;
        this.searchKeywords = _0x47a7fa;
        this.searchKeywordsMode = _0x9c55e0;
        this.currentKeywordIndex = 0;
        this.lowRewardCount = 0;
        this.maxLowRewardCount = 30;
        this.adInfoFailCount = 0;
        this.maxAdInfoFailCount = _0x301ddc;
        this.taskLowRewardCount = {};
        this.tasksToExecute.forEach(_0x7e4e36 => {
          {
            this.taskLowRewardCount[_0x7e4e36] = 0;
          }
        });
        this.extractCookieInfo();
        this.headers = {
          Host: "nebula.kuaishou.com",
          Connection: "keep-alive",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
          Cookie: this.cookie,
          "content-type": "application/json"
        };
        this.taskReportPath = "/rest/r/ad/task/report";
        this.startTime = Date.now();
        this.endTime = this.startTime - 30000;
        this.queryParams = "mod=" + this.mod + "&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
        this.taskConfigs = _0x2e7745;
        this.taskStats = {};
        this.tasksToExecute.forEach(_0x2ff3b2 => {
          {
            if (this.taskConfigs[_0x2ff3b2]) {
              {
                const _0x3421c9 = {
                  success: 0,
                  failed: 0,
                  totalReward: 0
                };
                this.taskStats[_0x2ff3b2] = _0x3421c9;
              }
            }
          }
        });
        this.lowRewardStreak = 0;
        this.immediateStopThreshold = _0x1186be;
        this.lowRewardThreshold = _0x3f2b7e;
        this.lowRewardLimit = _0x66664e;
        this.stopAllTasks = false;
        this.taskLimitReached = {};
        this.tasksToExecute.forEach(_0x3b164b => {
          {
            if (this.taskConfigs[_0x3b164b]) {
              {
                this.taskLimitReached[_0x3b164b] = false;
              }
            }
          }
        });
        this.taskDisabled = {};
        this.tasksToExecute.forEach(_0x1edd74 => {
          {
            this.taskDisabled[_0x1edd74] = false;
          }
        });
        this.ssFirstTaskShown = false;
        this.currentTaskIndex = 0;
        this.taskLowRewardFlags = {};
        this.tasksToExecute.forEach(_0x2f957c => {
          {
            this.taskLowRewardFlags[_0x2f957c] = false;
          }
        });
        this.isSingleTaskMode = this.tasksToExecute.length === 1;
        this.isCycleMode = _0x18a71f > 0;
        this.cycleRounds = _0x18a71f;
        this.currentCycleRound = 0;
        this.taskExecutionOrder = _0x26ea79;
      }
    }
    checkAccumulatedCoinsLimit() {
      if (this.accumulatedCoins >= this.coinLimit) {
        {
          console.log("💰 " + this.getAccountDisplayName() + " 累计获得金币已达 " + this.accumulatedCoins + "，超过阈值 " + this.coinLimit + "，停止任务");
          this.coinExceeded = true;
          this.stopAllTasks = true;
          return true;
        }
      }
      return false;
    }
    getSearchKeyword() {
      {
        if (this.searchKeywords.length === 0) {
          return "短剧小说";
        }
        if (this.searchKeywords.length === 1) {
          return this.searchKeywords[0];
        }
        if (this.searchKeywordsMode === "random") {
          {
            return this.searchKeywords[Math.floor(Math.random() * this.searchKeywords.length)];
          }
        } else {
          {
            const _0x13021f = this.searchKeywords[this.currentKeywordIndex];
            this.currentKeywordIndex = (this.currentKeywordIndex + 1) % this.searchKeywords.length;
            return _0x13021f;
          }
        }
      }
    }
    _getImpExtData(_0x1446a0) {
      {
        if (_0x1446a0.name === "搜索广告") {
          {
            const _0x297c9d = this.getSearchKeyword();
            const _0xabc5d4 = {
              openH5AdCount: 2,
              sessionLookedCompletedCount: "1",
              sessionType: "1",
              searchKey: _0x297c9d,
              triggerType: "2",
              disableReportToast: "true",
              businessEnterAction: "7",
              neoParams: _0x1446a0.linkUrl
            };
            return JSON.stringify(_0xabc5d4);
          }
        } else {
          {
            return "{}";
          }
        }
      }
    }
    async checkCoinLimit() {
      {
        try {
          {
            const _0x34b20a = await _0x531e69(this.cookie, this.proxyUrl, this.index);
            if (_0x34b20a && _0x34b20a.totalCoin) {
              {
                const _0x310b2d = parseInt(_0x34b20a.totalCoin);
                if (_0x310b2d >= this.coinLimit) {
                  {
                    console.log("💰 " + this.getAccountDisplayName() + " 当前金币已达 " + _0x310b2d + "，超过阈值 " + this.coinLimit + "，停止任务");
                    this.coinExceeded = true;
                    this.stopAllTasks = true;
                    return true;
                  }
                }
              }
            }
            return false;
          }
        } catch (_0x578777) {
          {
            console.log("❌ " + this.getAccountDisplayName() + " 金币检查异常: " + _0x578777.message);
            return false;
          }
        }
      }
    }
    getAccountDisplayName() {
      {
        return "账号[" + this.nickname + "]" + (this.remark ? "(" + this.remark + ")" : "");
      }
    }
    extractCookieInfo() {
      {
        try {
          {
            const _0x5b32ea = this.cookie.match(/mod=([^;]+)/);
            const _0x34d2e1 = this.cookie.match(/egid=([^;]+)/);
            const _0x25e0e9 = this.cookie.match(/did=([^;]+)/);
            const _0x42ace8 = this.cookie.match(/userId=([^;]+)/);
            const _0x91b8e3 = this.cookie.match(/kuaishou\.api_st=([^;]+)/);
            const _0x7fb98c = this.cookie.match(/appver=([^;]+)/);
            const _0x5de20a = this.cookie.match(/region_ticket=([^;]+)/);
            const _0x53d195 = this.cookie.match(/token=([^;]+)/);
            this.token = _0x53d195 ? _0x53d195[1] : "";
            this.customRegionTicket = _0x5de20a ? _0x5de20a[1] : "RT_66898EB2122EC01C6A99E8FCCB4887F9C156DFC294E9FD56AD0156AECEB24C4EC69BFDFE7";
            this.mod = _0x5b32ea ? _0x5b32ea[1] : _0x33bd31 ? "Xiaomi(MI 11)" : "Xiaomi(23116PN5BC)";
            this.egid = _0x34d2e1 ? _0x34d2e1[1] : "";
            this.did = _0x25e0e9 ? _0x25e0e9[1] : "";
            this.userId = _0x42ace8 ? _0x42ace8[1] : "";
            this.kuaishouApiSt = _0x91b8e3 ? _0x91b8e3[1] : "";
            this.appver = _0x7fb98c ? _0x7fb98c[1] : "13.7.20.10468";
            if (!this.egid || !this.did) {
              {
                console.log("⚠️ " + this.getAccountDisplayName() + " cookie格式可能无egid或did，继续尝试...");
              }
            }
          }
        } catch (_0x1bac3c) {
          {
            console.log("❌ " + this.getAccountDisplayName() + " 解析cookie失败: " + _0x1bac3c.message);
          }
        }
      }
    }
    getTaskStats() {
      {
        return this.taskStats;
      }
    }
    printTaskStats() {
      {
        console.log("\n📊 " + this.getAccountDisplayName() + " 任务统计:");
        for (const [_0x4f1493, _0x1cc9fa] of Object.entries(this.taskStats)) {
          const _0xcc349e = this.taskConfigs[_0x4f1493].name;
          console.log("   " + _0xcc349e + ": 成功" + _0x1cc9fa.success + "次, 失败" + _0x1cc9fa.failed + "次, 奖励" + _0x1cc9fa.totalReward + "金币");
        }
        console.log("💰 累计获得金币: " + this.accumulatedCoins);
        console.log("❌ 广告信息失败次数: " + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
      }
    }
    async retryOperation(_0x478501, _0x286187, _0x3805e0 = 5, _0x214856 = 2000) {
      {
        let _0x1c7bb0 = 0;
        let _0x20eafe = null;
        while (_0x1c7bb0 < _0x3805e0) {
          {
            try {
              {
                const _0x351bb6 = await _0x478501();
                if (_0x351bb6) {
                  return _0x351bb6;
                }
                _0x20eafe = new Error(_0x286187 + " 返回空结果");
              }
            } catch (_0x515ba6) {
              {
                _0x20eafe = _0x515ba6;
              }
            }
            _0x1c7bb0++;
            if (_0x1c7bb0 < _0x3805e0) {
              {
                let _0x5a82d6 = "🔄 " + this.getAccountDisplayName() + " " + _0x286187 + " 失败，重试 " + _0x1c7bb0 + "/" + _0x3805e0;
                _0x286187.includes("获取") && _0x286187.includes("广告信息") && (_0x5a82d6 += " (偶尔出现可能是[1.面板网络不好][2.代理延迟太高]无视即可！若一直出现该提示[1.请重抓ck和salt][2.更换青龙面板][3.更换代理ip][4.不要使用国外ip的青龙面板])");
                console.log(_0x5a82d6);
                await new Promise(_0x3615cc => setTimeout(_0x3615cc, _0x214856));
              }
            }
          }
        }
        console.log("❌ " + this.getAccountDisplayName() + " " + _0x286187 + " 失败，已重试" + _0x3805e0 + "次");
        return null;
      }
    }
    async getAdInfo(_0x56cc1f) {
      {
        try {
          {
            const _0x5e67e9 = "/rest/e/reward/mixed/ad";
            const _0x1311dc = {
              encData: "|encData|",
              sign: "|sign|",
              cs: "false",
              client_key: _0x528b00.clientKey,
              videoModelCrowdTag: "1_23",
              os: "android",
              "kuaishou.api_st": this.kuaishouApiSt,
              uQaTag: "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
            };
            const _0x2a676b = {
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
              kpn: _0x528b00.kpn,
              androidApiLevel: "35",
              country_code: "cn",
              sys: "ANDROID_15",
              sw: "1080",
              sh: "2400",
              abi: "arm64",
              userRecoBit: "0"
            };
            const _0x3f0a7a = {
              appId: _0x528b00.appId,
              name: _0x528b00.name,
              packageName: _0x528b00.packageName,
              version: this.appver,
              versionCode: -1
            };
            const _0x2239c8 = {
              width: 1080,
              height: 2249
            };
            const _0xeee25c = {
              osType: 1,
              osVersion: "15",
              deviceId: this.did,
              screenSize: _0x2239c8,
              ftt: ""
            };
            const _0x409ced = {
              userId: this.userId,
              age: 0,
              gender: ""
            };
            const _0x2cb1ae = {
              appInfo: _0x3f0a7a,
              deviceInfo: _0xeee25c,
              userInfo: _0x409ced,
              impInfo: [{
                pageId: _0x56cc1f.pageId || _0x528b00.defaultPageId,
                subPageId: _0x56cc1f.subPageId,
                action: 0,
                browseType: _0x56cc1f.name === "搜索广告" ? 4 : 3,
                impExtData: this._getImpExtData(_0x56cc1f),
                mediaExtData: "{}"
              }]
            };
            const _0x4510b1 = Buffer.from(JSON.stringify(_0x2cb1ae)).toString("base64");
            let _0x5e672a = await this.getSign(_0x4510b1);
            if (!_0x5e672a) {
              console.log("❌ " + this.getAccountDisplayName() + " 获取签名失败，跳过此次任务");
              return null;
            }
            _0x1311dc.encData = _0x5e672a.encdata;
            _0x1311dc.sign = _0x5e672a.sign;
            let _0x44e77d = await this.requestSignService({
              urlpath: _0x5e67e9,
              reqdata: _0x2b88c5.stringify(_0x1311dc) + "&" + _0x2b88c5.stringify(_0x2a676b),
              api_client_salt: this.salt
            });
            if (!_0x44e77d) {
              console.log("❌ " + this.getAccountDisplayName() + " 获取签名服务失败，跳过此次任务");
              return null;
            }
            const _0x487cfe = {
              ..._0x2a676b,
              sig: _0x44e77d.sig || "",
              __NS_sig3: _0x44e77d.__NS_sig3 || "",
              __NS_xfalcon: _0x44e77d.__NS_xfalcon || "",
              __NStokensig: _0x44e77d.__NStokensig || ""
            };
            const _0x58af71 = "https://api.e.kuaishou.com" + _0x5e67e9 + "?" + _0x224442.stringify(_0x487cfe);
            const _0x59145a = Date.now();
            const _0x39edae = _0x59145a + "" + Math.floor(Math.random() * 100000);
            let _0x532713;
            if (_0x33bd31) {
              _0x532713 = {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Host: "api.e.kuaishou.com",
                "User-Agent": "kwai-android aegon/3.56.0",
                Cookie: "kuaishou_api_st=" + this.kuaishouApiSt
              };
            } else {
              {
                _0x532713 = {
                  Host: "api.e.kuaishou.com",
                  Connection: "keep-alive",
                  "X-REQUESTID": _0x39edae,
                  "Accept-Language": "zh-cn",
                  Cookie: "__NSWJ=;kuaishou_api_st=" + this.kuaishouApiSt,
                  "ct-context": JSON.stringify({
                    biz_name: "ATTRIBUTION",
                    error_occurred: false,
                    sampled: true,
                    sampled_on_error: true,
                    segment_id: Math.floor(Math.random() * 900000000) + 100000000,
                    service_name: "CLIENT_TRACE",
                    span_id: 1,
                    trace_id: "My45MTE3NzYwNjY5NjY4MzU1MzExLjYyMTQuMTc2MTk1NTk1MTcxOC4x",
                    upstream_error_occurred: false
                  }),
                  "page-code": "NEW_TASK_CENTER",
                  kaw: "MDHkM+9FrbzPSEAqyw6JaWODbXT2Z2h3Z63YJ4O/5X6oLTOx1rTjDZjtwt/T5Fhuu6x0WdZCiG2hrnutaaAO4tegnuHwL6zhn43hBjhhCt4OomV5wJGFzNYAJlsksNvBo9ww0w+eS2OA9s6TzeLiwmuBbZMT9xELXoFlZlJ2YVhQ3kOf/h3R18hWhPeqoRFr4sOTmL+rU8xmufAbR4pncGmwX4vDs6YsBY+kx/tF5lyCNnEQzN9iXINqHCCOocJ0AA==",
                  kas: "0012da23b681b08de055b21d98498e8621",
                  "User-Agent": "kwai-android aegon/4.27.0",
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept-Encoding": "gzip, deflate, br",
                  "X-Client-Info": "model=" + this.mod + ";os=Android;nqe-score=37;network=WIFI;signal-strength=1;"
                };
              }
            }
            const {
              body: _0x32f6a1
            } = await _0x305590({
              method: "POST",
              url: _0x58af71,
              headers: _0x532713,
              form: _0x1311dc,
              timeout: 12000
            }, this.proxyUrl, this.getAccountDisplayName() + " 获取广告");
            if (!_0x32f6a1) {
              {
                this.adInfoFailCount++;
                console.log("❌ " + this.getAccountDisplayName() + " 获取广告信息失败，累计失败: " + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
                this.adInfoFailCount >= this.maxAdInfoFailCount && (console.log("🚨 " + this.getAccountDisplayName() + " 广告信息失败次数超过" + this.maxAdInfoFailCount + "次，停止脚本运行"), this.stopAllTasks = true);
                return null;
              }
            }
            if (_0x32f6a1.errorMsg === "OK" && _0x32f6a1.feeds && _0x32f6a1.feeds[0] && _0x32f6a1.feeds[0].ad) {
              {
                const _0x1e4c90 = _0x32f6a1.feeds[0].caption || _0x32f6a1.feeds[0].ad?.["caption"] || "";
                _0x1e4c90 && console.log("✅ " + this.getAccountDisplayName() + " 成功获取广告：" + _0x1e4c90);
                const _0x2a5a50 = _0x32f6a1.feeds[0].exp_tag || "";
                const _0x1954a4 = _0x2a5a50.split("/")[1]?.["split"]("_")?.[0] || "";
                let _0x57e7c1 = false;
                try {
                  const _0x16c21c = _0x32f6a1.feeds[0].ad?.["adDataV2"];
                  const _0x431062 = _0x16c21c?.["onceAgainRewardInfo"];
                  if (_0x431062?.["hasMore"]) {
                    {
                      _0x57e7c1 = true;
                      console.log("🔍 " + this.getAccountDisplayName() + " 检测到追加广告标识");
                    }
                  }
                } catch (_0xe443a8) {}
                let _0x4db96f = 0;
                try {
                  {
                    if (_0x32f6a1.feeds[0].ad.extData) {
                      {
                        const _0x4ecf60 = JSON.parse(_0x32f6a1.feeds[0].ad.extData);
                        _0x4db96f = _0x4ecf60.awardCoin || 0;
                      }
                    }
                    if (_0x4db96f === 0) {
                      {
                        if (_0x32f6a1.feeds[0].ad.adDataV2?.["inspirePersonalize"]?.["awardValue"]) {
                          _0x4db96f = parseInt(_0x32f6a1.feeds[0].ad.adDataV2.inspirePersonalize.awardValue) || 0;
                        } else {
                          if (_0x32f6a1.feeds[0].ad.adDataV2?.["inspireAdInfo"]?.["inspirePersonalize"]?.["neoValue"]) {
                            {
                              _0x4db96f = parseInt(_0x32f6a1.feeds[0].ad.adDataV2.inspireAdInfo.inspirePersonalize.neoValue) || 0;
                            }
                          }
                        }
                      }
                    }
                  }
                } catch (_0x4940fd) {
                  console.log("❌ " + this.getAccountDisplayName() + " 解析预计金币失败: " + _0x4940fd.message);
                }
                console.log("🟢 " + this.getAccountDisplayName() + " 本次广告预计获得:" + _0x4db96f + "金币");
                if (_0x4db96f === 5) {
                  {
                    console.log("⚠️ " + this.getAccountDisplayName() + " 预计金币为5，可能是直播广告，已为您自动跳过！");
                    return null;
                  }
                }
                const _0x319529 = {
                  cid: _0x32f6a1.feeds[0].ad.creativeId,
                  llsid: _0x1954a4,
                  hasRewardEnd: _0x57e7c1,
                  expectedCoins: _0x4db96f
                };
                return _0x319529;
              }
            }
            this.adInfoFailCount++;
            console.log("❌ " + this.getAccountDisplayName() + " 获取广告信息失败，累计失败: " + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
            if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
              {
                console.log("🚨 " + this.getAccountDisplayName() + " 广告信息失败次数超过" + this.maxAdInfoFailCount + "次，停止脚本运行");
                this.stopAllTasks = true;
              }
            }
            return null;
          }
        } catch (_0x3cd9c6) {
          {
            console.log("❌ " + this.getAccountDisplayName() + " 获取广告异常: " + _0x3cd9c6.message);
            this.adInfoFailCount++;
            console.log("❌ " + this.getAccountDisplayName() + " 获取广告信息失败，累计失败: " + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
            if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
              {
                console.log("🚨 " + this.getAccountDisplayName() + " 广告信息失败次数超过" + this.maxAdInfoFailCount + "次，停止脚本运行");
                this.stopAllTasks = true;
              }
            }
            return null;
          }
        }
      }
    }
    async generateSignature(_0x478bb9, _0x2f1139, _0x4dcf25, _0x172b83) {
      {
        try {
          {
            const _0x1cec2b = {
              businessId: _0x172b83.businessId,
              endTime: this.endTime,
              extParams: "",
              mediaScene: "video",
              neoInfos: [{
                creativeId: _0x478bb9,
                extInfo: "",
                llsid: _0x2f1139,
                requestSceneType: _0x172b83.requestSceneType,
                taskType: _0x172b83.taskType,
                watchExpId: "",
                watchStage: 0
              }],
              pageId: _0x172b83.pageId || _0x528b00.defaultPageId,
              posId: _0x172b83.posId,
              reportType: 0,
              sessionId: "",
              startTime: this.startTime,
              subPageId: _0x172b83.subPageId
            };
            const _0xf58ad = JSON.stringify(_0x1cec2b);
            const _0x45212e = "bizStr=" + encodeURIComponent(_0xf58ad) + "&cs=false&client_key=" + _0x528b00.clientKey + "&kuaishou.api_st=" + this.kuaishouApiSt;
            const _0xbf0171 = this.queryParams + "&" + _0x45212e;
            const _0x1f7346 = await this.requestSignService({
              urlpath: this.taskReportPath,
              reqdata: _0xbf0171,
              api_client_salt: this.salt
            }, this.getAccountDisplayName() + " 生成报告签名");
            if (!_0x1f7346) {
              {
                console.log("❌ " + this.getAccountDisplayName() + " 生成报告签名失败");
                return null;
              }
            }
            const _0x28c034 = {
              sig: _0x1f7346.sig,
              sig3: _0x1f7346.__NS_sig3,
              xfalcon: _0x1f7346.__NS_xfalcon,
              sigtoken: _0x1f7346.__NStokensig,
              post: _0x45212e
            };
            return _0x28c034;
          }
        } catch (_0x43d69b) {
          {
            console.log("❌ " + this.getAccountDisplayName() + " 生成签名异常: " + _0x43d69b.message);
            return null;
          }
        }
      }
    }
    async getSign(_0x5dd313) {
      {
        if (_0x22cd71) {
          {
            console.log("🛑 签名服务已标记为故障，跳过签名");
            return null;
          }
        }
        try {
          {
            const _0x5f915e = await _0x1ecc2e();
            const _0x221ff8 = {
              data: _0x5dd313,
              timestamp: _0x5f915e.timestamp
            };
            const {
              body: _0x3c8474
            } = await _0x305590({
              method: "POST",
              url: _0x20f76c(),
              body: JSON.stringify(_0x221ff8),
              headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0"
              }
            }, null, "获取encsign签名");
            if (_0x3c8474) {
              {
                if (_0x3c8474.status) {
                  {
                    console.log("✅ " + this.getAccountDisplayName() + " encsign签名成功");
                    _0x7844db = 0;
                    return _0x3c8474.data;
                  }
                } else {
                  {
                    const _0x4d2361 = _0x3c8474.error || "未知错误";
                    console.log("❌ " + this.getAccountDisplayName() + " encsign签名失败: " + _0x4d2361);
                    _0x7844db++;
                    if (_0x4d2361.includes("卡密") || _0x4d2361.includes("次数") || _0x4d2361.includes("过期") || _0x4d2361.includes("无效")) {
                      {
                        console.log("🔍 检测到可能是卡密问题，正在验证卡密状态...");
                        const _0x181c79 = await _0x3748bb();
                        if (!_0x181c79.valid) {
                          console.log("🚨 卡密已失效: " + _0x181c79.msg);
                          _0x1899b8 = true;
                          this.stopAllTasks = true;
                          return null;
                        }
                        if (_0x181c79.data && _0x181c79.data.type === "count" && _0x181c79.data.val <= 0) {
                          {
                            console.log("🚨 卡密次数已用完，剩余次数: 0");
                            _0x1899b8 = true;
                            this.stopAllTasks = true;
                            return null;
                          }
                        }
                      }
                    }
                    if (_0x7844db >= _0xc3ef4b) {
                      {
                        console.log("🔍 连续签名失败 " + _0x7844db + " 次，正在检查卡密状态...");
                        const _0x141e95 = await _0x3748bb();
                        if (!_0x141e95.valid || _0x141e95.data && _0x141e95.data.type === "count" && _0x141e95.data.val <= 0) {
                          {
                            console.log("🚨 卡密已失效或次数用完，停止执行");
                            _0x1899b8 = true;
                            this.stopAllTasks = true;
                            return null;
                          }
                        }
                        console.log("⚠️ 卡密状态正常，可能是签名服务问题");
                      }
                    }
                    if (_0x7844db >= _0x224fde) {
                      console.log("🚨 连续签名失败已达 " + _0x7844db + " 次，签名服务可能已故障，停止执行");
                      _0x22cd71 = true;
                      this.stopAllTasks = true;
                      return null;
                    }
                    if (_0x4d2361.includes("未授权")) {
                      {
                        _0xcc85ee++;
                        if (_0xcc85ee >= _0x3bf9d4) {
                          {
                            console.log("❌ 未授权错误达到上限，停止脚本运行");
                            process.exit(1);
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              {
                console.log("❌ " + this.getAccountDisplayName() + " 签名服务无响应");
                _0x7844db++;
                if (_0x7844db >= _0xc3ef4b && _0x7844db < _0x224fde) {
                  {
                    console.log("🔍 连续签名失败 " + _0x7844db + " 次，正在检查卡密状态...");
                    const _0x4acae2 = await _0x3748bb();
                    if (!_0x4acae2.valid || _0x4acae2.data && _0x4acae2.data.type === "count" && _0x4acae2.data.val <= 0) {
                      {
                        console.log("🚨 卡密已失效或次数用完，停止执行");
                        _0x1899b8 = true;
                        this.stopAllTasks = true;
                        return null;
                      }
                    }
                  }
                }
                if (_0x7844db >= _0x224fde) {
                  {
                    console.log("🚨 连续签名失败已达 " + _0x7844db + " 次，签名服务可能已故障，停止执行");
                    _0x22cd71 = true;
                    this.stopAllTasks = true;
                    return null;
                  }
                }
              }
            }
          }
        } catch (_0x3ae478) {
          {
            console.log("❌ " + this.getAccountDisplayName() + " 签名异常: " + _0x3ae478.message);
            _0x7844db++;
            if (_0x7844db >= _0xc3ef4b && _0x7844db < _0x224fde) {
              const _0x52a4bc = await _0x3748bb();
              if (!_0x52a4bc.valid || _0x52a4bc.data && _0x52a4bc.data.type === "count" && _0x52a4bc.data.val <= 0) {
                {
                  _0x1899b8 = true;
                  this.stopAllTasks = true;
                  return null;
                }
              }
            }
            if (_0x7844db >= _0x224fde) {
              {
                _0x22cd71 = true;
                this.stopAllTasks = true;
                return null;
              }
            }
          }
        }
        return null;
      }
    }
    async requestSignService(_0x1aa947, _0x3a7222) {
      {
        if (_0x22cd71) {
          {
            console.log("🛑 签名服务已标记为故障，跳过签名");
            return null;
          }
        }
        try {
          {
            const _0x23ae0f = {
              salt: _0x1aa947.api_client_salt,
              path: _0x1aa947.urlpath,
              data: _0x1aa947.reqdata
            };
            const {
              body: _0x16bc6a
            } = await _0x305590({
              method: "POST",
              url: _0x20f76c(),
              headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0"
              },
              body: JSON.stringify(_0x23ae0f),
              timeout: 15000
            }, null, _0x3a7222 || "获取nssig签名");
            if (_0x16bc6a) {
              {
                if (_0x16bc6a.status) {
                  {
                    console.log("✅ " + this.getAccountDisplayName() + " nssig签名成功");
                    _0x7844db = 0;
                    const _0x7f874f = {
                      sig: _0x16bc6a.data.sig,
                      __NStokensig: _0x16bc6a.data.nstokensig,
                      __NS_sig3: _0x16bc6a.data.nssig3,
                      __NS_xfalcon: _0x16bc6a.data.xfalcon || ""
                    };
                    return _0x7f874f;
                  }
                } else {
                  {
                    const _0x3638eb = _0x16bc6a.error || "未知错误";
                    console.log("❌ nssig签名失败: " + _0x3638eb);
                    _0x7844db++;
                    if (_0x3638eb.includes("卡密") || _0x3638eb.includes("次数") || _0x3638eb.includes("过期") || _0x3638eb.includes("无效")) {
                      {
                        const _0x352edf = await _0x3748bb();
                        if (!_0x352edf.valid) {
                          _0x1899b8 = true;
                          this.stopAllTasks = true;
                          return null;
                        }
                        if (_0x352edf.data && _0x352edf.data.type === "count" && _0x352edf.data.val <= 0) {
                          {
                            _0x1899b8 = true;
                            this.stopAllTasks = true;
                            return null;
                          }
                        }
                      }
                    }
                    if (_0x7844db >= _0xc3ef4b) {
                      {
                        const _0x1bbaad = await _0x3748bb();
                        if (!_0x1bbaad.valid || _0x1bbaad.data && _0x1bbaad.data.type === "count" && _0x1bbaad.data.val <= 0) {
                          {
                            _0x1899b8 = true;
                            this.stopAllTasks = true;
                            return null;
                          }
                        }
                      }
                    }
                    if (_0x7844db >= _0x224fde) {
                      {
                        _0x22cd71 = true;
                        this.stopAllTasks = true;
                        return null;
                      }
                    }
                    if (_0x3638eb.includes("未授权")) {
                      {
                        _0xcc85ee++;
                        if (_0xcc85ee >= _0x3bf9d4) {
                          {
                            process.exit(1);
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
              {
                console.log("❌ 签名服务无响应");
                _0x7844db++;
                if (_0x7844db >= _0xc3ef4b && _0x7844db < _0x224fde) {
                  {
                    const _0x509bf4 = await _0x3748bb();
                    if (!_0x509bf4.valid || _0x509bf4.data && _0x509bf4.data.type === "count" && _0x509bf4.data.val <= 0) {
                      {
                        _0x1899b8 = true;
                        this.stopAllTasks = true;
                        return null;
                      }
                    }
                  }
                }
                if (_0x7844db >= _0x224fde) {
                  _0x22cd71 = true;
                  this.stopAllTasks = true;
                  return null;
                }
              }
            }
          }
        } catch (_0x260b81) {
          {
            console.log("❌ 签名异常: " + _0x260b81.message);
            _0x7844db++;
            if (_0x7844db >= _0xc3ef4b && _0x7844db < _0x224fde) {
              {
                const _0x443be5 = await _0x3748bb();
                if (!_0x443be5.valid || _0x443be5.data && _0x443be5.data.type === "count" && _0x443be5.data.val <= 0) {
                  _0x1899b8 = true;
                  this.stopAllTasks = true;
                  return null;
                }
              }
            }
            if (_0x7844db >= _0x224fde) {
              _0x22cd71 = true;
              this.stopAllTasks = true;
              return null;
            }
          }
        }
        return null;
      }
    }
    async submitReport(_0x33028c, _0x22f42a, _0x2b9ff7, _0x7452a7, _0x14040e, _0x101dde, _0x24367b) {
      {
        try {
          {
            const _0x4e0840 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0x33028c + "&__NS_sig3=" + _0x22f42a + "&__NS_xfalcon=" + (_0x7452a7 || "") + "&__NStokensig=" + _0x2b9ff7);
            const _0x20a697 = Date.now();
            const _0x5c7202 = _0x20a697 + "" + Math.floor(Math.random() * 100000);
            let _0x3d3ef1;
            if (_0x33bd31) {
              {
                const _0x1e636f = {
                  "Content-Type": _0x23bc39.SZyhL,
                  Host: _0x23bc39.Ygqlx,
                  "User-Agent": _0x23bc39.ITAXo
                };
                _0x1e636f["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                _0x1e636f.Host = "api.e.kuaishou.cn";
                _0x1e636f["User-Agent"] = "kwai-android aegon/3.56.0";
                _0x1e636f["Content-Type"] = "application/x-www-form-urlencoded";
                _0x3d3ef1 = _0x1e636f;
              }
            } else {
              {
                const _0x3394a6 = {
                  Host: "api.e.kuaishou.cn",
                  Connection: "keep-alive",
                  "X-REQUESTID": _0x5c7202,
                  "User-Agent": "kwai-android aegon/3.56.0",
                  "Accept-Language": "zh-cn",
                  "page-code": "NEW_TASK_CENTER",
                  kaw: "MDHkM+9FrbzPSEAqyw6JaWODbXTwZGh3Z63YJ4O/5X6oLTOx1rTjDZjtwt/T5Fhqu6x0WdZCiG2hrnutaaAA4tegnuHwL6zhn43hBjhhCt4OomV5wJGFzNYAJlsksNvBo9ww0w+eS2OA9s6TzeLiw2uBY5MT9xELXoFlZlJ2YVhQ3kOf+hjR0c9XhfOrphFr4sOTmL+rU8xmufAbR4pncGmwX4vDs6YsBY+kx/tF5lyCNnEQzN9iXINqHCCOocJ0AA==",
                  kas: "0014d270b4d2e38ce35eb21b991ad6d674",
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Accept-Encoding": "gzip, deflate, br",
                  "X-Client-Info": "model=" + this.mod + ";os=Android;nqe-score=37;network=OTHER;signal-strength=2;"
                };
                _0x3d3ef1 = _0x3394a6;
              }
            }
            const {
              body: _0x50b441
            } = await _0x305590({
              method: "POST",
              url: _0x4e0840,
              headers: _0x3d3ef1,
              body: _0x14040e,
              timeout: 12000
            }, this.proxyUrl, this.getAccountDisplayName() + " 提交任务");
            if (!_0x50b441) {
              {
                const _0x39e443 = {
                  success: false,
                  reward: 0
                };
                return _0x39e443;
              }
            }
            if (_0x50b441.result === 1) {
              {
                const _0x2c0729 = _0x50b441.data?.["neoAmount"] || 0;
                const _0x566eda = {
                  success: true,
                  reward: _0x2c0729
                };
                return _0x566eda;
              }
            }
            if ([20107, 20108, 1003, 415].includes(_0x50b441.result)) {
              {
                console.log("🚫 " + this.getAccountDisplayName() + " " + _0x24367b.name + " 已达上限，停止该任务继续执行");
                this.taskLimitReached[_0x101dde] = true;
                const _0x4114ed = {
                  success: false,
                  reward: 0,
                  limitReached: true
                };
                return _0x4114ed;
              }
            }
            const _0x44d69a = {
              success: false,
              reward: 0
            };
            return _0x44d69a;
          }
        } catch (_0x125551) {
          {
            console.log("❌ " + this.getAccountDisplayName() + " 提交任务异常: " + _0x125551.message);
            const _0x23847b = {
              success: false,
              reward: 0
            };
            return _0x23847b;
          }
        }
      }
    }
    checkLowReward(_0x352daf, _0x53955f, _0x2a8b0e) {
      {
        if (_0x352daf === 5) {
          console.log("💰 " + this.getAccountDisplayName() + " " + _0x2a8b0e + " 获得5金币(可能是直播广告，请继续保持脚本运行！)");
          return false;
        }
        if (_0x352daf === 1 || _0x352daf === 10 || _0x352daf <= this.lowRewardThreshold) {
          {
            this.taskLowRewardCount[_0x53955f]++;
            console.log("⚠️ " + this.getAccountDisplayName() + " " + _0x2a8b0e + " 低金币累计: " + this.taskLowRewardCount[_0x53955f] + "/" + this.lowRewardLimit + "次");
            if (this.taskLowRewardCount[_0x53955f] >= this.lowRewardLimit) {
              {
                console.log("🚫 " + this.getAccountDisplayName() + " " + _0x2a8b0e + " 低金币次数已达" + this.lowRewardLimit + "次，禁用该任务");
                this.taskDisabled[_0x53955f] = true;
                return true;
              }
            }
          }
        }
        return false;
      }
    }
    checkLowRewardAndStop(_0x46b4d0, _0x5bd54b) {
      if (_0x46b4d0 === 5) {
        return false;
      }
      if (_0x46b4d0 <= this.lowRewardThreshold && _0x46b4d0 !== 5) {
        this.lowRewardCount++;
        console.log("⚠️ " + this.getAccountDisplayName() + " " + _0x5bd54b + " 低奖励累计: " + this.lowRewardCount + "/" + this.maxLowRewardCount + "次");
        if (this.lowRewardCount >= this.maxLowRewardCount) {
          {
            console.log("🚫 " + this.getAccountDisplayName() + " 累计低奖励次数已达" + this.maxLowRewardCount + "次，停止该账号继续执行任务");
            this.stopAllTasks = true;
            return true;
          }
        }
      }
      return false;
    }
    async executeTask(_0x39e12e, _0x252226 = 1, _0x3a9b5e = false, _0x39722c = 0) {
      const _0x3107b6 = await _0x2a03e7();
      if (!_0x3107b6) {
        console.log("🛑 " + this.getAccountDisplayName() + " 卡密已失效，停止执行任务");
        this.stopAllTasks = true;
        const _0x30f5e2 = {
          success: false,
          reward: 0,
          hasRewardEnd: false,
          cardExpired: true
        };
        return _0x30f5e2;
      }
      const _0x53ccbd = this.taskConfigs[_0x39e12e];
      const _0x2f9193 = {
        success: false,
        reward: 0,
        hasRewardEnd: false
      };
      if (!_0x53ccbd) {
        return _0x2f9193;
      }
      const _0x35f0d6 = {
        success: false,
        reward: 0,
        hasRewardEnd: false
      };
      if (this.taskDisabled[_0x39e12e]) {
        return _0x35f0d6;
      }
      const _0xbd595e = {
        success: false,
        reward: 0,
        hasRewardEnd: false,
        limitReached: true
      };
      if (this.taskLimitReached[_0x39e12e]) {
        return _0xbd595e;
      }
      try {
        const _0x49d409 = {
          ..._0x53ccbd
        };
        const _0x35d594 = _0x49d409;
        _0x35d594.taskType = _0x252226;
        if (_0x39e12e === "search") {
          _0x35d594.requestSceneType = _0x3a9b5e ? 7 : 1;
          if (!_0x3a9b5e) {
            const _0x106434 = this.getSearchKeyword();
            console.log("🔍 " + this.getAccountDisplayName() + " 使用搜索关键词: " + _0x106434);
          }
        } else {
          _0x252226 === 2 && (_0x35d594.requestSceneType = 7);
        }
        let _0x3beaf0 = null;
        let _0x519526 = 0;
        while (!_0x3beaf0 && !this.stopAllTasks) {
          _0x519526++;
          console.log("🔄 " + this.getAccountDisplayName() + " 尝试获取广告信息 (第" + _0x519526 + "次)...");
          _0x3beaf0 = await this.getAdInfo(_0x35d594);
          if (_0x3beaf0) {
            break;
          }
          !_0x3beaf0 && !this.stopAllTasks && (console.log("⏱ " + this.getAccountDisplayName() + " 自动跳过直播广！等待30分钟后继续获取..."), await new Promise(_0x17715c => setTimeout(_0x17715c, 1800000)));
        }
        if (!_0x3beaf0) {
          this.taskStats[_0x39e12e].failed++;
          const _0x2fbb37 = {
            success: false,
            reward: 0,
            hasRewardEnd: false
          };
          return _0x2fbb37;
        }
        let _0x5e8f8d = 0;
        _0x5ca451 > 0 && (_0x5e8f8d = Math.floor(Math.random() * (_0x5ca451 - _0x4450da) + _0x4450da) * 1000);
        if (_0x5e8f8d > 0) {
          _0x3a9b5e && _0x39722c > 0 ? console.log("👀 " + this.getAccountDisplayName() + " " + _0x53ccbd.name + "_追加第" + _0x39722c + "次 广告浏览中 " + Math.round(_0x5e8f8d / 1000) + "秒") : console.log("👀 " + this.getAccountDisplayName() + " " + _0x53ccbd.name + " 广告浏览中 " + Math.round(_0x5e8f8d / 1000) + "秒");
          await new Promise(_0xd0ea2a => setTimeout(_0xd0ea2a, _0x5e8f8d));
        } else {
          _0x3a9b5e && _0x39722c > 0 ? console.log("👀 " + this.getAccountDisplayName() + " " + _0x53ccbd.name + "_追加第" + _0x39722c + "次 广告浏览中 0秒") : console.log("👀 " + this.getAccountDisplayName() + " " + _0x53ccbd.name + " 广告浏览中 0秒");
        }
        const _0x294740 = await this.retryOperation(() => this.generateSignature(_0x3beaf0.cid, _0x3beaf0.llsid, _0x39e12e, _0x35d594), "生成" + _0x53ccbd.name + "签名", 3);
        if (!_0x294740) {
          this.taskStats[_0x39e12e].failed++;
          const _0x36fb44 = {
            success: false,
            reward: 0,
            hasRewardEnd: false
          };
          return _0x36fb44;
        }
        const _0x1d395d = await this.retryOperation(() => this.submitReport(_0x294740.sig, _0x294740.sig3, _0x294740.sigtoken, _0x294740.xfalcon, _0x294740.post, _0x39e12e, _0x35d594), "提交" + _0x53ccbd.name + "报告", 3);
        if (_0x1d395d?.["success"]) {
          this.taskStats[_0x39e12e].success++;
          const _0x40e9d4 = _0x1d395d.reward || 0;
          this.taskStats[_0x39e12e].totalReward += _0x40e9d4;
          this.accumulatedCoins += _0x40e9d4;
          console.log("💰 " + this.getAccountDisplayName() + " 本次运行累计获得: " + this.accumulatedCoins + "金币");
          if (this.checkAccumulatedCoinsLimit()) {
            const _0x12c53d = {
              success: true,
              reward: _0x40e9d4,
              hasRewardEnd: false,
              coinLimitExceeded: true
            };
            return _0x12c53d;
          }
          _0x3a9b5e && _0x39722c > 0 ? console.log("💰 " + this.getAccountDisplayName() + " " + _0x53ccbd.name + "_追加第" + _0x39722c + "次 获得" + _0x40e9d4 + "金币奖励！") : console.log("💰 " + this.getAccountDisplayName() + " " + _0x53ccbd.name + " 获得" + _0x40e9d4 + "金币奖励！");
          this.checkLowReward(_0x40e9d4, _0x39e12e, _0x53ccbd.name);
          const _0x439ad1 = this.checkLowRewardAndStop(_0x40e9d4, _0x53ccbd.name);
          if (_0x439ad1) {
            const _0x58b966 = {
              success: true,
              reward: _0x40e9d4,
              hasRewardEnd: false,
              lowRewardStopped: true
            };
            return _0x58b966;
          }
          if (_0x40e9d4 !== 5 && _0x40e9d4 <= this.lowRewardThreshold) {
            this.taskLowRewardFlags[_0x39e12e] = true;
            this.isSingleTaskMode && (this.lowRewardStreak++, this.lowRewardStreak >= this.lowRewardLimit && (this.stopAllTasks = true));
          } else {
            _0x40e9d4 !== 5 && (this.taskLowRewardFlags[_0x39e12e] = false, this.lowRewardStreak = 0);
          }
          const _0x580d84 = {
            success: true,
            reward: _0x40e9d4,
            hasRewardEnd: _0x3beaf0.hasRewardEnd || false,
            limitReached: _0x1d395d.limitReached || false
          };
          return _0x580d84;
        }
        _0x1d395d?.["limitReached"] && (this.taskLimitReached[_0x39e12e] = true);
        this.taskStats[_0x39e12e].failed++;
        const _0xf6d561 = {
          success: false,
          reward: 0,
          hasRewardEnd: false,
          limitReached: _0x1d395d?.["limitReached"] || false
        };
        return _0xf6d561;
      } catch (_0xa89745) {
        console.log("❌ " + this.getAccountDisplayName() + " 任务异常(" + _0x39e12e + "): " + _0xa89745.message);
        this.taskStats[_0x39e12e].failed++;
        const _0x4e12e9 = {
          success: false,
          reward: 0,
          hasRewardEnd: false
        };
        return _0x4e12e9;
      }
    }
    getNextAvailableTask() {
      const _0x48395d = this.tasksToExecute.length;
      if (_0x48395d === 1) {
        return this.tasksToExecute[0];
      }
      for (let _0xab9fca = 0; _0xab9fca < _0x48395d; _0xab9fca++) {
        this.currentTaskIndex = (this.currentTaskIndex + 1) % _0x48395d;
        const _0xcbf573 = this.tasksToExecute[this.currentTaskIndex];
        if (!this.taskLowRewardFlags[_0xcbf573] && !this.taskLimitReached[_0xcbf573] && !this.taskDisabled[_0xcbf573]) {
          return _0xcbf573;
        }
      }
      return null;
    }
    allTasksHaveLowReward() {
      return this.tasksToExecute.every(_0x500f61 => this.taskLowRewardFlags[_0x500f61] || this.taskLimitReached[_0x500f61] || this.taskDisabled[_0x500f61]);
    }
    async appendAdRest(_0x2fb343) {
      if (_0x2fb343 > 0 && _0x2fb343 % _0x55c757 === 0) {
        const _0x384951 = Math.floor(Math.random() * (_0x212e0d - _0x8c9ddd)) + _0x8c9ddd;
        console.log("⏱ " + this.getAccountDisplayName() + " 已追加" + _0x2fb343 + "次广告，休息" + Math.round(_0x384951 / 1000) + "秒");
        await new Promise(_0x4c6cc3 => setTimeout(_0x4c6cc3, _0x384951));
      }
    }
    async processTaskWithAppend(_0x2b3601, _0x17eac8 = 10) {
      let _0x49a628 = 0;
      while (_0x49a628 < _0x17eac8 && !this.stopAllTasks) {
        _0x49a628++;
        const _0xf3f4ac = await this.executeTask(_0x2b3601, _0x2b3601 === "search" ? 2 : 1, false);
        if (!_0xf3f4ac.success) {
          if (_0xf3f4ac.limitReached) {
            break;
          }
          continue;
        }
        const _0x3f539d = {
          switched: false,
          coinLimitExceeded: true
        };
        if (_0xf3f4ac.coinLimitExceeded) {
          return _0x3f539d;
        }
        const _0x3981e6 = {
          switched: false,
          lowRewardStopped: true
        };
        if (_0xf3f4ac.lowRewardStopped) {
          return _0x3981e6;
        }
        if (this.taskDisabled[_0x2b3601]) {
          const _0x155883 = this.getNextAvailableTask();
          if (_0x155883 && _0x155883 !== _0x2b3601) {
            return {
              switched: true,
              nextTask: _0x155883
            };
          }
          break;
        }
        if (this.taskLimitReached[_0x2b3601]) {
          break;
        }
        if (!this.isSingleTaskMode && _0xf3f4ac.reward <= this.lowRewardThreshold && _0xf3f4ac.reward !== 5) {
          const _0x2c39b3 = this.getNextAvailableTask();
          if (_0x2c39b3 && _0x2c39b3 !== _0x2b3601) {
            return {
              switched: true,
              nextTask: _0x2c39b3
            };
          }
          break;
        }
        let _0x290e09 = 0;
        let _0x2aac05 = _0xf3f4ac.hasRewardEnd && _0x54e93d;
        while (_0x2aac05 && _0x290e09 < _0x12cc06 && !this.stopAllTasks) {
          _0x290e09++;
          await this.appendAdRest(_0x290e09);
          const _0x50e2b2 = await this.executeTask(_0x2b3601, 2, true, _0x290e09);
          if (!_0x50e2b2.success) {
            if (_0x50e2b2.limitReached) {
              break;
            }
            continue;
          }
          const _0x3c0045 = {
            switched: false,
            coinLimitExceeded: true
          };
          if (_0x50e2b2.coinLimitExceeded) {
            return _0x3c0045;
          }
          const _0x1a60e0 = {
            switched: false,
            lowRewardStopped: true
          };
          if (_0x50e2b2.lowRewardStopped) {
            return _0x1a60e0;
          }
          if (this.taskDisabled[_0x2b3601]) {
            const _0x6f39b = this.getNextAvailableTask();
            if (_0x6f39b && _0x6f39b !== _0x2b3601) {
              return {
                switched: true,
                nextTask: _0x6f39b
              };
            }
            break;
          }
          _0x2aac05 = _0x50e2b2.hasRewardEnd;
          if (!this.isSingleTaskMode && _0x50e2b2.reward <= this.lowRewardThreshold && _0x50e2b2.reward !== 5) {
            const _0x578e38 = this.getNextAvailableTask();
            if (_0x578e38 && _0x578e38 !== _0x2b3601) {
              return {
                switched: true,
                nextTask: _0x578e38
              };
            }
            break;
          }
          if (_0x290e09 >= _0x12cc06) {
            if (!this.isSingleTaskMode) {
              const _0x50ab2b = this.getNextAvailableTask();
              if (_0x50ab2b && _0x50ab2b !== _0x2b3601) {
                return {
                  switched: true,
                  nextTask: _0x50ab2b
                };
              }
            }
            break;
          }
        }
        if (this.taskLimitReached[_0x2b3601]) {
          break;
        }
      }
      const _0x4c71fa = {
        switched: false
      };
      return _0x4c71fa;
    }
    async executeCycleMode() {
      console.log("🔄 " + this.getAccountDisplayName() + " 开始循环模式，总轮数: " + this.cycleRounds);
      for (let _0x419488 = 1; _0x419488 <= this.cycleRounds && !this.stopAllTasks; _0x419488++) {
        this.currentCycleRound = _0x419488;
        console.log("\n🔄 " + this.getAccountDisplayName() + " 开始第" + _0x419488 + "/" + this.cycleRounds + "轮循环");
        if (this.taskExecutionOrder === "sequential") {
          for (const _0xf3f01b of this.tasksToExecute) {
            if (this.stopAllTasks) {
              break;
            }
            if (this.taskDisabled[_0xf3f01b] || this.taskLimitReached[_0xf3f01b]) {
              continue;
            }
            const _0x2146e2 = await this.executeTask(_0xf3f01b);
            if (_0x2146e2.limitReached) {
              this.taskLimitReached[_0xf3f01b] = true;
            }
            if (_0x2146e2.success && _0x54e93d && _0x2146e2.hasRewardEnd && !this.taskLimitReached[_0xf3f01b]) {
              let _0x28c201 = 0;
              let _0x382caa = _0x2146e2.hasRewardEnd;
              while (_0x382caa && _0x28c201 < _0x12cc06 && !this.stopAllTasks && !this.taskLimitReached[_0xf3f01b]) {
                _0x28c201++;
                await this.appendAdRest(_0x28c201);
                const _0xa29d24 = await this.executeTask(_0xf3f01b, 2, true, _0x28c201);
                if (!_0xa29d24.success) {
                  if (_0xa29d24.limitReached) {
                    this.taskLimitReached[_0xf3f01b] = true;
                  }
                  break;
                }
                _0x382caa = _0xa29d24.hasRewardEnd;
              }
            }
          }
        } else {
          let _0x4dc957 = 0;
          let _0x3d805f = 0;
          const _0x5a6a71 = this.tasksToExecute.length;
          while (_0x3d805f < _0x5a6a71 && !this.stopAllTasks) {
            const _0x131324 = this.tasksToExecute[_0x4dc957];
            if (!this.taskDisabled[_0x131324] && !this.taskLimitReached[_0x131324]) {
              const _0x5c7338 = await this.executeTask(_0x131324);
              if (_0x5c7338.limitReached) {
                this.taskLimitReached[_0x131324] = true;
              }
              if (_0x5c7338.success && _0x54e93d && _0x5c7338.hasRewardEnd && !this.taskLimitReached[_0x131324]) {
                let _0x2007fe = 0;
                let _0x17c545 = _0x5c7338.hasRewardEnd;
                while (_0x17c545 && _0x2007fe < _0x12cc06 && !this.stopAllTasks && !this.taskLimitReached[_0x131324]) {
                  _0x2007fe++;
                  await this.appendAdRest(_0x2007fe);
                  const _0x493f3a = await this.executeTask(_0x131324, 2, true, _0x2007fe);
                  if (!_0x493f3a.success) {
                    if (_0x493f3a.limitReached) {
                      this.taskLimitReached[_0x131324] = true;
                    }
                    break;
                  }
                  _0x17c545 = _0x493f3a.hasRewardEnd;
                }
              }
              _0x3d805f++;
            } else {
              _0x3d805f++;
            }
            _0x4dc957 = (_0x4dc957 + 1) % _0x5a6a71;
          }
        }
        if (_0x419488 < this.cycleRounds && !this.stopAllTasks) {
          const _0x543f8b = Math.floor(Math.random() * 5000) + 3000;
          console.log("⏱ " + this.getAccountDisplayName() + " 第" + _0x419488 + "轮完成，等待 " + Math.round(_0x543f8b / 1000) + "秒后开始下一轮");
          await new Promise(_0x1c6905 => setTimeout(_0x1c6905, _0x543f8b));
        }
      }
    }
    async executeIndependentMode() {
      console.log("🎯 " + this.getAccountDisplayName() + " 开始独立次数模式");
      for (const _0x422745 of this.tasksToExecute) {
        if (this.stopAllTasks) {
          break;
        }
        if (this.taskDisabled[_0x422745]) {
          continue;
        }
        if (this.taskLimitReached[_0x422745]) {
          continue;
        }
        if (!this.taskConfigs[_0x422745]) {
          console.log("⚠️ " + this.getAccountDisplayName() + " 当前模式不支持任务: " + _0x422745 + "，跳过");
          continue;
        }
        const _0x206753 = _0x200ca1[_0x422745] || 1;
        console.log("🎯 " + this.getAccountDisplayName() + " 开始执行 " + this.taskConfigs[_0x422745].name + "，计划执行" + _0x206753 + "次");
        for (let _0x43cb02 = 1; _0x43cb02 <= _0x206753 && !this.stopAllTasks; _0x43cb02++) {
          if (this.taskLimitReached[_0x422745]) {
            break;
          }
          console.log("📝 " + this.getAccountDisplayName() + " " + this.taskConfigs[_0x422745].name + " 第" + _0x43cb02 + "/" + _0x206753 + "次");
          const _0x22aafc = await this.executeTask(_0x422745);
          if (_0x22aafc.limitReached) {
            this.taskLimitReached[_0x422745] = true;
            break;
          }
          if (_0x22aafc.success && _0x54e93d && _0x22aafc.hasRewardEnd && !this.taskLimitReached[_0x422745]) {
            let _0x3e4258 = 0;
            let _0x4c6615 = _0x22aafc.hasRewardEnd;
            while (_0x4c6615 && _0x3e4258 < _0x12cc06 && !this.stopAllTasks && !this.taskLimitReached[_0x422745]) {
              _0x3e4258++;
              await this.appendAdRest(_0x3e4258);
              const _0x4e5a23 = await this.executeTask(_0x422745, 2, true, _0x3e4258);
              if (!_0x4e5a23.success) {
                if (_0x4e5a23.limitReached) {
                  this.taskLimitReached[_0x422745] = true;
                }
                break;
              }
              _0x4c6615 = _0x4e5a23.hasRewardEnd;
            }
          }
          if (this.taskDisabled[_0x422745]) {
            break;
          }
          if (_0x43cb02 < _0x206753 && !this.stopAllTasks && !this.taskLimitReached[_0x422745]) {
            const _0x5c48a0 = Math.floor(Math.random() * 3000) + 2000;
            await new Promise(_0x1d8ff8 => setTimeout(_0x1d8ff8, _0x5c48a0));
          }
        }
        console.log("✅ " + this.getAccountDisplayName() + " " + (this.taskConfigs[_0x422745]?.["name"] || _0x422745) + " 执行完成");
        if (!this.stopAllTasks && _0x422745 !== this.tasksToExecute[this.tasksToExecute.length - 1]) {
          const _0x24058e = Math.floor(Math.random() * 5000) + 3000;
          console.log("⏱ " + this.getAccountDisplayName() + " 任务间休息 " + Math.round(_0x24058e / 1000) + "秒");
          await new Promise(_0x39bfdf => setTimeout(_0x39bfdf, _0x24058e));
        }
      }
    }
    async executeAllTasksByPriority() {
      this.isCycleMode ? await this.executeCycleMode() : await this.executeIndependentMode();
    }
  }
  function _0x8580b(_0x57b1d5) {
    const _0x5c3f82 = String(_0x57b1d5 || "").trim().split("#");
    if (_0x5c3f82.length < 2) {
      return null;
    }
    let _0x51ea64 = "";
    let _0x4d1528 = "";
    let _0x1444f5 = "";
    let _0x2c3fa1 = null;
    const _0x1c72e4 = _0x5c3f82[_0x5c3f82.length - 1];
    const _0x947a69 = _0x1c72e4.startsWith("socks5://") || _0x1c72e4.includes("|");
    _0x947a69 && (_0x2c3fa1 = _0x1c72e4, _0x5c3f82.pop());
    if (_0x5c3f82.length === 2) {
      _0x4d1528 = _0x5c3f82[0];
      _0x1444f5 = _0x5c3f82[1];
    } else {
      if (_0x5c3f82.length === 3) {
        _0x51ea64 = _0x5c3f82[0];
        _0x4d1528 = _0x5c3f82[1];
        _0x1444f5 = _0x5c3f82[2];
      } else {
        _0x5c3f82.length > 3 && (_0x51ea64 = _0x5c3f82[0], _0x4d1528 = _0x5c3f82[1], _0x1444f5 = _0x5c3f82.slice(2).join("#"));
      }
    }
    if (_0x2c3fa1 && _0x2c3fa1.includes("|")) {
      const _0x4fba50 = _0x2c3fa1.split("|");
      if (_0x4fba50.length >= 2) {
        const [_0x16cd74, _0x147638, _0x321aa0, _0x5b7557] = _0x4fba50;
        _0x321aa0 && _0x5b7557 ? _0x2c3fa1 = "socks5://" + _0x321aa0 + ":" + _0x5b7557 + "@" + _0x16cd74 + ":" + _0x147638 : _0x2c3fa1 = "socks5://" + _0x16cd74 + ":" + _0x147638;
      }
    }
    return {
      remark: _0x51ea64 || "",
      salt: _0x1444f5,
      cookie: _0x4b07f9(_0x4d1528),
      proxyUrl: _0x2c3fa1
    };
  }
  function _0x215e64() {
    const _0x1f8280 = _0x40cbac();
    const _0x2585e4 = [];
    for (const _0x14cd23 of _0x1f8280) {
      const _0x2ffb33 = _0x8580b(_0x14cd23);
      _0x2ffb33 ? _0x2585e4.push(_0x2ffb33) : console.log("❌ 账号格式错误：" + _0x14cd23);
    }
    _0x2585e4.forEach((_0x1237b1, _0x5659c0) => {
      _0x1237b1.index = _0x5659c0 + 1;
    });
    return _0x2585e4;
  }
  async function _0x394aab(_0xf07855, _0x15d48e, _0x4f0cef) {
    const _0x265bb2 = new Array(_0xf07855.length);
    let _0x3de022 = 0;
    async function _0xd7837e() {
      while (true) {
        const _0x55eb24 = _0x3de022++;
        if (_0x55eb24 >= _0xf07855.length) {
          return;
        }
        const _0x33f70e = _0xf07855[_0x55eb24];
        try {
          _0x265bb2[_0x55eb24] = await _0x4f0cef(_0x33f70e, _0x55eb24);
        } catch (_0x4e66e4) {
          console.log("❌ 并发执行异常（index=" + (_0x55eb24 + 1) + "）：" + _0x4e66e4.message);
          _0x265bb2[_0x55eb24] = null;
        }
      }
    }
    const _0x2c5457 = Array.from({
      length: Math.min(_0x15d48e, _0xf07855.length)
    }, _0xd7837e);
    await Promise.all(_0x2c5457);
    return _0x265bb2;
  }
  async function _0x4ea352(_0x239b95) {
    const _0x54df5c = () => "账号[" + _0x239b95.index + "]" + (_0x239b95.remark ? "(" + _0x239b95.remark + ")" : "");
    console.log("🔌 " + _0x54df5c() + " 测试代理连接中...");
    const _0x4c6c95 = await _0x42f728(_0x239b95.proxyUrl, _0x54df5c());
    console.log("   " + _0x4c6c95.msg);
    if (_0x239b95.proxyUrl && !_0x4c6c95.ok) {
      console.log("❌ " + _0x54df5c() + " 代理测试失败，停止执行该账号任务");
      return {
        index: _0x239b95.index,
        remark: _0x239b95.remark || "无备注",
        nickname: "账号" + _0x239b95.index,
        initialCoin: 0,
        finalCoin: 0,
        coinChange: 0,
        error: "代理连接失败",
        proxyFailed: true
      };
    }
    console.log("🔍 " + _0x54df5c() + " 获取账号信息中...");
    let _0x2b4047 = await _0x531e69(_0x239b95.cookie, _0x239b95.proxyUrl, _0x239b95.index);
    let _0x1a2d45 = _0x2b4047?.["nickname"] || "账号" + _0x239b95.index;
    if (_0x2b4047) {
      const _0x483968 = _0x2b4047.totalCoin != null ? _0x2b4047.totalCoin : "未知";
      const _0x4cc6a5 = _0x2b4047.allCash != null ? _0x2b4047.allCash : "未知";
      const _0x52723a = _0x2b4047.accumulativeCash != null ? _0x2b4047.accumulativeCash : "未知";
      console.log("✅ " + _0x54df5c() + " 登录成功，金币: " + _0x483968 + "，余额: " + _0x4cc6a5 + (_0x52723a !== "未知" ? "，累计提现: " + _0x52723a : ""));
    } else {
      console.log("❌ " + _0x54df5c() + " 基本信息获取失败，继续执行");
    }
    const _0x4ad6d9 = {
      ..._0x239b95,
      nickname: _0x1a2d45,
      tasksToExecute: _0x4639c3
    };
    const _0x4f15ae = new _0x13dccf(_0x4ad6d9);
    await _0x4f15ae.checkCoinLimit();
    if (_0x4f15ae.coinExceeded) {
      console.log("💰 " + _0x54df5c() + " 初始金币已超过阈值，不执行任务");
      return {
        index: _0x239b95.index,
        remark: _0x239b95.remark || "无备注",
        nickname: _0x1a2d45,
        initialCoin: _0x2b4047?.["totalCoin"] || 0,
        finalCoin: _0x2b4047?.["totalCoin"] || 0,
        coinChange: 0,
        stats: _0x4f15ae.getTaskStats(),
        coinLimitExceeded: true,
        accumulatedCoins: 0,
        adInfoFailCount: _0x4f15ae.adInfoFailCount
      };
    }
    console.log("🚀 " + _0x54df5c() + " 开始执行任务");
    await _0x4f15ae.executeAllTasksByPriority();
    const _0x2b1d67 = await _0x531e69(_0x239b95.cookie, _0x239b95.proxyUrl, _0x239b95.index);
    const _0x3dcfa6 = _0x2b4047?.["totalCoin"] || 0;
    const _0x2c7c74 = _0x2b1d67?.["totalCoin"] || 0;
    const _0x4ddedf = _0x2c7c74 - _0x3dcfa6;
    _0x4f15ae.printTaskStats();
    return {
      index: _0x239b95.index,
      remark: _0x239b95.remark || "无备注",
      nickname: _0x1a2d45,
      initialCoin: _0x3dcfa6,
      finalCoin: _0x2c7c74,
      coinChange: _0x4ddedf,
      stats: _0x4f15ae.getTaskStats(),
      coinLimitExceeded: _0x4f15ae.coinExceeded,
      lowRewardStopped: _0x4f15ae.lowRewardCount >= _0x4f15ae.maxLowRewardCount,
      accumulatedCoins: _0x4f15ae.accumulatedCoins,
      adInfoFailCount: _0x4f15ae.adInfoFailCount
    };
  }
  function _0x218672(_0x4146a3) {
    if (!_0x4146a3.length) {
      return;
    }
    let _0x2993d5 = 0;
    let _0x515433 = 0;
    let _0x16391a = 0;
    let _0x5f259a = 0;
    let _0xfee5fe = 0;
    _0x4146a3.forEach(_0x4dc684 => {
      _0x2993d5 += _0x4dc684.coinChange || 0;
      _0x5f259a += _0x4dc684.accumulatedCoins || 0;
      _0xfee5fe += _0x4dc684.adInfoFailCount || 0;
      _0x4dc684.stats && Object.values(_0x4dc684.stats).forEach(_0xb24f8c => {
        _0x515433 += _0xb24f8c.totalReward;
      });
      if (_0x4dc684.lowRewardStopped) {
        _0x16391a++;
      }
    });
    console.log("\n" + "-".repeat(35));
    console.log("🎉 全部任务完成!");
    console.log("📌 运行模式: " + (_0x33bd31 ? "极速版" : "普通版"));
    console.log("📊 总金币变化: " + (_0x2993d5 >= 0 ? "+" : "") + _0x2993d5);
    console.log("🏆 总金币奖励: " + _0x515433);
    console.log("💰 累计获得金币: " + _0x5f259a);
    console.log("❌ 总广告信息失败次数: " + _0xfee5fe);
    _0x16391a > 0 && console.log("⚠️  低奖励停止账号: " + _0x16391a + "个");
    _0x1899b8 && console.log("🚨 注意: 任务因卡密过期/次数用完而提前终止");
    _0x22cd71 && console.log("🚨 注意: 任务因签名服务故障而提前终止 (连续失败 " + _0x7844db + " 次)");
    console.log("-".repeat(35));
  }
  if (typeof global !== "undefined") {
    const _0x8078d9 = {
      version: "8.0",
      compatible: true,
      features: ["广告信息失败限制", "任务上限检测", "预计金币检测与跳过", "普通版+极速版合并"]
    };
    global.V8js = _0x8078d9;
  }
  (async () => {
    await _0x509427();
  })();
})();