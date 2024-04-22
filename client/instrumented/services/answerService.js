function cov_14m7a1wwbc() {
  var path = "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\answerService.js";
  var hash = "b30fa5519f48f402a7fa200412ec13db2ce4fa2a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\answerService.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 23
        },
        end: {
          line: 3,
          column: 52
        }
      },
      "1": {
        start: {
          line: 6,
          column: 18
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "2": {
        start: {
          line: 7,
          column: 17
        },
        end: {
          line: 7,
          column: 39
        }
      },
      "3": {
        start: {
          line: 8,
          column: 16
        },
        end: {
          line: 12,
          column: 6
        }
      },
      "4": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 20
        }
      },
      "5": {
        start: {
          line: 19,
          column: 19
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "6": {
        start: {
          line: 20,
          column: 17
        },
        end: {
          line: 20,
          column: 37
        }
      },
      "7": {
        start: {
          line: 21,
          column: 16
        },
        end: {
          line: 21,
          column: 67
        }
      },
      "8": {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 6,
            column: 18
          },
          end: {
            line: 6,
            column: 19
          }
        },
        loc: {
          start: {
            line: 6,
            column: 49
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 6
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 19,
            column: 19
          },
          end: {
            line: 19,
            column: 20
          }
        },
        loc: {
          start: {
            line: 19,
            column: 38
          },
          end: {
            line: 23,
            column: 1
          }
        },
        line: 19
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
    hash: "b30fa5519f48f402a7fa200412ec13db2ce4fa2a"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_14m7a1wwbc = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_14m7a1wwbc();
import { REACT_APP_API_URL, api } from "./config";
const ANSWER_API_URL = (cov_14m7a1wwbc().s[0]++, `${REACT_APP_API_URL}/answer`);

// To add answer
cov_14m7a1wwbc().s[1]++;
const addAnswer = async (qid, ans, csrfToken) => {
  cov_14m7a1wwbc().f[0]++;
  const data = (cov_14m7a1wwbc().s[2]++, {
    qid: qid,
    ans: ans
  });
  const res = (cov_14m7a1wwbc().s[3]++, await api.post(`${ANSWER_API_URL}/addAnswer`, data, {
    headers: {
      "x-csrf-token": csrfToken
    }
  }));
  cov_14m7a1wwbc().s[4]++;
  return res.data;
};

// TODO: Delete if not needed/used
// To edit answer
cov_14m7a1wwbc().s[5]++;
const editAnswer = async (qid, ans) => {
  cov_14m7a1wwbc().f[1]++;
  const data = (cov_14m7a1wwbc().s[6]++, {
    qid: qid,
    ans: ans
  });
  const res = (cov_14m7a1wwbc().s[7]++, await api.put(`${ANSWER_API_URL}/editAnswer`, data));
  cov_14m7a1wwbc().s[8]++;
  return res.data;
};
export { addAnswer, editAnswer };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTRtN2Exd3diYyIsImFjdHVhbENvdmVyYWdlIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJhcGkiLCJBTlNXRVJfQVBJX1VSTCIsInMiLCJhZGRBbnN3ZXIiLCJxaWQiLCJhbnMiLCJjc3JmVG9rZW4iLCJmIiwiZGF0YSIsInJlcyIsInBvc3QiLCJoZWFkZXJzIiwiZWRpdEFuc3dlciIsInB1dCJdLCJzb3VyY2VzIjpbImFuc3dlclNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUkVBQ1RfQVBQX0FQSV9VUkwsIGFwaSB9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuY29uc3QgQU5TV0VSX0FQSV9VUkwgPSBgJHtSRUFDVF9BUFBfQVBJX1VSTH0vYW5zd2VyYDtcclxuXHJcbi8vIFRvIGFkZCBhbnN3ZXJcclxuY29uc3QgYWRkQW5zd2VyID0gYXN5bmMgKHFpZCwgYW5zLCBjc3JmVG9rZW4pID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSB7IHFpZDogcWlkLCBhbnM6IGFucyB9O1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QoYCR7QU5TV0VSX0FQSV9VUkx9L2FkZEFuc3dlcmAsIGRhdGEsIHtcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwieC1jc3JmLXRva2VuXCI6IGNzcmZUb2tlblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXMuZGF0YTtcclxufTtcclxuXHJcbi8vIFRPRE86IERlbGV0ZSBpZiBub3QgbmVlZGVkL3VzZWRcclxuLy8gVG8gZWRpdCBhbnN3ZXJcclxuY29uc3QgZWRpdEFuc3dlciA9IGFzeW5jKHFpZCwgYW5zKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0ge3FpZDogcWlkLCBhbnM6IGFuc307XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkucHV0KGAke0FOU1dFUl9BUElfVVJMfS9lZGl0QW5zd2VyYCwgZGF0YSlcclxuICAgIHJldHVybiByZXMuZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHsgYWRkQW5zd2VyLCBlZGl0QW5zd2VyIH07Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQVNFLGlCQUFpQixFQUFFQyxHQUFHLFFBQVEsVUFBVTtBQUVqRCxNQUFNQyxjQUFjLElBQUFKLGNBQUEsR0FBQUssQ0FBQSxPQUFJLEdBQUVILGlCQUFrQixTQUFROztBQUVwRDtBQUFBRixjQUFBLEdBQUFLLENBQUE7QUFDQSxNQUFNQyxTQUFTLEdBQUcsTUFBQUEsQ0FBT0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVDLFNBQVMsS0FBSztFQUFBVCxjQUFBLEdBQUFVLENBQUE7RUFDN0MsTUFBTUMsSUFBSSxJQUFBWCxjQUFBLEdBQUFLLENBQUEsT0FBRztJQUFFRSxHQUFHLEVBQUVBLEdBQUc7SUFBRUMsR0FBRyxFQUFFQTtFQUFJLENBQUM7RUFDbkMsTUFBTUksR0FBRyxJQUFBWixjQUFBLEdBQUFLLENBQUEsT0FBRyxNQUFNRixHQUFHLENBQUNVLElBQUksQ0FBRSxHQUFFVCxjQUFlLFlBQVcsRUFBRU8sSUFBSSxFQUFFO0lBQzVERyxPQUFPLEVBQUU7TUFDTCxjQUFjLEVBQUVMO0lBQ3BCO0VBQ0osQ0FBQyxDQUFDO0VBQUNULGNBQUEsR0FBQUssQ0FBQTtFQUVILE9BQU9PLEdBQUcsQ0FBQ0QsSUFBSTtBQUNuQixDQUFDOztBQUVEO0FBQ0E7QUFBQVgsY0FBQSxHQUFBSyxDQUFBO0FBQ0EsTUFBTVUsVUFBVSxHQUFHLE1BQUFBLENBQU1SLEdBQUcsRUFBRUMsR0FBRyxLQUFLO0VBQUFSLGNBQUEsR0FBQVUsQ0FBQTtFQUNsQyxNQUFNQyxJQUFJLElBQUFYLGNBQUEsR0FBQUssQ0FBQSxPQUFHO0lBQUNFLEdBQUcsRUFBRUEsR0FBRztJQUFFQyxHQUFHLEVBQUVBO0VBQUcsQ0FBQztFQUNqQyxNQUFNSSxHQUFHLElBQUFaLGNBQUEsR0FBQUssQ0FBQSxPQUFHLE1BQU1GLEdBQUcsQ0FBQ2EsR0FBRyxDQUFFLEdBQUVaLGNBQWUsYUFBWSxFQUFFTyxJQUFJLENBQUM7RUFBQVgsY0FBQSxHQUFBSyxDQUFBO0VBQy9ELE9BQU9PLEdBQUcsQ0FBQ0QsSUFBSTtBQUNuQixDQUFDO0FBRUQsU0FBU0wsU0FBUyxFQUFFUyxVQUFVIn0=