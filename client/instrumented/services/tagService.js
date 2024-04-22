function cov_2pqz1hey4u() {
  var path = "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\tagService.js";
  var hash = "c00f0b44d910beba5c342834d4b99dc43dcd781c";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\sijai\\OneDrive\\Documents\\GitHub\\final-project-xiaojin-jaime\\client\\src\\services\\tagService.js",
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
    hash: "c00f0b44d910beba5c342834d4b99dc43dcd781c"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2pqz1hey4u = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_2pqz1hey4u();
import { REACT_APP_API_URL, api } from "./config";
const TAG_API_URL = (cov_2pqz1hey4u().s[0]++, `${REACT_APP_API_URL}/tag`);
cov_2pqz1hey4u().s[1]++;
const getTagsWithQuestionNumber = async () => {
  cov_2pqz1hey4u().f[0]++;
  const res = (cov_2pqz1hey4u().s[2]++, await api.get(`${TAG_API_URL}/getTagsWithQuestionNumber`));
  cov_2pqz1hey4u().s[3]++;
  return res.data;
};
export { getTagsWithQuestionNumber };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMnBxejFoZXk0dSIsImFjdHVhbENvdmVyYWdlIiwiUkVBQ1RfQVBQX0FQSV9VUkwiLCJhcGkiLCJUQUdfQVBJX1VSTCIsInMiLCJnZXRUYWdzV2l0aFF1ZXN0aW9uTnVtYmVyIiwiZiIsInJlcyIsImdldCIsImRhdGEiXSwic291cmNlcyI6WyJ0YWdTZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJFQUNUX0FQUF9BUElfVVJMLCBhcGkgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmNvbnN0IFRBR19BUElfVVJMID0gYCR7UkVBQ1RfQVBQX0FQSV9VUkx9L3RhZ2A7XHJcblxyXG5jb25zdCBnZXRUYWdzV2l0aFF1ZXN0aW9uTnVtYmVyID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgYXBpLmdldChgJHtUQUdfQVBJX1VSTH0vZ2V0VGFnc1dpdGhRdWVzdGlvbk51bWJlcmApO1xyXG5cclxuICAgIHJldHVybiByZXMuZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdldFRhZ3NXaXRoUXVlc3Rpb25OdW1iZXIgfTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQVNFLGlCQUFpQixFQUFFQyxHQUFHLFFBQVEsVUFBVTtBQUVqRCxNQUFNQyxXQUFXLElBQUFKLGNBQUEsR0FBQUssQ0FBQSxPQUFJLEdBQUVILGlCQUFrQixNQUFLO0FBQUNGLGNBQUEsR0FBQUssQ0FBQTtBQUUvQyxNQUFNQyx5QkFBeUIsR0FBRyxNQUFBQSxDQUFBLEtBQVk7RUFBQU4sY0FBQSxHQUFBTyxDQUFBO0VBQzFDLE1BQU1DLEdBQUcsSUFBQVIsY0FBQSxHQUFBSyxDQUFBLE9BQUcsTUFBTUYsR0FBRyxDQUFDTSxHQUFHLENBQUUsR0FBRUwsV0FBWSw0QkFBMkIsQ0FBQztFQUFDSixjQUFBLEdBQUFLLENBQUE7RUFFdEUsT0FBT0csR0FBRyxDQUFDRSxJQUFJO0FBQ25CLENBQUM7QUFFRCxTQUFTSix5QkFBeUIifQ==