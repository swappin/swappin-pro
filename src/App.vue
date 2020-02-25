<template>
  <div id="app">
    <div class="page-wrapper" v-if="isLogged" >
      <aside class="menu-sidebar d-none d-lg-block" style="border:none">

          <div class="d-flex flex-row welcome">
            <div class="avatar">
              <img :src="photo" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
            </div>
            <div class="d-flex flex-column align-items-start justify-content-center ml-2">
                <p class="mb-0">Bem-vindo à Swappin</p>
                <h4 class="title-2 swappin-color mb-0 mt-1">{{ userName }}</h4>
            </div>
          </div>

        <ul class="list-group d-flex" style="height: calc(100% - 100px) ">

          <li class="list-group-item d-flex justify-content-between">
            <router-link to="/pedidos" style="color:#17a2b8;font-weight:bold">
              <div class="menu-item">
                <img src="../src/assets/icons/home.png" class="icon justify-content-center"/>
                <div class="menu-link">Pedidos</div>
              </div>
            </router-link>
            <span  class="badge badge-primary badge-pill" style="background:#17a2b8">{{ size }}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <router-link to="/historic" style="color:#17a2b8;font-weight:bold">
              <div class="menu-item">
                <img src="../src/assets/icons/files.png" class="icon justify-content-center" style="width: 13px"/>
                <div class="menu-link">Histórico de Pedidos</div>
              </div></router-link>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <router-link to="/produtos" style="color:#17a2b8;font-weight:bold">
                <div class="menu-item">
                  <img src="../src/assets/icons/bag.png" class="icon justify-content-center"/>
                  <div class="menu-link">Produtos</div>
                </div></router-link>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <router-link to="/report" style="color:#17a2b8;font-weight:bold">
                  <div class="menu-item">
                    <img src="../src/assets/icons/chart.png" class="icon justify-content-center"/>
                    <div class="menu-link">Gráficos e Relatórios</div>
                  </div>
                </router-link>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <router-link to="/editProfile" style="color:#17a2b8;font-weight:bold">
                  <div class="menu-item">
                    <img src="../src/assets/icons/settings.png" class="icon justify-content-center" style="max-width: 17px; max-height: 17px  "/>
                    <div class="menu-link">Configurações</div>
                  </div>
                </router-link>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <router-link to="/editProfile" style="color:#17a2b8;font-weight:bold">
                  <div class="menu-item">
                    <img src="../src/assets/icons/question.png" class="icon justify-content-center"/>
                    <div class="menu-link">Ajuda</div>
                  </div>
                </router-link>
              </li>

              <li class="list-group-item d-flex flex-column justify-content-end flex-grow-1">
                <button @click="logout()" style="color:#17a2b8;font-weight:bold">
                  <i class="fas fa-sign-out-alt"></i>
                  <div class="menu-item">
                      <img src="../src/assets/icons/door.png" class="icon justify-content-center"/>
                    <div class="menu-link">Sair</div>
                  </div>
                </button>
              </li>


            </ul>

          </aside>
          <topheader></topheader>
          <router-view></router-view>

        </div>
        <router-view v-else/>

        <notifications group="foo" :classess="notificationClasses" position="bottom right"/>
      </div>

    </template>
    <script>
    import firebase from 'firebase';
    import theme from './assets/css/theme.css'
    import topheader from './components/top-header.vue'
    export default {
      name: 'app',
      data: () => (
        {isLogged: false,
          size: '',
          notificationClasses: null,
          name: '',
          photo: '',
          userName: '',
          email: '',

        }
      ),
      ref: firebase.firestore().collection('stores'),
      components:{
        topheader
      },
      methods: {
        async logout (){
          await firebase.auth().signOut()
          this.$router.push({ path: '/login'})
        }
      },
      mounted() {
        firebase.auth().onAuthStateChanged(user =>{
          window.uid = user ? user.uid : null
          this.isLogged = !!user

          if(window.uid){
            window.email = user.email
            this.$router.push({ path: '/pedidos'});
            alert("E-mail do usuário: ", user.uid);
          } else {
            this.$router.push({ path: '/login'})
          }

        })

      },

      created () {
          firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, ' => ', doc.data())
              this.userName = doc.data().name


              firebase.firestore().collection('stores').where('name', '==', this.userName).onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.photo = doc.data().photo;
                });
              })
            })
          });
        firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            this.userName = doc.data().name



            firebase.firestore().collection("stores").doc(this.userName).collection('orders').where('status', '==', '1').get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {

                this.notificationClasses = 'vue-notification success'
                this.$notify({
                  group: 'foo',
                  title: doc.data().user + 'Fez um pedido de um ' + doc.data().productName,
                  text: doc.data().note
                });
              });
            });
          });
        });

      }
    }
    </script>
    <style>

    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    </style>
