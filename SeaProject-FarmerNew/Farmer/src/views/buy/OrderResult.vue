<template>
  <div class="result-container">
    <div class="result-icon">
      <Icon v-if="$route.query.success" icon="clarity:success-standard-line" color="#4CAF50" />
      <Icon v-else icon="clarity:error-standard-line" color="#f44336" />
    </div>

    <h2 v-if="$route.query.success">支付成功！</h2>
    <h2 v-else>支付失败</h2>

    <div class="amount" v-if="$route.query.success">
      支付金额：￥{{ $route.query.amount }}
    </div>

    <div class="actions">
      <button @click="router.push('/home')" class="back-home">
        返回首页
      </button>
      <button @click="router.push('/checkout')" class="view-orders">
        查看订单
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.result-container {
  text-align: center;
  padding: 40px 20px;
}

.result-icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.amount {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

button {
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
}

.back-home {
  background: #50b7eb;
  color: white;
}

.view-orders {
  background: #eee;
  color: #333;
}
</style>