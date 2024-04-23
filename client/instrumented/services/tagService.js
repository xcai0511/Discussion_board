function cov_20hoeszwm3() {
  var path = "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/tagService.js";
  var hash = "c8fed1cbf6f0de513039a4f1032e7b1354576ceb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/whitneycai/2023/5500/final-project-xiaojin-jaime/client/src/services/tagService.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 20
        },
        end: {
          line: 3,
          column: 46
        }
      },
      "1": {
        start: {
          line: 5,
          column: 34
        },
        end: {
          line: 9,
          column: 1
        }
      },
      "2": {
        start: {
          line: 6,
          column: 16
        },
        end: {
          line: 6,
          column: 73
        }
      },
      "3": {
        start: {
          line: 8,
          column: 4
        },
        end: {
          line: 8,
          column: 20
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 34
          },
          end: {
            line: 5,
            column: 35
          }
        },
        loc: {
          start: {
            line: 5,
            column: 46
          },
          end: {
            line: 9,
            column: 1
          }
        },
        line: 5
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c8fed1cbf6f0de513039a4f1032e7b1354576ceb"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_20hoeszwm3 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_20hoeszwm3();
import { REACT_APP_API_URL, api } from "./config";
const TAG_API_URL = (cov_20hoeszwm3().s[0]++, `${REACT_APP_API_URL}/tag`);
cov_20hoeszwm3().s[1]++;
const getTagsWithQuestionNumber = async () => {
  cov_20hoeszwm3().f[0]++;
  const res = (cov_20hoeszwm3().s[2]++, await api.get(`${TAG_API_URL}/getTagsWithQuestionNumber`));
  cov_20hoeszwm3().s[3]++;
  return res.data;
};
export { getTagsWithQuestionNumber };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjBob2VzendtMyIsImFjdHVhbENvdmVyYWdlIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJhcGkiLCJUQUdfQVBJX1VSTCIsInMiLCJnZXRUYWdzV2l0aFF1ZXN0aW9uTnVtYmVyIiwiZiIsInJlcyIsImdldCIsImRhdGEiXSwic291cmNlcyI6WyJ0YWdTZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJFQUNUX0FQUF9BUElfVVJMLCBhcGkgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuY29uc3QgVEFHX0FQSV9VUkwgPSBgJHtSRUFDVF9BUFBfQVBJX1VSTH0vdGFnYDtcblxuY29uc3QgZ2V0VGFnc1dpdGhRdWVzdGlvbk51bWJlciA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBhcGkuZ2V0KGAke1RBR19BUElfVVJMfS9nZXRUYWdzV2l0aFF1ZXN0aW9uTnVtYmVyYCk7XG5cbiAgICByZXR1cm4gcmVzLmRhdGE7XG59O1xuXG5leHBvcnQgeyBnZXRUYWdzV2l0aFF1ZXN0aW9uTnVtYmVyIH07Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZO0lBQUFBLGNBQUEsWUFBQUEsQ0FBQTtNQUFBLE9BQUFDLGNBQUE7SUFBQTtFQUFBO0VBQUEsT0FBQUEsY0FBQTtBQUFBO0FBQUFELGNBQUE7QUFmWixTQUFTRSxpQkFBaUIsRUFBRUMsR0FBRyxRQUFRLFVBQVU7QUFFakQsTUFBTUMsV0FBVyxJQUFBSixjQUFBLEdBQUFLLENBQUEsT0FBSSxHQUFFSCxpQkFBa0IsTUFBSztBQUFDRixjQUFBLEdBQUFLLENBQUE7QUFFL0MsTUFBTUMseUJBQXlCLEdBQUcsTUFBQUEsQ0FBQSxLQUFZO0VBQUFOLGNBQUEsR0FBQU8sQ0FBQTtFQUMxQyxNQUFNQyxHQUFHLElBQUFSLGNBQUEsR0FBQUssQ0FBQSxPQUFHLE1BQU1GLEdBQUcsQ0FBQ00sR0FBRyxDQUFFLEdBQUVMLFdBQVksNEJBQTJCLENBQUM7RUFBQ0osY0FBQSxHQUFBSyxDQUFBO0VBRXRFLE9BQU9HLEdBQUcsQ0FBQ0UsSUFBSTtBQUNuQixDQUFDO0FBRUQsU0FBU0oseUJBQXlCIn0=