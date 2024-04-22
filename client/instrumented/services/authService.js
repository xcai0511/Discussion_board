function cov_la9wcovaj() {
  var path = "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\authService.js";
  var hash = "d16aebb1e24bff2f63bd972b4c4a1261341a4343";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\authService.js",
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
    hash: "d16aebb1e24bff2f63bd972b4c4a1261341a4343"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_la9wcovaj = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_la9wcovaj();
import { REACT_APP_API_URL, api } from "./config";
const AUTH_API_URL = (cov_la9wcovaj().s[0]++, `${REACT_APP_API_URL}/auth`);
cov_la9wcovaj().s[1]++;
const login = async (email, password, csrfToken) => {
  cov_la9wcovaj().f[0]++;
  const data = (cov_la9wcovaj().s[2]++, {
    email,
    password
  });
  const res = (cov_la9wcovaj().s[3]++, await api.post(`${AUTH_API_URL}/login`, data, {
    headers: {
      'x-csrf-token': csrfToken
    },
    withCredentials: true
  }));
  cov_la9wcovaj().s[4]++;
  return res.data;
};
cov_la9wcovaj().s[5]++;
const logout = async csrfToken => {
  cov_la9wcovaj().f[1]++;
  cov_la9wcovaj().s[6]++;
  try {
    const response = (cov_la9wcovaj().s[7]++, await api.post(`${AUTH_API_URL}/logout`, {}, {
      headers: {
        'x-csrf-Token': csrfToken
      },
      withCredentials: true
    }));
    cov_la9wcovaj().s[8]++;
    return response.data;
  } catch (error) {
    cov_la9wcovaj().s[9]++;
    console.error('Error during logout:', error);
    cov_la9wcovaj().s[10]++;
    throw error;
  }
};
cov_la9wcovaj().s[11]++;
const fetchCsrfToken = async () => {
  cov_la9wcovaj().f[2]++;
  const response = (cov_la9wcovaj().s[12]++, await api.get(`${AUTH_API_URL}/csrf-token`, {
    withCredentials: true
  }));
  cov_la9wcovaj().s[13]++;
  return response.data.csrfToken;
};
export { login, logout, fetchCsrfToken };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfbGE5d2NvdmFqIiwiYWN0dWFsQ292ZXJhZ2UiLCJSRUFDVF9BUFBfQVBJX1VSTCIsImFwaSIsIkFVVEhfQVBJX1VSTCIsInMiLCJsb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJjc3JmVG9rZW4iLCJmIiwiZGF0YSIsInJlcyIsInBvc3QiLCJoZWFkZXJzIiwid2l0aENyZWRlbnRpYWxzIiwibG9nb3V0IiwicmVzcG9uc2UiLCJlcnJvciIsImNvbnNvbGUiLCJmZXRjaENzcmZUb2tlbiIsImdldCJdLCJzb3VyY2VzIjpbImF1dGhTZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJFQUNUX0FQUF9BUElfVVJMLCBhcGkgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmNvbnN0IEFVVEhfQVBJX1VSTCA9IGAke1JFQUNUX0FQUF9BUElfVVJMfS9hdXRoYDtcclxuXHJcbmNvbnN0IGxvZ2luID0gYXN5bmMoZW1haWwsIHBhc3N3b3JkLCBjc3JmVG9rZW4pID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSB7ZW1haWwsIHBhc3N3b3JkfTtcclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGFwaS5wb3N0KGAke0FVVEhfQVBJX1VSTH0vbG9naW5gLCBkYXRhLCB7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAneC1jc3JmLXRva2VuJzogY3NyZlRva2VuLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLmRhdGE7XHJcbn1cclxuXHJcbmNvbnN0IGxvZ291dCA9IGFzeW5jIChjc3JmVG9rZW4pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChgJHtBVVRIX0FQSV9VUkx9L2xvZ291dGAsIHt9LCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICd4LWNzcmYtVG9rZW4nOiBjc3JmVG9rZW4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIGxvZ291dDonLCBlcnJvcik7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGZldGNoQ3NyZlRva2VuID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAke0FVVEhfQVBJX1VSTH0vY3NyZi10b2tlbmAsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuY3NyZlRva2VuO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgbG9naW4sIGxvZ291dCwgZmV0Y2hDc3JmVG9rZW4gfTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGFBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGFBQUE7QUFmWixTQUFTRSxpQkFBaUIsRUFBRUMsR0FBRyxRQUFRLFVBQVU7QUFFakQsTUFBTUMsWUFBWSxJQUFBSixhQUFBLEdBQUFLLENBQUEsT0FBSSxHQUFFSCxpQkFBa0IsT0FBTTtBQUFDRixhQUFBLEdBQUFLLENBQUE7QUFFakQsTUFBTUMsS0FBSyxHQUFHLE1BQUFBLENBQU1DLEtBQUssRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEtBQUs7RUFBQVQsYUFBQSxHQUFBVSxDQUFBO0VBQy9DLE1BQU1DLElBQUksSUFBQVgsYUFBQSxHQUFBSyxDQUFBLE9BQUc7SUFBQ0UsS0FBSztJQUFFQztFQUFRLENBQUM7RUFDOUIsTUFBTUksR0FBRyxJQUFBWixhQUFBLEdBQUFLLENBQUEsT0FBRyxNQUFNRixHQUFHLENBQUNVLElBQUksQ0FBRSxHQUFFVCxZQUFhLFFBQU8sRUFBRU8sSUFBSSxFQUFFO0lBQ3RERyxPQUFPLEVBQUU7TUFDTCxjQUFjLEVBQUVMO0lBQ3BCLENBQUM7SUFDRE0sZUFBZSxFQUFFO0VBQ3JCLENBQUMsQ0FBQztFQUFDZixhQUFBLEdBQUFLLENBQUE7RUFDSCxPQUFPTyxHQUFHLENBQUNELElBQUk7QUFDbkIsQ0FBQztBQUFBWCxhQUFBLEdBQUFLLENBQUE7QUFFRCxNQUFNVyxNQUFNLEdBQUcsTUFBT1AsU0FBUyxJQUFLO0VBQUFULGFBQUEsR0FBQVUsQ0FBQTtFQUFBVixhQUFBLEdBQUFLLENBQUE7RUFDaEMsSUFBSTtJQUNBLE1BQU1ZLFFBQVEsSUFBQWpCLGFBQUEsR0FBQUssQ0FBQSxPQUFHLE1BQU1GLEdBQUcsQ0FBQ1UsSUFBSSxDQUFFLEdBQUVULFlBQWEsU0FBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO01BQzFEVSxPQUFPLEVBQUU7UUFDTCxjQUFjLEVBQUVMO01BQ3BCLENBQUM7TUFDRE0sZUFBZSxFQUFFO0lBQ3JCLENBQUMsQ0FBQztJQUFDZixhQUFBLEdBQUFLLENBQUE7SUFDSCxPQUFPWSxRQUFRLENBQUNOLElBQUk7RUFDeEIsQ0FBQyxDQUFDLE9BQU9PLEtBQUssRUFBRTtJQUFBbEIsYUFBQSxHQUFBSyxDQUFBO0lBQ1pjLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLHNCQUFzQixFQUFFQSxLQUFLLENBQUM7SUFBQ2xCLGFBQUEsR0FBQUssQ0FBQTtJQUM3QyxNQUFNYSxLQUFLO0VBQ2Y7QUFDSixDQUFDO0FBQUFsQixhQUFBLEdBQUFLLENBQUE7QUFFRCxNQUFNZSxjQUFjLEdBQUcsTUFBQUEsQ0FBQSxLQUFZO0VBQUFwQixhQUFBLEdBQUFVLENBQUE7RUFDL0IsTUFBTU8sUUFBUSxJQUFBakIsYUFBQSxHQUFBSyxDQUFBLFFBQUcsTUFBTUYsR0FBRyxDQUFDa0IsR0FBRyxDQUFFLEdBQUVqQixZQUFhLGFBQVksRUFBRTtJQUFFVyxlQUFlLEVBQUU7RUFBSyxDQUFDLENBQUM7RUFBQ2YsYUFBQSxHQUFBSyxDQUFBO0VBQ3hGLE9BQU9ZLFFBQVEsQ0FBQ04sSUFBSSxDQUFDRixTQUFTO0FBQ2xDLENBQUM7QUFFRCxTQUFTSCxLQUFLLEVBQUVVLE1BQU0sRUFBRUksY0FBYyJ9