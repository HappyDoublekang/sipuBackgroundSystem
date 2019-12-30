<template>
	<el-container>
		<el-header>
			<el-col :span='8'>
				<el-menu default-active="homepage" mode="horizontal" @select="handleSelect">
					<el-menu-item index="homepage">
						<router-link to="/index">思普锯业</router-link>
					</el-menu-item>
					<el-menu-item index="tradeManagment">
						<router-link to="/trade">交易管理</router-link>
					</el-menu-item>
					<el-menu-item index="dataManagment">
						<router-link to="/data">数据管理</router-link>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span='3' class="login-information">
				<!-- <span class="userinfo-inner"><img :src="this.sysUserAvatar" /></span> -->
				<el-popover
					ref="popover1"
					placement="top-start"
					width="50"
					trigger="hover">
					<div class="popover-content" v-html="html"></div>
				</el-popover>
				<span v-popover:popover1>{{userName}}</span>
				<el-dropdown>
					<i class="el-icon-setting"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<a @click="accountDevice">账户设置</a>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/employees-management">员工管理</router-link>
						</el-dropdown-item>
						<!-- <el-dropdown-item>货运方式设置</el-dropdown-item> -->
						<!-- <el-dropdown-item>个人信息修改</el-dropdown-item> -->
						<!-- <el-dropdown-item>
							<router-link to="/order-color-change">颜色标记设置</router-link>
						</el-dropdown-item> -->
						<el-dropdown-item>
							<router-link to="/store">店铺设置</router-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/warehouse">仓库设置</router-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/product-team">生产小组设置</router-link>
						</el-dropdown-item>
						<el-dropdown-item>
							<router-link to="/global-setting">全局设置</router-link>
						</el-dropdown-item>
						<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-header>
		<el-main>
			<router-view>
			</router-view>
			<!-- <brands-management
				ref="mychild">
			</brands-management> -->
		</el-main>
		<el-dialog title="账号设置" :visible.sync="accountDeviceDialog" width="30%">
			<el-form :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="accountDeviceDialog">
				<el-form-item label="当前用户：" prop="userName">
					<span>{{userName}}</span>
				</el-form-item>
				<el-form-item label="当前密码" prop="age">
					<el-input v-model="ruleForm.age" show-password placeholder="请输入当前密码"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" show-password autocomplete="off" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" show-password autocomplete="off" placeholder="请输入确认新密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="accountDeviceDialog=false">取消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-container>   
</template>
<script>
// import BrandsManagement from '../goods/brands.vue';

export default {
	// components: {
	// 	BrandsManagement
	// },
	name: 'Index',
	data() {
		var checkAge = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('当前密码不能为空'))
			} else {
				callback()
			}
		}
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass')
				}
				callback()
			}
		}
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			html: '<div>这是一段yiF</div><div>这是二段yiF</div>',
			accountDeviceDialog: false,
			labelPosition: 'left',
			userName: '',
			userId: '',
			ruleForm: {
				pass: '',
				checkPass: '',
				age: ''
			},
			rules: {
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				],
				age: [
					{ required: true, validator: checkAge, trigger: 'blur' }
				]
			}
		}
	},
  computed: {
    // userName() {
    //   return this.$store.getters.getAccount.name
    // }
  },
  created() {
	  this.getUserName()
	  this.parentClick()
  },
  methods: {
	  parentClick() {
        this.$refs.mychild.queryList();  // 调用子组件的方法childClick
      },
    // 导航改变处理事件
    handleSelect(key, keyPath, item) {
      let tabItem = {
          name: item.$el.textContent,
          level: 1
        }
		this.$store.commit('updateMenuLevel', tabItem)
		// alert(item.$el.textContent)
		// 默认展示第一条，后面谁写谁自己扩展
		if (item.$el.textContent == '交易管理') {
			this.$router.push({
				path: '/brandManage'
			})
		}
    },
    // 退出
    logout() {
      	this.$http.post('user/loginOut', {
      	}).then(res => {
	      	this.$router.push({
	          path: '/'
	        })
	        this.$store.commit('clearPath')
	        window.localStorage.removeItem('loginUserBaseInfo')
		})
		// this.$router.push({path: '/'})
	},
	accountDevice() {
		this.accountDeviceDialog = true
		let user = JSON.parse(window.localStorage.getItem('loginUserBaseInfo'))
		this.userName = user.account
		let userId = JSON.parse(window.localStorage.getItem('userId'))
		this.userId = userId
		// console.log(user)
		// alert(typeof(user))
	},
	getUserName() {
		let user = JSON.parse(window.localStorage.getItem('loginUserBaseInfo'))
		this.userName = user.account
	},
	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
			if (valid) {
				// alert('submit!')
				this.$http.post('user/update', {
						userId: this.userId,
						account: this.userName,
						password: this.ruleForm.checkPass
					}).then(res => {
						this.$router.push({
							path: '/'
						})
						this.$store.commit('clearPath')
						window.localStorage.removeItem('loginUserBaseInfo')
					})
			} else {
				console.log('error submit!!')
				return false
			}
        })
	}
  }
}
</script>
<style lang="scss">
    .login-information{
        float: right;
        height: 60px;
        line-height: 60px;
        color:#909399;
        font-size: 14px;
        i {
            color: #409EFF;
            font-size: 20px;
            line-height: 50px;
            font-size: 22px;
            vertical-align: middle;
            margin-left: 10px;
            display: inline-block;
            width: 20px;
        }
    }
    a {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        text-decoration: none;
        color: #606266;
    }
    a:hover {
        color: #409EFF;
    }
.el-main{
	background: #F1F1F1;
	padding-top: 1px;
}
.el-menu-item{
	padding: 0;
}
.el-menu--horizontal>.el-menu-item a{
	display: inline-block;
	height: 100%;
	width: 100%;
  padding: 0 20px;
}
.userinfo {
	text-align: right;
	padding-right: 35px;
	float: right;
	.userinfo-inner {
		cursor: pointer;
		float: left;
		margin-right: 10px;
		img {
			width: 40px;
			height: 40px;
			border-radius: 40px;
			margin: 10px 0px 10px 10px;
			background: hotpink;
		}
	}
}
.accountDeviceDialog {
	padding: 0 40px 0 40px;
}
</style>