sap.ui.define(
  [
    "com/novigo/gttui/controller/BaseController",
    "com/novigo/gttui/utils/RestClient",
    "com/novigo/gttui/utils/ServiceUtils",
    "sap/ui/core/Core",
    "sap/ui/core/message/Message",
  ],
  function (Controller, RestClient, ServiceUtils, Core, Message) {
    "use strict";
    return Controller.extend("com.novigo.gttui.controller.MainView", {
      onInit: function () {
        this.oView = this.getView();

        // connect Message Manager
        this._MessageManager = Core.getMessageManager();
        this._MessageManager.registerObject(
          this.oView.byId("excelUploadPage"),
          true
        );
        this.oView.setModel(this._MessageManager.getMessageModel(), "message");
        // jQuery.sap.intervalCall(5000, this,"_addMockMessages", this)
        // // this._addMockMessages();
      },
      handleUploadComplete: function (oEvent) {
        var sResponse = oEvent.getParameter("response"),
          iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
          sMessage;

        if (sResponse) {
          sMessage =
            iHttpStatusCode === 200
              ? sResponse + " (Upload Success)"
              : sResponse + " (Upload Error)";
          MessageToast.show(sMessage);
        }
      },

      handleUploadPress: function () {
        var oFileUploader = this.byId("fileUploader");
        var oFormData = new FormData();

        jQuery.sap
          .domById(oFileUploader.getId() + "-fu")
          .setAttribute("type", "file");
        oFormData.append(
          "file",
          jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0]
        );

        console.log(oFileUploader.getUploadUrl());
        var that = this;
        jQuery.ajax({
          url: "/shipment_backend",
          data: oFormData,
          enctype: "multipart/form-data",
          contentType: false,
          processData: false,
          type: "POST",
          success: function (data) {
            that.constructMessages(data);
          },
          error: function (err) {
            console.log(err);
          },
        });
      },
      constructMessages(messages) {
        if (
          this._MessageManager &&
          !this._MessageManager.getMessageModel().oData.length
        ) {
          var that = this;
          var messageArray = [];
          for (var i = 0; i < messages.length; i++) {
            var message = new Message({
              message: messages[i].message,
              type: messages[i].responseCode === 200 ? "Success" : "Error",
              additionalText: messages[i].responseCode,
              description: messages[i].responseBody,
              target: "message",
              processor: that.getView().getModel(),
            });
            messageArray.push(message);
          }
          this._MessageManager.addMessages(messageArray);
        }
      },
    });
  }
);
