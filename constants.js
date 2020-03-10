"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURES = "Features";
exports.FIXES = "Fixes";
exports.DOCS = "Docs";
exports.STYLE = "Style";
exports.REFACTOR = "Refactor";
exports.PERFORMANCE = "performance";
exports.TEST = "Test";
exports.BUILD = "Build";
exports.CI = "CI";
exports.CHORE = "Chore";
exports.REVERT = "Revert";
exports.OTHERS = "others";
exports.FEAT_CASE_CHECK = "feat";
exports.FIX_CASE_CHECK = "fix";
exports.DOCS_CASE_CHECK = "docs";
exports.STYLE_CASE_CHECK = "style";
exports.REFACTOR_CASE_CHECK = "refactor";
exports.PERF_CASE_CHECK = "perf";
exports.TEST_CASE_CHECK = "test";
exports.BUILD_CASE_CHECK = "build";
exports.CI_CASE_CHECK = "ci";
exports.CHORE_CASE_CHECK = "chore";
exports.REVERT_CASE_CHECK = "revert";
exports.allFormattedPRS_MAP = {
    [exports.FEAT_CASE_CHECK]: { type: exports.FEATURES, PRS: [], regex: exports.FEAT_CASE_CHECK },
    [exports.FIX_CASE_CHECK]: { type: exports.FIXES, PRS: [], regex: exports.FIX_CASE_CHECK },
    [exports.DOCS_CASE_CHECK]: { type: exports.DOCS, PRS: [], regex: exports.DOCS_CASE_CHECK },
    [exports.STYLE_CASE_CHECK]: { type: exports.STYLE, PRS: [], regex: exports.STYLE_CASE_CHECK },
    [exports.REFACTOR_CASE_CHECK]: {
        type: exports.REFACTOR,
        PRS: [],
        regex: exports.REFACTOR_CASE_CHECK
    },
    [exports.PERF_CASE_CHECK]: { type: exports.PERFORMANCE, PRS: [], regex: exports.PERF_CASE_CHECK },
    [exports.TEST_CASE_CHECK]: { type: exports.TEST, PRS: [], regex: exports.TEST_CASE_CHECK },
    [exports.BUILD_CASE_CHECK]: { type: exports.BUILD, PRS: [], regex: exports.BUILD_CASE_CHECK },
    [exports.CI_CASE_CHECK]: { type: exports.CI, PRS: [], regex: exports.CI_CASE_CHECK },
    [exports.CHORE_CASE_CHECK]: { type: exports.CHORE, PRS: [], regex: exports.CHORE_CASE_CHECK },
    [exports.REVERT_CASE_CHECK]: { type: exports.REVERT, PRS: [], regex: exports.REVERT_CASE_CHECK },
    [exports.OTHERS]: { type: exports.OTHERS, PRS: [], regex: "" }
};
//# sourceMappingURL=constants.js.map