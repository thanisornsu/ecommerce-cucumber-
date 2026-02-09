module.exports = {
    default: {
        format: [
            "progress-bar",
            "json:reports/cucumber_report.json",
            "html:reports/cucumber_report.html"
        ],
        requireModule: ["ts-node/register"],
        require: ["src/steps/**/*.ts", "src/support/**/*.ts"],
        paths: ["features/**/*.feature"],
        publishQuiet: true
    }
};
