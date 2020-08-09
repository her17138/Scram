

const funcs = {
  dragStart(event) {
    event.dataTransfer.setData("clicked", event.target.id);
    
  },

  dropEnd(event) {
    let data = event.dataTransfer.getData("clicked");
    event.target.appendChild(document.getElementById(data));
  },
  randomIndex(array) {
    let size = array.length;
    return Math.floor(Math.random() * size + 1);
  }
};

export default funcs;