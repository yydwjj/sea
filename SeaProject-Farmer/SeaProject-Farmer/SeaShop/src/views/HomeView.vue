<template>
    <el-container class="home-container">
      <!-- 顶部信息栏 -->
      <el-row class="top-info" justify="space-between">
        <el-col :span="11">
          <div class="info-card">
            <div class="info-title">进店客户</div>
            <div class="info-value">123</div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="info-card">
            <div class="info-title">通话记录</div>
            <div class="info-value">45</div>
          </div>
        </el-col>
      </el-row>
  
      <!-- 中间内容区域 -->
      <el-main class="main-content">
        <el-row :gutter="20">
            <!-- 我的供应 -->
            <el-col :span="12">
                <el-card class="card-item" @click="goToMySupply">
                <div class="card-content">
                    <el-icon :size="40" color="#409EFF"><Goods /></el-icon>
                    <div class="card-title">我的供应</div>
                    <div class="card-desc">管理我的供应商品</div>
                </div>
                </el-card>
            </el-col>

            <!-- 采购大厅 -->
            <el-col :span="12">
            <el-card class="card-item">
                <div class="card-content">
                <el-icon :size="40" color="#409EFF"><ShoppingCart /></el-icon>
                <div class="card-title">采购大厅</div>
                <div class="card-desc">浏览采购需求</div>
                </div>
            </el-card>
            </el-col>

            <!-- 全国供应 -->
            <el-col :span="12">
            <el-card class="card-item">
                <div class="card-content">
                <el-icon :size="40" color="#409EFF"><Location /></el-icon>
                <div class="card-title">全国供应</div>
                <div class="card-desc">查看全国供应信息</div>
                </div>
            </el-card>
            </el-col>

            <!-- 法律 -->
            <el-col :span="12">
            <el-card class="card-item">
                <div class="card-content">
                <el-icon :size="40" color="#409EFF"><Document /></el-icon>
                <div class="card-title">法律</div>
                <div class="card-desc">了解相关法律法规</div>
                </div>
            </el-card>
            </el-col>

            <!-- 政策 -->
            <el-col :span="12">
            <el-card class="card-item">
                <div class="card-content">
                <el-icon :size="40" color="#409EFF"><Reading /></el-icon>
                <div class="card-title">政策</div>
                <div class="card-desc">查看最新政策</div>
                </div>
            </el-card>
            </el-col>

            <!-- 价格 -->
            <el-col :span="12">
            <el-card class="card-item">
                <div class="card-content">
                <el-icon :size="40" color="#409EFF"><TrendCharts /></el-icon>
                <div class="card-title">价格</div>
                <div class="card-desc">查看市场价格走势</div>
                </div>
            </el-card>
            </el-col>

            <!-- 指南 -->
            <el-col :span="12">
            <el-card class="card-item">
                <div class="card-content">
                <el-icon :size="40" color="#409EFF"><Guide /></el-icon>
                <div class="card-title">指南</div>
                <div class="card-desc">养殖技术指南</div>
                </div>
            </el-card>
            </el-col>
        </el-row>
    </el-main>
  
      <!-- 底部导航栏 -->
      <el-footer class="bottom-nav">
        <div class="nav-menu">
          <div class="nav-item" @click="navigateTo('home')">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </div>
          <div class="nav-item" @click="navigateTo('shop')">
            <el-icon><ShoppingCart /></el-icon>
            <span>找平购商</span>
          </div>
          <div class="nav-item" @click="navigateTo('client')">
            <el-icon><User /></el-icon>
            <span>我的客户</span>
          </div>
          <div class="nav-item" @click="navigateTo('chat')">
            <el-icon><ChatDotRound /></el-icon>
            <span>聊生意</span>
          </div>
          <div class="nav-item" @click="navigateTo('profile')">
            <el-icon><UserFilled /></el-icon>
            <span>我的</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </template>
  
<script setup>
    // 在原有图标导入基础上添加新的图标
    import {
    Goods,
    ShoppingCart,
    Location,
    Document,
    Reading,
    TrendCharts,
    Guide
    } from '@element-plus/icons-vue'

    import { useRouter } from 'vue-router'
    import { UserFilled } from '@element-plus/icons-vue'
    const router = useRouter()
    

    const goToMySupply = () => {
    router.push({ name: 'my-supply' })
    }
    const navigateTo = (routeName) => {
      router.push({ name: routeName })
    }
</script>

<style scoped>
  .home-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .top-info {
    padding: 20px;
    background-color: #f5f7fa;
  }
  
  .info-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  .info-title {
    color: #909399;
    font-size: 14px;
  }
  
  .info-value {
    color: #409EFF;
    font-size: 24px;
    font-weight: bold;
    margin-top: 8px;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
  }
  
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;
    background-color: #409EFF;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .nav-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }
  
  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }
  
  .nav-item .el-icon {
    font-size: 20px;
    margin-bottom: 4px;
  }
  
  .nav-item span {
    font-size: 12px;
    line-height: 1;
  }
  
  .home-container {
    padding-bottom: 60px; /* 为底部导航栏留出空间 */
  }

  /* 添加卡片样式 */
.card-item {
  margin-bottom: 20px;
  cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;   
}

.card-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-content {
  text-align: center;
  padding: 20px 0;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 5px;
  color: #409EFF;
}

.card-desc {
  font-size: 12px;
  color: #909399;
}
</style>