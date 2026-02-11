module.exports = {
  default: {
    format: [
      "progress-bar",
      "json:reports/cucumber_report.json",
      "html:reports/cucumber_report.html",
    ],
    requireModule: ["ts-node/register"],
    require: ["src/steps/**/*.ts", "src/support/**/*.ts"],
    paths: ["features/**/*.feature"],
    publishQuiet: true,
    // Extra safety: default timeout for steps/hooks (ms)
    timeout: 60000,
  },
};
