sap.ui.define([
  "com/novigo/gttui/controller/BaseController",
  "com/novigo/gttui/utils/RestClient",
  "com/novigo/gttui/utils/ServiceUtils"
], function(Controller,RestClient,ServiceUtils) {
  "use strict";

  return Controller.extend("com.novigo.gttui.controller.MainView", {
    
    onUpload: function(eventData){
      this._import(eventData.getParameter("files") && eventData.getParameter("files")[0]);
    },
    _import: function(file){
      ServiceUtils.init();
      var restUri = ServiceUtils.getDataSource("restService").uri;
      console.log("restURI "+restUri);
      RestClient.get(restUri, {})
            .then((data)=>{
              console.log(data);
            }, function (error) {
              console.log(error);
            });
    }
  });
});
