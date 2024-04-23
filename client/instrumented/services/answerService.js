function cov_1ozt5cxpyg() {
  var path = "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/answerService.js";
  var hash = "6eacc8a95fc4bfbf03043944e650a8acf01b7cdf";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/answerService.js",
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
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "6eacc8a95fc4bfbf03043944e650a8acf01b7cdf"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1ozt5cxpyg = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1ozt5cxpyg();
import { REACT_APP_API_URL, api } from "./config";
const ANSWER_API_URL = (cov_1ozt5cxpyg().s[0]++, `${REACT_APP_API_URL}/answer`);

// To add answer
cov_1ozt5cxpyg().s[1]++;
const addAnswer = async (qid, ans, csrfToken) => {
  cov_1ozt5cxpyg().f[0]++;
  const data = (cov_1ozt5cxpyg().s[2]++, {
    qid: qid,
    ans: ans
  });
  const res = (cov_1ozt5cxpyg().s[3]++, await api.post(`${ANSWER_API_URL}/addAnswer`, data, {
    headers: {
      "x-csrf-token": csrfToken
    }
  }));
  cov_1ozt5cxpyg().s[4]++;
  return res.data;
};
export { addAnswer };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMW96dDVjeHB5ZyIsImFjdHVhbENvdmVyYWdlIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJhcGkiLCJBTlNXRVJfQVBJX1VSTCIsInMiLCJhZGRBbnN3ZXIiLCJxaWQiLCJhbnMiLCJjc3JmVG9rZW4iLCJmIiwiZGF0YSIsInJlcyIsInBvc3QiLCJoZWFkZXJzIl0sInNvdXJjZXMiOlsiYW5zd2VyU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSRUFDVF9BUFBfQVBJX1VSTCwgYXBpIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IEFOU1dFUl9BUElfVVJMID0gYCR7UkVBQ1RfQVBQX0FQSV9VUkx9L2Fuc3dlcmA7XG5cbi8vIFRvIGFkZCBhbnN3ZXJcbmNvbnN0IGFkZEFuc3dlciA9IGFzeW5jIChxaWQsIGFucywgY3NyZlRva2VuKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHsgcWlkOiBxaWQsIGFuczogYW5zIH07XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLnBvc3QoYCR7QU5TV0VSX0FQSV9VUkx9L2FkZEFuc3dlcmAsIGRhdGEsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJ4LWNzcmYtdG9rZW5cIjogY3NyZlRva2VuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXMuZGF0YTtcbn07XG5cbmV4cG9ydCB7IGFkZEFuc3dlciB9OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUFTRSxpQkFBaUIsRUFBRUMsR0FBRyxRQUFRLFVBQVU7QUFFakQsTUFBTUMsY0FBYyxJQUFBSixjQUFBLEdBQUFLLENBQUEsT0FBSSxHQUFFSCxpQkFBa0IsU0FBUTs7QUFFcEQ7QUFBQUYsY0FBQSxHQUFBSyxDQUFBO0FBQ0EsTUFBTUMsU0FBUyxHQUFHLE1BQUFBLENBQU9DLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxTQUFTLEtBQUs7RUFBQVQsY0FBQSxHQUFBVSxDQUFBO0VBQzdDLE1BQU1DLElBQUksSUFBQVgsY0FBQSxHQUFBSyxDQUFBLE9BQUc7SUFBRUUsR0FBRyxFQUFFQSxHQUFHO0lBQUVDLEdBQUcsRUFBRUE7RUFBSSxDQUFDO0VBQ25DLE1BQU1JLEdBQUcsSUFBQVosY0FBQSxHQUFBSyxDQUFBLE9BQUcsTUFBTUYsR0FBRyxDQUFDVSxJQUFJLENBQUUsR0FBRVQsY0FBZSxZQUFXLEVBQUVPLElBQUksRUFBRTtJQUM1REcsT0FBTyxFQUFFO01BQ0wsY0FBYyxFQUFFTDtJQUNwQjtFQUNKLENBQUMsQ0FBQztFQUFDVCxjQUFBLEdBQUFLLENBQUE7RUFFSCxPQUFPTyxHQUFHLENBQUNELElBQUk7QUFDbkIsQ0FBQztBQUVELFNBQVNMLFNBQVMifQ==