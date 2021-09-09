sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("vital.prices.controller.Main", {
      onInit: function () {},

      onPress: function (oEvent) {
        this.getView().setModel(
          new sap.ui.model.json.JSONModel(
            oEvent.getSource().getBindingContext().getObject()
          ),
          "object"
        );
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Detail", {
          id: oEvent.getSource().getBindingContext().getObject().PriceId,
        });
      },

      //---------------------------------------------------------//
      /* Handle Upload de Files								   */
      onFileChange: function () {
        var Adjunto = this.getView().byId("idUploader2").getValue();

        if (Adjunto) {
          this.uploadFile();
        }
      },

      uploadFile: function () {
        var oFileUploader = this.getView().byId("idUploader2");
        oFileUploader.destroyHeaderParameters();

        this.getView().getModel("fotos").refreshSecurityToken();

        oFileUploader.addHeaderParameter(
          new sap.ui.unified.FileUploaderParameter({
            name: "ideal",
            value: "01",
          })
        );
        oFileUploader.addHeaderParameter(
          new sap.ui.unified.FileUploaderParameter({
            name: "priceid",
            value: "00505681-B634-1EEB-BFA4-0E9DDEB93833",
          })
        );
        oFileUploader.addHeaderParameter(
          new sap.ui.unified.FileUploaderParameter({
            name: "store",
            value: "T010",
          })
        );
        oFileUploader.addHeaderParameter(
          new sap.ui.unified.FileUploaderParameter({
            name: "actdate",
            value: "20210907",
          })
        );

        oFileUploader.addHeaderParameter(
          new sap.ui.unified.FileUploaderParameter({
            name: "x-csrf-token",
            value: this.getView().getModel("fotos").getSecurityToken(),
          })
        );

        oFileUploader.upload();
        if (this.getView().byId("idUploader2")) {
          this.getView().byId("idUploader2").setValue(null);
        }
      },

      onUpload: function (oEvent) {
        this.getView().byId("idUploader2").upload();
      },

      onGetPic: function () {
        
		var sKey = this.getView()
          .getModel("fotos")
          .createKey("/FileSet", {
            PhotoId: this.getView().byId("PhotoId").getValue(),
            PhotoNameId: this.getView().byId("PhotoNameId").getValue(),
          });

        this.getView()
          .byId("PIC")
          .setSrc("/sap/opu/odata/sap/ZGW_PHOTOS_SRV/" + sKey + "/$value");
      },

      handleUploadComplete: function (oEvent) {
		sap.m.MessageToast.show("Archivo subido correctamente");
        return;
      },
    });
  }
);
