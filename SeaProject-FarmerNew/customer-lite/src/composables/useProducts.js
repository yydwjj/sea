import p1 from '../assets/p (1).jpg'
import p2 from '../assets/p (2).jpg'
import p3 from '../assets/p (3).jpg'
import p4 from '../assets/p (4).jpg'
import p5 from '../assets/p (5).jpg'
import p6 from '../assets/p (6).jpg'
import p7 from '../assets/p (7).jpg'
import p8 from '../assets/p (8).jpg'
import p9 from '../assets/p (9).jpg'
import p10 from '../assets/p (10).jpg'
import p11 from '../assets/p (11).jpg'
import p12 from '../assets/p (12).jpg'
import p13 from '../assets/p (13).jpg'
import p14 from '../assets/p (14).jpg'


const productList = [
  {
    id: 1,
    image: p1,
    name: '草鱼',
    price: '22.81 / 斤',
    evaluation: '优秀'
},
{
    id: 2,
    image: p2,
    name: '鲢鱼',
    price: '17.1 / 斤',
    evaluation: '良好'
},
{
    id: 3,
    image: p3,
    name: '鳙鱼',
    price: '19.96 / 斤',
    evaluation: '优秀'
},
{
    id: 4,
    image: p4,
    name: '鲤鱼',
    price: '25.67 / 斤',
    evaluation: '优秀'
},
{
    id: 5,
    image: p5,
    name: '鲫鱼',
    price: '28.51 / 斤',
    evaluation: '优秀'
},
{
    id: 6,
    image: p6,
    name: '鲶鱼',
    price: '26.57 / 斤',
    evaluation: '良好'
},
  ];



export function useProducts() {
  // 添加find函数
  const findProductById = (id) => {
    return productList.find(product => product.id === id);
  };
  // 添加findAll函数（可选）
  const findAllProducts = () => {
    return productList;
  };

  return {
      productList,
      findProductById,
      findAllProducts,
  };
}
