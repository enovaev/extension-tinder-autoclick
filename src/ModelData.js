export class ModelData {
  saveData(data) {
    // localStorage.setItem('university', JSON.stringify(this.arrUniversity));
    // localStorage.setItem('description', JSON.stringify(this.arrDescription));
    // localStorage.setItem('age', JSON.stringify(this.arrAge));
    localStorage.setItem('quantity', data.quantity);
    localStorage.setItem('photo', data.photo);
    localStorage.setItem('test', data.test);
  }
  getData() {
    return {
      quantity: localStorage.getItem('quantity') || '',
      photo: localStorage.getItem('photo') || '',
      test: Number(localStorage.getItem('test')) || 0,
      // localStorage.getItem('university') ? JSON.parse(localStorage.getItem('university')) : [];
      // this.arrDescription = localStorage.getItem('description') ? JSON.parse(localStorage.getItem('description')) : [];
      // this.arrAge = localStorage.getItem('age') ? JSON.parse(localStorage.getItem('age')) : [];
    }
  }
}