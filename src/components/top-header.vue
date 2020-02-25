<template>
  <div class="nav">
    <!-- PAGE CONTAINER-->
    <div class="page-container">

      <!-- HEADER DESKTOP-->
      <header class="header-desktop" style="-webkit-box-shadow: none; box-shadow:none;">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="header-wrap">
              <form class="form-group d-flex flex-row justify-content-end" action="" method="POST" style="max-width: 450px; margin: 20px; margin-left: 0">
                <input class="au-input au-input--xl" type="text" name="search" placeholder="Pesquisar..." style="padding-left: 20px !important; box-shadow: 0px 0px 16px 4px #F2F4F4"/>
                <button type="submit" style="position: absolute; display: contents">
                  <img src="../assets/icons/search.png" class="icon justify-content-end" style="margin-right: 20px !important"/>
                </button>
              </form>
              <!-- dropdown -->
              <div v-for="store in stores" :key="store.id" class="d-flex flex-row align-items-center">

                <b-dropdown class="notifications">
                  <template v-slot:button-content>
                    <img src="../assets/icons/notification.png" class="icon justify-content-center" style="max-height: 20px !important; margin-right: 20px;"/>
                  </template>
                  <b-dropdown-item>
                    <div class="notification-item d-flex flex-row align-items-center">
                        <div class="avatar">
                          <img src="../assets/images/jing-yang.jpg" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
                        </div>
                        <div class="d-flex flex-column" style="padding: 4px; padding-left: 10px;">
                          <div class="notification-item-content">
                            <p><b>Jing Yang</b> enviou uma mensagem para você.</p>
                          </div>
                          <div class="notification-item-time d-flex flex-row align-self-end align-items-center">
                            <img src="../assets/icons/clock.png" class="icon justify-content-center"/>
                              <p style="margin-bottom: 0px; margin-left: 5px">23mins</p>
                          </div>
                        </div>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="notification-item d-flex flex-row align-items-center">
                        <div class="avatar">
                          <img src="../assets/images/gilfoyle.jpg" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
                        </div>
                        <div class="d-flex flex-column" style="padding: 4px; padding-left: 10px;">
                          <div class="notification-item-content">
                            <p><b>Bertram Gilfoyle</b> fez check-in em sua loja.</p>
                          </div>
                          <div class="notification-item-time d-flex flex-row align-self-end align-items-center">
                            <img src="../assets/icons/clock.png" class="icon justify-content-center"/>
                              <p style="margin-bottom: 0px; margin-left: 5px">23mins</p>
                          </div>
                        </div>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="notification-item d-flex flex-row align-items-center">
                        <div class="avatar">
                          <img src="../assets/images/jing-yang.jpg" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
                        </div>
                        <div class="d-flex flex-column" style="padding: 4px; padding-left: 10px;">
                          <div class="notification-item-content">
                            <p><b>Jing Yang</b> enviou uma mensagem para você.</p>
                          </div>
                          <div class="notification-item-time d-flex flex-row align-self-end align-items-center">
                            <img src="../assets/icons/clock.png" class="icon justify-content-center"/>
                              <p style="margin-bottom: 0px; margin-left: 5px">23mins</p>
                          </div>
                        </div>
                    </div>
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <div class="notification-item d-flex flex-row align-items-center">
                        <div class="avatar">
                          <img src="../assets/images/jing-yang.jpg" style="vertical-align: middle; width: 52px;  height: 52px; border-radius: 50%;">
                        </div>
                        <div class="d-flex flex-column" style="padding: 4px; padding-left: 10px;">
                          <div class="notification-item-content">
                            <p><b>Jing Yang</b> enviou uma mensagem para você.</p>
                          </div>
                          <div class="notification-item-time d-flex flex-row align-self-end align-items-center">
                            <img src="../assets/icons/clock.png" class="icon justify-content-center"/>
                              <p style="margin-bottom: 0px; margin-left: 5px">23mins</p>
                          </div>
                        </div>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
                <button type="submit" style="position: absolute; display: contents">
                  <img src="../assets/icons/email.png" class="icon justify-content-end" style="margin-right: 20px !important; max-width: 16px !important"/>
                </button>


              </div>

              <!-- fim -->
            </div>
          </div>
        </div>

      </header>


      <!-- FIM HEADER-->

      <!-- MAIN CONTENT-->

    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'TopHeader',
  data(){
    return{
      name: '',
      photo: '',
      userName: '',
      email: '',
      stores: [],


    }
  },
  created () {
    firebase.firestore().collection('stores').where('email', '==', email).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        this.userName = doc.data().name


        firebase.firestore().collection('stores').where('name', '==', this.userName).onSnapshot((querySnapshot) => {
          this.stores = [];
          querySnapshot.forEach((doc) => {
            this.stores.push({
              name: doc.data().name,
              photo: doc.data().photo
            });
            console.log(doc.data())
          });
        })
      })
    });
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
