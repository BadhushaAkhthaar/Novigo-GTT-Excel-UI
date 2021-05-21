sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/base/strings/formatMessage"],
  function (JSONModel, formatMessage) {
    "use strict";

    var appModulePath = "com/novigo/gttui/";
    var manifestModel = new JSONModel();
    var ServiceUtils = {};

    ServiceUtils.init = function () {
      var manifestUrl = sap.ui.require.toUrl(appModulePath + "manifest.json");
      console.log("init");
      console.log(manifestUrl);
      manifestModel.loadData(manifestUrl, null, false);
    };

    ServiceUtils.getDataSource = function (name) {
        console.log("name "+name);
      console.log(
        manifestModel.getProperty(
          formatMessage("/sap.app/dataSources/{0}", name)
        )
      );
      console.log("getProp "+manifestModel.getProperty(formatMessage("/sap.app/dataSources/{0}", name)));
      return manifestModel.getProperty(
        formatMessage("/sap.app/dataSources/{0}", name)
      );
    };

    ServiceUtils.getUrl = function (path) {
        console.log("31"+path);
      console.log("32"+sap.ui.require.toUrl(appModulePath + path));
      return "/shipment_backend";//sap.ui.require.toUrl(appModulePath + path);
    };

    return ServiceUtils;
  }
);
