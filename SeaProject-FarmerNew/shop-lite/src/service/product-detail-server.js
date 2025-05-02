import {productDetails} from "../data/product-detail"

export function getProductById(id) {
  return productDetails.find(item => item.id === Number(id));
}

// 可以继续添加其他商品相关的方法