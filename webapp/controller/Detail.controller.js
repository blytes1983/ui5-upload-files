sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("vital.prices.controller.Detail", {
			onInit: function () {
				this.getOwnerComponent().getRouter().getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
			},

			_onObjectMatched: function () {
				console.log("patter");
			}

		});
	});
