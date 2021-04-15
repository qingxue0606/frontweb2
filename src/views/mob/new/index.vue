<template>
  <div class="page-container">
    <nav-bar></nav-bar>
    <div class="banners">
      <div class="home">
        <!-- banner区 -->
        <div class="banners">
          <swapper></swapper>
          <div class="search flex f-d-c">
            <span class="title">艺术品鉴证备案网</span>
            <div class="search-container">
              <div class="search_bar">
                <input
                  placeholder="作品名/艺术家/作品编号/证书编号"
                  v-model="searchStr"
                  @keyup.enter="search"
                />
                <img
                  src="@/assets/images/newv/camera.png"
                  class="camerIco"
                  @click="showImageWindow"
                />
                <div class="searchIco" @click="search">搜作品</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-row :gutter="20" class="funcs">
      <el-col
        :span="6"
        style="text-align: center"
        v-for="(item, index) in funcs"
        :key="index"
        @click="funcClick(item.url)"
      >
        <img style="width: 50px; height: 50px" :src="item.img" fit="fill" />
        <br /><br />
        {{ item.name }}
      </el-col>
    </el-row>

    <!-- 核心业务 -->
    <div class="wb  f-d-c f-ai-c">
      <div class="title" >核心业务</div>

      <el-carousel  height="500px" indicator-position="outside" class="carousel">
        <el-carousel-item v-for="item in coreBussiness" :key="item">
          <img class="pic" src="" alt="" />
          <div class="cbname"><img :src="coreBussiness[0].icon" alt="" />{{ item.name }}</div>
          <p class="desc">{{item.desc}}</p>
          <p class="buss"><span v-for="(ite, ind) in item.buss" :key="ind">{{
                ite.name
              }}</span>    </p>
        </el-carousel-item>
      </el-carousel>


    </div>

    <el-button type="primary">主要按钮</el-button>
    <i class="el-icon-share"></i>
    <br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br />
    2 2 2 2 2
    <br /><br /><br /><br /><br /><br /><br /><br />
    2 2 2 2 2
    <br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br />
    2 2 2 2 2
    <br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br />
    2 2 2 2 2
  </div>
</template>
<script>
import navBar from "@/views/mob/new/navBar";
import swapper from "@/views/mob/new/swapper";

export default {
  components: { navBar, swapper },
  data() {
    return {
      searchStr: "",
      uploadImg: "", // 以图搜索
      imgFlag: false,
      funcs: [
        {
          name: "工业品筛查",
          img: require("@/assets/images/newv/shaicha.png"),
          url: "/newv/through-detail",
          desc: "1秒区分工业品与非工业品",
        },
        {
          name: "AID认证",
          img: require("@/assets/images/newv/renzheng.png"),
          url: "/newv/auth-detail",
          desc: '获取艺术品独有的"指纹"',
        },
        {
          name: "眼学鉴定",
          img: require("@/assets/images/newv/jianding.png"),
          url: "/newv/appraise-detail",
          desc: "来自原作者和权威机构的鉴定",
        },
        {
          name: "AID验证",
          img: require("@/assets/images/newv/yanzheng.png"),
          url: "/newv/verify-detail",
          desc: '对比"指纹"确认"此物为此物"',
        },
      ],
      coreBussiness: [
        {
          name: "鉴证服务",
          desc:
            "依托AID、人工智能和区块链技术，让艺术品鉴证更快捷、更安全、更精准",
          icon: require("@/assets/images/newv/icon_jianzheng.png"),
          buss: [
            { name: "工业品筛查", url: "" },
            { name: "AID认证", url: "" },
            { name: "眼学鉴定", url: "" },
            { name: "AID验证", url: "" },
          ],
        },
        {
          name: "鉴证技术研发",
          desc:
            "集数据中心搭建、算法研究、平台设计、设备制造为一体，构建AID鉴证全生态体系",
          icon: require("@/assets/images/newv/icon_wenku.png"),
          buss: [
            { name: "固定设备", url: "" },
            { name: "移动设备", url: "" },
            { name: "云端比对", url: "" },
            { name: "综合管理系统", url: "" },
          ],
        },
        {
          name: "区块链服务",
          desc:
            "一键追溯艺术品鉴证、交易的全量信息，支持云端部署区块链网络服务",
          icon: require("@/assets/images/newv/icon_suyuan.png"),
          buss: [
            { name: "区块链存证查询", url: "" },
            { name: "区块链部署", url: "" },
          ],
        },
        {
          name: "艺术数据服务",
          desc:
            "建立艺术品鉴证数据中心及全球查询系统，基于大数据输出各类指数和趋势",
          icon: require("@/assets/images/newv/icon_shuju.png"),
          buss: [
            { name: "高清数据输出", url: "" },
            { name: "数据查询服务", url: "" },
            { name: "市场交易指数", url: "" },
            { name: "艺术品市场报告", url: "" },
          ],
        },
      ],
      qklsLeft: [
        {
          img: require("@/assets/images/newv/icon_gxn.png"),
          title: "高性能",
          desc: [
            "鲁棒共识算法RBFT,TPS可达到1w,系统延时300ms",
            "原生高性能智能合约引擎沙箱",
            "硬件加速GPU/FPGA",
          ],
        },
        {
          img: require("@/assets/images/newv/icon_gaq.png"),
          title: "高安全",
          desc: [
            "多级加密机制（SHA-3, SM3,ECDSA, SM2,ECDH, 3DES, SM4,AHRE,zk-snarks）",
            " 隐私保护（分区共识、细粒度隐私交易、零知识证明、同态加密）",
          ],
        },
        {
          img: require("@/assets/images/newv/icon_ksh.png"),
          title: "可视化",
          desc: [
            "合约数据可视化（合约变量自动解析、合约变量内容可视化、支持结构型数据格式导出、支持文档型数据格式导出、自动捕获合约变量修改、低同步延迟、故障自动恢复）",
            "联盟自治（ACO）",
            "BaaS平台",
          ],
        },
      ],
      qklsRight: [
        {
          img: require("@/assets/images/newv/icon_gky.png"),
          title: "高可用",
          desc: [
            "动态数据失效恢复机制",
            "动态增删节点(动态成员准入) ",
            "热备切换",
          ],
        },
        {
          img: require("@/assets/images/newv/icon_kkz.png"),
          title: "可扩展",
          desc: [
            "数据存储横向扩展、数据库类型替换",
            "支持对数据定期归档",
            "微服务架构",
            "支持多种虚拟机：JS、WVM",
            "支付通道",
            "易运维",
          ],
        },
        {
          img: require("@/assets/images/newv/icon_ksy.png"),
          title: "可溯源",
          desc: [
            "作品信息、鉴证过程、交易情况全方位记录",
            "鉴证数据随时查询，终生追溯",
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #ffffff;
  .banners {
    position: relative;
    .search {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      z-index: 9;
      .title {
        font-size: 30px;
        font-family: MicrosoftYaHei;
        text-align: center;
        color: #ffffff;
      }
      &-container {
        .search_bar {
          width: 300px;
          height: 44px;
          margin: 0 auto;
          border: 2px solid #ffffff;
          background-color: white;
          display: flex;
          border-radius: 8px;
          margin-top: 43px;
          position: relative;

          input {
			  width: 100%;
            flex: 1;
            border-radius: 8px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            text-align: left;
            color: #999999;
            padding-left: 20px;
            border: none;
            background: #ffffff;
            outline: none;
          }
          .camerIco {
            display: block;
            width: 24px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 70px;
          }
          .searchIco {
            width: 70px;
            height: 44px;
            color: #fff;
            font-size: 15px;
            line-height: 44px;
            text-align: center;
            background: #357cff;
            border-radius: 0px 8px 8px 0px;
            position: absolute;
            right: -2px;
            top: -2px;
          }
        }
      }
    }
  }
}
.funcs {
  margin: 30px;
  padding-left: 10px;
  padding-right: 10px;
}
.el-carousel__item h3 {
  color: #f1f5fa;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #fdfdfd;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #f5f5f5;
}
.wb{
  .title{
    text-align: left;
    font-size: 25px;
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  .carousel{
    width: 100%;
    margin:20px
    
  }
  .pic{
    width: 100%;
    height: 50%;
    border:1px dashed #F00;
    
  }
  .cbname{
    position: relative;
    height: 30px;
    line-height: 40px;
    text-indent: 2em;
    margin: 20px;
    font-size: 25px;
    font-weight: bold;
 
    img{
      height: 35px;
      position: absolute;
      top: 2px;
      left: 5px;

    }
  }
  .desc{
    font-size: 22px;
    margin: 20px;
  }
  .buss{
    font-size: 20px;
    margin: 20px;
    color: rgb(91, 98, 100);

    span:not(:nth-child(1)){
      display: inline-block;
      text-indent: 1em;
    }

  }
}
</style>
