<template>
  <div class="product-view">
    <!-- 搜索框 -->
    <div class="search-box">
      <div class="search-icon">
        <Icon icon="mdi:magnify" />
      </div>
      <input
        type="text"
        class="search-input"
        placeholder="搜索商品"
        v-model="searchQuery"
        @input="filterProducts"
      />
    </div>

    <!-- 标签栏 -->
    <div class="tab-container">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-item', { active: activeTab === index }]"
        @click="changeTab(index)"
      >
        {{ tab }}
      </div>
    </div>

    <div class="product-list">
      <div v-for="(product, index) in filteredProductList" :key="index" class="product-item">
        <!-- 商品图片 -->
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- 商品信息 -->
        <div class="product-info">
          <template v-if="editingProduct === product">
            <input
              type="text"
              v-model="product.name"
              class="edit-input"
            />
            <input
              type="text"
              v-model="product.price"
              class="edit-input"
            />
            <textarea
              v-model="product.description"
              class="edit-textarea"
            ></textarea>
            <div>
              <button class="save-button" @click="saveProduct(product)">保存</button>
              <button class="cancel-button" @click="cancelEdit(product)">取消</button>
            </div>
          </template>
          <template v-else>
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">{{ product.price }}</div>
            <div class="product-description">{{ product.description }}</div>
            <button class="edit-button" @click="startEdit(product)">编辑</button>
          </template>
        </div>
      </div>
    </div>
    <!-- 添加的添加商品按钮 -->
    <div class="add-product-button-container">
      <button class="add-product-button" @click="showAddProductForm">
        <span class="add-icon">+</span>
      </button>
    </div>

    <!-- 添加商品表单 -->
    <div v-if="isAddingProduct" class="add-product-form">
      <h3>添加商品</h3>
      <input
        type="file"
        @change="handleFileChange"
        accept="image/*"
        class="add-input"
      />
      <template v-if="newProductImage">
        <img :src="newProductImage" alt="Preview" class="preview-image" />
      </template>
      <input
        type="text"
        v-model="newProduct.name"
        placeholder="商品名称"
        class="add-input"
      />
      <input
        type="text"
        v-model="newProduct.price"
        placeholder="商品价格"
        class="add-input"
      />
      <textarea
        v-model="newProduct.description"
        placeholder="商品描述"
        class="add-textarea"
      ></textarea>
      <div>
        <button class="add-save-button" @click="addProduct">保存</button>
        <button class="add-cancel-button" @click="cancelAddProduct">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件

// 标签数据
const tabs = ['已上架', '未上架'];
const activeTab = ref(0); // 当前选中的标签
const searchQuery = ref(''); // 搜索输入框的值
const productList = ref([]); // 当前显示的商品列表
const filteredProductList = ref([]); // 过滤后的商品列表
const editingProduct = ref(null); // 当前正在编辑的商品
const isAddingProduct = ref(false); // 是否显示添加商品表单
const newProduct = ref({
  image: 'https://placehold.co/100x100', // 临时占位图片
  name: '',
  price: '',
  description: ''
});
const newProductImage = ref(''); // 新商品图片的 Base64 编码

// 切换标签
const changeTab = (index) => {
  activeTab.value = index;
  // 根据标签切换商品列表
  productList.value = index === 0 ? listedProducts : unlistedProducts;
  filterProducts();
};

// 淡水产品数据
const listedProducts = [
 {
   image: 'https://yydwjj.github.io/-----/p (1).jpg',
    name: '草鱼',
    price: '12 / 斤',
    description: '肉质鲜嫩，适合红烧、清蒸，是常见的淡水食用鱼。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (2).jpg',
    name: '鲫鱼',
    price: '15 / 斤',
    description: '营养丰富，适合炖汤，汤汁鲜美。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (3).jpg',
    name: '鲶鱼',
    price: '18 / 斤',
    description: '肉质细腻，刺少，适合红烧、做酸菜鱼。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (4).jpg',
    name: '黄鳝',
    price: '30 / 斤',
    description: '富含蛋白质和多种维生素，可红烧、炖汤。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (5).jpg',
    name: '中华草龟',
    price: '50 / 只',
    description: '可食用也可作为观赏龟，龟肉营养丰富。',
  },
];

const unlistedProducts = [
  {
    image: 'https://yydwjj.github.io/-----/p (6).jpg',
    name: '泥鳅',
    price: '20 / 斤',
    description: '具有一定的药用价值，适合炖汤、红烧。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (7).jpg',
    name: '福寿螺（食用级）',
    price: '8 / 斤',
    description: '经过严格处理可食用，肉质紧实。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (8).jpg',
    name: '淡水小龙虾',
    price: '25 / 斤',
    description: '味道鲜美，是夏季热门美食，适合麻辣、十三香等口味。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (9).jpg',
    name: '白鲢鱼',
    price: '8 / 斤',
    description: '价格实惠，可制作鱼丸、红烧等。',
  },
  {
    image: 'https://yydwjj.github.io/-----/p (10).jpg',
    name: '鳙鱼（胖头鱼）',
    price: '13 / 斤',
    description: '鱼头大而鲜美，适合做鱼头汤、剁椒鱼头。',
  },
];


// 初始化商品列表
productList.value = listedProducts;
filteredProductList.value = listedProducts;

// 过滤商品列表
const filterProducts = () => {
  const query = searchQuery.value.toLowerCase();
  filteredProductList.value = productList.value.filter((product) => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    return name.includes(query) || description.includes(query);
  });
};

// 开始编辑商品
const startEdit = (product) => {
  editingProduct.value = product;
};

// 保存商品信息
const saveProduct = (product) => {
  editingProduct.value = null;
  // 这里可以添加保存到后端的逻辑
  console.log('保存商品信息:', product);
};

// 取消编辑
const cancelEdit = (product) => {
  editingProduct.value = null;
};

// 显示添加商品表单
const showAddProductForm = () => {
  isAddingProduct.value = true;
};

// 处理文件选择
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProductImage.value = e.target.result;
      newProduct.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 添加商品
const addProduct = () => {
  if (newProduct.value.name && newProduct.value.price) {
    if (activeTab.value === 0) {
      listedProducts.push({ ...newProduct.value });
    } else {
      unlistedProducts.push({ ...newProduct.value });
    }
    productList.value = activeTab.value === 0 ? listedProducts : unlistedProducts;
    filterProducts();
    isAddingProduct.value = false;
    newProduct.value = {
      image: 'https://placehold.co/100x100',
      name: '',
      price: '',
      description: ''
    };
    newProductImage.value = '';
  }
};

// 取消添加商品
const cancelAddProduct = () => {
  isAddingProduct.value = false;
  newProduct.value = {
    image: 'https://placehold.co/100x100',
    name: '',
    price: '',
    description: ''
  };
  newProductImage.value = '';
};
</script>

<style scoped>
.product-view {
  padding: 16px;
  position: relative;
}

/* 搜索框样式 */
.search-box {
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 8px;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: rgb(50, 161, 218);
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  background-color: rgb(219, 245, 255);
  border-radius: 20px;
  /* background-color: transparent; */
  outline: none;
  font-size: 14px;
}

/* 标签栏样式 */
.tab-container {
  display: flex;
  background-color: black;
  border-radius: 12px;
  padding: 8px;
  margin-top: 16px;
  width: 45%;
  height: 14px;
  align-items: center;
  margin-bottom: 20px;
}

.tab-item {
  flex: 1;
  text-align: center;
  /* padding: 8px; */
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  font-size: 14px;
  font-weight: 700;
}

.tab-item.active {
  background-color: rgb(50, 161, 218);
}

/* 商品列表样式 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
}

.product-item {
  display: flex;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 0px 8px 18px rgb(199, 230, 244);
}

.product-image {
  width: 100px; /* 固定宽度 */
  height: 100px; /* 固定高度 */
  margin-right: 16px;
}

.product-image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover; /* 图片按比例填充 */
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.product-price {
  font-size: 16px;
  color: red;
  margin-top: 4px;
}

.product-description {
  font-size: 14px;
  color: gray;
  margin-top: 8px;
}

.edit-button {
  background-color: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 8px;
  /* padding: 8px 16px; */
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 8px;
}

.edit-button:hover {
  background-color: rgb(35, 125, 171);
}

.edit-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 4px;
}

.edit-textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 4px;
  resize: vertical;
}

.save-button {
  background-color: rgb(52, 160, 222);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #4bd7f1;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c82333;
}

/* 添加商品按钮样式 */
.add-product-button-container {
  position: fixed;
  bottom: 80px;
  right: 32px;
}

.add-product-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(50, 161, 218);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.add-icon {
  font-size: 24px;
  color: white;
}

/* 添加商品表单样式 */
.add-product-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.add-input {
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 10px;
}

.add-textarea {
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
  resize: vertical;
}

.add-save-button {
  background-color: rgb(52, 160, 222);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
}

.add-save-button:hover {
  background-color: rgb(52, 160, 222);
}

.add-cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.add-cancel-button:hover {
  background-color: #c82333;
}
.preview-image{
  max-width: 90%;
  max-height: 40px;
}
</style>