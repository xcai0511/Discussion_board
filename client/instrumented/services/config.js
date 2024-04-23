function cov_1rcetv9gte() {
  var path = "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/config.js";
  var hash = "5f4f4d5b22c41f0eb491f4cf5a982646f7caecd8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/config.js",
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
    hash: "5f4f4d5b22c41f0eb491f4cf5a982646f7caecd8"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1rcetv9gte = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1rcetv9gte();
import _axios from "axios";
const REACT_APP_API_URL = (cov_1rcetv9gte().s[0]++, "http://localhost:8000");
cov_1rcetv9gte().s[1]++;
const handleRes = res => {
  cov_1rcetv9gte().f[0]++;
  cov_1rcetv9gte().s[2]++;
  return res;
};
cov_1rcetv9gte().s[3]++;
const handleErr = err => {
  cov_1rcetv9gte().f[1]++;
  cov_1rcetv9gte().s[4]++;
  console.log(err);
  cov_1rcetv9gte().s[5]++;
  return err;
};
const api = (cov_1rcetv9gte().s[6]++, _axios.create({
  withCredentials: true
}));
cov_1rcetv9gte().s[7]++;
api.interceptors.request.use(handleRes, handleErr);
cov_1rcetv9gte().s[8]++;
api.interceptors.response.use(handleRes, handleErr);
export { REACT_APP_API_URL, api };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMXJjZXR2OWd0ZSIsImFjdHVhbENvdmVyYWdlIiwiX2F4aW9zIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJzIiwiaGFuZGxlUmVzIiwicmVzIiwiZiIsImhhbmRsZUVyciIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJhcGkiLCJjcmVhdGUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwicmVzcG9uc2UiXSwic291cmNlcyI6WyJjb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9heGlvcyBmcm9tIFwiYXhpb3NcIjtcblxuY29uc3QgUkVBQ1RfQVBQX0FQSV9VUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMFwiO1xuXG5jb25zdCBoYW5kbGVSZXMgPSAocmVzKSA9PiB7XG4gICAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGhhbmRsZUVyciA9IChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIHJldHVybiBlcnI7XG59O1xuXG5jb25zdCBhcGkgPSBfYXhpb3MuY3JlYXRlKHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xuYXBpLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShoYW5kbGVSZXMsIGhhbmRsZUVycik7XG5hcGkuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShoYW5kbGVSZXMsIGhhbmRsZUVycik7XG5cbmV4cG9ydCB7IFJFQUNUX0FQUF9BUElfVVJMLCBhcGkgfTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTtJQUFBQSxjQUFBLFlBQUFBLENBQUE7TUFBQSxPQUFBQyxjQUFBO0lBQUE7RUFBQTtFQUFBLE9BQUFBLGNBQUE7QUFBQTtBQUFBRCxjQUFBO0FBZlosT0FBT0UsTUFBTSxNQUFNLE9BQU87QUFFMUIsTUFBTUMsaUJBQWlCLElBQUFILGNBQUEsR0FBQUksQ0FBQSxPQUFHLHVCQUF1QjtBQUFDSixjQUFBLEdBQUFJLENBQUE7QUFFbEQsTUFBTUMsU0FBUyxHQUFJQyxHQUFHLElBQUs7RUFBQU4sY0FBQSxHQUFBTyxDQUFBO0VBQUFQLGNBQUEsR0FBQUksQ0FBQTtFQUN2QixPQUFPRSxHQUFHO0FBQ2QsQ0FBQztBQUFDTixjQUFBLEdBQUFJLENBQUE7QUFFRixNQUFNSSxTQUFTLEdBQUlDLEdBQUcsSUFBSztFQUFBVCxjQUFBLEdBQUFPLENBQUE7RUFBQVAsY0FBQSxHQUFBSSxDQUFBO0VBQ3ZCTSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsR0FBRyxDQUFDO0VBQUNULGNBQUEsR0FBQUksQ0FBQTtFQUNqQixPQUFPSyxHQUFHO0FBQ2QsQ0FBQztBQUVELE1BQU1HLEdBQUcsSUFBQVosY0FBQSxHQUFBSSxDQUFBLE9BQUdGLE1BQU0sQ0FBQ1csTUFBTSxDQUFDO0VBQUVDLGVBQWUsRUFBRTtBQUFLLENBQUMsQ0FBQztBQUFDZCxjQUFBLEdBQUFJLENBQUE7QUFDckRRLEdBQUcsQ0FBQ0csWUFBWSxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ1osU0FBUyxFQUFFRyxTQUFTLENBQUM7QUFBQ1IsY0FBQSxHQUFBSSxDQUFBO0FBQ25EUSxHQUFHLENBQUNHLFlBQVksQ0FBQ0csUUFBUSxDQUFDRCxHQUFHLENBQUNaLFNBQVMsRUFBRUcsU0FBUyxDQUFDO0FBRW5ELFNBQVNMLGlCQUFpQixFQUFFUyxHQUFHIn0=