import COMMITIZEN_PR_TYPE from "./interfaces";

export const FEATURES = "Features";
export const FIXES = "Fixes";
export const DOCS = "Docs";
export const STYLE = "Style";
export const REFACTOR = "Refactor";
export const PERFORMANCE = "performance";
export const TEST = "Test";
export const BUILD = "Build";
export const CI = "CI";
export const CHORE = "Chore";
export const REVERT = "Revert";
export const OTHERS = "others";

export const FEAT_CASE_CHECK = "feat";
export const FIX_CASE_CHECK = "fix";
export const DOCS_CASE_CHECK = "docs";
export const STYLE_CASE_CHECK = "style";
export const REFACTOR_CASE_CHECK = "refactor";
export const PERF_CASE_CHECK = "perf";
export const TEST_CASE_CHECK = "test";
export const BUILD_CASE_CHECK = "build";
export const CI_CASE_CHECK = "ci";
export const CHORE_CASE_CHECK = "chore";
export const REVERT_CASE_CHECK = "revert";

interface AllFormattedPRS_MAP {
  [FEAT_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [FIX_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [DOCS_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [STYLE_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [REFACTOR_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [PERF_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [TEST_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [BUILD_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [CI_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [CHORE_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [REVERT_CASE_CHECK]: COMMITIZEN_PR_TYPE;
  [OTHERS]: COMMITIZEN_PR_TYPE;
}

export const allFormattedPRS_MAP: AllFormattedPRS_MAP = {
  [FEAT_CASE_CHECK]: { type: FEATURES, PRS: [], regex: FEAT_CASE_CHECK },
  [FIX_CASE_CHECK]: { type: FIXES, PRS: [], regex: FIX_CASE_CHECK },
  [DOCS_CASE_CHECK]: { type: DOCS, PRS: [], regex: DOCS_CASE_CHECK },
  [STYLE_CASE_CHECK]: { type: STYLE, PRS: [], regex: STYLE_CASE_CHECK },
  [REFACTOR_CASE_CHECK]: {
    type: REFACTOR,
    PRS: [],
    regex: REFACTOR_CASE_CHECK
  },
  [PERF_CASE_CHECK]: { type: PERFORMANCE, PRS: [], regex: PERF_CASE_CHECK },
  [TEST_CASE_CHECK]: { type: TEST, PRS: [], regex: TEST_CASE_CHECK },
  [BUILD_CASE_CHECK]: { type: BUILD, PRS: [], regex: BUILD_CASE_CHECK },
  [CI_CASE_CHECK]: { type: CI, PRS: [], regex: CI_CASE_CHECK },
  [CHORE_CASE_CHECK]: { type: CHORE, PRS: [], regex: CHORE_CASE_CHECK },
  [REVERT_CASE_CHECK]: { type: REVERT, PRS: [], regex: REVERT_CASE_CHECK },
  [OTHERS]: { type: OTHERS, PRS: [], regex: "" }
};
