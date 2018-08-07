import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state={
    products:[],
    product: {
      RNo: 20,
      FirstName: 'sample product'
    }
  }
componentDidMount() {
  this.getProducts();
}

getProducts = _ => {
  fetch('http://localhost:4000/products')
  .then(response => response.json())
  .then(response => this.setState({products: response.data}))
  .catch(err => console.error(err))
}

addProduct = _ => {
  const { product} = this.state;
  fetch(`http://localhost:4000/products/add?rno=${product.RNo}&name=${product.FirstName}`)
  .then(response => this.getProducts)
  .catch(err => console.error(err))
}

deleteProduct = _ => {
  const { product} = this.state;
  fetch(`http://localhost:4000/products/add?rno=${product.RNo}&name=${product.FirstName}`)
  .then(response => this.getProducts)
  .catch(err => console.error(err))
}

renderProduct = ({RNo, FirstName}) => 
<div key={RNo}><input type="checkbox"></input> {FirstName}
</div>

  render() {
    const {products, product} = this.state;
    return (
      <div className="App">
        {products.map(this.renderProduct)}
        <div>
          <input value={product.FirstName} 
          onChange={e=>this.setState({product: {...product, FirstName:e.target.value}})}></input>
          <input value={product.RNo} 
          onChange={e=>this.setState({product: {...product, RNo:e.target.value}})}></input>
          <button onClick={this.addProduct}>Add Product</button>
        </div>
      </div>
    );
  }
}

export default App;
