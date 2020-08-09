webpackHotUpdate("main",{

/***/ "./src/hand/Hand.jsx":
/*!***************************!*\
  !*** ./src/hand/Hand.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Hand; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _card_Card_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../card/Card.jsx */ \"./src/card/Card.jsx\");\n/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities.js */ \"./src/utilities.js\");\n\n\n\nfunction Hand(props) {\n  //this array should contain the names of\n  var arr = [\"back.jpg\", \"dorval.jpg\", \"hans.jpeg\", \"mijangos.jpg\"]; //function that returns random index in arr array.\n\n  function randomIndex(array) {\n    var size = array.length;\n    return Math.floor(Math.random() * size + 1);\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"hand\"\n  }, props.cards.map(function (x, i) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_card_Card_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      key: i,\n      player: props.player,\n      img: \"../../assets/\" + arr[randomIndex(arr)],\n      startFunction: _utilities_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dragStart,\n      endFunction: _utilities_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dropEnd\n    });\n  }));\n}\n\n//# sourceURL=webpack:///./src/hand/Hand.jsx?");

/***/ })

})