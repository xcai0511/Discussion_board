function cov_107e0h4jok() {
  var path = "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/authService.js";
  var hash = "5c905589c4c1cbd92d2e606931e9844ebc81d617";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/authService.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 21
        },
        end: {
          line: 3,
          column: 48
        }
      },
      "1": {
        start: {
          line: 5,
          column: 14
        },
        end: {
          line: 14,
          column: 1
        }
      },
      "2": {
        start: {
          line: 6,
          column: 17
        },
        end: {
          line: 6,
          column: 34
        }
      },
      "3": {
        start: {
          line: 7,
          column: 16
        },
        end: {
          line: 12,
          column: 6
        }
      },
      "4": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 20
        }
      },
      "5": {
        start: {
          line: 16,
          column: 15
        },
        end: {
          line: 29,
          column: 1
        }
      },
      "6": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 28,
          column: 5
        }
      },
      "7": {
        start: {
          line: 18,
          column: 25
        },
        end: {
          line: 23,
          column: 10
        }
      },
      "8": {
        start: {
          line: 24,
          column: 8
        },
        end: {
          line: 24,
          column: 29
        }
      },
      "9": {
        start: {
          line: 26,
          column: 8
        },
        end: {
          line: 26,
          column: 53
        }
      },
      "10": {
        start: {
          line: 27,
          column: 8
        },
        end: {
          line: 27,
          column: 20
        }
      },
      "11": {
        start: {
          line: 31,
          column: 23
        },
        end: {
          line: 34,
          column: 1
        }
      },
      "12": {
        start: {
          line: 32,
          column: 21
        },
        end: {
          line: 32,
          column: 91
        }
      },
      "13": {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 33,
          column: 35
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 14
          },
          end: {
            line: 5,
            column: 15
          }
        },
        loc: {
          start: {
            line: 5,
            column: 51
          },
          end: {
            line: 14,
            column: 1
          }
        },
        line: 5
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 16,
            column: 15
          },
          end: {
            line: 16,
            column: 16
          }
        },
        loc: {
          start: {
            line: 16,
            column: 36
          },
          end: {
            line: 29,
            column: 1
          }
        },
        line: 16
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 31,
            column: 23
          },
          end: {
            line: 31,
            column: 24
          }
        },
        loc: {
          start: {
            line: 31,
            column: 35
          },
          end: {
            line: 34,
            column: 1
          }
        },
        line: 31
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
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "5c905589c4c1cbd92d2e606931e9844ebc81d617"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_107e0h4jok = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_107e0h4jok();
import { REACT_APP_API_URL, api } from "./config";
const AUTH_API_URL = (cov_107e0h4jok().s[0]++, `${REACT_APP_API_URL}/auth`);
cov_107e0h4jok().s[1]++;
const login = async (email, password, csrfToken) => {
  cov_107e0h4jok().f[0]++;
  const data = (cov_107e0h4jok().s[2]++, {
    email,
    password
  });
  const res = (cov_107e0h4jok().s[3]++, await api.post(`${AUTH_API_URL}/login`, data, {
    headers: {
      'x-csrf-token': csrfToken
    },
    withCredentials: true
  }));
  cov_107e0h4jok().s[4]++;
  return res.data;
};
cov_107e0h4jok().s[5]++;
const logout = async csrfToken => {
  cov_107e0h4jok().f[1]++;
  cov_107e0h4jok().s[6]++;
  try {
    const response = (cov_107e0h4jok().s[7]++, await api.post(`${AUTH_API_URL}/logout`, {}, {
      headers: {
        'x-csrf-Token': csrfToken
      },
      withCredentials: true
    }));
    cov_107e0h4jok().s[8]++;
    return response.data;
  } catch (error) {
    cov_107e0h4jok().s[9]++;
    console.error('Error during logout:', error);
    cov_107e0h4jok().s[10]++;
    throw error;
  }
};
cov_107e0h4jok().s[11]++;
const fetchCsrfToken = async () => {
  cov_107e0h4jok().f[2]++;
  const response = (cov_107e0h4jok().s[12]++, await api.get(`${AUTH_API_URL}/csrf-token`, {
    withCredentials: true
  }));
  cov_107e0h4jok().s[13]++;
  return response.data.csrfToken;
};
export { login, logout, fetchCsrfToken };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTA3ZTBoNGpvayIsImFjdHVhbENvdmVyYWdlIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJhcGkiLCJBVVRIX0FQSV9VUkwiLCJzIiwibG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiY3NyZlRva2VuIiwiZiIsImRhdGEiLCJyZXMiLCJwb3N0IiwiaGVhZGVycyIsIndpdGhDcmVkZW50aWFscyIsImxvZ291dCIsInJlc3BvbnNlIiwiZXJyb3IiLCJjb25zb2xlIiwiZmV0Y2hDc3JmVG9rZW4iLCJnZXQiXSwic291cmNlcyI6WyJhdXRoU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSRUFDVF9BUFBfQVBJX1VSTCwgYXBpIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IEFVVEhfQVBJX1VSTCA9IGAke1JFQUNUX0FQUF9BUElfVVJMfS9hdXRoYDtcblxuY29uc3QgbG9naW4gPSBhc3luYyhlbWFpbCwgcGFzc3dvcmQsIGNzcmZUb2tlbikgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7ZW1haWwsIHBhc3N3b3JkfTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucG9zdChgJHtBVVRIX0FQSV9VUkx9L2xvZ2luYCwgZGF0YSwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAneC1jc3JmLXRva2VuJzogY3NyZlRva2VuLFxuICAgICAgICB9LFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcy5kYXRhO1xufVxuXG5jb25zdCBsb2dvdXQgPSBhc3luYyAoY3NyZlRva2VuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChgJHtBVVRIX0FQSV9VUkx9L2xvZ291dGAsIHt9LCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ3gtY3NyZi1Ub2tlbic6IGNzcmZUb2tlbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgbG9nb3V0OicsIGVycm9yKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5jb25zdCBmZXRjaENzcmZUb2tlbiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYCR7QVVUSF9BUElfVVJMfS9jc3JmLXRva2VuYCwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuY3NyZlRva2VuO1xufTtcblxuZXhwb3J0IHsgbG9naW4sIGxvZ291dCwgZmV0Y2hDc3JmVG9rZW4gfTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUFTRSxpQkFBaUIsRUFBRUMsR0FBRyxRQUFRLFVBQVU7QUFFakQsTUFBTUMsWUFBWSxJQUFBSixjQUFBLEdBQUFLLENBQUEsT0FBSSxHQUFFSCxpQkFBa0IsT0FBTTtBQUFDRixjQUFBLEdBQUFLLENBQUE7QUFFakQsTUFBTUMsS0FBSyxHQUFHLE1BQUFBLENBQU1DLEtBQUssRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEtBQUs7RUFBQVQsY0FBQSxHQUFBVSxDQUFBO0VBQy9DLE1BQU1DLElBQUksSUFBQVgsY0FBQSxHQUFBSyxDQUFBLE9BQUc7SUFBQ0UsS0FBSztJQUFFQztFQUFRLENBQUM7RUFDOUIsTUFBTUksR0FBRyxJQUFBWixjQUFBLEdBQUFLLENBQUEsT0FBRyxNQUFNRixHQUFHLENBQUNVLElBQUksQ0FBRSxHQUFFVCxZQUFhLFFBQU8sRUFBRU8sSUFBSSxFQUFFO0lBQ3RERyxPQUFPLEVBQUU7TUFDTCxjQUFjLEVBQUVMO0lBQ3BCLENBQUM7SUFDRE0sZUFBZSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUFDZixjQUFBLEdBQUFLLENBQUE7RUFDSCxPQUFPTyxHQUFHLENBQUNELElBQUk7QUFDbkIsQ0FBQztBQUFBWCxjQUFBLEdBQUFLLENBQUE7QUFFRCxNQUFNVyxNQUFNLEdBQUcsTUFBT1AsU0FBUyxJQUFLO0VBQUFULGNBQUEsR0FBQVUsQ0FBQTtFQUFBVixjQUFBLEdBQUFLLENBQUE7RUFDaEMsSUFBSTtJQUNBLE1BQU1ZLFFBQVEsSUFBQWpCLGNBQUEsR0FBQUssQ0FBQSxPQUFHLE1BQU1GLEdBQUcsQ0FBQ1UsSUFBSSxDQUFFLEdBQUVULFlBQWEsU0FBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO01BQzFEVSxPQUFPLEVBQUU7UUFDTCxjQUFjLEVBQUVMO01BQ3BCLENBQUM7TUFDRE0sZUFBZSxFQUFFO0lBQ3JCLENBQUMsQ0FBQztJQUFDZixjQUFBLEdBQUFLLENBQUE7SUFDSCxPQUFPWSxRQUFRLENBQUNOLElBQUk7RUFDeEIsQ0FBQyxDQUFDLE9BQU9PLEtBQUssRUFBRTtJQUFBbEIsY0FBQSxHQUFBSyxDQUFBO0lBQ1pjLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLHNCQUFzQixFQUFFQSxLQUFLLENBQUM7SUFBQ2xCLGNBQUEsR0FBQUssQ0FBQTtJQUM3QyxNQUFNYSxLQUFLO0VBQ2Y7QUFDSixDQUFDO0FBQUFsQixjQUFBLEdBQUFLLENBQUE7QUFFRCxNQUFNZSxjQUFjLEdBQUcsTUFBQUEsQ0FBQSxLQUFZO0VBQUFwQixjQUFBLEdBQUFVLENBQUE7RUFDL0IsTUFBTU8sUUFBUSxJQUFBakIsY0FBQSxHQUFBSyxDQUFBLFFBQUcsTUFBTUYsR0FBRyxDQUFDa0IsR0FBRyxDQUFFLEdBQUVqQixZQUFhLGFBQVksRUFBRTtJQUFFVyxlQUFlLEVBQUU7RUFBSyxDQUFDLENBQUM7RUFBQ2YsY0FBQSxHQUFBSyxDQUFBO0VBQ3hGLE9BQU9ZLFFBQVEsQ0FBQ04sSUFBSSxDQUFDRixTQUFTO0FBQ2xDLENBQUM7QUFFRCxTQUFTSCxLQUFLLEVBQUVVLE1BQU0sRUFBRUksY0FBYyJ9