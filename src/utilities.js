const funcs = {
  dragStart(event) {
    event.dataTransfer.setData("clicked", event.target.id);
    
  },

  dropEnd(event) {
    let data = event.dataTransfer.getData("clicked");
    event.target.appendChild(document.getElementById(data));
  },
};

export default funcs;