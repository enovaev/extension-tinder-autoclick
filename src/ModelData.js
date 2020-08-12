export class ModelData {
  saveData(data) {
    localStorage.setItem('info', JSON.stringify(data.info));
    localStorage.setItem('description', JSON.stringify(data.description));
    localStorage.setItem('age', JSON.stringify(data.age));
    localStorage.setItem('quantity', data.quantity);
    localStorage.setItem('photo', data.photo);
    localStorage.setItem('test', data.test);
  }
  getData() {
    return {
      quantity: localStorage.getItem('quantity') || '',
      photo: localStorage.getItem('photo') || '',
      test: Number(localStorage.getItem('test')) || 0,
      age: JSON.parse(localStorage.getItem('age')) || [],
      description: JSON.parse(localStorage.getItem('description')) || [],
      info: JSON.parse(localStorage.getItem('info')) || [],
    }
  }
}