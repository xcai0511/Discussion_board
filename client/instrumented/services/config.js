function cov_22ng5he1xx() {
  var path = "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\config.js";
  var hash = "ca9a1a141f8bd134f357876a1323afd5f28ad2e8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\config.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 26
        },
        end: {
          line: 3,
          column: 49
        }
      },
      "1": {
        start: {
          line: 5,
          column: 18
        },
        end: {
          line: 7,
          column: 1
        }
      },
      "2": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 15
        }
      },
      "3": {
        start: {
          line: 9,
          column: 18
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "4": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 21
        }
      },
      "5": {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 15
        }
      },
      "6": {
        start: {
          line: 14,
          column: 12
        },
        end: {
          line: 14,
          column: 52
        }
      },
      "7": {
        start: {
          line: 15,
          column: 0
        },
        end: {
          line: 15,
          column: 51
        }
      },
      "8": {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 16,
          column: 52
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 18
          },
          end: {
            line: 5,
            column: 19
          }
        },
        loc: {
          start: {
            line: 5,
            column: 27
          },
          end: {
            line: 7,
            column: 1
          }
        },
        line: 5
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 9,
            column: 18
          },
          end: {
            line: 9,
            column: 19
          }
        },
        loc: {
          start: {
            line: 9,
            column: 27
          },
          end: {
            line: 12,
            column: 1
          }
        },
        line: 9
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "ca9a1a141f8bd134f357876a1323afd5f28ad2e8"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_22ng5he1xx = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_22ng5he1xx();
import _axios from "axios";
const REACT_APP_API_URL = (cov_22ng5he1xx().s[0]++, "http://localhost:8000");
cov_22ng5he1xx().s[1]++;
const handleRes = res => {
  cov_22ng5he1xx().f[0]++;
  cov_22ng5he1xx().s[2]++;
  return res;
};
cov_22ng5he1xx().s[3]++;
const handleErr = err => {
  cov_22ng5he1xx().f[1]++;
  cov_22ng5he1xx().s[4]++;
  console.log(err);
  cov_22ng5he1xx().s[5]++;
  return err;
};
const api = (cov_22ng5he1xx().s[6]++, _axios.create({
  withCredentials: true
}));
cov_22ng5he1xx().s[7]++;
api.interceptors.request.use(handleRes, handleErr);
cov_22ng5he1xx().s[8]++;
api.interceptors.response.use(handleRes, handleErr);
export { REACT_APP_API_URL, api };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjJuZzVoZTF4eCIsImFjdHVhbENvdmVyYWdlIiwiX2F4aW9zIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJzIiwiaGFuZGxlUmVzIiwicmVzIiwiZiIsImhhbmRsZUVyciIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJhcGkiLCJjcmVhdGUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwicmVzcG9uc2UiXSwic291cmNlcyI6WyJjb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9heGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuXHJcbmNvbnN0IFJFQUNUX0FQUF9BUElfVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwMDBcIjtcclxuXHJcbmNvbnN0IGhhbmRsZVJlcyA9IChyZXMpID0+IHtcclxuICAgIHJldHVybiByZXM7XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVFcnIgPSAoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgcmV0dXJuIGVycjtcclxufTtcclxuXHJcbmNvbnN0IGFwaSA9IF9heGlvcy5jcmVhdGUoeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSk7XHJcbmFwaS5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoaGFuZGxlUmVzLCBoYW5kbGVFcnIpO1xyXG5hcGkuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShoYW5kbGVSZXMsIGhhbmRsZUVycik7XHJcblxyXG5leHBvcnQgeyBSRUFDVF9BUFBfQVBJX1VSTCwgYXBpIH07Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLE9BQU9FLE1BQU0sTUFBTSxPQUFPO0FBRTFCLE1BQU1DLGlCQUFpQixJQUFBSCxjQUFBLEdBQUFJLENBQUEsT0FBRyx1QkFBdUI7QUFBQ0osY0FBQSxHQUFBSSxDQUFBO0FBRWxELE1BQU1DLFNBQVMsR0FBSUMsR0FBRyxJQUFLO0VBQUFOLGNBQUEsR0FBQU8sQ0FBQTtFQUFBUCxjQUFBLEdBQUFJLENBQUE7RUFDdkIsT0FBT0UsR0FBRztBQUNkLENBQUM7QUFBQ04sY0FBQSxHQUFBSSxDQUFBO0FBRUYsTUFBTUksU0FBUyxHQUFJQyxHQUFHLElBQUs7RUFBQVQsY0FBQSxHQUFBTyxDQUFBO0VBQUFQLGNBQUEsR0FBQUksQ0FBQTtFQUN2Qk0sT0FBTyxDQUFDQyxHQUFHLENBQUNGLEdBQUcsQ0FBQztFQUFDVCxjQUFBLEdBQUFJLENBQUE7RUFDakIsT0FBT0ssR0FBRztBQUNkLENBQUM7QUFFRCxNQUFNRyxHQUFHLElBQUFaLGNBQUEsR0FBQUksQ0FBQSxPQUFHRixNQUFNLENBQUNXLE1BQU0sQ0FBQztFQUFFQyxlQUFlLEVBQUU7QUFBSyxDQUFDLENBQUM7QUFBQ2QsY0FBQSxHQUFBSSxDQUFBO0FBQ3JEUSxHQUFHLENBQUNHLFlBQVksQ0FBQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNaLFNBQVMsRUFBRUcsU0FBUyxDQUFDO0FBQUNSLGNBQUEsR0FBQUksQ0FBQTtBQUNuRFEsR0FBRyxDQUFDRyxZQUFZLENBQUNHLFFBQVEsQ0FBQ0QsR0FBRyxDQUFDWixTQUFTLEVBQUVHLFNBQVMsQ0FBQztBQUVuRCxTQUFTTCxpQkFBaUIsRUFBRVMsR0FBRyJ9