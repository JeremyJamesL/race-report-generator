import "./styles.css";
const $ = document.querySelector.bind(document);

const datacontroller = (() => {})();

const interfaceController = (() => {
  const DOMStrings = {
    add: "#add-race",
    modal: "#modal",
    closeModal: "#close-modal",
  };

  return {
    showModal: function () {
      $(DOMStrings.modal).classList.remove("hidden");
      $(DOMStrings.modal).classList.add("fixed", "flex");
    },

    hideModal: function () {
      $(DOMStrings.modal).classList.add("hidden");
      $(DOMStrings.modal).classList.remove("fixed", "flex");
    },

    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

const controller = ((UICtrl, DataCtrl) => {
  const setUpEventListeners = () => {
    const DOM = UICtrl.getDOMStrings();

    $(DOM.add).addEventListener("click", UICtrl.showModal);
    $(DOM.closeModal).addEventListener("click", UICtrl.hideModal);
  };

  return {
    init: function () {
      setUpEventListeners();
    },
  };
})(interfaceController, datacontroller);

controller.init();
