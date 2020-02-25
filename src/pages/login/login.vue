<template >
  <div class="container">
    <div class="row">
      <div class="col-sm-5 login-right d-flex flex-column">
        <img src="../../assets/images/logo/logo_gradient.png" class="logo justify-content-center"/>
        <h4 class="title-1">Bem-vindo à Swappin</h4>
        <br>
        <p class="text-body">Cadastre seus produtos e conquiste os clientes próximos ao seu estabelecimento.</p>
        <form @submit.prevent="doLogin()">
          <div class="form-group">
            <img src="../../assets/icons/profile.png" class="icon justify-content-center"/>
            <input required type="email" v-model="email" class="form-control"  placeholder="login@loja.com">
          </div>
          <div class="form-group">
            <img src="../../assets/icons/password.png" class="icon justify-content-center"/>
            <input required type="password" v-model="password" class="form-control" placeholder="digite sua senha">
          </div>
          <!-- <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>-->
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>Entrar</template>
        </button><br><br>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          Email ou senha inválidos.
        </b-alert>

      </form>
      <br>
      <p class="text-body">Novo na swappin?
        <router-link to="/signup">Inscreva-se!</router-link>
      </p>
    </div>

      <div class="col-sm-7 login-left">
      </div>
  </div>
</div>




</template>

<script>
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue'

export default {
  name: 'Login',

  data:() => {
    return{
      loading: false,
      email: '',
      password: '',
      name: '',
      showDismissibleAlert: false,
    }
  },
  methods:{
    async doLogin (){
      this.loading = true
      const {email, password} = this
      try {

        const res = await firebase.auth().signInWithEmailAndPassword(email, password)

        window.uid = res.user.uid
        window.email = res.user.email
        console.log(uid)
        console.log(email)

      } catch (error) {
        console.log(error)

        this.showDismissibleAlert = true

      }

      this.loading = false
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      if(window.uid){
        vm.$router.push({ path: '/pedidos'})
        window.email = res.user.email
      }
    })
  }
}

</script>
<style>
.row{
  height: 100%;
}
.login-left{
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-left: 40px;
  background-image: url("../../assets/images/background/background3.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login-right{
  padding: 100px;
  align-items: center;
  background: #FFFFFF
}
.login-right .logo{
  margin-bottom: 50px
}
.login-right form{
  min-width: 350px;
}

.container{
  min-height: 100vh;
  height: 100%;
  max-width: 100%;
}

</style>
