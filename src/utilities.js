const funcs = {
  dragStart(event) {
    event.dataTransfer.setData("clicked", event.target.id);
    
  },

  dropEnd(event) {
    let data = event.dataTransfer.getData("clicked");
    event.target.appendChild(document.getElementById(data));
  },
  randomIndex(array) {
    console.log(array)
    let size = array.length;
    return Math.floor(Math.random() * size + 1);
  },
  async importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  },
  async importImages(){
    return this.importAll(require.context('../assets/', false, /\.(png|jpg|jpeg)$/));
  }
};

export default funcs;